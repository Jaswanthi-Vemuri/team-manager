import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, MessageSquare, Flag } from 'lucide-react'
import { format } from 'date-fns'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import clsx from 'clsx'

const priorityConfig = {
  high: { variant: 'destructive', icon: Flag },
  medium: { variant: 'warning', icon: Flag },
  low: { variant: 'default', icon: Flag },
}

export default function TaskCard({ task, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id || task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priority = priorityConfig[task.priority?.toLowerCase()] || priorityConfig.medium

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(task)}
      className={clsx(
        'bg-white rounded-xl border border-border p-4 cursor-pointer',
        'hover:shadow-card hover:border-primary-200 transition-all duration-200',
        isDragging && 'opacity-50 shadow-elevated rotate-2'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4 className="font-medium text-text-primary line-clamp-2">{task.title}</h4>
        <Badge variant={priority.variant} className="flex-shrink-0">
          {task.priority}
        </Badge>
      </div>

      {task.description && (
        <p className="text-sm text-text-secondary line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-text-muted">
          {task.dueDate && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(task.dueDate), 'MMM d')}
            </span>
          )}
          {task.comments?.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {task.comments.length}
            </span>
          )}
        </div>
        {task.assignee && (
          <Avatar name={task.assignee.name || task.assignee} size="sm" />
        )}
      </div>
    </div>
  )
}
