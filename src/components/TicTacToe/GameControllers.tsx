import styles from './GameControllers.module.scss'
import { Coords } from '../../utils/TicTacToe'

type Props = {
  restart: () => void,
  isEnd: boolean,
  size: Coords,
  matchLength: number,
  setSize: (size: Coords) => void,
  setMatchLength: (matchLength: number) => void,
}

const GameControllers = ({ restart, isEnd, size, matchLength, setSize, setMatchLength }: Props) => {
  return (
    <div className={styles.gameControllers}>
      {isEnd ? (
        <button onClick={restart} className='btn'>Restart</button>
      ) : (
        <>
          <div className={styles.gameController}>
            Field size: {size.x}x{size.y}
            <input
              type='range'
              style={{ width: '100%' }}
              min={1}
              max={15}
              step={1}
              value={size.x}
              onChange={e => setSize({
                x: +e.target.value,
                y: +e.target.value
              })}
            />
          </div>
          <div className={styles.gameController}>
            You should match: {matchLength} items
            <input
              type='range'
              style={{ width: '100%' }}
              min={1}
              max={Math.max(size.x, size.y)}
              step={1}
              value={matchLength}
              onChange={e => setMatchLength(+e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default GameControllers