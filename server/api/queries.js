var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL
var db = pgp(connectionString);


/////////////////////
// Query Functions
/////////////////////

function getAllQuestions(req, res, next) {
  db.any('SELECT * FROM questions')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all questions'
        });
    })
    .catch(function (err) {
      console.log(err)
      return next(err);
    });
}


function getRandomQuestion(req, res, next) {
  db.any('SELECT id, question, cast(answers AS json) FROM questions ORDER BY RANDOM() LIMIT 1;')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one question'
        });
    })
    .catch(function (err) {
      console.log(err)
      return next(err);
    });
}

function updateAnswerQty(req, res, next) {
  var sub = req.body;
  db.one(`UPDATE questions SET answers = answers || CONCAT('{"${sub.answer}":', COALESCE(answers->>'${sub.answer}','0')::int + 1, '}')::jsonb WHERE id = ${sub.id} RETURNING answers;`)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated question',
          data: data,
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
}



function getQuestion(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM questions WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one question'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createQuestion(req, res, next) {
  const { answers, question } = req.body;
  db.none(`INSERT INTO questions as d (question, answers) VALUES ('${question}', '${answers}')`)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one question'
        });
    })
    .catch(function (err) {
      console.log(err)
      return next(err);
    });
}

function updateQuestion(req, res, next) {
  const { question, answers } = req.body;
  db.none(`UPDATE questions SET question='${question}', answers='${answers}', updated_at=now() WHERE id = ${req.params.id}`)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated question'
        });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
}

function removeQuestion(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM questions WHERE id = $1', id)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} questions`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


/////////////
// Exports
/////////////

module.exports = {
    getAllQuestions: getAllQuestions,
    getQuestion: getQuestion,
    getRandomQuestion: getRandomQuestion,
    updateAnswerQty: updateAnswerQty,
    createQuestion: createQuestion,
    updateQuestion: updateQuestion,
    removeQuestion: removeQuestion
};
