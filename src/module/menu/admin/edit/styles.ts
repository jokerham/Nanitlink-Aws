export 
const tabStyle = {
  alignItems: 'stretch',
  gap: '5px',
  backgroundImage: '-webkit-linear-gradient(top, #eee, #ddd 18px, #ccc 18px, #ddd 33px)',
  backgroundColor: '#ddd',
  borderRadius: '5px',
  boxShadow: '1px 1px 1px #999',
  height: '100%',
  overflow: 'hidden',
  verticalAlign: 'top',
  position: 'relative',
  padding: '10px 10px 5px 10px',
};

export const sxStyles = {
  tree: {
    ...tabStyle,
    minWidth: '300px',
  },
  edit: {
    ...tabStyle,
    width: '250px',
  },
  header: {
    alignItem: 'stretch',
    alignContent: 'space-between',
  },
  h1: {
    fontSize: '16px',
    margin: '-10px -10px 0 -10px',
    lineHeight: '32px !important',
    color: '#000',
    padding: '0 8px',
    textOverflow: 'ellipsis',
  },
  h4: {
    fontSize: '13px',
    fontFamily: 'Arial',
  },
  content: {
    flexGrow: 1,
    gap: '5px',
    backgroundColor: '#fff',
    border: '1px solid #999',
    borderRadius: '5px',
    padding: '5px 10px',
  },
  action: {
    alignContent: 'center',
    justifyContent: 'end',
  },
  actionButton: {
    gap: '5px',
    m: 0,
    p: 0,
    color: '#000',
    '& svg': {
      opacity: 0.5,
    },
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#000',
      '& svg': {
        opacity: 1,
      },
    },
  },
  node: {
    alignItems: 'center',
    borderRadius: '5px',
    padding: '5px',
    transition: 'background-color 0.5s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#444',
      '& .MuiTypography-root': {
        color: '#fff',
      },
    },
    '&.active': {
      backgroundColor: 'black',
      '& .MuiTypography-root': {
        color: '#fff',
      },
    },
  },
  listItemButton: {
    px: '10px',
    py: '2px',
    '& svg': {
      opacity: 0.5,
      height: '14px',
      width: '13px',
      color: '#000',
    },
  },
  ListItemText: {
    primary: {
      fontSize: 13,
      fontWeight: 'Arial',
      letterSpacing: 0,
    }
  }
};