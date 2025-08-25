const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

// Middleware
app.use(express.static('public'));
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    abortOnLimit: true,
    createParentPath: true
}));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.file;
    
    // Check if file is PDF
    if (uploadedFile.mimetype !== 'application/pdf') {
        return res.status(400).send('Only PDF files are allowed.');
    }

    // Generate unique filename
    const fileName = `${Date.now()}_${uploadedFile.name}`;
    const filePath = path.join(uploadsDir, fileName);

    // Move file to uploads directory
    uploadedFile.mv(filePath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded successfully!');
    });
});

// Start server
app.listen(port, (error) => {
    if (error) {
        console.log('Error starting server:', error);
    } else {
        console.log(`Server is listening on port: ${port}`);
    }
});
