import styles from './TicTacToeTable.module.scss'
import { Coords, Matrix } from '../../utils/TicTacToe'
import { FieldTypes, Match } from '../../utils/TicTacToe/types'

type Props = { 
  matrix: Matrix, 
  onElementClick: (coords: Coords) => void,
  match: Match | undefined,
  isEnd: boolean
}

const isCoordsInMatch = (match: Match | undefined, coords: Coords): boolean => {
  if (!match) {
    return false
  }  

  return !!match.coords.find(coord => coord.x === coords.x && coord.y === coords.y)
}

const TicTacToeTable = ({ matrix, onElementClick, match, isEnd }: Props) => {
  return (
    <table className={styles['tic-tac-toe-table'] + (isEnd ? ` ${styles.ended}` : '')}>
      <tbody>
        {matrix.map((row, y) => (
          <tr key={y}>
            {row.map((item, x) => {
              let tdInner = null

              if (item === FieldTypes.X) {
                tdInner = <svg version="1.1" fill='white' viewBox="0 0 460.775 460.775">
                  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                </svg>
              } else if (item === FieldTypes.O) {
                tdInner = <svg version="1.1" viewBox="0 0 94 94">
                  <g>
                    <g>
                      <path fill='white' d="M47,94C21.084,94,0,72.916,0,47S21.084,0,47,0s47,21.084,47,47S72.916,94,47,94z M47,12.186
                        c-19.196,0-34.814,15.618-34.814,34.814c0,19.195,15.618,34.814,34.814,34.814c19.195,0,34.814-15.619,34.814-34.814
                        C81.814,27.804,66.195,12.186,47,12.186z"/>
                    </g>
                  </g>
                </svg>
              } else {
                tdInner = <svg version="1.1" viewBox="0 0 94 94">
                  <g>
                    <g>
                      <path d="" />
                    </g>
                  </g>
                </svg>
              }
              
              return (
                <td 
                  onClick={() => onElementClick({ x, y })} 
                  key={x} 
                  className={isCoordsInMatch(match, {x, y}) ? styles.highlighted : ''}
                >
                  {tdInner}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TicTacToeTable