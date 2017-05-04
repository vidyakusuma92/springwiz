var app = angular.module('sliderPuzzle', []);

app.controller('gameCtrl', ['$scope', function($scope){
  var clickedNode = undefined;
  $scope.init = function(){
    // Numbers in an array
    var numbers = [];
    var totalBlocks = 9;

    for(var i = 1; i <= totalBlocks; i++){
      numbers.push(i);
    }

    console.log(numbers);
    var numbers = shuffle(numbers);
    console.log(numbers);

    var nodes = new Array(3);
    nodes[0] = new Array(3);
    nodes[1] = new Array(3);
    nodes[2] = new Array(3);

     // you will access like nodes[0][2]
     for(var i = 0; i < 3; i++){
       for(var j = 0; j < 3; j++){
         nodes[i][j] = {
           left: undefined,
           right: undefined,
           top: undefined,
           bottom: undefined,
           value: numbers.pop(),
           x: i,
           y: j
         }
       }
     }

     console.log(nodes);

     // Creating the mesh
     for(var i = 0; i < 3; i++){
       for(var j = 0; j < 3; j++){
         nodes[i][j].left = getLeft(nodes, i, j);
         nodes[i][j].right = getRight(nodes, i, j);
         nodes[i][j].top = getTop(nodes, i, j);
         nodes[i][j].bottom = getBottom(nodes, i, j);
       }
     }
     console.log(nodes);
     $scope.nodes = nodes;

     $scope.moveBlock = function(node){
       console.log("Clicked");
       var move = canMove(node);
       console.log(clickedNode);
       clickedNode = move;
       if(move != undefined){
         var tempValue = node.value;
         node.value = move.value;
         move.value = tempValue;
       }
       else{
         clickedNode = undefined;
       }
     }

     $scope.getSlidingAnimation = function(node){
       //console.log(node);
       if(clickedNode && clickedNode.value == node.value){
         return checkAnimation(clickedNode);
       }
       return "";
     }
  }
}]);

function checkAnimation(node){
  var animation = "";
  if(node.top && node.top.value == 9){
    animation = "slide-top";
    console.log("Moving top");
  }

  if(node.left && node.left.value == 9){
    animation = "slide-left";
    console.log("Moving left");
  }

  if(node.right && node.right.value == 9){
    animation = "slide-right";
    console.log("Moving right");
  }

  if(node.bottom && node.bottom.value == 9){
    animation = "slide-bottom";
    console.log("Moving bottom");
  }
  return animation;
}

function canMove(node) {
  var move = undefined;
  if(node.top && node.top.value == 9){
    move = node.top;
    console.log("Moving top");
  }

  if(node.left && node.left.value == 9){
    move = node.left;
    console.log("Moving left");
  }

  if(node.right && node.right.value == 9){
    move = node.right;
    console.log("Moving right");
  }

  if(node.bottom && node.bottom.value == 9){
    move = node.bottom;
    console.log("Moving bottom");
  }
  if(!move){
    console.log("Cannot move anywhere");
  }

  return move;
}

function getLeft(nodes, i, j){
  if(j - 1 < 0){
    return undefined;
  }
  else if(nodes[i][j - 1] != undefined){
    return nodes[i][j - 1];
  }
  else {
    return undefined;
  }
}

function getRight(nodes, i, j){
  if(j + 1 > 2){
    return undefined;
  }
  else if (nodes[i][j + 1] != undefined) {
    return nodes[i][j + 1];
  }
  else {
    return undefined;
  }
}

function getTop(nodes, i, j){
  if(i - 1 < 0){
    return undefined;
  }
  else if (nodes[i - 1][j] != undefined){
    return nodes[i - 1][j];
  }
  else {
    return undefined;
  }
}

function getBottom(nodes, i, j){
  if(i + 1 > 2){
    return undefined;
  }
  else if(nodes[i + 1][j] != undefined){
    return nodes[i + 1][j];
  }
  else {
    return undefined;
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
