import React from 'react';
import './commentsBlock.css';

const CommentsBlock = ({items, isLoading}) => {
  return (
    <div className="comments_block">
      <h3 className="comments_title">Comments</h3>
      <div>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <div className="one_comment">
            <div className="comment_img_name">
               <img className="comment_little_img" src={obj.user.avatarUrl} alt="picture"/>
               <span>{obj.user.fullName}</span>
            </div>
            <div className="comment_text">{obj.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsBlock;