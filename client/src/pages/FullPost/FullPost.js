import React, {useEffect, useState} from 'react';
import './fullPost.css';
import Post from "../../components/Post/Post";
import ReactMarkdown from 'react-markdown';
import CommentsBlock from "../../components/CommentsBlock/CommentsBlock";

import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOnePost} from "../../redux/slices/posts";
import Button from "@mui/material/Button";
import axios from "../../axios";
import jwt_decode from "jwt-decode";

const FullPost = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {post} = useSelector(state => state.posts);
  console.log(id);
  const userData = useSelector(state => state.auth.data);

  const decoded = jwt_decode(userData.token);
  const userId = decoded.id;
const postId=Number(id);

  const [name,setName]=useState('');

  useEffect(() => {
    dispatch(fetchOnePost(id));
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        name,
        postId,
        userId
      };
      console.log(fields)
      const {data} = await axios.post('/api/comment/create', fields);

      const id = data.id;
      navigate(`/`);
    } catch (err) {
      console.warn(err)
      alert('Ошибка - комментарий не добавлен')
    }
  }
  return (
    <div className="full_post_container">
      <Post
        id={post.item.id}
        title={post.item.title}
        image={post.item.img ? `http://localhost:7000/${post.item.img}` : ''}
        user={post.item.user}
        createdAt={post.item.createdAt}
        tags={post.item.tags}
        isFullPost
      />
      <ReactMarkdown>
        {post.item.textIn}
      </ReactMarkdown>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={onSubmit} size="large" variant="contained">
        Добавить комментарий
      </Button>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        {/*<Index />*/}
      </CommentsBlock>
    </div>
  );
};

export default FullPost;