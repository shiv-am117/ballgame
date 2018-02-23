
var gamecanvas=document.getElementById('gc');
var ctx=gamecanvas.getContext("2d");
var h=gamecanvas.height;
var w=gamecanvas.width;
/*ctx.strokeStyle ='red';
ctx.strokeRect(10,10,100,100);//for outer rect shape

ctx.fillStyle='blue';
ctx.fillRect(w/2,h/2,100,100);//for filled rect*/




document.addEventListener("keydown",down); //keypressed
document.addEventListener("keyup",up); //key not pressedlifes.innerText =life;
$("#lifetext").html("LIFES="+life);
 var bsx;
 var bsy;
 var life;
 var life2;


function begin(){
	life2=2;
 life=2;
  $("#lifetext").html("LIFES="+2);
 $("#lifetext2").html("LIFES="+2);
}
begin();
function init(){
 bx=w/2;
 by=h/2;
 rad=10;
 speedx=1.5;
 speedy=1.5;
 px=0;
 py=h/2-50;
 pw=10;
 ph=100;
 pause=-1;
 pspeed=5;
state=-1;
 moveDown =false;
 moveUp =false;
 px2=w-10;
py2=h/2-50;
pw2=10;
 ph2=100;
 moveDown2 =false;
 moveUp2 =false;
 
 $("#lifetext").html("LIFES="+life);
 $("#lifetext2").html("LIFES="+life2);
 $("#end").html("");
 $("#PAUSE").html("");

}
init();
function allnew(){
 	begin();
 	init();
 }
function down(evt){ //keypressed
if(evt.keyCode==87) //up arrow key ascii
	moveUp=true;
if(evt.keyCode==83) //down arrow key ascii
	moveDown=true;
if(evt.keyCode==32)
	fpause();
if(evt.keyCode==13){
	init(); begin();
}
if(evt.keyCode==38)
	moveUp2=true;
if(evt.keyCode==40) 
	moveDown2=true;
}

function up(evt){
	if(evt.keyCode==87) //up arrow key ascii
	moveUp=false;
if(evt.keyCode==83) //down arrow key ascii
	moveDown=false;
if(evt.keyCode==38) //up arrow key ascii
	moveUp2=false;
if(evt.keyCode==40) //down arrow key ascii
	moveDown2=false;
}

function draw(){
ctx.clearRect(0,0,w,h); //from*2,end*2
ctx.fillStyle='green';
ctx.beginPath();
ctx.arc(bx,by,rad,0,(Math.PI)*2,false); //pos*2,radius, starting angle of arc,angle,clockwise=false
ctx.fill();
ctx.closePath();
ctx.fillStyle='red';
ctx.fillRect(px,py,pw,ph); 
ctx.fillStyle='purple';
ctx.fillRect(px2,py2,pw2,ph2);//coord ;x,y(initials),w,h
}

function fpause(){
	pause=pause*state;
	if(pause==1){bsx=speedx; bsy=speedy; speedx=0; speedy=0; pspeed=0; $("#PAUSE").html("PAUSED");}
	if(pause==-1) {speedx=bsx;speedy=bsy;pspeed=3;$("#PAUSE").html("");}

}

function ballMove(){
	
	bx=bx+speedx;
	by=by+speedy;
	if((bx+rad>=px2)&&(by>=py2&&by<=py2+ph2)){
		if(speedx<=5.5){speedx=speedx+0.25;
		if(speedy<0) speedy=speedy-0.25;
		if(speedy>0) speedy=speedy+0.25;
		}
		speedx=-speedx;

		
	}
	if(by+rad>=h||by-rad<=0){
		speedy=-speedy;
		
	}
	if((bx-rad<=px+pw) && (by>=py&&by<=py+ph)){
		speedx *= -1;
		
	}
	

	if(bx<=0){
		if(life==0){
			$("#end").html("GAME OVER!!!!!<br>Player 2 wins");
			speedx=0;
			
			speedy=0;
			state=1;
			ctx.clearRect(0,0,w,h);			
		}
		if(life>0){
			init();
			
		life--;
		bx=w/2;
		by=h/2;
		$("#lifetext").html("LIFES="+life);
		}
	}

	if(bx>=w){
		if(life2==0){
			$("#end").html("GAME OVER!!!!!<br>Player 1 wins");
			speedx=0;
			
			speedy=0;
			state=1;
			ctx.clearRect(0,0,w,h);			
		}
		if(life2>0){
			init(); 
		life2--;
		bx=w/2;
		by=h/2;
		$("#lifetext2").html("LIFES="+life2);
		}
	}
}

function movePaddle(){
	if(moveUp==true && py>0)
		py -= pspeed;
	if(moveDown==true && py+ph<h)
		py=py+pspeed;
	if(moveUp2==true && py2>0)
		py2 -= pspeed;
	if(moveDown2==true && py2+ph2<h)
		py2=py2+pspeed;
}

function update(){
	draw();
	ballMove();
	movePaddle();
}
var t=0.01;
if(life>=0)
setInterval(update,t);//fn,time
