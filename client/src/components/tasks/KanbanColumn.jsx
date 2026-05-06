import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import TaskCard from './TaskCard'
import clsx from 'clsx'

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-surface-subtle', accent: 'bg-text-muted' },
  'in-progress': { label: 'In Progress', color: 'bg-status-info-bg', accent: 'bg-status-info' },
  completed: { label: 'Completed', color: 'bg-status-success-bg', accent: 'bg-status-success' },
}

export default function KanbanColumn({ id, tasks, onAddTask, onTaskClick }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const config = statusConfig[id] || statusConfig.todo

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'flex-1 min-w-[300px] rounded-2xl p-4 transition-colors',
        config.color,
        isOver && 'ring-2 ring-primary-500 ring-offset-2'
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={clsx('w-3 h-3 rounded-full', config.accent)} />
          <h3 className="font-semibold text-text-primary">{config.label}</h3>
          <span className="px-2 py-0.5 rounded-full bg-white text-xs font-medium text-text-secondary">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask?.(id)}
          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/50 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <SortableContext items={tasks.map(t => t._id || t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard
              key={task._id || task.id}
              task={task}
              onClick={onTaskClick}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
