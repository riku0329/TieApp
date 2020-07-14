import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import MobilRightMenuSlider from '@material-ui/core/Drawer';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { ArrowBack, AccountCircle, Home } from '@material-ui/icons';
import SortIcon from '@material-ui/icons/Sort';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

type NavbarState = {
  right: boolean;
};

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [path, setPath] = useState<string>('');
  const [state, setState] = useState<NavbarState>({
    right: false,
  });

  useEffect(() => {
    setPath(() => location.pathname);
  }, [location]);

  const toggleAuth = (login: boolean): any => {
    if (login) {
      history.push('/homeguest');
    } else {
      history.push('/signin');
    }
  };

  const toggleSlider = (slider: string, open: boolean) => () => {
    setState({ ...state, [slider]: open });
  };
  const sideList = (slider: string) => (
    <SliderWrap onClick={toggleSlider('slider', false)}>
      <List>
        <ListItem onClick={() => history.push('/')} button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary='ホーム' />
        </ListItem>
        <ListItem onClick={() => history.push('/feed')} button>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary='フィード' />
        </ListItem>
        <ListItem onClick={() => history.push('/rating')} button>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary='レーティング' />
        </ListItem>
        <ListItem onClick={() => toggleAuth(true)} button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={'hello' ? 'サインアウト' : 'サインイン'} />
        </ListItem>
      </List>
    </SliderWrap>
  );
  return (
    <>
      <Box component='nav'>
        <AppBar position='fixed'>
          <Toolbar style={{ maxWidth: 960, width: '100%', margin: '0 auto' }}>
            {path.replace('/', '') &&
            path !== 'create-habit' &&
            path !== 'homeguest' ? (
              <IconButton onClick={() => history.goBack()}>
                <ArrowBack />
              </IconButton>
            ) : null}
            <Typography
              to='/'
              component={Link}
              style={{ textDecoration: 'none', flexGrow: 1, color: '#fff' }}
              variant='h1'
            >
              Tie<span style={{ color: '#64ffda' }}>App</span>
            </Typography>
            <IconButton onClick={toggleSlider('right', true)}>
              <MenuIcon />
            </IconButton>
            <MobilRightMenuSlider
              onClose={toggleSlider('right', false)}
              anchor='right'
              open={state.right}
            >
              {sideList('right')}
            </MobilRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

const SliderWrap = styled.div`
  width: 250px;
  height: 100%;
`;

export { Navbar };
