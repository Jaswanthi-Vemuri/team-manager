import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import KanbanColumn from './KanbanColumn'
import TaskCard from './TaskCard'

const columns = ['todo', 'in-progress', 'completed']

export default function KanbanBoard({ tasks, onTaskMove, onAddTask, onTaskClick }) {
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => {
      const taskStatus = task.status?.toLowerCase().replace(' ', '-') || 'todo'
      return taskStatus === status
    })
  }

  const handleDragStart = (event) => {
    const task = tasks.find((t) => (t._id || t.id) === event.active.id)
    setActiveTask(task)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = active.id
    const overId = over.id

    // Check if dropped on a column
    if (columns.includes(overId)) {
      onTaskMove?.(taskId, overId)
    } else {
      // Dropped on another task - find its column
      const overTask = tasks.find((t) => (t._id || t.id) === overId)
      if (overTask) {
        const newStatus = overTask.status?.toLowerCase().replace(' ', '-') || 'todo'
        onTaskMove?.(taskId, newStatus)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            id={column}
            tasks={getTasksByStatus(column)}
            onAddTask={onAddTask}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && <TaskCard task={activeTask} />}
      </DragOverlay>
    </DndContext>
  )
}
