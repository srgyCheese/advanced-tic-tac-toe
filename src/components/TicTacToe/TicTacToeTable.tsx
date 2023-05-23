import styles from './TicTacToeTable.module.scss'
import { Coords, Matrix } from '../../utils/TicTacToe'
import { Match } from '../../utils/TicTacToe/types'
import TableField from './TableField'

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
            {row.map((item, x) => (
              <TableField
                onClick={() => onElementClick({ x, y })}
                key={x}
                className={isCoordsInMatch(match, { x, y }) ? styles.highlighted : ''}
                fieldType={item}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TicTacToeTable