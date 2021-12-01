/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const elem = document.getElementById('timeAgo');
  elem.innerText = timeago.format(+elem.innerText);
});
