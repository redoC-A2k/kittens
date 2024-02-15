import { useSelector } from 'react-redux';
import { selectLeaderBoard } from '../redux/slices/leaderboard';
import { selectScore } from '../redux/slices/score';
import { selectUserName } from '../redux/slices/username';

function Leaderboard() {
    let leaderboard = useSelector(selectLeaderBoard)
    let score = useSelector(selectScore)
    let username = useSelector(selectUserName)
    return (
        <div className='mt-4' id="leaderboard">
            <h4 className='text-center'>Leaderboard</h4>
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th scope='col'>S.NO.</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((data, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{ind+1}</td>
                                <td>{data.value.split(':')[1]===username?data.value.split(':')[1]+"(You)":data.value.split(':')[1]}</td>
                                <td>{data.score}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='score'>
                <h5>Your score : <span>{score}</span></h5>
            </div>
        </div>
    )
}

export default Leaderboard;