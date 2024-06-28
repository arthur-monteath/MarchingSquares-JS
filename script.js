let canvas = document.getElementById("screen");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

let res = 15;
let cols, rows;
let field;
let brushRadius = 50;

function addRadius(amount)
{
    brushRadius += amount;

    document.getElementById("brushRadiusLabel").value = brushRadius/10;

    drawCanvas();
    drawCircle(lastMousePos, brushRadius);
}

document.getElementById("brushRadiusLabel").addEventListener('input', function (evt) {
    brushRadius = parseFloat(this.value*10);

    drawCanvas();
    drawCircle(lastMousePos, brushRadius);
});

function addResolution(amount)
{
    res += amount;

    document.getElementById("resolutionLabel").value = res;

    initializeField();
}

document.getElementById("resolutionLabel").addEventListener('input', function (evt) {
    res = parseInt(this.value);

    initializeField();
});

function initializeField()
{
    cols = canvas.width/res;
    rows = canvas.height/res + 1;

    field = [];
    for (let i = 0; i < cols; i++) {
        field[i] = [];
    }

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++)
        {
            field[i][j] = Math.floor(Math.random() * 2);
        }
    }

    drawCanvas();
}

function drawCanvas()
{
    ctx.fillStyle = "LightSteelBlue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++)
        {
            val = field[i][j] * 255;
            ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
            drawPoint(i*res, j*res);
        }
    }

    ctx.strokeStyle = `black`;
    
    for(let i = 0; i < cols-1; i++) {
        for(let j = 0; j < rows-1; j++)
        {
            x = i * res;
            y = j * res;
    
            a = [x + res*0.5, y];
            b = [x + res, y + res*0.5];
            c = [x + res*0.5, y + res];
            d = [x, y + res*0.5];
    
            state = getState(
                field[i][j],
                field[i+1][j],
                field[i+1][j+1],
                field[i][j+1],
            );
    
            switch(state)
            {
                case 1:
                    drawLine(c,d);
                    break;
                case 2:
                    drawLine(b,c);
                    break;
                case 3:
                    drawLine(b,d);
                    break;
                case 4:
                    drawLine(a,b);
                    break;
                case 5:
                    drawLine(a,d);
                    drawLine(b,c);
                    break;
                case 6:
                    drawLine(a,c);
                    break;
                case 7:
                    drawLine(a,d);
                    break;
                case 8:
                    drawLine(a,d);
                    break;
                case 9:
                    drawLine(a,c);
                    break;
                case 10:
                    drawLine(a,b);
                    drawLine(c,d);
                    break;
                case 11:
                    drawLine(a,b);
                    break;
                case 12:
                    drawLine(b,d);
                    break;
                case 13:
                    drawLine(b,c);
                    break;
                case 14:
                    drawLine(c,d);
                    break;
            }
        }
    }
}

function getState(a,b,c,d)
{
    return a*8 + b*4 + c*2 + d;
}

function drawPoint(x, y, radius = res*0.1) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawCircle(pos, radius)
{
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, true);
    ctx.stroke();
}

function drawLine(posFrom, posTo)
{
    ctx.beginPath();
    ctx.moveTo(posFrom[0], posFrom[1]);
    ctx.lineTo(posTo[0], posTo[1]);
    ctx.stroke();
}

let lastMousePos;
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    lastMousePos = {x: evt.clientX - rect.left, y: evt.clientY - rect.top}
    return lastMousePos;
}

let isDrawing = false;
let isErasing = false;

canvas.addEventListener('mousedown', function(evt) {

    let pos = getMousePos(canvas, evt);

    if (evt.button === 0) { // Left mouse button
        isDrawing = true;
        setArea(pos, brushRadius, 0); // Set to black
    } else if (evt.button === 2) { // Right mouse button
        isErasing = true;
        setArea(pos, brushRadius, 1); // Set to white
    }
    
    drawCanvas();
});

canvas.addEventListener('mouseup', function(evt) {
    isDrawing = false;
    isErasing = false;
});

canvas.addEventListener('mousemove', function(evt) {
    
    let pos = getMousePos(canvas, evt);

    if (isDrawing || isErasing) {
        if (isDrawing) {
            setArea(pos, brushRadius, 0); // Set to black
        } else if (isErasing) {
            setArea(pos, brushRadius, 1); // Set to white
        }
    }

    drawCanvas();

    ctx.fillStyle = 'red';
    drawCircle(pos, brushRadius);
});

canvas.addEventListener('contextmenu', function(evt) {
    evt.preventDefault();
});

function setArea(pos, radius, val)
{
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            let distance = Math.sqrt((i * res - pos.x) ** 2 + (j * res - pos.y) ** 2);
            
            if (distance <= radius) {
                field[i][j] = val;
            }
        }
    }
}

initializeField();