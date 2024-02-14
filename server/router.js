const {Router} = require('express')
const router = Router();
let user = require('./controllers/user')
let game = require('./controllers/game')
let leaderboard = require('./controllers/leaderboard')

// ------------------- USER ------------------
router.post('/user/login', user.loginUser);

// ------------------- GAME -------------------
router.post('/game/:username', game.setGameState);

// ------------------- LEADERBOARD -------------------
// router.get('/leaderboard', game.getLeaderboard);
router.get('/leaderboard/:username', leaderboard.wonGame);


// ------------------- 404 -------------------
router.get('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server")
});
router.post('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server")
});
router.put('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server")
});
router.delete('*', function (req, res) {
    res.status(404).json("Requested endpoint is not exposed from server")
});


module.exports = { router };