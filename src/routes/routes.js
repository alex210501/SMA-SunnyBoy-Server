const express = require('express');
const smaController = require('../controllers/sma-controller');

const router = express.Router();
const sma = new smaController();

router.post('/login', (req, res) => sma.logIn(req, res));
router.post('/logout', (req, res) => sma.logOut(req, res));

module.exports = router;