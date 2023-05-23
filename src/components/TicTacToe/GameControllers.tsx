import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useRef } from 'react'
import fadeBottomTransition from './fade-bottom-transition.module.css'
import styles from './GameControllers.module.scss'
import { Coords } from '../../utils/TicTacToe'

type Props = {
  restart: () => void,
  isEnd: boolean,
  size: Coords,
  matchLength: number,
  setSize: (size: Coords) => void,
  setMatchLength: (matchLength: number) => void,
  isStarted: boolean
}

const GameControllers = ({ restart, isEnd, size, matchLength, setSize, setMatchLength, isStarted }: Props) => {
  const endedRef = useRef<HTMLDivElement>(null)
  const notStartedRef = useRef<HTMLDivElement>(null)
  const goingRef = useRef<HTMLDivElement>(null)

  let nodeRef = notStartedRef
  let gameStatus: 'ended' | 'not-started' | 'going' = 'not-started'

  if (isEnd) {
    gameStatus = 'ended'
    nodeRef = endedRef
  } else if (isStarted) {
    gameStatus = 'going'
    nodeRef = goingRef
  }

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={gameStatus}
        nodeRef={nodeRef}
        addEndListener={(done) => {
          nodeRef?.current?.addEventListener('transitionend', done, false)
        }}
        timeout={300}
        classNames={fadeBottomTransition}
      >
        <div ref={nodeRef} className={styles.gameControllers}>
          {gameStatus === 'going' && <div>Good game!</div>}
          {gameStatus === 'ended' && <button onClick={restart}>Restart</button>}
          {gameStatus === 'not-started' && <>
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
          }
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}

export default GameControllers