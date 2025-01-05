import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {
    //revisar la combinación
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null // si no hay ganador
}

export const checkEndGame = (newBoard) => {
  //revisar si hay empate, si no hay mas espacios vacios en el juego
  return newBoard.every((square) => square !== null)
}  