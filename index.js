import express from 'express';
import { resolve } from 'path';

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.sendFile(resolve('./views/index.html')));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
