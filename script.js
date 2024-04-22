let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

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
            if (fields[index] === 'circle') {
                cell.textContent = 'o';
            } else if (fields[index] === 'cross') {
                cell.textContent = 'x';
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.innerHTML = '';
    container.appendChild(table);
}