import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import './addPost.css';
import {useNavigate, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {selectIsAuth} from "../../redux/slices/auth";
import axios from "../../axios";

const AddPost = () => {
  const userData = useSelector(state => state.auth.data);

  const decoded = jwt_decode(userData.token);
  const userId = decoded.id;


  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const [textIn, setTexIn] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        textIn,
        tags,
        userId
      };
      const {data} = await axios.post('/api/post/create', fields);
      const id = data.id;
      navigate(`/posts/${id}`);
    } catch (err) {
      console.warn(err)
      alert('Ошибка - пост не опубликован')
    }
  }


  if (window.localStorage.getItem('token') && !isAuth) {
    <Navigate to="/"/>
  }

  return (
    <div className="add_post_block">
      <div className="add_post_block_inner">
        <br/>
        <br/>
        <TextField
          className="add_post_title"
          variant="standard"
          placeholder="Заголовок статьи..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          className="add_post_text"
          variant="standard"
          placeholder="Post text..."
          value={textIn}
          onChange={(e) => setTexIn(e.target.value)}
          fullWidth
        />
        <TextField
          className="text_field_tags"
          avariant="standard"
          placeholder="Тэги"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <div className="add_buttons">
          <Button onClick={onSubmit} size="large" variant="contained">
            Опубликовать
          </Button>
          <a href="/">
            <Button size="large">Отмена</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

// const handleChangeFile = async (event) => {
//   try {
//     const formData = new FormData();
//     const file = event.target.files[0];
//     formData.append('image', file);
//     const {data} = await axios.post('/upload', formData);
//     console.log(data)
//   } catch (err) {
//     console.warn(err);
//     alert('failed to upload file')
//   }
// };