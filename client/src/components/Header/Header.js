import React from 'react';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import './header.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

const Header = () => {
  const dispatch=useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if(window.confirm('Are you sure you want logout???')){
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className="header_block">
        <div className="header_container">
          <Link className="header_logo_link" to="/">
            <div className="header_logo">PERSONAL BLOG</div>
          </Link>
          <div className="header_buttons">
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained" className="nav_btn write_post">Write a post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error" className="nav_btn logout">
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" className="nav_btn login">LOGIN</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" className="nav_btn signup">SIGN UP</Button>
                </Link>
              </>
            )}
          </div>
        </div>
    </div>
  );
};

export default Header;