const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React frontend build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle GET requests to serve 'index.html' from the React frontend build directory
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start the Express server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
