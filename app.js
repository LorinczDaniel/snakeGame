
let xv=yv=0;


let canv = document.getElementById("mainCan");
let ctx = canv.getContext("2d");
let state = initialState();

let ax = Math.floor(Math.random() *  canv.width); 
let ay = Math.floor(Math.random() *  canv.height);


let px = [];
let py = [];

px[0] = (canv.width/2);
py[0] = (canv.height/2);

function initialState(){
    let state = {snakeWidth: 0, snakeHeight: 0};
    state.snakeWidth = ctx.canvas.clientWidth/50;
    state.snakeHeight = ctx.canvas.clientHeight/50;

    return state;

}



window.onload = function(){
    
    
    document.addEventListener("keydown", keyPush);
    calculateAppl();
    setInterval(update, 2000/15);
    setInterval(draw, 2000/15);
}


function keyPush(evt){
    switch(evt.keyCode){
        case 37:
            xv=-1;yv=0;
            break;
        case 38:
            xv=0;yv=-1;
            break;
        case 39:
            xv=1;yv=0;
            break;
        case 40:
            xv=0;yv=1;
            break;
    }

}

function draw(){

    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, canv.height, canv.width);

    ctx.fillStyle = 'red';
    ctx.fillRect(ax, ay, state.snakeHeight, state.snakeWidth);

    for(let i = 0; i < px.length; i++){
        ctx.fillStyle = 'rgb(50, 200, 0)';
        ctx.fillRect(px[i], py[i], state.snakeHeight, state.snakeWidth);
    }
}

function calculateAppl(){

    ax = Math.floor(Math.random() *  canv.width); 
    ay = Math.floor(Math.random() *  canv.height);

    let distX = Math.abs(px[0]-ax);
    let distY = Math.abs(py[0]-ay);
    
    distX = Math.floor(distX/state.snakeWidth);
    distY = Math.floor(distY/state.snakeHeight);
    
    ax =  state.snakeWidth*distX;
    ay =  state.snakeHeight*distY;    
}

function update(){

    let tempx = px.slice(0);
    let tempy = py.slice(0);

  
    if((px[0] === ax) && (py[0] === ay)){
        
        px.unshift(px[0] + xv*state.snakeWidth);
        py.unshift(py[0] + yv*state.snakeHeight);
        tempx = px.slice(0);
        tempy = py.slice(0);
        console.log(px)

        calculateAppl();    
    }

    px[0] += xv*state.snakeWidth;
    py[0] += yv*state.snakeHeight;

    for(let i=1; i<px.length; i++){   
        px[i] = tempx[i-1];
        py[i] = tempy[i-1];
     }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}