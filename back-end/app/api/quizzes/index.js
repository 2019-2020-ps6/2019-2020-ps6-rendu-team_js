const { Router } = require('express');

const { Quiz, Question, Answer, Theme} = require('../../models');
const manageAllErrors = require('../../utils/routes/error-management');
const QuestionsRouter = require('./questions');
const { buildQuizz, buildQuizzes, buildQuizNbQuestions, buildQuizToPlay } = require('./manager');
const logger = require('../../utils/logger.js')

const router = new Router();

router.use('/:quizId/questions', QuestionsRouter);

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
});

router.get('/theme/:themeId', (req, res) => {
  try {
    const themeId = req.params.themeId;
    const quizzes = buildQuizNbQuestions(Quiz.get()).filter((q) => q.themeId === themeId && q.deleted !== true);
    logger.info(quizzes)
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
});

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizToPlay(req.params.quizId);
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
});

router.get('/quizData/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId);
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
});

router.post('/', (req, res) => {
  try {


    const quiz = Quiz.create({ name: req.body.name, themeId: req.body.themeId, difficulty: req.body.difficulty });

    const questions = [];
    const answers = [];

    req.body.questions.forEach((question) => {
      question.quizId = quiz.id;

      const questionCreated = Question.create({ label: question.label, quizId: question.quizId });
      questions.push(questionCreated);

      question.answers.forEach((answer) => {
        answer.questionId = questionCreated.id;

        const answerCreated = Answer.create({ value: answer.value, isCorrect: answer.isCorrect, questionId: answer.questionId });
        answers.push(answerCreated);
      });

    });

    //Update Theme +1 Quiz
    const theme = Theme.getById(quiz.themeId);
    theme.nbQuiz++;
    Theme.update(quiz.themeId, theme);

    logger.info(quiz);
    logger.info(questions);
    logger.info(answers);
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
});

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
});

router.delete('/:quizId', (req, res) => {
  try {
    const quiz = Quiz.getById(req.params.quizId);

    if (quiz.deleted !== true) {
      //Update Theme -1 Quiz
      const theme = Theme.getById(quiz.themeId);
      theme.nbQuiz--;
      Theme.update(quiz.themeId, theme);
    }

    quiz.deleted = true;
    Quiz.update(req.params.quizId, quiz);


    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
});

module.exports = router;
