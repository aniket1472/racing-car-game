function restart(){
	location.reload();
}


function start(){
		x = setInterval(update,100);
}



function drawRect(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}


var score = 0;
const canvas = document.getElementById('game1');
const ctx = canvas.getContext('2d');
const player = {
	x: canvas.width/2,
	y: 350,
	width: 50,
	height: 50,
	color: 'red'
};

const enemy = [];

for (var i = 0; i <5; i++) {
	enemy[i] = {
		x: Math.random()*550,
		y: -i*50,
		width: 50,
		height: 50,
		color: 'white'
	};
}

var speed = 7;

document.addEventListener("keydown", movement);

let d;

function movement(evnt) {
	let key = evnt.keyCode;
	if(key==37){
		d = "LEFT";
	}
	else if(key==39){
		d = "RIGHT";
	}
}


function collision(player,enemy) {
	for (var i = 0; i < 5; i++) {
		if ((enemy[i].x>player.x && enemy[i].x<player.x + 50)||(enemy[i].x<player.x && enemy[i].x + 50 > player.x)) {
			if ((enemy[i].y>player.y && enemy[i].y<player.y + 50)||(enemy[i].y<player.y && enemy[i].y + 50 > player.y)) {
				return true;
			}
		}
	}
	return false;
}


function enemy_collision(enemy){
	for (var i = 0; i < 5; i++) {
		for (var j = 0; i < 5; j++) {
			if ((enemy[i].x>enemy[j].x && enemy[i].x<enemy[j].x + 50)||(enemy[i].x<enemy[j].x && enemy[i].x + 50 > enemy[j].x)) {
				if ((enemy[i].y>enemy[j].y && enemy[i].y<enemy[j].y + 50)||(enemy[i].y<enemy[j].y && enemy[i].y + 50 > enemy[j].y)) {
					enemy[i].y = 0;
					enemy[i].x= Math.random()*550;	
				}
			}
		}
	}
}


function update() {
	drawRect(player.x,player.y,player.width,player.height,player.color);

	if (d == "LEFT" && player.x>0) {
		player.x -=25;
		d = null;
	}
	else if (d=="RIGHT" && player.x<550) {
		player.x += 25;
		d = null;
	}

	for (var i = 0; i <5; i++) {
		if (enemy[i].y>=400) {
			enemy[i].y = -i*50;
			enemy[i].x= Math.random()*550;
			score +=1;
			speed +=0.2;

		}
		else{
			enemy[i].y +=speed;
		}
	}
	drawRect(0,0,600,400,"blue");
	drawRect(player.x,player.y,player.width,player.height,player.color);
	for(var i = 0; i<5; i++){
		drawRect(enemy[i].x,enemy[i].y,enemy[i].width,enemy[i].height,enemy[i].color);
	}
	if(collision(player,enemy)){
		clearInterval(x);
		text1 = "GAME OVER ";
		text2 = "score:- " + score;
		ctx.fillStyle = "black";
		ctx.font = "45px Changa one";
		ctx.fillText(text1,150,170);
		ctx.fillText(text2,200,225);
	}
}
