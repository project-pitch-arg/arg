import React from 'react';
import './TabContent.css';
import PostContent from './PostContent.js';

export default function Posts() {
  return (
      <div class="background">     
         <div class="postlist">
         {PostContent().map(item => {
            return (
          <div class="post">
            <div class="post-date">
              {item.date}
            <div class="post-name"> 
              {item.name} 
            <div class="post-content">
             {item.content}
            </div>
            <div class="post-img">
             {item.image}
            </div>  
           </div>
         </div>
       </div>
      )
      })}
         </div> 
      </div>
    )
}