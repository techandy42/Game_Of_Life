import { useState, useEffect } from 'react'
import { Game } from './Game.ts'

const game = new Game()

export const Board = () => {
  const [choice, setChoice] = useState(-1)
  const [, setTick] = useState(0) // Add a tick state

  const clickChoice = (choice: number) => {
    switch (choice) {
      case 0:
        game.populateRandom()
        break
      case 1:
        game.populateLWSS()
        break
      case 2:
        game.populateBeacon()
        break
      case 3:
        game.populatePulsar()
        break
      case 4:
        game.populateToad()
        break
      case 5:
        game.populateDiehard()
        break
      case 6:
        game.populateAcorn()
        break
      default:
        game.populateRandom()
    }
    setChoice(choice)
  }

  useEffect(() => {
    if (choice != -1) {
      const intervalId = setInterval(() => {
        console.log('running every 1s...')
        game.update()

        // Increment the tick state to force a re-render
        setTick((prevTick) => prevTick + 1)
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [choice]) // Empty dependency array ensures the effect runs only once

  const board = game.getBoard() // Retrieve the board directly from the game instance

  return (
    <>
      <div className='row'>
        <button onClick={() => clickChoice(0)}>Random</button>
        <button onClick={() => clickChoice(1)}>LWSS</button>
        <button onClick={() => clickChoice(2)}>Beacon</button>
        <button onClick={() => clickChoice(3)}>Pulsar</button>
        <button onClick={() => clickChoice(4)}>Toad</button>
        <button onClick={() => clickChoice(5)}>Diehard</button>
        <button onClick={() => clickChoice(6)}>Acorn</button>
      </div>
      <div>
        {board.map((row, i) => (
          <div key={i} className='row'>
            {row.map((cell, j) => (
              <div key={j} className={cell ? 'alive-cell' : 'dead-cell'}></div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
