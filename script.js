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

init();




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

