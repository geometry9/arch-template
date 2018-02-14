var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Welcome to the Poll API'
      });
});


//////////////////////
// Postgres queries
//////////////////////

var db = require('./queries');
router.get('/api/getRandomQuestion', db.getRandomQuestion);
router.post('/api/updateAnswerQty', db.updateAnswerQty);

router.get('/api/questions', db.getAllQuestions);
router.get('/api/questions/:id', db.getQuestion);
router.post('/api/questions', db.createQuestion);
router.put('/api/questions/:id', db.updateQuestion);
router.delete('/api/questions/:id', db.removeQuestion);

module.exports = router;
