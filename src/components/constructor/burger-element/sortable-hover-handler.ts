import { MutableRefObject } from 'react'
import { DropTargetMonitor } from 'react-dnd'
import { AnyAction, Dispatch } from 'redux'

import { moveConstructorItem, setMovingItemIndex } from '../../../services/constructor/actions'
import { IDragFullItem, IDragItem } from '../../../utils/types'

export const sortableHoverHandler = (
  ref: MutableRefObject<HTMLInputElement | null>,
  dispatch: Dispatch<AnyAction>,
  hoverIndex: number | undefined,
  itemsArrayLength: number,
  dragItem: IDragItem | IDragFullItem,
  monitor: DropTargetMonitor<IDragFullItem, void>
) => {
  const dragIndex = dragItem.index

  // Don't replace items without ref
  // Don't replace items without index
  // Don't replace items with themselves
  if (!ref.current) return
  if (typeof hoverIndex === 'undefined' || typeof dragIndex === 'undefined') return
  if (dragIndex === hoverIndex) return

  // Determine rectangle on screen
  const hoverBoundingRect = ref.current?.getBoundingClientRect()
  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
  // Determine mouse position
  const clientOffset = monitor.getClientOffset()
  // Get pixels to the top
  const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards:
  if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    return
  }
  // Dragging upwards:
  if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    return
  }
  // Dragging downwards when dragItem is the last already:
  if (hoverIndex === 0 && dragIndex === itemsArrayLength - 1) {
    return
  }

  // Time to actually perform the action
  dispatch(moveConstructorItem(dragIndex, hoverIndex))
  dispatch(setMovingItemIndex(hoverIndex))

  // NOTE: we're mutating the monitor dragItem here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  dragItem.index = hoverIndex
}
