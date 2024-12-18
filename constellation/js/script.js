// Initialize EmailJS
(function(){
    emailjs.init(pranit); // Replace with your EmailJS User ID
})();SER_ID

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    var form = event.target;
    var formData = {
        name: form.inputName.value,
        email: form.inputEmail.value,
        message: form.inputMessage.value
    };

    // Send email via EmailJS
    emailjs.send(service_ripw50a,template_6nrld05, formData)
        .then(function(response) {
            console.log('Success!', response);
            alert('Message sent successfully!');
        })
        .catch(function(error) {
            console.log('Failed...', error);
            alert('Failed to send message. Please try again.');
        });
}

// Attach the submitForm function to the form's submit event
document.querySelector('form[name="contactform"]').addEventListener('submit', submitForm);
