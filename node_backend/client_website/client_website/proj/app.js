const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Add this line
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'aical',
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully');
        // Perform a test query
        connection.query('SELECT 1', (error, results) => {
            if (error) {
                console.error('Error executing test query:', error);
            } else {
                console.log('Test query executed successfully:', results);
            }
            // Release the connection
            connection.release();
        });
    }
});

app.use(express.static('public'));
app.use(bodyParser.json());

const port = 3000;
app.use(cors());
app.get('/get_user_login', (req, res) => {
    try {
        pool.query('SELECT email, password FROM users', (error, results) => {
            if (error) {
                console.error('Error fetching user login data:', error);
                return res.status(500).json({ message: 'Internal server error.' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error processing user login data request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        pool.query('INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], (error, results) => {
            if (error) {
                console.error('Error signing up:', error);
                return res.status(500).json({ success: false, message: 'Internal server error.' });
            }
            console.log('User signed up successfully');
            res.json({ success: true, message: 'User signed up successfully' });
        });
    } catch (error) {
        console.error('Error processing sign-up request:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    try {
        pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
            if (error) {
                console.error('Error fetching user login data:', error);
                return res.status(500).json({ success: false, message: 'Internal server error.' });
            }
            if (results.length === 1) {
                // User authenticated successfully
                console.error('sucess');
                return res.json({ success: true, message: 'Login successful' });
            } else {
                // Invalid email or password
                console.error('notsucess');
                return res.json({ success: false, message: 'Invalid email or password' });
            }
        });
    } catch (error) {
        console.error('Error processing user login request:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});