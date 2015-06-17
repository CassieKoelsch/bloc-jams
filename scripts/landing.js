var animatePoints = function() {
        var revealPoint = function() {
         $(this).css({
             opacity: 1,
             transform: 'scaleX(1) translateY(0)'
         });
    };
    $.each($('.point'), revealPoint);
};
$(window).load(function() {
    // Automatically animates the points on a tall screen where scrolling can't trigger the animation
    if ($(window).height() > 950) {
        animatePoints();
    }

    $(window).scroll(function(event) {
        if ($(window).scrollTop() >= 500) {
         animatePoints();
    }
    });

});