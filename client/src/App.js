import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import AddPost from './pages/AddPost/AddPost';
import FullPost from './pages/FullPost/FullPost';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchOneUser, selectIsAuth} from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);


  useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  return (
    <>
      {isAuth ?
        (
          <>
            <Header/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/posts/:id' element={<FullPost/>}/>
              <Route path='/posts/:id/edit' element={<AddPost/>}/>
              <Route path='/add-post' element={<AddPost/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Registration/>}/>
            </Routes>
          </>
        ) : (
          <>
            <Header/>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Registration/>}/>
            </Routes>
          </>
        )}
    </>
  );
}

export default App;
