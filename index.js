import { tweetsDataset } from './data.js'

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

var tweetsData = JSON.parse(localStorage.getItem('tweetData'))

if(tweetsData == null)
localStorage.setItem('tweetData', JSON.stringify(tweetsDataset));
 tweetsData = JSON.parse(localStorage.getItem('tweetData'))
console.log(tweetsData.length)


const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')



document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
        console.log('in the retweet')
    }
    else if(e.target.dataset.reply)
    {
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target === tweetBtn)
    {
        handleTweets();
    }
    
})

function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked

    

localStorage.setItem('tweetData', JSON.stringify(tweetsData))
tweetsData= JSON.parse(localStorage.getItem('tweetData'))
render()     
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
       
        return tweet.uuid === tweetId
      
    })[0]

    console.log(targetTweetObj.isRetweeted)
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    localStorage.setItem('tweetData', JSON.stringify(tweetsData))
    tweetsData= JSON.parse(localStorage.getItem('tweetData'))
    render() 
}

function handleReplyClick(replyId){
  console.log(document.getElementById(`replies-${replyId}`).classList.toggle('hidden'))
  /*
Challenge:
1. Use the uuid stored in 'replyId' to take control 
   of the div containing that tweet’s replies. 
   (Check the HTML string below to remind yourself 
   what id that div will have.)  
2. Toggle the CSS class "hidden" on that div. 
*/ 
}

function handleTweets(){
   

    if(tweetInput.value != '')
    {
    tweetsData.unshift({
        handle: `@Safina 💎`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    }
    )

}

localStorage.setItem('tweetData', JSON.stringify(tweetsData));
tweetInput.value = ""
render() 
}

function getFeedHtml(){
    let feedHtml = ``

    tweetsData= JSON.parse(localStorage.getItem('tweetData'))
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        let retweetClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }

        if(tweet.isRetweeted)
        retweetClass = 'retweeted'


        let repliesHtml = ''

        if(tweet.replies.length > 0)
           {

            tweet.replies.forEach(function(tweetReplies)
            {
                repliesHtml += `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${tweetReplies.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${tweetReplies.handle}</p>
                            <p class="tweet-text">${tweetReplies.tweetText}</p>
                        </div>
                    </div>
            </div>`

            })

           }
        
        
     feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>

            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
   
    ${repliesHtml}
</div> 
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

