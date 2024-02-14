import { useEffect, useState } from "react"
import toast from 'react-hot-toast'

const images = {
    cat: '/assets/cat card.png',
    diffuse: '/assets/diffuse card.png',
    explode: '/assets/explode card.png',
    shuffle: '/assets/shuffle card.png',
}


function Game() {
    const [cards, setCards] = useState([])
    const [diffuseCards, setDiffuseCards] = useState([])
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [playAgain, setPlayAgain] = useState(false);

    function startGame() {
        let cards = []
        setCards([])
        setDiffuseCards([])
        setPlayAgain(false)
        setBtnDisabled(false)
        let keys = Object.keys(images)
        for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * 4)
            cards.push(keys[random])
        }
        // console.log(cards)
        setCards(cards)
    }
    useEffect(() => {
        if (cards.length === 0) {
            startGame()
        }
    }, [])

    function handleReveal() {
        // console.log(cards)
        let cardsCollection = document.querySelectorAll('.cards')[0].children
        let topCard = cardsCollection[cardsCollection.length - 2]
        topCard.classList.add('reveal')
        setBtnDisabled(true)
        setTimeout(() => {
            topCard.classList.remove('reveal')
            if (cards[cards.length - 1] === 'cat') {
                if (cards.length === 1)
                    toast.success("You won the game !")
                setCards(cards.slice(0, -1))
                setBtnDisabled(false)
            } else if (cards[cards.length - 1] === 'explode') {
                if (diffuseCards.length > 0) {
                    setDiffuseCards(diffuseCards.slice(0, -1))
                    setCards(cards.slice(0, -1))
                    setBtnDisabled(false)
                    toast("Bomb diffused")
                } else {
                    let choice = window.confirm("You lost the game ! Restart the game ?")
                    if (choice) {
                        startGame()
                        setBtnDisabled(false)
                    } else {
                        setPlayAgain(true)
                    }
                }
            } else if (cards[cards.length - 1] === 'shuffle') {
                startGame()
                setBtnDisabled(false)
            } else if (cards[cards.length - 1] === 'diffuse') {
                setDiffuseCards([...diffuseCards, 'diffuse'])
                if (cards.length === 1)
                    toast.success("You won the game !")
                setCards(cards.slice(0, -1))
                setBtnDisabled(false)
            }
        }, 1000);
    }

    return (
        <section id="game">
            <div className="container-fluid">
                <div className="row">
                    <div className="order-2 col-12 col-lg-1 diffuse">
                        {diffuseCards.map((card, ind) => (
                            <div key={ind}>
                                <div className="spacer"></div>
                                <div className="diffuse-card">
                                    <img alt="diffuse card" src={`${images[card]}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-1 col-12 order-lg-2 col-lg-8 text-center cards">
                        {cards.map((card, ind) => (<div key={ind}>
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
                            cards.length === 0 || playAgain ?
                                <button className="cta" onClick={startGame}>Play Again</button> :
                                <button className={`cta ${btnDisabled ? "disabled" : ""}`} onClick={handleReveal} disabled={btnDisabled}>Reveal</button>
                        }
                    </div>
                    <div className="order-3 col-lg-2 leaderboard">
                        Leaderboard
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Game;