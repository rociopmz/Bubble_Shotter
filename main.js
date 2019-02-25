var canvas = document.getElementById ("canvas");
var ctx = canvas.getContext("2d");
var bluebubble = './images/bluebubble.png';
var yellowbubble = './images/yellowbubble.png'
var redbubble = './images/redbubble.png'
var interval;
var bubbleImages = [bluebubble, yellowbubble, redbubble];
var bubbleColors = [bluebubble, yellowbubble, redbubble];
var bubbles = []

//ctx.fillRect(0,0,40,40);
//var myImages =  [image1,image2,image3]
//var image = new Image();
// image.src = './images/bluebubble.png';

// image.onload = function(){
//     ctx.drawImage(image, 0,0,40,40);
// }


class Bubble {
    constructor(x, y, img, color) {
        this.color = color
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.image = new Image();
        //this.image.src = "./images/bluebubble.png";
        this.image.src = img 
        this.image.onload = ()=>{
           this.draw()            
        }
    }

    draw () {        
        ctx.drawImage (this.image, this.x, this.y, this.width, this.height) 
        //else ctx.fillRect( this.x, this.y, this.width, this.height)
        this.y +=40
    }
}

function update(){
    interval = setInterval(function(){
        generateBubbles()
        drawBubbles()
    }, 2000)
}



function generateBubbles(){
    
    for(var i=0;i<=7;i++){
        var randomNumber = Math.floor(Math.random()*bubbleImages.length)
        var img = bubbleImages[randomNumber]
        var color = bubbleColors[randomNumber]
        var x = 40*i+60
        var y = -40        
        var bubble = new Bubble(x, y, img, color)
        bubbles.push(bubble)
    }
}

function drawBubbles(){
    bubbles.forEach(function(b,idx){
        
        if(b.y>=400){
            console.log('ya se pasó')
            bubbles.splice(idx,1)
        }
        b.draw()
    })
}


update()

 
/*class Arrangebubbles{
    constructor(x, y, type, shift){
        this.x = x;
        this.y = y;
        this.width = 20
        this.height = 20
        this.image = new Image()
        this.image.src="./images/bluebubble.png"
    }
}

/*class Clearbubbles{
    constructor (){
        this.x = x;
        this.y = y;
        this.width = 20
        this.height = 20
    }
}*/


function setBubbles (){
    for (var i=0; i<16; i++) {
        bubbles[i]=[]
        for (var j=0; j<10; j++){
            bubbles[i][j] = new Bubble (i,j,0,0)
            
        }

        
    }
    console.log("setBubbles",bubbles)

}

function renderTiles() {
    // Top to bottom
    for (var j=0; j<10; j++) {
        for (var i=0; i<15; i++) {
            // Get the tile
            //var tile = tilearray[i][j];
 
            // Calculate the tile coordinates
            //var coord = getTileCoordinate(i, j);
 
            // Draw the tile
            newB.draw(20,30,0)
            ;
        }
    }
}


// setBubbles();
// renderTiles();