import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, PointerSensor, TouchSensor, useSensor } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

import { arrayMove } from '@dnd-kit/sortable'
import { useSensors } from '@dnd-kit/core'

function BoardContent({ board }) {
  const [orderColumns, setOrderColumns] = useState([])

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board?.columnOrderIds, board?.columns])

  const handleDragEnd = (event) => {
    const { active, over } = event
    console.log(event)

    if (!over?.id) return

    if (active?.id !== over?.id) {
      const oldIndex = orderColumns?.findIndex((orderColumn) => orderColumn?._id === active?.id)
      const newIndex = orderColumns?.findIndex((orderColumn) => orderColumn?._id === over?.id)

      const orderedColumns = arrayMove(orderColumns, oldIndex, newIndex)
      const orderredColumn = orderedColumns?.map((orderColumn) => orderColumn?._id)

      setOrderColumns(orderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
      </Box>
    </DndContext>
  )
}

export default BoardContent
