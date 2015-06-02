window.onload = function() {

    // Automatically animates the points on a tall screen where scrolling can't trigger the animation
    if (window.innerHeight > 950) {
        Array.prototype.forEach.call(pointsArray, animatePoints);
    }

    window.addEventListener('scroll', function(event) {
        if (pointsArray[0].getBoundingClientRect().top <= 500) {
            Array.prototype.forEach.call(pointsArray, animatePoints);
        }
    });

}