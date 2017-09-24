 function renderTweets(tweets) {
  tweets.sort(function (a, b) {
    if(a.created_at === b.created_at) {
      return 0;
    } else if (a.created_at < b.created_at) {
      return 1;
    } else {
      return -1;
    }
  });
  for(i = 0; i < tweets.length; i++){
    let tweetHTML = createTweetElement(tweets[i]);

    $('#tweets-container').append(tweetHTML)
  }
}

  //this function renders a tweets by looping through each object in a set of objects
  //and applying createTweetElement on it to create multiple tweets based on the data set

$(document).ready(function(){
  loadTweets()
  $('#theForm').on('submit', function(event){
    event.preventDefault();

    let formData = $('#theForm').serialize();
    let input = $('.textarea').val();

    if(input === '' || input === null){
      alert('You need to enter something');
    } else if (input.length > 140){
        alert('You have passed the maximum allowed characters')
      } else {
          $.post('/tweets', formData)
          .done(function(formData) {
            loadTweets()
            $('.textarea').val('');
          })
          .fail(function(error) {
            console.error(error)
          })
        };
  });
});

//this code first loads the tweets so the user can see them than it serializes the data
// passed in from submitting the form which than it gets the value of. It validates
// to see if anything is entered or if too much has been entered then if it passes it
// makes a post requests to /tweets passing in the form data. routes from tweets witll
// check to see if there is user data, if there isn't it will create a random user data
// profie and send a 201 and save the data into the DB. back here when that has been done
// it will load the tweets again with the updated tweets. that of fail and log the error

$(document).ready(function() {
    $('#theForm textarea').keydown(function(event) {
        if (event.keyCode == 13) {
            $(this.form).submit();
            return false;
         }
    });
});

// this code makes it so when someone clicks enter the tweet is submitted

$(document).ready(function(){
  $('#loginButton').on('click', function(event){
    window.location.replace("http://localhost:8080/users/login");
  })
});

$(document).ready(function(){
  $('#registerButton').on('click', function(event){
    window.location.replace("http://localhost:8080/users/register");
  })
});

// these is the event handler for the login and register button

$(document).ready(function(){
  var likes = 0;
  $(document).on('click', '.fa-heart', function(event){
    if(likes < 1){
    likes++
    } else {
      likes --
    }
    $(this).siblings(".like_counter").text(likes);
    $(this).toggleClass("lblCountRed")
  })
});

// this first loads the tweets so we can see the existing tweets than it has a on click
// handler which serializes the info gained from the form and sends it off to /tweets
// tweets turns it back into a json format adds random info and sends the info back to the
// done section which loads the tweets again. This also validates the input input to check
// to see if the input matches our criteria

function loadTweets() {
  $.get('/tweets')
  .done(function(tweets) {
    $('#tweets-container').empty();
    renderTweets(tweets);
  })
}

// this loads the tweets after emptying it so that duplicate tweets don't occur

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

  var time = moment(tweetData.created_at).fromNow();

  $footer.append($("<p>").text(time));
  $footer.append($("<div>").addClass("icon-container"));
  $footer.append($("<img>").addClass("social-img").addClass("like").innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i><span class="like_counter"></span>');
  $footer.append($("<img>").addClass("social-img").innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>');
  $footer.append($("<img>").addClass("social-img").innerHTML = '<i class="fa fa-retweet" aria-hidden="true"></i>');
  $tweet.append($footer);
  return $tweet;
}

// this function creates a tweet when it is passed a data object. it does this by creating
// the specific elements in the template tweet (which we created in the index.html)
// we want to create. I used append to attach everything together. This cannot be made
// if we didn't first make an html template on the index html. This requires the driver
// code below to check to see if it works. it also should handle the timestamp and convert it

$(document).ready(function(){
  $( "#nav-button-container" ).on('click', function() {
    $( ".new-tweet" ).slideToggle();
    $(".textarea").select();
  });
});

// this is the toggle function that also auto selects the text area



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
