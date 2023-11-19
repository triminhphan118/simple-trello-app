import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { useEffect, useRef, useState } from 'react'

import { arrayMove } from '@dnd-kit/sortable'
import { useSensors } from '@dnd-kit/core'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { useCallback } from 'react'
import { generatePlaceHolderCard } from '~/utils/generate'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const [orderColumns, setOrderColumns] = useState([])

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldCoumnDataDraggingCard, setOldCoumnDataDraggingCard] = useState(null)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board?.columnOrderIds, board?.columns])

  const findColumnByCardId = (cardId) => {
    return orderColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumn = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeCardDraggingId,
    activeCardDraggingData
  ) => {
    setOrderColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card?._id === overCardId)
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.hieght
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns?.find((column) => column?._id === activeColumn?._id)
      const nextOverColumn = nextColumns?.find((column) => column?._id === overColumn?._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn?.cards?.filter((card) => card?._id !== activeCardDraggingId)
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceHolderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn?.cards?.map((card) => card._id)
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn?.cards?.filter((card) => card?._id !== activeCardDraggingId)
        const rebuild_activeDraggingData = {
          ...activeCardDraggingData,
          column_id: nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIndex, 0, rebuild_activeDraggingData)
        nextOverColumn.cards = nextOverColumn?.cards?.filter((card) => !card?.FE_PlaceholderCard)
        nextOverColumn.cardOrderIds = nextOverColumn?.cards?.map((card) => card._id)
      }
      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldCoumnDataDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }

    const { over, active } = event
    if (!over || !active) return

    const {
      id: activeCardDraggingId,
      data: { current: activeCardDraggingData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeCardDraggingId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn?._id !== overColumn?._id) {
      moveCardBetweenDifferentColumn(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeCardDraggingId,
        activeCardDraggingData
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || !active) return

    // card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeCardDraggingId,
        data: { current: activeCardDraggingData }
      } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeCardDraggingId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      if (oldCoumnDataDraggingCard?._id !== overColumn?._id) {
        moveCardBetweenDifferentColumn(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeCardDraggingId,
          activeCardDraggingData
        )
      } else {
        const oldIndex = oldCoumnDataDraggingCard?.cards?.findIndex((card) => card?._id === activeDragItemId)
        const newIndex = overColumn?.cards?.findIndex((card) => card?._id === overCardId)
        const orderedCards = arrayMove(oldCoumnDataDraggingCard?.cards, oldIndex, newIndex)
        setOrderColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns?.find((column) => column?._id === overColumn?._id)

          targetColumn.cards = orderedCards
          targetColumn.cardOrderIds = orderedCards?.map((c) => c._id)

          return nextColumns
        })
      }
      return
    }

    // column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (!over?.id) return

      if (active?.id !== over?.id) {
        const oldIndex = orderColumns?.findIndex((orderColumn) => orderColumn?._id === active?.id)
        const newIndex = orderColumns?.findIndex((orderColumn) => orderColumn?._id === over?.id)

        const orderedColumns = arrayMove(orderColumns, oldIndex, newIndex)
        const orderredColumn = orderedColumns?.map((orderColumn) => orderColumn?._id)

        setOrderColumns(orderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldCoumnDataDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: 0.5 } } })
  }

  const collisionDetection = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }
      const pointerCollisions = pointerWithin(args)

      if (!pointerCollisions) return

      let overId = getFirstCollision(pointerCollisions, 'id')

      if (overId) {
        const column = orderColumns?.find((column) => column?._id === overId)
        if (column) {
          overId = closestCorners({
            ...args,
            droppableContainers: args?.droppableContainers?.filter((container) => {
              return container?.id === overId && column?.cardOrderIds?.includes(container?.id)
            })
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId?.current ? [{ id: overId }] : []
    },
    [activeDragItemType, orderColumns]
  )

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      collisionDetection={collisionDetection}
    >
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
