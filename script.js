const stars = document.querySelectorAll(".star");
const ratingSystem = document.getElementById('ratingSystem');
const thankYouMessage = document.getElementById('thankYouMessage');
const errorMessage = document.getElementById('error-message');
const commentField = document.getElementById('comment');

let ratingValue = 0;

// Handle star rating
stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    const value = star.getAttribute("data-value");
    highlightStars(value);
  });

  star.addEventListener("mouseout", () => {
    highlightStars(ratingValue);
  });

  star.addEventListener("click", () => {
    ratingValue = star.getAttribute("data-value");
    document
      .querySelectorAll(".star")
      .forEach((s) => s.classList.remove("selected"));
    star.classList.add("selected");
    highlightStars(ratingValue);
  });
});

function highlightStars(value) {
  stars.forEach((star) => {
    star.classList.remove("hover");
    if (star.getAttribute("data-value") <= value) {
      star.classList.add("hover");
    }
  });
}

// Handle form submission
document.getElementById('ratingForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Check if rating and comment are provided
  if (ratingValue === 0 || commentField.value.trim() === '') {
    errorMessage.style.display = 'block'; // Show error message
    return; // Stop the submission
  }

  // Hide the rating system gradually
  ratingSystem.style.opacity = '0';

  // Show the thank you message
  thankYouMessage.style.display = 'block';
  thankYouMessage.style.opacity = '1';

  // Hide the thank you message and show the rating system again after 3 seconds
  setTimeout(function() {
    thankYouMessage.style.opacity = '0';

    setTimeout(function() {
      thankYouMessage.style.display = 'none';

      // Reset the rating stars
      stars.forEach(star => {
        star.classList.remove('selected');
        star.classList.remove('hover'); // Ensure hover class is also removed
      });
      ratingValue = 0; // Reset ratingValue to 0
      
      // Clear the textarea
      commentField.value = '';

      // Hide error message
      errorMessage.style.display = 'none';
      
      // Show the rating system again
      ratingSystem.style.opacity = '1';
    }, 1000); // Time for the fade-out transition to complete
  }, 3000); // 3 seconds delay
});
