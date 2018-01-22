var animate = window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.getElementById('pongTable');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200);
var keysDown = {};

//context.fillRect(0, 0, 600, 400);  
//debugger;

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };

var step = function() {
    update();
    render();
    animate(step);
  };

  var update = function() {
    player.update();  
};

 //render function
 var render = function() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
    };
  
//Paddles
function Paddle(x,y){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 50;
    this.x_speed = 0;
    this.y_speed = 0;
};

Paddle.prototype.render = function(){
    //context.beginPath();
    context.fillStyle = 'green';
    context.fillRect(this.x, this.y, this.width, this.height);
};
      
 //Ball
 function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
  }
  
  Ball.prototype.render = function() {
    context.beginPath();
    context.rect(300, 200, 7, 7);  //square classic pong 'ball'
    context.fillStyle = 'white';
    context.fill();
  }; 
 
  //Players
  function Player() {
    this.paddle = new Paddle(10, 175, 10, 50);
}

function Computer() {
    this.paddle = new Paddle(580, 175, 10, 50);
}

Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};

  
  
window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
  });
  
  window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
  });


Player.prototype.update = function() {
    for(var key in keysDown) {
      var value = Number(key);
      if(value == 38) {       //up
        this.paddle.move(0, -4);
      } else if (value == 40) {     //down
        this.paddle.move(0, 4);
      } else {
        this.paddle.move(0, 0);
      }
    }
  };
  
  Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.y < 0) {          //up top
      this.y = 0;
      this.y_speed = 0;
    } else if (this.y + this.height > 400) {    //down bottom
      this.x = 400 - this.height;
      this.x_speed = 0;
    }
  };



 

