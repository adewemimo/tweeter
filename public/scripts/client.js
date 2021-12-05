/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data was used to test the app before getting data from the server
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
  const tweetFormBox = () => {
    //toggle the tweet form box with compose button
    $('#compose-icon').click(function () {
      if ($('.new-tweet').is(':visible')) {
        $('.new-tweet').toggle('slow');
      } else {
        $('.new-tweet').toggle('slow', function () {
          $('.new-tweet').css('display', 'flex');
        });
      }
    });
  };
  tweetFormBox();
  //submit tweet form and prevent default behavior of submit
  $(function () {
    $('form').submit(function (event) {
      event.preventDefault();
      const tweetLength = $('#tweet-text').val().length;
      //Slide error message out of view if it is already in view
      $('.tweet-error').slideUp();
      if (tweetLength > 140) {
        $('.tweet-error').text('Your tweet exceeds 140 characters');
        $('.tweet-error').slideDown('slow');
        //alert("Your tweet exceeds 140 characters");
        return;
      } else if (tweetLength < 1) {
        $('.tweet-error').text('Please enter a tweet');
        $('.tweet-error').slideDown('slow');
        //alert("Please enter a tweet");
        return;
      } else {
        const formData = $('form').serialize();
        $.ajax('/tweets', {
          method: 'POST',
          data: formData,
        }).done(() => {
          $.get('/tweets', tweets => {
            const $newTweet = createTweetElement(tweets[tweets.length - 1]);
            $('#render-new-tweet').prepend($newTweet);
          });
        });
        $('#tweet-text').val('');
        $('.tweet-error').slideUp();
        $('.counter').val(140);
      }
    });
  });

  //get tweets from server
  const loadTweets = () => {
    $.get('/tweets', data => {
      renderTweets(data);
    });
  };

  loadTweets();
});

const createTweetElement = tweet => {
  // an escape function to prevent XSS attacks
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // create a new tweet element
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
            ${escape(tweet.content.text)}
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
  tweets.reverse().forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $('.container').append($tweet);
  });
};
