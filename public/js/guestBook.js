$(document).ready(function() {
  /* global moment */
  // guestContainer holds all of our posts
  var guestContainer = $(".book-container");
  var postdatesSelect = $("#dates");
  // Click events for the edit and delete buttons
  // $(document).on("click", "button.delete", handlePostDelete);
  // $(document).on("click", "button.edit", handlePostEdit);
  postdatesSelect.on("change", handledatesChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(dates) {
    var datesString = dates || "";
    if (datesString) {
      datesString = "/dates/" + datesString;
    }
    $.get("/api/posts" + datesString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  // function deletePost(id) {
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/posts/" + id
  //   })
  //     .then(function() {
  //       getPosts(postdatesSelect.val());
  //     });
  // }

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
    guestContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    // var deleteBtn = $("<button>");
    // deleteBtn.text("x");
    // deleteBtn.addClass("delete btn btn-danger");
    // var editBtn = $("<button>");
    // editBtn.text("EDIT");
    // editBtn.addClass("edit btn btn-default");
    var newPostGuests = $("<h2>");
    var newPostDate = $("<small>");
    var newPostdates = $("<h5>");
    newPostdates.text(post.dates);
    newPostdates.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newPostCardMessages = $("<div>");
    newPostCardMessages.addClass("card-Messages");
    var newPostMessages = $("<p>");
    newPostGuests.text(post.Guests + " ");
    newPostMessages.text(post.Messages);
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(formattedDate);
    newPostGuests.append(newPostDate);
    // newPostCardHeading.append(deleteBtn);
    // newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostGuests);
    newPostCardHeading.append(newPostdates);
    newPostCardMessages.append(newPostMessages);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardMessages);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  // function handlePostDelete() {
  //   var currentPost = $(this)
  //     .parent()
  //     .parent()
  //     .data("post");
  //   deletePost(currentPost.id);
  // }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  // function handlePostEdit() {
  //   var currentPost = $(this)
  //     .parent()
  //     .parent()
  //     .data("post");
  //   window.location.href = "/guestguest?post_id=" + currentPost.id;
  // }

  // This function displays a message when there are no posts
  function displayEmpty() {
    guestContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this dates, navigate <a href='/guestbook'>here</a> in order to create a new post.");
    guestContainer.append(messageH2);
  }

  // This function handles reloading new posts when the dates changes
  function handledatesChange() {
    var newPostdates = $(this).val();
    getPosts(newPostdates);
  }

});





$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

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
  var postdatesSelect = $("#dates");
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
      Guests: GuestsInput.val().trim(),
      Messages: MessagesInput.val().trim(),
      dates: postdatesSelect.val()
    };

    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to book page upon completion
  function submitPost(Post) {
    $.post("/api/posts/", Post, function() {
      window.location.href = "/guestbook";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our guestbook forms with its data
        GuestsInput.val(data.Guests);
        MessagesInput.val(data.Messages);
        postdatesSelect.val(data.dates);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the book page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/guestbook";
      });
  }
});
