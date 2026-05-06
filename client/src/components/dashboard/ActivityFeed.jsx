import { motion } from 'framer-motion'
import { CheckCircle, MessageSquare, UserPlus, FolderPlus } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'

const activities = [
  {
    id: 1,
    type: 'task_completed',
    user: 'Sarah Kim',
    action: 'completed',
    target: 'API Integration',
    time: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 2,
    type: 'comment',
    user: 'Alex Chen',
    action: 'commented on',
    target: 'Design System',
    time: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 3,
    type: 'member_added',
    user: 'Mike Ross',
    action: 'added',
    target: 'Emma Liu',
    extra: 'to the team',
    time: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: 4,
    type: 'project_created',
    user: 'John Doe',
    action: 'created project',
    target: 'Mobile App v2',
    time: new Date(Date.now() - 1000 * 60 * 180),
  },
]

const icons = {
  task_completed: CheckCircle,
  comment: MessageSquare,
  member_added: UserPlus,
  project_created: FolderPlus,
}

const iconColors = {
  task_completed: 'text-status-success bg-status-success-bg',
  comment: 'text-status-info bg-status-info-bg',
  member_added: 'text-primary-600 bg-primary-100',
  project_created: 'text-status-warning bg-status-warning-bg',
}

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-6">Activity Feed</h3>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = icons[activity.type]
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar name={activity.user} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium text-primary-600">{activity.target}</span>
                    {activity.extra && ` ${activity.extra}`}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${iconColors[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}
