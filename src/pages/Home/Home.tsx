import React from 'react'
import styles from './Home.module.scss'
import TicTacToeGame from '../../components/TicTacToe/TicTacToeGame'

const Home = () => {
  return (
    <div className={styles.home}>
      <h2>Tic Tac Toe Game</h2>
      <TicTacToeGame />
    </div>
  )
}

export default Home