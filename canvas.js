var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// c is for context
var c = canvas.getContext('2d');

/* // Rectangle
c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(5, 200, 50, 50);
c.fillStyle = 'rgba(0, 0, 255, 0.5)';
c.fillRect(100, 70, 100, 100);

console.log(canvas);

// Line

c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.lineTo(500, 100);
c.strokeStyle = "#fa34a3";
c.stroke();

c.beginPath();
c.moveTo(100, 200);
c.lineTo(200, 300);
c.strokeStyle = "blue";
c.stroke();

// Arc / Circle

function random_hex(){
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function random_color(){
    var color = "";
    switch(Math.floor(Math.random() * 3)){
      case 0:
        color = "blue";
        return color;
        break;
      case 1:
        color = "red";
        return color;
        break;
      case 2:
        color = "pink";
        return color;
        break;
    }
  }

//For loop to output random circles
for (var i = 0; i < 10; i ++){
  var x =  Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  var color = random_color();
  c.beginPath();
  c.arc( x , y, 30, 0, Math.PI * 2, false);
  c.strokeStyle = color;
  c.stroke();
}

*/

// Animation

//Create a circle object so that we can create multiple circles without repeating code
//Object Oriented JavaScript

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  //draw the circle
  this.draw = function() {
    c.beginPath();
    c.arc( this.x , this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = color;
    c.fillStyle = color;
    c.fill();
    c.stroke();
  }

  //Where our circle object will travel on the screen
  this.update = function() {
    //once our circle reaches the end of the x-axis, we want it to go in the opposite direction
    /*The circle goes by its center, we need to add the radius so that the edge of the circle
    hits the screen & bounces back rather than the center of the circle*/
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    //y axis bounce back
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    //velocity
    this.x += this.dx;
    this.y += this.dy;

    //call draw function to draw the circle
    this.draw();

  }
}

//random color generator
function random_color(){
  console.log('random color generator called');
    var color = "";
    switch(Math.floor(Math.random() * 3)){
      case 0:
        color = "#EC368D";
          console.log("color is:" + color);
        return color;
        break;
      case 1:
        color = "#51E5FF";
          console.log("color is:" + color);
        return color;
        break;
      case 2:
        color = "#440381";
          console.log("color is:" + color);
        return color;
        break;
    }

  }

//Create circle objects and place them within a single array
var circleArray = [];

for (var i = 0; i < 20; i++){
  var radius = 30;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  //dx velocity the speed at which it moves in pixels along the x-axis
  //dy velocity the speed at which it moves in pixels along the y-axis
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5) * 8;
  var color = random_color();

  //Create new circle object
  circleArray.push(new Circle(x, y, dx, dy, radius, color));

}


//Animate Circles
function animate(){
  requestAnimationFrame(animate);
  //clear canvas//
//  c.clearRect(0, 0, innerWidth, innerHeight);
//motion blur
c.fillStyle = 'rgba(255, 255, 255, 0.4)';
c.fillRect(0, 0, innerWidth, innerHeight);
  //Draw the Circles
  for(var i=0; i<circleArray.length; i++){
    circleArray[i].update();
  }
}

animate();
