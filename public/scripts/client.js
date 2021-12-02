/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  //submit tweet form and prevent default behavior of submit
$(function() {
  $("form").submit(function (event) {
    event.preventDefault();
    const formData = $( "form" ).serialize();
    console.log("formData",formData);
    $.ajax('/tweets', { 
    method: 'POST',
    data: formData })
  });
});

//get tweets from server
const loadTweets = () => {
  $.get('/tweets', data => {
    renderTweets(data);
  });
}

loadTweets();

});

const createTweetElement = tweet => {
  let $tweetElement = $(`
    <section class="tweets-container">
        <article>
        <header>
          <div class="header-title">
            <img src=${tweet.user.avatars} alt="avatar" />
            <p class="header-title-left">${tweet.user.name}</p>
            <p class="header-title-right">${tweet.user.handle}</p>
          </div>
          <div class="header-body">
            <p>
            ${tweet.content.text}
            </p>
          </div>
        </header>
        <footer>
          <span id="timeAgo">${timeago.format(tweet.created_at)}</span>
          <div class="icons-container">
            <i class="fas fa-flag fa-xs"></i>
            <i class="fas fa-retweet fa-xs"></i>
            <i class="fas fa-heart fa-xs"><span>'</span></i>
          </div>
        </footer>
      </article>
      </section>
      `);
  return $tweetElement;
};

const renderTweets = tweets => {
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.container').append($tweet);
  });
};



