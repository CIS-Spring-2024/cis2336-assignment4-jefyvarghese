const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000; // Or any port you prefer


// Body Parser Middleware
app.use(bodyParser.json());


// Define routes
app.post('/submitOrder', (req, res) => {
    // Assuming the order summary is sent in the request body as JSON
    const orderSummary = req.body.orderSummary;


    // Process the order (you can replace this with your actual order processing logic)
    if (orderSummary) {
        // Here you can handle the order processing logic, database operations, etc.
        console.log('Received order summary:', orderSummary);
        res.send('Order received successfully!');
    } else {
        res.status(400).send('Bad request: Order summary missing');
    }
});


// Define a route handler for the root URL to provide a response
app.get('/', (req, res) => {
    res.send('Welcome to the server!'); // Send a welcome message
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});





