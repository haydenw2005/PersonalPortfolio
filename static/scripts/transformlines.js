const borderRatio = 0.165
const startMovementRatio = 0.1;  // 0.1 + 17.5vh

document.addEventListener('DOMContentLoaded', function() {
  adjustSlantLine(0);
  let scrollableElement = document.getElementById('static-side-borders');
  let lastYPos = 0;
  scrollableElement.addEventListener('scroll', function() {
    isUp = lastYPos < scrollY;
    scrollY = scrollableElement.scrollTop;

    moveBottomLines(scrollY, isUp);
    
    lastYPos = scrollY;
    
  });

});

window.addEventListener('resize', function() {
  // Call your JavaScript function here
  adjustSlantLine(0);
});


function adjustSlantLine(i, h) {
  let movingSlantLines = document.getElementsByClassName('slant-line');
  currentObj = movingSlantLines[i];
  let respectiveBorder = document.getElementsByClassName('border');
  let w = respectiveBorder[i].offsetWidth/3;
  let hypo = (w**2+h**2)**(1/2);
  currentObj.style.width = hypo + 'px';
  angleDeg = Math.acos(w/hypo) * (180 / Math.PI);
  if (i % 2 == 1) angleDeg = angleDeg * -1;
  currentObj.style.transform = 'translateY(' + (h/2) + 'px)' + ' rotate(' + angleDeg + 'deg)';
  currentObj.style.left = w + 'px';

}


function moveBottomLines(scrollY, isUp) {
  let movingBottomLines = document.getElementsByClassName('bottom-pos');
    for (let i = 0; i < movingBottomLines.length; i++) {
      currentObj = movingBottomLines[i];
      
      yPos = getYPos(currentObj)

      let distanceHeight = window.innerHeight * startMovementRatio;
      let borderHeight = window.innerHeight * borderRatio
      let windowHeight = distanceHeight + borderHeight;

      let origYVal = currentObj.offsetTop;

      if (isUp) {
        if (scrollY > yPos-windowHeight && -(distanceHeight) > (scrollY-origYVal)) {
          currentObj.style.transform = 'translateY(' + (yPos - origYVal+windowHeight) + 'px)';
        }
      } else {
        if (-(distanceHeight) > (scrollY-origYVal) && scrollY > origYVal-windowHeight) {
          currentObj.style.transform = 'translateY(' + (scrollY - (origYVal-windowHeight) ) + 'px)';
        }
      }
      adjustSlantLine(i, yPos-origYVal);

      

    }
}

function getYPos(obj) {
  let computedStyle = window.getComputedStyle(obj);
  let transformValue = computedStyle.getPropertyValue('transform');
  if (transformValue != 'none') {
    let transformMatrix = transformValue.split('(')[1].split(')')[0].split(',');
    let transY = transformMatrix[transformMatrix.length - 1];
    yPos = obj.offsetTop + parseInt(transY);
  }
  else {
    yPos = obj.offsetTop
  }
  return yPos;
}
