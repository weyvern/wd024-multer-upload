import express from 'express';
import { resolve } from 'path';
import multer from 'multer';

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({ dest: 'public/uploads/' });

app.use(express.static(resolve('./public')));

app.get('/', (req, res) => res.sendFile(resolve('./views/index.html')));

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res, next) => {
  console.log(req.file);
  res.send(`<img src=${'/uploads/' + req.file.filename} alt=${req.body.user} width='300px'/>`);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
