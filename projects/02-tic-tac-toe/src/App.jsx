import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'; // Importar PropTypes
import './App.css' 
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinner, checkEndGame } from './logic/board';
import { saveGameToStorage, resetGameStorage } from './logic/storage';
function App() {
  console.log("render")

  const [board, setBoard] = useState( () => {
    console.log("Inicializar estado del board")
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) :
    Array(9).fill(null)
  });
  const [turn, setTurn] = useState( () => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null) // null no hay ganador, false es empate

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return //no se actualiza si ya tiene algo 

    //actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard);
    //actualizamos turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar  aqui partida
    saveGameToStorage({ newBoard, newTurn })

    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }
  
  useEffect(() => {
    console.log("useEffect")
  }, []) 

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <section>
        {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false ? "Empate" : "Gano: "
                  }
                </h2>
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame}> Empezar de nuevo </button>
                </footer>

              </div>
            </section>
          )
        }
      </section>
    </main>
  )
}

// Definir los PropTypes para el componente Square
Square.propTypes = {
  children: PropTypes.node, // Cualquier nodo React, como texto o JSX
  isSelected: PropTypes.bool, // Booleano que indica si está seleccionado
  updateBoard: PropTypes.func.isRequired, // Función obligatoria
  index: PropTypes.number.isRequired // Índice numérico obligatorio
};

export default App

