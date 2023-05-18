import React, {useEffect} from 'react';
import Post from '../../components/Post/Post';
import TagsBlock from '../../components/TagsBlock/TagsBlock';
import CommentsBlock from '../../components/CommentsBlock/CommentsBlock';
import './homePage.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../redux/slices/posts";

import jwt_decode from "jwt-decode";
import {fetchAllUsers} from "../../redux/slices/auth";
import {fetchComments} from "../../redux/slices/comment";

const Home = () => {
  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.posts);
  const {comments} = useSelector(state => state.comments);
  const allUsers = useSelector(state => state.auth.users.items);
  const userData = useSelector(state => state.auth.data);

  console.log(allUsers)
  const isPostsLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchAllUsers())
    dispatch(fetchComments())
  }, []);

  //console.log(posts.items.rows);
  // console.log(userData);

  const decoded = jwt_decode(userData.token);
  //console.log(decoded);
  console.log(comments.items);
  let commentUser = comments.items.map((obj, index) => {
    return obj.userId;
  })
  console.log(commentUser)


  return (
    <div>
      <div className="home_title">
        Blog posts
      </div>
      <div className="home_welcome">Hello {decoded.fullName}!!!</div>
      <div className="main_block">
        <div className="all_posts">
          {(isPostsLoading ? [...Array(5)] : posts.items.rows).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true}/>
            ) : (
              <Post
                id={obj.id}
                title={obj.title}
                image={obj.img ? `http://localhost:7000/${obj.img}` : ''}
                user={obj.userId === decoded.id ? decoded : allUsers.find((item) => item.id === obj.userId)}
                createdAt={obj.createdAt}
                tags={obj.tags}
              />
            ))}
        </div>
        <div className="side_block">
          <TagsBlock list={"react,postgresql,cats,cute"}/>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Vasya Pypkin',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'This is test comment',
              },
              {
                user: {
                  fullName: 'Ivan Ivanov',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;