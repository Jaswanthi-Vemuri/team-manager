import { motion } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'

const tasks = [
  { id: 1, title: 'Design system updates', status: 'In Progress', priority: 'High', assignee: 'Alex Chen', dueDate: '2025-02-15' },
  { id: 2, title: 'API integration', status: 'Completed', priority: 'Medium', assignee: 'Sarah Kim', dueDate: '2025-02-12' },
  { id: 3, title: 'User testing session', status: 'Pending', priority: 'High', assignee: 'Mike Ross', dueDate: '2025-02-18' },
  { id: 4, title: 'Documentation review', status: 'Overdue', priority: 'Low', assignee: 'Emma Liu', dueDate: '2025-02-10' },
  { id: 5, title: 'Performance optimization', status: 'In Progress', priority: 'Medium', assignee: 'John Doe', dueDate: '2025-02-20' },
]

const statusVariants = {
  'In Progress': 'info',
  'Completed': 'success',
  'Pending': 'warning',
  'Overdue': 'destructive',
}

const priorityVariants = {
  'High': 'destructive',
  'Medium': 'warning',
  'Low': 'default',
}

export default function RecentTasks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card padding={false}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary">Recent Tasks</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              View all
            </button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="px-6 py-4 flex items-center gap-4 hover:bg-surface-muted/50 transition-colors"
            >
              <Avatar name={task.assignee} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary truncate">{task.title}</p>
                <p className="text-sm text-text-secondary">{task.assignee}</p>
              </div>
              <Badge variant={priorityVariants[task.priority]}>{task.priority}</Badge>
              <Badge variant={statusVariants[task.status]}>{task.status}</Badge>
              <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
