require('dotenv').config();

const express = require('express');
const multer = require('multer');
const helmet = require('helmet');

const app = express();
const port = process.env.port;

const uploadFolder = process.env.uploadFolder;
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, _, cb) => {
    const { filename } = req.body;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.disable('x-powered-by');
app.use(helmet());
app.use('/images', express.static(__dirname + '/images'));
app.post('/image', upload.single('image'), (_, res) => {
  res.json({ msg: 'Upload Success' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
