var canvas = document.getElementById('pongTable');
var context = canvas.getContext('2d');


context.fillRect(0, 0, 600, 400);  




//Paddles
function Paddle(x,y){
    this.xPos = x;
    this.yPos = y;
    this.width = 10;
    this.height = 50;
    this.color = 'white';
};

Paddle.prototype.render = function(){
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.xPos, this.yPos, this.width, this.height);
};
      
var player = new Paddle(580, 175);
var computer = new Paddle(10, 175);


 //Ball
 function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
  }
  
  Ball.prototype.render = function() {
    context.beginPath();
    context.rect(300, 200, 7, 7);  //square classic pong 'ball'
    context.fillStyle = 'white';
    context.fill();
  };  
  
  var ball = new Ball(300, 200);

  //render function
  var render = function() {
    context.fillStyle = "#FF00FF";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
  };

window.onload = function(){
    document.body.appendChild(canvas);
    player.render();
    computer.render();
    ball.render();
 };