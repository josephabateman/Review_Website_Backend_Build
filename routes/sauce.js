const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

// GET /api/sauces
router.get('/', sauceCtrl.getAllSauce);
// GET /api/sauces/:id
router.get('/:id', sauceCtrl.getOneSauce);
// POST /api/sauces
router.post('/', sauceCtrl.createSauce);
// PUT /api/sauces/:id
router.put('/:id', sauceCtrl.modifySauce);
// DELETE /api/sauces/:id
router.delete('/:id', sauceCtrl.deleteSauce);
// POST /api/sauces/:id/like - not yet created
router.post('/:id/like', sauceCtrl.likeSauce);

module.exports = router;







