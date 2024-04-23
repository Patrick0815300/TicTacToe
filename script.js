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
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="50%" x2="50%" y2="50%" stroke="white" stroke-width="4" />
        </svg>
    `;

    const lineElement = document.createElement('div');
    lineElement.innerHTML = svg;
    lineElement.style.position = 'absolute';

    // Positionierung der Linie basierend auf den Positionen der Zellen
    lineElement.style.left = (cellA.offsetLeft + cellB.offsetLeft + cellC.offsetLeft) / 3 + 'px';
    lineElement.style.top = (cellA.offsetTop + cellB.offsetTop + cellC.offsetTop) / 3 + 'px';

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
