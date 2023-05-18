import React from 'react';
import {Link} from 'react-router-dom';
import {UserInfo} from '../UserInfo';
import './post.css';

const Post = ({id, title, tags, createdAt, image, user, isFullPost}) => {

  return (
    <>
      {isFullPost ?
        <div>
          <div className="gh">
            <div>
              <Link to={`/posts/${id}`}>
                <h3>{title}</h3>
              </Link>
              <div>
                <UserInfo {...user}/>
              </div>
              <p>{tags}</p>
              <p>{createdAt}</p>
            </div>
          </div>
        </div>
        :
        <div className="post_container">
          <div className="post_inner">
            <div className="post_inner_text">
              <Link to={`/posts/${id}`}>
                <h3>{title}</h3>
              </Link>
              <div>
                <UserInfo {...user}/>
              </div>
              <p>{tags}</p>
              <p>{createdAt}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Post;