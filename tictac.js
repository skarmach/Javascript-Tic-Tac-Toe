(function () {
var mainContainer = document.getElementById("mainContainer");
var ROWS = 3;
var COLS = 3;
var basex = mainContainer.offsetLeft;
var basey = mainContainer.offsetTop;
var padding = 4;
var boxWidth = (parseInt(mainContainer.offsetWidth, 10) / 3 )
              - (2 * padding);
var boxHeight = (parseInt(mainContainer.offsetHeight, 10) / 3 )
              - (2 * padding);
// arrays to track values for each box
// this makes it easy to check for winning combo
var ovalues = [0,0,0,0,0,0,0,0,0];
var xvalues = [0,0,0,0,0,0,0,0,0];

// the winning combinations
var winningSets = {
  "toprow": [0,1,2],
  "midrow": [3,4,5],
  "botrow": [6,7,8],
  "lefcol": [0,3,6],
  "midcol": [1,4,7],
  "rigcol": [2,5,8],
  "diagbk": [0,4,8],
  "diagfr": [2,4,6]
};

// Check the x and o array to
// see if there is any match
// with the winning combination.
// If there is a match, highlight
// the values in that combo and
// disable any further click events.
function checkWin(letter) {
  var arr;
  if (letter === "O") {
    arr = ovalues;
  } else {
    arr = xvalues;
  }
  for (var set in winningSets) {
    var ws = winningSets[set];
    if (arr[ws[0]] + arr[ws[1]] + arr[ws[2]] == 3) {
      document.querySelector('.box[no="' + ws[0] + '"]')
        .setAttribute("winner","1");
      document.querySelector('.box[no="' + ws[1] + '"]')
        .setAttribute("winner","1");
      document.querySelector('.box[no="' + ws[2] + '"]')
        .setAttribute("winner","1");
      mainContainer.style.pointerEvents = "none";
      return true;
    }
  }
  return false;
}

// constructor for box objects
function Box (r, c) {
  var b = document.createElement("div");
  b.className = "box";
  //"no" attribute is used to highlight winning combo
  b.setAttribute("no", (r - 1) * COLS + c - 1);
  b.setAttribute("winner", "0");
  b.style.width = boxWidth + "px";
  b.style.height = boxHeight + "px";
  b.style.position = "absolute";
  // positioning the boxes based on row and column vlue
  b.style.left = (basex + (c - 1) * boxWidth + (c * padding)) + "px";
  b.style.top = (basey + (r - 1) * boxHeight + (r * padding)) + "px";
  // add listeners for left and right clicks
  b.addEventListener("click", handleClick);
  b.addEventListener("contextmenu", handleContextMenu);
  // hook to the box element to help
  // add it as child to the container
  this.getElement = function () {return b;};

  // handler for left click
  function handleClick(e) {
    e.preventDefault(); // prevent default behavior
    // toggle between "O" and "" for left clicks
    if (b.innerHTML) {
      b.innerHTML = "";
      ovalues[(r - 1) * ROWS + c - 1] = 0;
    } else {
      b.innerHTML = "<span class='ox'>O</span>";
      ovalues[(r - 1) * ROWS + c - 1] = 1;
      checkWin("O");
    }
  }
 
  // handler for right click
  function handleContextMenu(e) {
    e.preventDefault(); // prevents context menu
    // toggle between "X" and "" for left clicks
    if (b.innerHTML) {
      b.innerHTML = "";
      xvalues[(r - 1) * ROWS + c - 1] = 0;
    } else {
      b.innerHTML = "<span class='ox'>X</span>";
      xvalues[(r - 1) * ROWS + c - 1] = 1;
      checkWin("X");
    }
  }
}

// this starts a new game
function startGame() {
  // wipe the container clean
  mainContainer.innerHTML = "";
  // add in the boxes
  for (var r = 1; r <= ROWS; r++){
    for (var c = 1; c <= COLS; c++) {
      mainContainer.appendChild((new Box(r, c)).getElement());
    }
  }
  mainContainer.style.pointerEvents = "auto";
}

// add click handler to the 'start' button
// it is hooked to the startGame function
var startButton = document.getElementById("startButton");
startButton.onclick = startGame;
})();
