let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

function init() {
    render();
}

function render() {
    const container = document.getElementById('container');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;
            if (!fields[index]) {
                cell.setAttribute('onclick', `placeMark(${index})`);
            }
            if (fields[index] === 'circle') {
                cell.innerHTML = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                cell.innerHTML = generateCrossSVG();
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    container.innerHTML = '';
    container.appendChild(table);
}

function placeMark(index) {
    const container = document.getElementById('container');
    const cell = container.querySelectorAll('td')[index];
    const currentPlayer = fields.filter(field => field !== null).length % 2 === 0 ? 'circle' : 'cross';

    if (currentPlayer === 'circle') {
        fields[index] = 'circle';
        cell.innerHTML = generateCircleSVG();
    } else if (currentPlayer === 'cross') {
        fields[index] = 'cross';
        cell.innerHTML = generateCrossSVG();
    }

    cell.removeAttribute('onclick');
}


function generateCircleSVG() {
    const color = 'rgb(0, 173, 239)';
    const width = 70;
    const height = 70;

    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 2}" fill="none" stroke="${color}" stroke-width="2">
                <animate attributeName="r" from="0" to="${width / 2 - 2}" dur="125ms" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svg;
}

function generateCrossSVG() {
    const color = 'rgb(255, 192, 0)';
    const width = 70;
    const height = 70;

    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <!-- Linie von links oben nach rechts unten -->
            <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="${color}" stroke-width="2">
                <animate attributeName="x2" from="0" to="${width}" dur="0.5s" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="0" to="${height}" dur="0.5s" begin="0s" fill="freeze" />
            </line>
            <!-- Linie von rechts oben nach links unten -->
            <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="${color}" stroke-width="2">
                <animate attributeName="x2" from="${width}" to="0" dur="0.5s" begin="0s" fill="freeze" />
                <animate attributeName="y2" from="0" to="${height}" dur="0.5s" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;
    return svg;
}

function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Linien
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Linien
        [0, 4, 8], [2, 4, 6] // Diagonale Linien
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { winner: fields[a], cells: combination };
        }
    }
    if (fields.every(field => field !== null)) {
        return { winner: 'draw' };
    }
    return null;
}

function drawWinningLine(cells) {
    const container = document.getElementById('container');
    const table = container.querySelector('table');

    const [a, b, c] = cells;
    const cellA = table.querySelectorAll('td')[a];
    const cellB = table.querySelectorAll('td')[b];
    const cellC = table.querySelectorAll('td')[c];

    const svg = `
        <svg width="${container.offsetWidth}" height="${container.offsetHeight}" xmlns="http://www.w3.org/2000/svg">
            <line x1="${cellA.offsetLeft + cellA.offsetWidth / 2}" y1="${cellA.offsetTop + cellA.offsetHeight / 2}" 
                  x2="${cellC.offsetLeft + cellC.offsetWidth / 2}" y2="${cellC.offsetTop + cellC.offsetHeight / 2}" 
                  stroke="white" stroke-width="4" />
        </svg>
    `;

    const lineElement = document.createElement('div');
    lineElement.innerHTML = svg;
    lineElement.style.position = 'absolute';
    lineElement.style.top = 50;
    lineElement.style.right = 0;

    container.appendChild(lineElement);
}


function placeMark(index) {
    const container = document.getElementById('container');
    const cell = container.querySelectorAll('td')[index];
    const currentPlayer = fields.filter(field => field !== null).length % 2 === 0 ? 'circle' : 'cross';

    if (!fields[index]) {
        if (currentPlayer === 'circle') {
            fields[index] = 'circle';
            cell.innerHTML = generateCircleSVG();
        } else if (currentPlayer === 'cross') {
            fields[index] = 'cross';
            cell.innerHTML = generateCrossSVG();
        }

        cell.removeAttribute('onclick');

        const gameStatus = checkGameStatus();
        if (gameStatus) {
            if (gameStatus.winner !== 'draw') {
                drawWinningLine(gameStatus.cells);
            }
            // Spiel endet hier
        }
    }
}

function restartGame() {
    // Setze das fields-Array zurück
    fields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    // Rendere das Spielbrett neu
    render();
}
