class Pong {
    constructor() {
        this.size = 15;
        this.x = 200;
        this.y = 200;
        this.speed = 200/fps;
        this.heading = -30;
        this.color = "#FFFFFF";
    }2.5
    move(){
        this.y += -1 * this.speed * Math.sin(this.heading/180*3.1415);
        this.x += this.speed * Math.cos(this.heading/180*3.1415);
    }
}
class Paddle{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sizeX = 5;
        this.sizeY=50;
        this.score = 0;
        this.color = "#FFFFFF"
        this.speed = 400/fps;
        this.rotateY = 0;
    }
    move(){
        this.y += this.rotateY * this.speed;
    }
    moveCpu(){
        var difference = (this.y + this.sizeY /2) - (pong.y + pong.size /2)
        if (Math.abs(difference)>this.speed){
            this.y += -1*this.speed * Math.sign(difference);
        }
        else if (Math.abs(difference) > 20){
            this.y -= Math.sign(difference)*20
        }
    }
}




var fps = 60






var stillPlaying = true;
var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext('2d');
var pong = new Pong();
var plyr = new Paddle(20,180);
var cpu = new Paddle(380,180);
cpu.speed = 200/fps



window.onload=()=>{
    gameLoop();
}
function gameLoop(){
    setInterval(show, 1000/fps);
}

function show(){
    if (stillPlaying){
        update();
        draw();
    }else{
        canvasContext.font = "48px Arial";
        canvasContext.fillStyle = "#FF0042";
        canvasContext.fillText("GAME OVER", canvas.width -300, canvas.height - 225);
    }
}
function update(){
    canvasContext.clearRect(0,0, canvas.witdh, canvas.height)
    pong.move();
    plyr.move();
    cpu.moveCpu();
    checkHitPong();
    checkHitWall();
    checkHitGoal();
}

function checkHitGoal(){
    if (pong.x + pong.size + 10 < 0){
        cpu.score +=1
        reset();2

    }else if (pong.x > 410){
        plyr.score +=1
        reset()
    }
}
function reset(){
    pong.x = 200
    pong.y = 10
    pong.heading = Math.random() * 100 - 50
    pong.speed = 200/fps
}

function checkHitPong(){
    if (pong.heading < 0){
        pong.heading = 360+pong.heading;
    }
    if (pong.x + pong.size > plyr.x + plyr.sizeX && pong.x < plyr.x && pong.y+pong.size>plyr.y && pong.y < plyr.y + plyr.sizeY){
        var difference = (pong.y + pong.size/2) - (plyr.y + plyr.sizeY/2)
        pong.heading = difference * - 2
        pong.speed += 5/fps
        pong.color = getRandomColor();
    } else if (pong.x + pong.size > cpu.x && pong.x < cpu.x && pong.y>cpu.y && pong.y < cpu.y + cpu.sizeY){
        pong.heading = (pong.y + pong.size/2 - (cpu.y + cpu.sizeY/2)) * -2 + 180
        pong.speed += 5/fps
        pong.color = getRandomColor();
    }
}

function checkHitWall(){
    if (pong.heading < 0){
        pong.heading = 360+pong.heading;
    }
    if (pong.y + pong.size >= 400-10){
        pong.heading = pong.heading * -1
        pong.y = 390-pong.size;
    } else if (pong.y <=10){
        pong.heading =   - pong.heading
        pong.y = 10.001;
    }
    if (plyr.y + plyr.sizeY>= 400-10){
        plyr.y = 390- plyr.sizeY;
    }
    else if(plyr.y <=10){
        plyr.y = 10.0001;
    }
    if (cpu.y + cpu.sizeY>= 400-10){
        cpu.y = 390- cpu.sizeY;
    }
    else if(cpu.y <=10){
        cpu.y = 10.0001;
    }
}

function draw(){
    createRect(0,0,canvas.width, canvas.height, "#303030");
    createRect(0,0, 10, canvas.height, "blue");
    createRect(canvas.width-10,0, 10, canvas.height, "red");
    createRect(0, canvas.height-10, canvas.width, 10, "purple");
    createRect(0, 0, canvas.width, 10, "purple");

    createRect(pong.x, pong.y, pong.size, pong.size, pong.color);
    createRect(plyr.x, plyr.y, plyr.sizeX, plyr.sizeY, plyr.color);
    createRect(cpu.x-cpu.sizeX, cpu.y, cpu.sizeX, cpu.sizeY, cpu.color);

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Player: "+ plyr.score, canvas.width -340, 30);
    canvasContext.fillText("CPU: "+ cpu.score, canvas.width -120, 30);
}
function createRect(x, y, width, height, color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode === 38 && plyr.rotateY !==1){
            plyr.rotateY = -1
        } else if(event.keyCode === 40 && plyr.rotateY !==-1){
            plyr.rotateY = 1;
        }
    }, 1)
})
window.addEventListener("keyup", ()=>{
    plyr.rotateY=0;
})

function getRandomColor() {
    var letters = '789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 9)];
    }
    return color;
}
