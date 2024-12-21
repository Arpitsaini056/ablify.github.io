const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const extract = require('extract-zip');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// JSON file to store song details
const dataFile = path.join(__dirname, 'songs.json');

// Helper function to save song details
const saveSongDetails = (songDetails) => {
    let songs = [];
    if (fs.existsSync(dataFile)) {
        songs = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    }
    songs.push(songDetails);
    fs.writeFileSync(dataFile, JSON.stringify(songs, null, 2), 'utf8');
};

// Endpoint for single song upload
app.post('/addSong', upload.fields([{ name: 'songFile' }, { name: 'imageFile' }]), (req, res) => {
    const { songName, artistName } = req.body;
    const songFile = req.files['songFile']?.[0];
    const imageFile = req.files['imageFile']?.[0];

    if (!songName || !artistName || !songFile || !imageFile) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const songDetails = {
        songName,
        artistName,
        songPath: songFile.path,
        imagePath: imageFile.path,
    };

    saveSongDetails(songDetails);
    res.status(200).json({ message: 'Song added successfully!', song: songDetails });
});

// Endpoint for bulk upload
app.post('/uploadBulkSongs', upload.single('bulkFile'), (req, res) => {
    const filePath = req.file.path;

    if (req.file.mimetype === 'text/csv') {
        // Process CSV file
        const songs = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                songs.push({
                    songName: row.songName,
                    artistName: row.artistName,
                    genre: row.genre,
                });
            })
            .on('end', () => {
                // Save songs to the database
                try {
                    songs.forEach(saveSongDetails);
                    res.json({ message: 'Bulk upload successful!', songs });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Failed to save songs to database!' });
                } finally {
                    fs.unlinkSync(filePath); // Delete temp file
                }
            });
    } else if (req.file.mimetype === 'application/zip') {
        // Process ZIP file
        const outputDir = `uploads/unzipped-${Date.now()}`;
        fs.mkdirSync(outputDir);

        extract(filePath, { dir: outputDir })
            .then(() => {
                const extractedFiles = fs.readdirSync(outputDir);
                console.log('Extracted files:', extractedFiles);
                res.json({ message: 'ZIP file uploaded and processed!' });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Failed to process ZIP file!' });
            })
            .finally(() => {
                fs.unlinkSync(filePath); // Delete temp file
            });
    } else {
        res.status(400).json({ message: 'Unsupported file type!' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
