/*
Challenge:
1. Put all of the data in its own file called
   data.js, and export it back into index.js. 
   Make any changes to index.html that are
   necessary to make this work.
2. Log out tweetsData.
*/

import {tweetsData} from './data.js';

const tweetBtn = document.getElementById('tweet-btn');
const tweetInput = document.getElementById('tweet-input');

tweetBtn.addEventListener('click', function(){
   console.log(tweetInput.value);
})

document.addEventListener('click', function(e){
    
    if(e.target.dataset.likes)
    handleLikeClick(e.target.dataset.likes)
})

function handleLikeClick(tweetID){
console.log(tweetID)
tweetsData.forEach(function(tweet){
    if(tweet.uuid === tweetID)
    {
        tweet.likes++;
        console.log(tweets.likes)
    }

})
}

function getFeeHtml(){
  let feedHTML = '';
   tweetsData.forEach(function(tweet)
   {
       feedHTML += `<div class="tweet">
      <div class="tweet-inner">
          <img src=${tweet.profilePic} class="profile-pic">
          <div>
              <p class="handle">${tweet.handle}</p>
              <p class="tweet-text">${tweet.tweetText}</p>
              <div class="tweet-details ">
                  <span class="tweet-detail">
                      <i class = "fa-regular fa-comment-dots" data-replies="${tweet.uuid}"></i>  
                      ${tweet.replies.length}
                  </span>
                  <span class="tweet-detail">
                  <i class = "fa-solid fa-heart" data-likes="${tweet.uuid}"></i>  
                      ${tweet.likes}
                  </span>
                  <span class="tweet-detail">
                  <i class = "fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>  
                      ${tweet.retweets}
                  </span>
              </div>   
          </div>            
      </div>
  </div>
  `
  
   })
   return feedHTML;
}

function render(){
   const feed = document.getElementById('feed');
   feed.innerHTML = getFeeHtml();

}

render();
