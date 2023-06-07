const borderRatio = 0.165
const startMovementRatio = 0.1;
const respectiveBorder = document.getElementsByClassName('border');

document.addEventListener('DOMContentLoaded', function() {
  adjustSlantLine(0);
  let scrollableElement = document.getElementById('static-side-borders');
  let lastYPos = 0;
  scrollableElement.addEventListener('scroll', function() {
    scrollY = scrollableElement.scrollTop;
    isUp = lastYPos < scrollY;
    
    moveBottomLines(scrollY, isUp);
    lastYPos = scrollY;
  });
});


window.addEventListener('resize', function() {
  adjustSlantLine(0);
});


function adjustSlantLine(i, h) {
  let movingSlantLines = document.getElementsByClassName('slant-line');
  let currentObj = movingSlantLines[i];
  let w = respectiveBorder[i].offsetWidth/3;
  let hypo = Math.sqrt(w ** 2 + h ** 2);
  currentObj.style.width = (hypo * 1.01) + 'px';
  angleDeg = Math.acos(w / hypo) * (180 / Math.PI);
  if (i % 2 == 1) angleDeg = angleDeg * -1;
  currentObj.style.transform = 'translateY(' + (h/2) + 'px)' + ' rotate(' + angleDeg + 'deg)';
  currentObj.style.left = (w - (hypo*1.01-w)/2) + 'px';
}


function moveBottomLines(scrollY, isUp) {
  let movingBottomLines = document.getElementsByClassName('bottom-pos');
    for (let i = 0; i < movingBottomLines.length; i++) {
      let currentObj = movingBottomLines[i];
      
      let yPos = getYPos(currentObj)

      let distanceHeight = window.innerHeight * startMovementRatio;
      let borderHeight = window.innerHeight * borderRatio
      let windowHeight = distanceHeight + borderHeight;

      let origYVal = currentObj.offsetTop;

      if (scrollY > origYVal-windowHeight && -(distanceHeight) > (scrollY-origYVal)) {
        currentObj.style.transform = 'translateY(' + (scrollY - (origYVal-windowHeight) ) + 'px)';
      }
      
      adjustSlantLine(i, yPos-origYVal);
    }
}


function getYPos(obj) {
  let computedStyle = window.getComputedStyle(obj);
  let transformValue = computedStyle.getPropertyValue('transform');
  let yPos = 0;
  if (transformValue != 'none') {
    let transformMatrix = transformValue.split('(')[1].split(')')[0].split(',');
    let transY = transformMatrix[transformMatrix.length - 1];
    yPos = obj.offsetTop + parseInt(transY);
  }
  else {
    yPos = obj.offsetTop;
  }
  return yPos;
}
