console.log("hello world");

let x = 200;
let y = 200;
let s = 50;
let kefart=false;
let uppres;
let downpres;
let leftpres;
let rightpres;
let farts=[];
let farttimer=-1;
let health=5;
let e;
window.onload=function() {
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
//draw everything
function draw() {
    clrSC();
    drawKumo();
    inputs();
    boundaries();
    makeCarlos();
}
//aka the character you play as (kumo is a real dog though)
function drawKumo() {
    //kumo facing forwards when he doesn't fart
    if(farttimer<=0) {
        kumoBody();
        kumoEye();}
    //fart
    if(farttimer>0) {
        reversedKumo();
        revKumoEye();
    }
    //make kumo go back to normal
    farttimer-=0.1;
    
    
    console.log("x: "+x+" y: "+y)
}
//idk how to really do this so i just made a new function to change colors
function kumoEye() {
    ctx.beginPath();
    //eye (because kumos sideways)
    ctx.fillStyle="black";
    ctx.rect(x+57,y+-13,s-43,s-43);
    ctx.fill();
}
//kumo
function kumoBody() {
    ctx.fillStyle = "brown";
    ctx.beginPath();
    //body
    ctx.rect(x,y,s,s);
    //head
    ctx.rect(x+30,y+-20,s-10,s-18);
    //left leg
    ctx.rect(x+-7,y+35,s-30,s-5);
    //right leg
    ctx.rect(x+35,y+35,s-30,s-5);
    //left ear
    ctx.rect(x+30,y+-30,s-35,s-30);
    //right ear
    ctx.rect(x+52,y+-30,s-35,s-30);
    //tail
    ctx.rect(x+-25,y+5,s-20,s-35);
    ctx.fill();
}
//kumo but reversed
function reversedKumo() {
    ctx.fillStyle = "brown";
    ctx.beginPath();
    //body
    ctx.rect(x,y,s,s);
    //head
    ctx.rect(x+-23,y+-20,s-10,s-18);
    //left leg
    ctx.rect(x+-7,y+35,s-30,s-5);
    //right leg
    ctx.rect(x+35,y+35,s-30,s-5);
    //left ear
    ctx.rect(x-20,y+-30,s-35,s-30);
    //right ear
    ctx.rect(x+2,y+-30,s-35,s-30);
    //tail
    ctx.rect(x+43,y+5,s-20,s-35);
    ctx.fill();
}
//kumo's other eye
function revKumoEye() {
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.rect(x+-14,y+-13,s-43,s-43);
    ctx.fill();
}
//enemy of miso (<----irl | but in the game its kumo instead)
let carlos=[];//him name carlo also not carlos (just mean multiple carlo(s))
function newCarlo(x,y) {
    this.x=x;
    this.y=y;
    this.s=s*(1/2);
    this.hp=5;
    this.fartt=0;
    this.display=function() {
        ctx.fillStyle="white";
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.s,this.s);
        ctx.fill();
    };
}
function makeCarlos() {
    carlos.push(new newCarlo(1700,200));
    for(var i=carlos.length-1;i>=0;i++) {
        var carlo=carlos[i];
        carlo.display();
        for(var l=0;farts.length;l++) {
            var fart=farts[l];
            if(fart.collide(carlo.x,carlo.y,carlo.s,carlo.s)) {
                if(fart.side=="good") {
                carlo.hp--;
                farts.splice(l,1);}
            }
        }
        farts.push(new fartObj(carlo.x-carlo.s,carlo.y,-6,"bad"))
        carlo.fartt=3;
    }
}
function fartObj(x,y,direct,side) {
    this.x=x;
    this.y=y;
    this.s=s/2;
    this.side=side;
    this.display=function() {
        ctx.fillStyle="green";
        ctx.beginPath();
        ctx.rect(this.x+(s*1.5),this.y,this.s,this.s);
        ctx.fill();
        this.x+=direct;
        if(this.side=="bad") {
            if(this.collide(x,y,s,s)) {
                health--;
                for(var i=0;fart.length;i++) {
                    farts.splice(i,1);
                }
            }
        }
    }
    this.collide=function(x1,y1,w1,h1) {
        return collide(this.x,this.y,this.s,this.s,x1,y1,w1,h1);
    }
}
function collide(x1,y1,w1,h1,x2,y2,w2,h2) {
    return(x1>x2+w2&&
           x1+w1<x2&&
           y1>y2+h2&&
           y1+h1<y2);}
function clrSC() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function inputs() {
    if(uppres) {
        y=y-5;}
    if(downpres) {
        y=y+5;}
    if(leftpres) {
        x=x-5;}
    if(rightpres) {
        x=x+5;}
    if(kefart) {
        farttimer=3;
        farts.push(new fartObj(x,y,3,"good"));
        kefart=false;
    }
    for(var i=0; farts.length;i++) {
        var fart=farts[i];
        fart.display();
        if(fart.x>canvas.width||fart.x<0) {
            farts.splice(i,1);
        }
    }
    for(var i=0; farts2.length;i++) {
        var fart2=farts2[i]
        fart2.display();
        if(fart2.x>canvas.width||fart2.x<0) {
            farts2.splice(i,1);
        }
    }
}

    document.body.addEventListener("keydown",keyDown);
    document.body.addEventListener("keyup",keyUp);
    document.body.addEventListener("keyleft",keyLeft);
    document.body.addEventListener("keyright",keyRight);
    document.body.addEventListener("keydown",keyFART);
    document.body.addEventListener("keydown",keySAY);
    document.body.addEventListener("keydown",SUMMON);

    function SUMMON(event) {
        if(event.keyCode==65) {e=true;}else{e=false;}
    }

    function keySAY(event)  {
        console.log(event.keyCode);
        console.log(e);
    }

    function keyFART(event) {
        if(event.keyCode==16) {kefart=true;}
        if (event.keyCode!=16) {kefart=false;}
    }
    function keyDown(event) {
        if(event.keyCode==40) {
            downpres=true;
        }
        if(event.keyCode==38) {
            uppres=true;
        }
        if(event.keyCode==37) {
            leftpres=true;
        }if(event.keyCode==39) {
            rightpres=true;
        }
    }
    function keyUp(event) {
        if(event.keyCode==38) {
            uppres=false;
        }
        if(event.keyCode==39) {
            rightpres=false;
        }
        if(event.keyCode==37) {
            leftpres=false;}
        if(event.keyCode==40) {
           downpres=false;
        }
    }
    function keyLeft(event) {
        if(event.keyCode==37) {
            leftpres=true;}
        if(event.keyCode==39) {
            rightpres=true;}
        if(event.keyCode==38) {
            uppres=true;}
        if(event.keyCode==40) {
            downpres=true;}
    }
    function keyRight(event) {
        if(event.keyCode==39) {
            rightpres=true;}
        if(event.keyCode==37) {
            leftpres=true;}
        if(event.keyCode==38) {
            uppres=true;}
        if(event.keyCode==40) {
            downpres=true;
        }
    }
    //boundaries stops working when farts are on screen
    function boundaries() {
        if(y<canvas.height-canvas.height) {
            y=canvas.height-canvas.height;}
        if(y>canvas.height-s-24) {
            y=canvas.height-s-24;}
        if(x<canvas.width-canvas.width) {
            x=canvas.width-canvas.width;}
        if(x>canvas.width-s) {
            x=canvas.width-s;}
    }











setInterval(draw, 1000/60)

}