document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            const response = await fetch('/submit_form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
            } else {
                console.error('Form submission failed.');
            }
        }
    });
	
    function validateForm() {
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;

        if (!fname || !lname) {
            alert('First Name and Last Name are required.');
            return false;
        }

        return true;
    }
});



document.addEventListener('DOMContentLoaded', async () => {
    // Fetch form data from the server
    const response = await fetch('/get_form_data');
    const formData = await response.json();

    // Display form data on the HTML page
    const formDataList = document.getElementById('formDataList');
    formData.forEach((data) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${data.fname} ${data.lname} - ${data.email}`;
        formDataList.appendChild(listItem);
    });
});