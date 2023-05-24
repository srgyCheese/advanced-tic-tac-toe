import { CSSProperties, useRef } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import fadeSizeTransition from './fade-size-transition.module.css'
import { FieldTypes } from '../../utils/TicTacToe/types'

type Props = {
  onClick?: () => void,
  className?: string,
  fieldType: FieldTypes,
  style?: CSSProperties
}

const TableField = ({ onClick, className, fieldType, style }: Props) => {
  let tdInner = null

  const xRef = useRef<HTMLDivElement>(null)
  const yRef = useRef<HTMLDivElement>(null)
  const emptyRef = useRef<HTMLDivElement>(null)

  let nodeRef = emptyRef

  switch (fieldType) {
    case FieldTypes.X:
      nodeRef = xRef
      tdInner = <svg version="1.1" fill='white' viewBox="0 0 460.775 460.775">
        <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
      </svg>
      break
    case FieldTypes.O:
      nodeRef = yRef
      tdInner = <svg version="1.1" viewBox="0 0 94 94">
        <g>
          <g>
            <path fill='white' d="M47,94C21.084,94,0,72.916,0,47S21.084,0,47,0s47,21.084,47,47S72.916,94,47,94z M47,12.186
          c-19.196,0-34.814,15.618-34.814,34.814c0,19.195,15.618,34.814,34.814,34.814c19.195,0,34.814-15.619,34.814-34.814
          C81.814,27.804,66.195,12.186,47,12.186z"/>
          </g>
        </g>
      </svg>
      break
    default:
      nodeRef = emptyRef
      tdInner = <svg version="1.1" viewBox="0 0 94 94">
        <g>
          <g>
            <path d="" />
          </g>
        </g>
      </svg>
      break
  }

  return (
    <td
      onClick={onClick}
      className={className}
      style={style}
    >
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={fieldType}
          nodeRef={nodeRef}
          addEndListener={(done) => {
            nodeRef?.current?.addEventListener('transitionend', done, false)
          }}
          timeout={{
            appear: 300,
            enter: 300,
            exit: fieldType === FieldTypes.EMPTY ? 0 : 300
          }}
          classNames={fadeSizeTransition}
        >
          <div ref={nodeRef}>
            {tdInner}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </td>
  )
}

export default TableField