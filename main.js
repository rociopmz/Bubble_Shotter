var canvas = document.getElementById ("canvas");
var ctx = canvas.getContext("2d");

var colors = ["#327DE5", "#F5F61B", "#F63C1B", "#3EC964", "#7844C5"];
var interval;
var frames = 0;
var bubbles = [];
var superBubble = [];

//instances

//Colored Canvas
//ctx.fillStyle = "#B2EBF2";
//ctx.fillRect(0, 0, 450, 540);


//classes 
class Bubble {
    constructor(color="red", x=20, y=20, sb) {
        this.color = color
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.draw();
        this.direction = "left";
        this.sb = sb || false;
        this.moving = false;
    }

    collision(item){
        /* first we get the x and y distance between the two circles. */
        let distance_x = item.x      - this.x;
        let distance_y = item.y      - this.y;
        /* Then we get the sum of their radii. */
        let radii_sum  = item.radius + this.radius;
        /* Then we test to see if the square of their distance is greater than the
        square of their radii. If it is, then there is no collision. If it isn't,
        then we have a collision. */
        if (distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) return true;
        return false;
    }

    draw () {        
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x,this.y, this.radius, 0, 2*Math.PI)
        ctx.fill()
        ctx.closePath()
        if(!this.sb) this.y+= .2
        if(this.sb){
            this.direction === "right" ? this.x += 5 : this.x -= 5;
            if(this.x  < this.radius && this.direction === "left"){
                this.direction = "right"
            }else if(this.x > canvas.width-this.radius && this.direction === "right"){
                this.direction = "left"
            }

            
            // if(this.x < canvas.width - this.radius){
            //     this.direction = "left";
            // }
        }
        if(this.moving) this.y -= 5;
       
        
        //console.log("??")
    }
}

// Bliss was here

// main function
function start(){
    interval = setInterval(update, 1000/60)
}

function update(){
    // borrar
    ctx.clearRect(0,0,canvas.width, canvas.height)
    //dibujar
    drawBubbles()
    // crear
    generateBubbles()
    generateSuperBubble();
    frames ++
    //buble1.draw()
    
}

function gameOver(){
    clearInterval(interval);
}

// aux functions
function generateBubbles(){
    if(frames%200==0){
        for(var i=0;i<11;i++){
            let index = Math.floor(Math.random()*colors.length)
            let b = new Bubble(colors[index], (40*i)+25)
            bubbles.push(b)        
        }
    }
}

function generateSuperBubble(){
    if(superBubble.length > 0) return;
    let color = colors[Math.floor(Math.random()*colors.length)];
    let s = new Bubble(color, 225, 515, true);
    superBubble.push(s);
}


function drawBubbles(){
    bubbles.forEach((b,i)=>{
        b.draw()
        if (b.y > 490 - b.radius) gameOver()
        if(b.collision(superBubble[0])) {
            superBubble[0].moving = false;
            if(superBubble[0].color === b.color){
                bubbles.splice(i,1)
                superBubble.splice(0,1)
                generateSuperBubble();
            }else{
                let bu = superBubble.splice(0,1)[0]
                bubbles.push(bu)
                generateSuperBubble();
            }
           
        }
    })
    superBubble.forEach(sb => sb.draw());
}

//listeners
addEventListener("keydown", (e)=>{
    if(e.keyCode === 32){
        superBubble[0].moving = true;
        superBubble[0].sb = false
    }
})

// start everything
start();


