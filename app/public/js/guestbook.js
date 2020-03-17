/* global moment */

// When the page loads, grab and display all of our chirps
$.get("/api/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("chirp");

      row.append('<div class="messages">"' + data[i].body + '"</div>');
      row.append('<div class="names">- ' + data[i].author + '</div>');
      row.append('<div class="dates">' + moment(data[i].created_at).format("MM/DD/YY") + "</div><br><br><br><br>");

      $("#chirp-area").prepend(row);

    }

  }

});

// When user chirps (clicks addBtn)
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Make a newChirp object
  var newChirp = {
    author: $("#author").val().trim(),
    body: $("#body").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newChirp);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newChirp)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("chirp");

      row.append('<div class="messages">"' + newChirp.body + '"</div>');
      row.append('<div class="names">- ' + newChirp.author + '</div>');
      row.append('<div class="dates">' + moment(newChirp.created_at).format("MM/DD/YY") + "</div><br><br><br><br>");

      $("#chirp-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#body").val("");
});
