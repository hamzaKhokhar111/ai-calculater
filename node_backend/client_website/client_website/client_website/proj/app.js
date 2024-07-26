const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Create a MySQL connection pool 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tourism_db',
});

// Middleware to parse incoming JSON requestsS
app.use(express.static('public'));

app.use(bodyParser.json());

// Set the port for the Express app
const port = 3000;

// Endpoint to handle form submissions
app.post('/submit_form', (req, res) => {
    try {
        // Validate and clean data
        const { fname, lname, gender, mobile, dob, email, language, message } = req.body;

        // Perform backend validation (you can customize this based on your requirements)

        // Log the data to the console
        console.log('Received form data:', req.body);

        // Create a new record in the database
        pool.query(
            'INSERT INTO user_forms (fname, lname, gender, mobile, dob, email, language, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [fname, lname, gender, mobile, dob, email, language, message],
            (error) => {
                if (error) {
                    console.error('Error storing form data in the database:', error);
                    return res.status(500).json({ message: 'Internal server error.' });
                }

                res.status(201).json({ message: 'Form data stored successfully.' });
            }
        );
    } catch (error) {
        console.error('Error processing form data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



app.get('/get_form_data', (req, res) => {
    try {
        // Fetch data from the database
        pool.query('SELECT * FROM user_forms', (error, results) => {
            if (error) {
                console.error('Error fetching form data from the database:', error);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            // Send the data to the HTML page
            res.json(results);
        });
    } catch (error) {
        console.error('Error processing form data request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
