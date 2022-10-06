const express = require('express');
const smaController = require('../controllers/sma-controller');

const router = express.Router();

router.post('/login', (req, res) => smaController.logIn(req, res));
router.post('/logout', (req, res) => smaController.logOut(req, res));
router.post('/getValues', (req, res) => smaController.getValues(req, res));

module.exports = router;