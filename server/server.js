const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });

// cors, static files, and middleware for database
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// GET Request for proxy
app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});


// Image Routes
app.get('/images/:id', async (req, res) => {
  // await axios.get(`http://100.24.35.141:4012/images/${req.params.id}`)
  await axios.get(`http://localhost:4012/images/${req.params.id}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log('Error with GET request to server: images', err.address);
      res.status(404).end();
    });
})

// // Reviews Routes
// app.get('/reviews/:id', async (req, res) => {
//   await axios.get(`http://18.144.23.11:4052/reviews/${req.params.id}`)
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.log('Error with GET request to server: reviews', err.address);
//       res.status(404).end();
//     });
// });


// // More Like This Routes
// app.get('/morelikethis/:id', async (req, res) => {
//   await axios.get(`http://54.193.16.203:4022/morelikethis/${req.params.id}`)
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.log('Error with GET request to server: moreLikeThis', err.address);
//       res.status(404).end();
//     });
// });

// // MetaData Routes
// app.get(`/api/product/:id`, async (req, res) => {
//   await axios.get(`http://ec2-3-227-255-185.compute-1.amazonaws.com/api/product/${req.params.id}`)
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.log('Error with GET request to server: metaData', err.address);
//       res.status(404).end();
//     });
// });

// server connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Anthony's Proxy is listening on PORT ${PORT} 👍!`)
});
