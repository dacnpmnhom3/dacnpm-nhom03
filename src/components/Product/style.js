import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    padding: '8px',
    textAlign: 'center',
    '&:hover': {
      background: '#D3E0FF',
      cursor: 'pointer',
    },
  },
  thumbnail: {
    marginBottom: '8px',
    textAlign: 'center',
  },
  productName: {
    marginBottom: '16px',
    height: '72px',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100%',
    fontSize: '16px',
  },
  discountPrice: {
    textAlign: 'left',
    color: '#666666',
    textDecoration: 'line-through',
    fontSize: '14px',
  },
  price: {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: 'bold',
  },
});

export default useStyles;
