var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

 function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  for(i = 0; i < data.length; i++){
    let value = createTweetElement(tweets[i]);
    $('#tweets-container').append(value)
  }
}

  //this function renders a tweets by looping through each object in a set of objects
  //and applying createTweetElement on it to create multiple tweets based on the data set

$(document).ready(function(){
  var value = renderTweets(data);
  $('#tweets-container').append(value)
});


function createTweetElement(tweetData) {
  $tweet = $("<article>").addClass("tweet");
  $header = $("<header>");
  $header.append($("<img>").addClass("avatar-img").attr('src', tweetData.user.avatars.small));
  $header.append($("<p>").addClass("tweet-handle").text(tweetData.user.handle));
  $header.append($("<h1>").text(tweetData.user.name));
  $tweet.append($header);
  $p = $("<p>").text(tweetData.content.text);
  $tweet.append($p);
  $footer = $("<footer>");

  // var time = moment(tweetData.created_at).unix();

  $footer.append($("<p>").text(tweetData.created_at));
  $footer.append($("<div>").addClass("icon-container"));
  $footer.append($("<img>").addClass("social-img").attr('src', '/images/flag.png'));
  $footer.append($("<img>").addClass("social-img").attr('src', '/images/re-tweet.png'));
  $footer.append($("<img>").addClass("social-img").attr('src', '/images/heart.png'));
  $tweet.append($footer);
  return $tweet;
}

// this function creates a tweet when it is passed a data object. it does this by creating
// the specific elements in the template tweet we want to create and use append to attach
// everything together. This cannot be made if we didn't first make an html template on the
//index html. This requires the driver code below to check to see if it works.

// Test / driver code (temporary). Eventually will get this from the server.

// var tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

// $(document).ready(function(){
//   var $tweet = createTweetElement(tweetData);

//   console.log($tweet); // to see what it looks like
//   $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

// });


// Test / driver code (temporary)
