const marqueeContainer = document.querySelector('.marquee-container');
const marqueeTrack = document.querySelector('.marquee-track');

let isDragging = false;
let startX, endX;
let direction = 'left-to-right'; // Default animation direction

// Start dragging
marqueeContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX; // Record the starting position of the mouse
    marqueeContainer.style.cursor = 'grabbing';
    // Remove the animation class temporarily
    marqueeTrack.classList.remove('left-to-right', 'right-to-left');
});

// Dragging
marqueeContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    // Update the mouse position as it moves
    endX = e.pageX;
});

// Stop dragging
marqueeContainer.addEventListener('mouseup', () => {
    if (!isDragging) return;

    // Check direction based on the difference between start and end position
    if (endX > startX) {
        direction = 'left-to-right';  // Dragged right
    } else if (endX < startX) {
        direction = 'right-to-left';  // Dragged left
    }

    // Apply the new animation class based on the direction
    if (direction === 'left-to-right') {
        marqueeTrack.classList.add('left-to-right');
    } else {
        marqueeTrack.classList.add('right-to-left');
    }

    // Reset dragging state and cursor
    isDragging = false;
    marqueeContainer.style.cursor = 'grab';
});

// Reset dragging on mouse leave
marqueeContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    marqueeContainer.style.cursor = 'grab';
});
