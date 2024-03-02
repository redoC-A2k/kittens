import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { selectGameState, set, setGameState } from '../redux/slices/gameState'
import { selectUserName } from "../redux/slices/username"
import Leaderboard from "../components/Leaderboard"
import { wonGame as wonGameAction } from '../redux/slices/score'
import constants from "../utils/constants"
import { set as setLeaderboard } from '../redux/slices/leaderboard'

export const images = {
    cat: '/assets/cat card.png',
    diffuse: '/assets/diffuse card.png',
    explode: '/assets/explode card.png',
    shuffle: '/assets/shuffle card.png',
}


function Game({ socket }) {
    // const [cards, setCards] = useState([])
    // const [diffuseCards, setDiffuseCards] = useState([])
    const gameState = useSelector(selectGameState)
    const username = useSelector(selectUserName)
    const dispatch = useDispatch()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [playAgain, setPlayAgain] = useState(false);

    function restartGame() {
        let cards = []
        // setCards(gameState.cards)
        // setDiffuseCards(gameState.diffuseCards)
        setPlayAgain(false)
        setBtnDisabled(false)
        let keys = Object.keys(images)
        for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * 4)
            cards.push(keys[random])
        }
        dispatch(setGameState({ cards, diffuseCards: [] }, username))
    }

    useEffect(() => {
        if (gameState.cards.length === 0) {
            restartGame()
        }
    }, [])

    useEffect(() => {
        console.log(socket)
        socket?.onmessage((event) => {
            let msg = JSON.parse(event.data)
            switch (msg.type) {
                case constants.LATEST_LEADERBOARD:
                    dispatch(setLeaderboard(msg.payload))
                    break;
                default:
                    console.log("Default message  : ", msg)
                    break;
            }
        })
        socket?.send({ type: constants.GET_LEADERBOARD })
    },[socket])

    function wonGame() {
        dispatch(wonGameAction(username))
        toast.success("You won the game !", { duration: 1000 })
    }

    function handleReveal() {
        // console.log(cards)
        let cardsCollection = document.querySelectorAll('.cards')[0].children
        let topCard = cardsCollection[cardsCollection.length - 2]
        topCard.classList.add('reveal')
        setBtnDisabled(true)
        setTimeout(() => {
            if (gameState.cards[gameState.cards.length - 1] === 'cat') {
                if (gameState.cards.length === 1)
                    wonGame()
                dispatch(setGameState({ cards: gameState.cards.slice(0, -1) }, username))
                setBtnDisabled(false)
            } else if (gameState.cards[gameState.cards.length - 1] === 'explode') {
                if (gameState.diffuseCards.length > 0) {
                    if (gameState.cards.length === 1)
                        wonGame()
                    dispatch(setGameState({ cards: gameState.cards.slice(0, -1), diffuseCards: gameState.diffuseCards.slice(0, -1) }, username))
                    setBtnDisabled(false)
                    toast("Bomb diffused", { duration: 500 })
                } else {
                    let choice = window.confirm("You lost the game ! Restart the game ?")
                    if (choice) {
                        restartGame()
                        setBtnDisabled(false)
                    } else {
                        setPlayAgain(true)
                    }
                }
            } else if (gameState.cards[gameState.cards.length - 1] === 'shuffle') {
                restartGame()
                setBtnDisabled(false)
            } else if (gameState.cards[gameState.cards.length - 1] === 'diffuse') {
                dispatch(setGameState({ diffuseCards: [...gameState.diffuseCards, 'diffuse'], cards: gameState.cards.slice(0, -1) }, username))
                if (gameState.cards.length === 1)
                    wonGame()
                setBtnDisabled(false)
            }
        }, 1000);
    }

    return (
        <section id="game">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 col-sm-1 diffuse">
                        {gameState.diffuseCards.map((card, ind) => (
                            <div key={ind}>
                                <div className="spacer"></div>
                                <div className="diffuse-card">
                                    <img alt="diffuse card" src={`${images[card]}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-10 order-2 col-sm-7 text-center cards">
                        {gameState.cards.map((card, ind) => (<div key={ind}>
                            <div className="spacer" style={{ marginTop: `${ind + 1}rem` }}></div>
                            <div key={ind} className={`flip-card`}>
                                <div className="face front">
                                    <img alt="back of card" src="/assets/back card.png" />
                                </div>
                                <div className="face back">
                                    <img alt="front of card" src={`${images[card]}`} />
                                </div>
                            </div>
                        </div>
                        ))}
                        {
                            gameState.cards.length === 0 || playAgain ?
                                <button className="cta" onClick={restartGame}>Play Again</button> :
                                <button className={`cta ${btnDisabled ? "disabled" : ""}`} onClick={handleReveal} disabled={btnDisabled}>Reveal</button>
                        }
                    </div>
                    <div className="order-3 col-sm-4 leaderboard">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Game;