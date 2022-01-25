var canvas=document.querySelector('canvas');
var c=canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;

var mouse={
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x=event.x;
        mouse.y=event.y;
    })

var colorArray=[
    '#2E333D',
    '#07AED7',
    '#F58167',
    '#FB404D',
    '#F3F5F1'
]

function Circle(x,y,dx,dy,radius,maxRadius,minRadius) {
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=colorArray[Math.floor(Math.random()*colorArray.length)]

    this.draw=function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle=this.color;
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
    }

    this.update=function() {
        if (this.x+this.radius>innerWidth-20 || this.x-this.radius<0) {
            this.dx=-this.dx
        }
    
        if (this.y+this.radius>innerHeight-20 || this.y-this.radius<0) {
            this.dy=-this.dy
        }
    
        this.x+=this.dx;
        this.y+=this.dy;

        if (mouse.x - this.x < 50 && mouse.x-this.x>-50 && mouse.y - this.y < 50 && mouse.y-this.y>-50) {
            if (this.radius<maxRadius) {
                this.radius+=1;
            }
        } else if (this.radius>minRadius) {
            this.radius-=1;
        }

        this.draw();
    }
}

var circleArray=[];
for (let index = 0; index < 1000; index++) {
    var x=Math.random()*innerWidth-20;
    var y=Math.random()*innerHeight-20;
    var dx=Math.random()-0.5*2;
    var dy=Math.random()-0.5*2;
    var radius=Math.random()*4+3;
    circleArray.push(new Circle(x,y,dx,dy,radius,40,2));
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for (var index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }    
}

animate();
