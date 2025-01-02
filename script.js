// Get the form and result elements
const form = document.getElementById('End-rotation');
const endRotation_resultElement = document.getElementById('result');

// Add an event listener to the form
form.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the input values
    var deflection = document.getElementById('deflection').value;
    var depth = document.getElementById('depth').value;
    var span = document.getElementById('span').value;

    // Calculate the end rotation
    const endRotation = 4 * deflection * (depth / span);

    // Display the result
    endRotation_resultElement.textContent = `End Rotation: ${endRotation.toFixed(5)}'`;
});

const form2 = document.getElementById('End-kick');
const endKick_resultElement = document.getElementById('result2');

form2.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the input values
    var higher = parseFloat(document.getElementById('higher').value);
    var lower = parseFloat(document.getElementById('lower').value);
    var span = parseFloat(document.getElementById('span').value);
    var depth = parseFloat(document.getElementById('depth').value);
    var deflection = parseFloat(document.getElementById('deflection').value);

    // Check for invalid input
    if (isNaN(higher) || isNaN(lower) || isNaN(span) || isNaN(depth) || isNaN(deflection)) {
        document.getElementById('result2').textContent = 'Please provide valid numbers.';
        return;
    }

    // Calculate endRotation
    const endRotation = 4 * deflection * (depth / span);

    // Calculate grade_tan and endKick
    var grade_tan = (higher - lower) / span;
    var endKick = grade_tan * depth;

    // Parse existing values (or initialize them)
    let a = endRotation;
    let b = endKick;

    // Calculate high_end and low_end
    let high_end = a + b;
    let low_end = a - b;

    // Display the results
    const endKick_resultElement = document.getElementById('result2');
    const highEndElement = document.getElementById('high_end'); // Select the element for High End
    const lowEndElement = document.getElementById('low_end');  // Select the element for Low End

    endKick_resultElement.textContent = `End Kick: ${endKick.toFixed(5)}`;
    highEndElement.textContent = `High End: ${high_end.toFixed(5)}`;
    lowEndElement.textContent = `Low End: ${low_end.toFixed(5)}`;
});
