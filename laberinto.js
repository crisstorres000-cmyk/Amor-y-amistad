const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

const tileSize = 40;
const player = { x: 1, y: 1 };
const goal = { x: 13, y: 13 };

// 1 = Pared, 0 = Camino
const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,1,0,1,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,0,1,0,1,1,1,1,1,1],
    [1,1,1,0,0,0,0,1,0,0,0,0,1,0,1],
    [1,1,1,1,1,1,0,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,1,1,1,0,0,0,1],
    [1,0,1,1,0,1,0,0,0,0,1,0,1,1,1],
    [1,0,1,1,0,1,1,1,1,0,1,0,1,1,1],
    [1,1,1,1,0,0,0,0,1,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,0,1,1,1],
    [1,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar mapa
    for(let y=0; y<map.length; y++) {
        for(let x=0; x<map[y].length; x++) {
            if(map[y][x] === 1) {
                ctx.fillStyle = "#ff477e";
                ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
            }
        }
    }

    // Dibujar meta
    ctx.fillStyle = "purple";
    ctx.fillRect(goal.x*tileSize, goal.y*tileSize, tileSize, tileSize);

    // Dibujar jugador
    ctx.fillStyle = "pink";
    ctx.fillRect(player.x*tileSize + 5, player.y*tileSize + 5, tileSize - 10, tileSize - 10);
}

window.addEventListener('keydown', (e) => {
    let nextX = player.x;
    let nextY = player.y;

    if(e.key === "ArrowUp") nextY--;
    if(e.key === "ArrowDown") nextY++;
    if(e.key === "ArrowLeft") nextX--;
    if(e.key === "ArrowRight") nextX++;

    // Verificar si el siguiente paso es un camino (0)
    if(map[nextY] && map[nextY][nextX] === 0) {
        player.x = nextX;
        player.y = nextY;
    }

    draw();

    // Condición de victoria
    if(player.x === goal.x && player.y === goal.y) {
        setTimeout(() => { 
            alert("🟥: ¡Gracias!, he encontrado el amor "); 
            player.x = 1; 
            player.y = 1; 
            draw(); 
        }, 100);
    }
});

// Dibujo inicial
draw();