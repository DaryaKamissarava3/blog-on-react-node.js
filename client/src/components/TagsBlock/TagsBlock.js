import React from 'react';
import './tagsBlock.css';

const TagsBlock = ({list}) => {
  return (
    <div className="tags_block">
      <h3 className="tags_title">Tags</h3>
      <div className="tags_list">
        {list}
      </div>
    </div>
  );
};

export default TagsBlock;