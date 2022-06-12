import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  searchBar: {
    width: '100%',
    paddingRight: '0 !important',
    height: '3rem',
    border: '1px solid #fff',
    '&:hover': {
      border: '1px solid #0F5B9A',
    },
  },
  searchBtn: {
    background: '#FF9F00',
    color: '#000',
    padding: '12px 0',
    boxShadow: 'none',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginRight: '-1px',

    '&:hover': {
      background: '#ff8400',
    },
  },

  '.MuiOutlinedInput-notchedOutline': {
    border: 'none !important',
  },
});

export default useStyles;
