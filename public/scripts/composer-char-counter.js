//increment and decrement the character counter when user types or undo typing in the textarea.
$(document).ready(function () {
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
  } else {
    tweetCharCountElem.classList.remove('negative-count');
  }
};
