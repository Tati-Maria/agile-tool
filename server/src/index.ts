import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';


const app = express();
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
  res.send('Hello World!');
});

// TODO: ERROR HANDLING MIDDLEWARE

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});