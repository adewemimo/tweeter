/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const elem = document.getElementById('timeAgo');
elem.innerHTML = timeago.format(elem.value);
