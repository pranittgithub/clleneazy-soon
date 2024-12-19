(function ($) {
    $.fn.countdown = function (options, callback) {
        var settings = $.extend({
            date: null,
            offset: 5.5,  // IST is UTC +5:30, so we use 5.5 here
            day: 'Day',
            days: 'Days',
            hour: 'Hour',
            hours: 'Hours',
            minute: 'Minute',
            minutes: 'Minutes',
            second: 'Second',
            seconds: 'Seconds'
        }, options);

        // Throw error if date is not set
        if (!settings.date) {
            $.error('Date is not defined.');
        }

        // Throw error if date is set incorrectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }

        // Save container
        var container = this;

        // Change client's local date to match offset timezone
        var currentDate = function () {
            var date = new Date();
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            var new_date = new Date(utc + (3600000 * settings.offset));  // Add the IST offset
            return new_date;
        };

        // Countdown function
        function countdown() {
            var target_date = new Date(settings.date), 
                current_date = currentDate(); // Get the current date considering timezone offset

            var difference = target_date - current_date;

            // If difference is negative, the countdown is finished
            if (difference < 0) {
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();
                return;
            }

            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

            // Format with leading zeros for single digits
            days = (String(days).length >= 2) ? days : '0' + days;
            hours = (String(hours).length >= 2) ? hours : '0' + hours;
            minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
            seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // Set text based on singular/plural logic
            var text_days = (days === 1) ? settings.day : settings.days,
                text_hours = (hours === 1) ? settings.hour : settings.hours,
                text_minutes = (minutes === 1) ? settings.minute : settings.minutes,
                text_seconds = (seconds === 1) ? settings.second : settings.seconds;

            // Update HTML dynamically in the "Days - Hours - Minutes - Seconds" format
            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_text').text(text_days);
            container.find('.hours_text').text(text_hours);
            container.find('.minutes_text').text(text_minutes);
            container.find('.seconds_text').text(text_seconds);
        }

        // Start countdown
        var interval = setInterval(countdown, 1000);
    };
})(jQuery);

// Initialize the countdown for IST
$('#countdown').countdown({
    date: '12/31/2024 23:59:59', // Set the target date (in IST)
    offset: 5.5, // IST offset (UTC +5:30)
});
