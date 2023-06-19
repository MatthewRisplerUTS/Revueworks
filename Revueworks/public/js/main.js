document.addEventListener('DOMContentLoaded', function () {
    // Handle star rating selection
    const stars = document.querySelectorAll('.star-rating input');
    stars.forEach(star => {
        star.addEventListener('change', handleStarRating);
    });

    // Handle feedback form submission
    const feedbackForm = document.querySelector('.feedback-form');
    feedbackForm.addEventListener('submit', handleFeedbackForm);
});

function handleStarRating(event) {
    const rating = event.target.value;

    // Show loading spinner
    showLoadingSpinner();

    // If rating is 4 or above, redirect to Google Reviews
    if (rating >= 4) {
        window.location.href = 'https://www.google.com/search?q=YourBusinessName'; // Replace with your business Google Search link
    }

    // If rating is below 4, show feedback form
    else {
        document.querySelector('.feedback-form').style.display = 'block';
    }

    // Hide loading spinner after 2 seconds (simulating loading time)
    setTimeout(hideLoadingSpinner, 2000);
}

function handleFeedbackForm(event) {
    event.preventDefault();

    // Show loading spinner
    showLoadingSpinner();

    // Collect data from the form
    const form = event.target;
    const formData = new FormData(form);
    const rating = formData.get("rating");
    const feedback = formData.get("feedback");

    // Send data to the server
    fetch('/submit-feedback', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading spinner
        hideLoadingSpinner();

        // Handle response from the server
        if (data.success) {
            // If successfully submitted, you can redirect or show a success message
            window.location.href = data.redirectUrl || '/';
        } else {
            // Show error message
            alert("Failed to submit feedback. " + data.message);
        }
    })
    .catch(error => {
        // Hide loading spinner
        hideLoadingSpinner();

        // Handle fetch error
        console.error('Error:', error);
        alert('An error occurred while submitting feedback.');
    });
}

function showLoadingSpinner() {
    document.querySelector('.loading-spinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.querySelector('.loading-spinner').style.display = 'none';
}
