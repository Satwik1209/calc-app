// Get all form and result elements
const rotationForm = document.getElementById('End-rotation');
const kickForm = document.getElementById('End-kick');
const calculateEButton = document.getElementById('calculateE');

const endRotationResultElement = document.getElementById('result');
const endKickResultElement = document.getElementById('result2');
const highEndElement = document.getElementById('high_end');
const lowEndElement = document.getElementById('low_end');
const pElement = document.getElementById('p');
const eValueElement = document.getElementById('eValue');
const resultsTableBody = document.querySelector('#resultsTable tbody');

let p = null; // Store the value of p globally

// End Rotation Calculation
rotationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const deflection = parseFloat(document.getElementById('deflection').value);
    const depth = parseFloat(document.getElementById('depth').value);
    const span = parseFloat(document.getElementById('span').value);

    if (isNaN(deflection) || isNaN(depth) || isNaN(span)) {
        endRotationResultElement.textContent = 'Please provide valid numbers.';
        return;
    }

    // Calculate End Rotation
    const endRotation = 4 * deflection * (depth / span);
    p = (span / 2) ** 2 / deflection; // Store p globally

    // Display result
    endRotationResultElement.textContent = `End Rotation: ${endRotation.toFixed(4)}'`;
    pElement.textContent = `p = ${p.toFixed(5)}`;
});

// End Kick Calculation
kickForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const higher = parseFloat(document.getElementById('higher').value);
    const lower = parseFloat(document.getElementById('lower').value);
    const depth = parseFloat(document.getElementById('depth').value);
    const span = parseFloat(document.getElementById('span').value);
    const deflection = parseFloat(document.getElementById('deflection').value);

    if (isNaN(higher) || isNaN(lower) || isNaN(span) || isNaN(depth) || isNaN(deflection)) {
        endKickResultElement.textContent = 'Please provide valid numbers.';
        return;
    }

    // Recalculate End Rotation
    const endRotation = 4 * deflection * (depth / span);
    const gradeTan = (higher - lower) / span;
    const endKick = gradeTan * depth;
    const highEnd = endRotation + endKick;
    const lowEnd = endRotation - endKick;

    // Display results
    endKickResultElement.textContent = `End Kick: ${endKick.toFixed(4)}`;
    highEndElement.textContent = `High End: ${highEnd.toFixed(4)}`;
    lowEndElement.textContent = `Low End: ${lowEnd.toFixed(4)}`;
});

// Calculate E and update table
calculateEButton.addEventListener('click', () => {
    const deflection = parseFloat(document.getElementById('deflection').value);
    const depth = parseFloat(document.getElementById('depth').value);
    const distance = parseFloat(document.getElementById('distance').value);

    if (isNaN(deflection) || isNaN(depth) || isNaN(distance) || p === null) {
        alert('Please provide valid numbers and calculate End Rotation first.');
        return;
    }

    // Calculate x and E
    const x = (distance * distance) / p;
    const E = (4 * x * depth) / (2 * distance);

    // Display E
    eValueElement.textContent = `E = ${E.toFixed(5)}`;
    eValueElement.style.display = 'block'; // Show the E value

    // Add a new row to the table
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${distance.toFixed(5)}</td>
        <td>${x.toFixed(5)}</td>
        <td>${E.toFixed(5)}</td>
    `;
    resultsTableBody.appendChild(newRow);
});

// Clear E value if input fields change
document.getElementById('deflection').addEventListener('input', () => {
    eValueElement.style.display = 'none'; // Hide E value
});

document.getElementById('depth').addEventListener('input', () => {
    eValueElement.style.display = 'none'; // Hide E value
});

document.getElementById('distance').addEventListener('input', () => {
    eValueElement.style.display = 'none'; // Hide E value
});
