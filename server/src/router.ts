import { Router } from 'express';
const router = Router();
import user from './controllers/user'
import game from './controllers/game'
import leaderboard from './controllers/leaderboard'

// ------------------- USER ------------------
router.post('/user/login', user.loginUser);

// ------------------- GAME -------------------
router.post('/game/:username', game.setGameState);

// ------------------- LEADERBOARD -------------------
// router.get('/leaderboard', game.getLeaderboard);
router.get('/game/won/:username', leaderboard.wonGame);
// router.get('/leaderboard', leaderboard.getLeaderboard);
router.get('/score/:username', leaderboard.getScore);

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


export default router;