$(document).ready(function() {
  /* global moment */
  // guestContainer holds all of our posts
  var guestContainer = $(".book-container");
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts() {
  //   var datesString = dates || "";
  //   if (datesString) {
  //     datesString = "/dates/" + datesString;
  //   }
    $.get("/api/posts", function(data) {
      console.log("Posts", data);
      posts = data;
      // if (!posts || !posts.length) {
      //   displayEmpty();
      // }
      // else {
        initializeRows();
      // }
    });
  }
        
  //     }
  //   });
  // }

  // initializeRows();

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // guestContainer
  function initializeRows() {
    guestContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    guestContainer.prepend(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var newPostGuests = $("<h2>");
    // var newPostDate = $("<small>");
    // var newPostdates = $("<h5>");
    // newPostdates.text(post.dates);
    // newPostdates.css({
    //   float: "right",
    //   "font-weight": "700",
    //   "margin-top":
    //   "-15px"
    // });
    var newPostCardMessages = $("<div>");
    newPostCardMessages.addClass("card-Messages");
    var newPostMessages = $("<p>");
    newPostGuests.text(post.name + " ");
    newPostMessages.text(post.message);
    // var formattedDate = new Date(post.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    // newPostDate.text(formattedDate);
    // newPostGuests.append(newPostDate);
    newPostCardHeading.append(newPostGuests);
    // newPostCardHeading.append(newPostdates);
    newPostCardMessages.append(newPostMessages);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardMessages);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function displays a message when there are no posts
  // function displayEmpty() {
  //   guestContainer.empty();
  //   var messageH2 = $("<h2>");
  //   messageH2.css({ "text-align": "center", "margin-top": "50px" });
  //   messageH2.html("No posts yet for this dates, navigate <a href='/guestbook'>here</a> in order to create a new post.");
  //   guestContainer.append(messageH2);
  // }

  // This function handles reloading new posts when the dates changes
  // function handledatesChange() {
  //   var newPostdates = $(this).val();
  //   getPosts(newPostdates);
  // }

// Gets an optional query string from our url (i.e. ?post_id=23)
var url = window.location.search;
var postId;

// If we have this section in our url, we pull out the post id from the url
// In localhost:8080/guestbook?post_id=1, postId is 1
if (url.indexOf("?post_id=") !== -1) {
  postId = url.split("=")[1];
  getPostData(postId);
}

// Getting jQuery references to the post Messages, Guests, form, and dates select
var MessagesInput = $("#message");
var GuestsInput = $("#name");
var guestbookForm = $("#guestbook");
// var postdatesSelect = $("#dates");
// Giving the postdatesSelect a default value
// postdatesSelect.val("Personal");
// Adding an event listener for when the form is submitted
$(guestbookForm).on("submit", function handleFormSubmit(event) {
  console.log("click")
  event.preventDefault();
  // Wont submit the post if we are missing a Messages or a Guests
  if (!GuestsInput.val().trim() || !MessagesInput.val().trim()) {

    return;
  }
  // Constructing a newPost object to hand to the database
  var newPost = {
    names: GuestsInput.val().trim(),
    messages: MessagesInput.val().trim(),
    
    // dates: postdatesSelect.val()
  };
  
  if (newPost) {
    console.log(newPost);
    submitPost(newPost);
  }
});

// Submits a new post and brings user to book page upon completion
function submitPost(Post) {
  $.post("/api/posts/", Post, function() {
    window.location.href = "/guestbook";
  });
}
});
