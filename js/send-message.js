// send-message.js

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Retrieve the message value from the form
    const message = document.getElementById('message').value.trim();
    
    // Define a static subject
    const subject = "Contact Form Submission";
    
    // Basic validation (optional but recommended)
    if (!message) {
        alert('Please enter a message.'); // Simple alert for missing message
        return;
    }
    
    // Create mailto link with subject and message
    const mailtoLink = `mailto:shafishahin786@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    
    // Open the user's email client with the mailto link
    window.location.href = mailtoLink;
    
    // Reset the form fields
    document.getElementById('contactForm').reset();
}

// Attach the handleSubmit function to the form's submit event after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleSubmit);
});
