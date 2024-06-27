let canvas = document.getElementById("screen");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

ctx.fillStyle = "LightSteelBlue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const res = 20;
let cols, rows;

cols = canvas.width/res;
rows = canvas.height/res + 1;

let field = [];
for (let i = 0; i < cols; i++) {
    field[i] = [];
}

for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++)
    {
        field[i][j] = Math.floor(Math.random() * 2);
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

function getState(a,b,c,d)
{
    return a*8 + b*4 + c*2 + d;
}

function drawPoint(x, y) {
    const radius = res*0.1; // Radius of the point (small circle)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawLine(posFrom, posTo)
{
    ctx.beginPath();
    ctx.moveTo(posFrom[0], posFrom[1]);
    ctx.lineTo(posTo[0], posTo[1]);
    ctx.stroke();
}