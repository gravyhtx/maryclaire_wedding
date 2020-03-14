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
    
        function showRemaining() {
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {
    
                clearInterval(timer);
                document.getElementById('countdown').innerHTML = 'Thank You for Attending Our Wedding';
    
                return;
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
    
            document.getElementById('countdown').innerHTML = days + ' days<div class="script-class countdown" style="font-size: 32px; margin-top: -15px;">until our wedding!</div>';
            // document.getElementById('countdown').innerHTML += hours + ' hrs ';
            // document.getElementById('countdown').innerHTML += minutes + ' min';
        }
    
        timer = setInterval(showRemaining, 1000);