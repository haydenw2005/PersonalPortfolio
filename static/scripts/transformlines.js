const borderRatio = 0.165
const startMovementRatio = 0.1;  // 0.1 + 17.5vh

document.addEventListener('DOMContentLoaded', function() {
  let scrollableElement = document.getElementById('static-side-borders');
  let lastYPos = 0;
  scrollableElement.addEventListener('scroll', function() {
    isUp = lastYPos < scrollY;
    scrollY = scrollableElement.scrollTop;

    moveBottomLines(scrollY, isUp)
    
  
    lastYPos = scrollY;
    
  });

});

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
          currentObj.style.transform = 'translateY(' + (scrollY - origYVal+windowHeight) + 'px)';
        }
      } else {
        if (-(distanceHeight) > (scrollY-origYVal) && scrollY > origYVal-windowHeight) {
          currentObj.style.transform = 'translateY(' + (scrollY - (origYVal-windowHeight) ) + 'px)';
          console.log(scrollY - (origYVal-distanceHeight));
        }
      }

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
