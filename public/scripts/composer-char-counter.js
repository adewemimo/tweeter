console.log('composer-char-counter.js');

$(document).ready(function () {
  console.log('composer-char-counter.js: document ready');
  const tweetTextArea = document.getElementById('tweet-text');
  tweetTextArea.addEventListener('keyup', function () {
    let tweetCharCount = this.value.length;
    getTweetCharCount(tweetCharCount);
  });
});

const getTweetCharCount = function (tweetLength) {
  const tweetCharCountElem = document.querySelector('.counter');
  const remaining = 140 - tweetLength;
  tweetCharCountElem.innerText = remaining;
  if (remaining < 0) {
    tweetCharCountElem.classList.add('negative-count');
  }
};
