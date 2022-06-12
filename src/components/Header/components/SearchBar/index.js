import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { Button, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import PulseLoader from 'react-spinners/PulseLoader';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'hooks/debounceHook';
import { RecommendProduct } from './RecommendProduct/recommendProduct';
import productApi from 'apis/productApi';
import Highlighter from 'react-highlight-words';

import useStyles from './style';

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  padding-right: 5px;
  display: flex;
  align-items: center;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
  background: white;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubMenu = styled(motion.div)`
  position: absolute;
  padding: 15px;
  margin-top: 60px;
  background-color: white;
  border-radius: 6px;
  transform-origin: 50% -30px;
  min-width: 30em;
  color: black;
  overflow-y: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const SubMenuContainer = styled.div`
  height: 20em;
  display: flex;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20em;
`;

const KeyWords = styled.div`
  margin-right: 5em;
`;

const Italic = styled.span`
  font-style: italic;
  font-weight: 600;
`;

const WordStyle = styled.div`
  font-size: 13px;
  margin-top: 5px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.2,
    },
    display: 'block',
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.2,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

const SearchBar = () => {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(false);
  const inputRef = useRef();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [words, setWords] = useState([]);
  const navigate = useNavigate();

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (
          ref.current &&
          !ref.current.contains(event.target) &&
          event.path[0].placeholder !== 'Search...'
        ) {
          //   alert("You clicked outside of me!");
          collapseContainer();
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const isEmpty = !product || product.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    setLoading(true);
  };

  //PRODUCT PAGE
  const chooseHandler = (id) => {
    navigate(`../product/${id}`, { replace: true });
    navigate(0);
  };

  const keyClickHandler = (key) => {
    document.getElementById('search').value = key;
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setLoading(false);
    if (!document.getElementById('search').value.trim()) {
      setProduct([]);
    }
  };

  const closeHandler = () => {
    setExpanded(false);
    setSearchQuery('');
    setLoading(false);
    setProduct([]);
    if (document.getElementById('search'))
      document.getElementById('search').value = '';
  };

  const clickHandler = () => {
    if (searchQuery) expandContainer();
  };

  // useEffect(()=>{
  //     if(hasClickedOutside)
  //         collapseContainer();
  // }, [hasClickedOutside]);

  //API
  const searchProduct = async () => {
    if (!searchQuery || searchQuery.trim() === '') return closeHandler();

    const response = await productApi.recommend(searchQuery).catch((err) => {
      console.log('Failed to find product ', err);
    });
    setProduct(response.data);

    setLoading(false);
  };

  const searchKeyWords = async () => {
    if (!searchQuery || searchQuery.trim() === '') return closeHandler();

    const response = await productApi.search(searchQuery).catch((err) => {
      console.log('Failed to find keywords ', err);
    });
    setWords(response.data);

    setLoading(false);
  };

  useDebounce(searchQuery, 500, searchProduct);
  useDebounce(searchQuery, 500, searchKeyWords);

  return (
    <Grid container>
      <OutlinedInput
        className={classes.searchBar}
        id='search'
        ref={inputRef}
        placeholder='Search...'
        value={searchQuery}
        onInput={(e) => {
          changeHandler(e);
          expandContainer();
        }}
        onClick={clickHandler}
        endAdornment={
          <InputAdornment position='end'>
            <AnimatePresence>
              {isExpanded && (
                <CloseIcon
                  key='close-icon'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeHandler}
                >
                  <Close fontSize='small' />
                </CloseIcon>
              )}
            </AnimatePresence>
            <Button
              className={classes.searchBtn}
              variant='contained'
              aria-label='search button'
              edge='end'
            >
              <Search />
            </Button>
          </InputAdornment>
        }
      />
      <SubMenu
        className='popout'
        animate={isExpanded ? 'enter' : 'exit'}
        variants={subMenuAnimate}
        ref={wrapperRef}
      >
        {loading && (
          <SubMenuContainer>
            <LoadingWrapper>
              <PulseLoader
                loading
                color='#bebebe'
                size={10}
                speedMultiplier='0.6'
              />
            </LoadingWrapper>
          </SubMenuContainer>
        )}
        {!loading && isEmpty && <WarningMessage>NO PRODUCT!</WarningMessage>}
        {!loading && !isEmpty && (
          <SubMenuContainer>
            <KeyWords>
              <Italic>Matching Keywords</Italic>
              {words.map((word) => (
                <WordStyle
                  key={word._id}
                  onClick={() => keyClickHandler(word.name)}
                >
                  <Highlighter
                    highlightStyle={{
                      backgroundColor: 'transparent',
                      fontWeight: 'bold',
                    }}
                    searchWords={[searchQuery]}
                    textToHighlight={word.name}
                  />
                </WordStyle>
              ))}
            </KeyWords>
            <div className='recommend'>
              <Italic>Recommend</Italic>
              {product.map((prod) => (
                <RecommendProduct
                  key={prod._id}
                  imgsrc={prod.thumbnail}
                  name={prod.name}
                  choose={() => chooseHandler(prod._id)}
                />
              ))}
            </div>
          </SubMenuContainer>
        )}
      </SubMenu>
    </Grid>
  );
};

export default SearchBar;
