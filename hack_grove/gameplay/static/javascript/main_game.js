var NO_OF_PLAYERS = 8;

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var canvas_padding = 10;

var directionDriving = "CENTER";

var players = [];

var keyPlayerHeight;

console.log(screen_width);
setup();
main();


function setup()
{
    console.log("start setup");
    canvas.width =  screen_width - canvas_padding;
    canvas.height = screen_height - canvas_padding;
    document.body.style.backgroundColor = "black";
    document.body.appendChild(canvas);

    keyPlayerHeight = canvas.height * 0.90;

    for(var i = 0; i < NO_OF_PLAYERS; i+=1)
    {
        players.push( {x:(canvas.width * 0.25 + (canvas.width * i / 2) / NO_OF_PLAYERS), y:(keyPlayerHeight), speed:0 } );
    }
    for(var i = 1; i < NO_OF_PLAYERS; i+=1)
    {
        players[i].y -= i * canvas.height * 0.10;
    }
}

function drawBG()
{
    ctx.fillStyle = "rgba(0,25,250,1)";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,255,10,1)";
    ctx.fillRect(0,canvas.height*0.25, canvas.width, canvas.height);
}

function drawPlayer()
{
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(players[0].x,keyPlayerHeight, 50, 50);
    for(var i = 1; i < NO_OF_PLAYERS; i+=1)
    {
        if(players[i].y < players[0].y)
        {
            ctx.fillRect(players[i].x,players[i].y, 50, 50);
        }
    }
}

function updateHorizontalDirections()
{
    if(directionDriving == "LEFT")
        players[0].x -= 1;
    else if(directionDriving == "RIGHT")
        players[0].x += 1;
}

function main()
{
    drawBG();
    drawPlayer();
    updateHorizontalDirections();
    requestAnimationFrame(main);
}

document.getElementById("lr_action").onchange = function()
{
    directionDriving = document.getElementById("lr_action").value;
    console.log("lr_action was changed to " + directionDriving);
};