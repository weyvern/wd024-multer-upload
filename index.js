import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import { resolve } from 'path';
import imageUploader from './middlewares/imageUploader.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(expressLayouts);
app.set('layout', resolve('./views/layouts/main'));
app.set('view engine', 'ejs');
app.use(express.static(resolve('./public')));

app.get('/', (req, res) => res.render('index', { title: 'Upload your image' }));

app.post('/upload-profile-pic', imageUploader.single('profile_pic'), (req, res, next) => {
  if (!req.file) throw new Error('Please upload an image');
  res.render('user', {
    title: req.body.user,
    user: req.body.user,
    path: `/uploads/${req.file.filename}`
  });
});
app.get('*', (req, res) => res.redirect('/'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
