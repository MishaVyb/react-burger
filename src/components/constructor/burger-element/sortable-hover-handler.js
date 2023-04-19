import { moveConstructorItem, setMovingItemIndex } from '../../../services/constructor/actions'

export const sortableHoverHandler = (ref, dispatch, hoverIndex, itemsArrayLength, dragItem, monitor) => {
  if (!ref.current) {
    return
  }
  const dragIndex = dragItem.index
  //console.log({hoverIndex, dragIndex})

  // Don't replace items with themselves
  if (dragIndex === hoverIndex) {
    return
  }
  // Determine rectangle on screen
  const hoverBoundingRect = ref.current?.getBoundingClientRect()
  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
  // Determine mouse position
  const clientOffset = monitor.getClientOffset()
  // Get pixels to the top
  const hoverClientY = clientOffset.y - hoverBoundingRect.top

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

  // Note: we're mutating the monitor dragItem here!
  // Generally it's better to avoid mutations,
  // but it's good here for the sake of performance
  // to avoid expensive index searches.
  dragItem.index = hoverIndex
}
