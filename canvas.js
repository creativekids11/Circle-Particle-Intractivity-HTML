var canvas=document.querySelector("canvas")
var c=canvas.getContext("2d")



mouse={
    x: undefined,
    y: undefined
}

colorArray=[
    '#2E333D',
    '#07AED7',
    '#F58167',
    '#FB404D',
    '#F3F5F1'
]

window.addEventListener('mousemove',function(event) {
    mouse.x=event.x
    mouse.y=event.y
})

addEventListener('resize',function() {
    init();
})

var circleArray=[]

function init() {
    circleArray=[];
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    for (var index = 0; index < 1900; index++) {
        var x=Math.random()*innerWidth;
        var y=Math.random()*innerHeight;
        var dx=Math.random()-0.5*2; //-0.5*2
        var dy=Math.random()-0.5*2; //-0.5*2
        var radius=Math.random()*4+3; //*4+3
        circleArray.push(new Circle(x,y,dx,dy,radius,2,40))
        
    }
}

init();

function Circle(x,y,dx,dy,radius,minRadius,maxRadius) {
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=minRadius;
    this.maxRadius=maxRadius;
    this.color=colorArray[Math.floor(Math.random()*colorArray.length)];

    this.draw=function() {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle=this.color;
        c.fillStyle=this.color;
        c.fill();
        c.stroke();
    }

    this.update=function() {
        if (this.x+this.radius>innerWidth-20 || this.x-this.radius<0) {
            this.dx=-this.dx;
        }
    
        if (this.y+this.radius>innerHeight-20 || this.y-this.radius<0) {
            this.dy=-this.dy;
        }
    
        this.x+=this.dx;
        this.y+=this.dy;

        if (mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50) {
            if (this.radius<this.maxRadius) {
                this.radius+=1;
            }
        } else if (this.radius>this.minRadius) {
            this.radius-=1;
        }

        this.draw();
    }
}




function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight)
    
    for (var index = 0; index < circleArray.length; index++) {
        circleArray[index].update()
    }
}

animate();
