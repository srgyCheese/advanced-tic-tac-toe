import styles from './TicTacToeTable.module.scss'
import { Coords, Matrix } from '../../utils/TicTacToe'
import { Match } from '../../utils/TicTacToe/types'
import TableField from './TableField'
import classNames from 'classnames'

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
  const borderWidth = Math.round((1 / Math.log2(matrix.length)) * 5) + 1
  const borderRadius = Math.round((1 / Math.log2(matrix.length)) * 30)

  return (
    <table 
      className={classNames(styles['tic-tac-toe-table'], isEnd && styles.ended)}
      style={{
        borderRadius: `${borderRadius}px`
      }}
    >
      <tbody>
        {matrix.map((row, y) => (
          <tr key={y}>
            {row.map((item, x) => (
              <TableField
                onClick={() => onElementClick({ x, y })}
                key={x}
                className={isCoordsInMatch(match, { x, y }) ? styles.highlighted : ''}
                fieldType={item}
                style={{
                  borderWidth: `${borderWidth}px`
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TicTacToeTable