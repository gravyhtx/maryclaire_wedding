    // RSVP PUSHPIN //

    // $('.pushpin-demo-nav').each(function() {
    //     var $this = $(this);
    //     var $target = $('#' + $(this).attr('data-target'));
    //     $this.pushpin({
    //       top: $target.offset().top,
    //       bottom: $target.offset().top + $target.outerHeight() - $this.height()
    //     });
    //   });


// COUNTDOWN CLOCK //

var end = new Date('06/20/2020 6:0 PM');

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;


// COUNTDOWN TO DAY //

function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('countdown').innerHTML = '<a href="/guestbook.html" style="text-decoration: none;">Thank You for Coming to Our Wedding!</a>';

        return;
    }
    var days = Math.floor(distance / _day);
    // var hours = Math.floor((distance % _day) / _hour);
    // var minutes = Math.floor((distance % _hour) / _minute);
 
    document.getElementById('countdown').innerHTML = 'THANK YOU<div class="script-class countdown" style="font-size: 32px; margin-top: -15px;">for coming to our wedding!</div>';
    // document.getElementById('countdown').innerHTML += hours + ' hrs ';
    // document.getElementById('countdown').innerHTML += minutes + ' min';
}

timer = setInterval(showRemaining, 1000);


// TURN OFF CAROUSEL INDICATORS //

$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: false
  });


// LIMIT TEXTAREA ROWS //

$(document).ready(function () {
$('textarea[data-limit-rows=true]')
    .on('keypress', function (event) {
        var textarea = $(this),
            text = textarea.val(),
            numberOfLines = (text.match(/\n/g) || []).length + 1,
            maxRows = parseInt(textarea.attr('rows'));

        if (event.which === 13 && numberOfLines === maxRows ) {
        return false;
        }
    });
});
