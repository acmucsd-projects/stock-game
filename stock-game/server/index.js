const express = require('express');
const server = express();
const router = express.Router();
router.get('/pokemon',(req, res) => {
    res.status(200).json({ hello: 'world'})
});

server.use('/api',router);

server.listen(5000, () => {
    console.log('Server started on port 5000!')
});
