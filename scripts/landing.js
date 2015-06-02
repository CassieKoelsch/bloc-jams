var pointsArray = document.getElementsByClassName('point');

function animatePoints (points, index, pointsArray) {
        pointsArray[index].style.opacity = 1;
        pointsArray[index].style.transform = "scaleX(1) translateY(0)";
        pointsArray[index].style.msTransform = "scaleX(1) translateY(0)";
        pointsArray[index].style.WebkitTransform = "scaleX(1) translateY(0)"; 
}
