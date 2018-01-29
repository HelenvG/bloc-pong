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
var playerScore = 0;
var computerScore = 0;
var playerScoreDisplay = document.getElementById("playerScoreDisplay");
var computerScoreDisplay = document.getElementById("computerScoreDisplay");

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };

var step = function() {
    update();
    render();
    animate(step);
    computerScoreDisplay.innerHTML = "Computer score: " + computerScore;
    playerScoreDisplay.innerHTML = "Player score: " + playerScore;
  };

  var update = function() {
    player.update(); 
    computer.update(ball);
    ball.update(player.paddle, computer.paddle); 
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
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
};
      
 //Ball
 function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 3;
    this.y_speed = 0;
  }
  
  Ball.prototype.render = function() {
    context.beginPath();
    context.rect(this.x, this.y, 10, 10, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();
  }; 

  Ball.prototype.update = function(paddleOne, paddleTwo) {
    this.y += this.y_speed; 
    this.x += this.x_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;

    if(this.y - 5 < 0) {
      this.y = 5;
      this.y_speed = -this.y_speed;
    } else if(this.y + 5 > 400) {
      this.y = 395;
      this.y_speed = -this.y_speed;
    }

    if(this.x < 0 || this.x > 600) {
      this.x_speed = 3;
      this.y_speed = 0;
      if (this.x < 0) {
        playerScore++;
        playerScoreDisplay.innerHTML = "Player Score: " + playerScore;
        displayMessage();
      } else if (this.x > 600) {
        computerScore++;
        computerScoreDisplay.innerHTML = "Computer Score: " + computerScore;
        displayMessage();
      }
      this.x = 300;
      this.y = 200;
    }
if(top_x > 300) {
  if(top_x < (paddleOne.x + paddleOne.width) && bottom_x > paddleOne.x && top_y < (paddleOne.y + paddleOne.height) && bottom_y > paddleOne.y) {
    this.x_speed = -3;
    this.y_speed += (paddleOne.y_speed / 2);
    this.x += this.x_speed;
  }
} else {
  if(top_x < (paddleTwo.x + paddleTwo.width) && bottom_x > paddleTwo.x && top_y < (paddleTwo.y + paddleTwo.height) && bottom_y > paddleTwo.y) {
    this.x_speed = 3;
    this.y_speed += (paddleTwo.y_speed / 2);
    this.x += this.x_speed;
  }
 }
};

function displayMessage() {
     if (this.playerScore === 11) {
      alert("You Won!");
      location.reload();
       } else if (this.computerScore === 11) {
        alert("Computer Won!");
        location.reload();
    }
     };

//Computer
Computer.prototype.update = function(ball) {
  var y_position = ball.y;
  var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_position);
  if(diff < 0 && diff < -4) {
      diff = -5;
  } else if(diff > 0 && diff > 4) {
      diff = 5;
  }
  this.paddle.move(0, diff);
  if(this.paddle.y < 0) {
      this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 400) {
    this.paddle.y = 400 - this.paddle.height;
  } 
};


  //Players
  function Computer() {
    this.paddle = new Paddle(10, 175, 10, 50);
}

function Player() {
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
      if(value == 38) {       
        this.paddle.move(0, -4);
      } else if (value == 40) {     
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
    if(this.y < 0) {          
      this.y = 0;
      this.y_speed = 0;
    } else if (this.y + this.height > 400) {    
      this.y = 400 - this.height;
      this.y_speed = 0;
    }
  };

  

  



 

