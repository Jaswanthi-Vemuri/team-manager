import { motion } from 'framer-motion'
import { MoreHorizontal, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import ProgressBar from '../ui/ProgressBar'
import Dropdown from '../ui/Dropdown'

export default function ProjectCard({ project, index = 0, onEdit, onDelete }) {
  const completedTasks = project.tasks?.filter(t => t.status === 'completed').length || 0
  const totalTasks = project.tasks?.length || 0
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: project.color || 'hsl(252, 90%, 60%)' }}
          >
            {project.name?.[0]?.toUpperCase() || 'P'}
          </div>
          <Dropdown
            align="right"
            trigger={
              <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            }
            items={[
              { label: 'Edit', onClick: () => onEdit?.(project) },
              { label: 'Delete', onClick: () => onDelete?.(project), danger: true },
            ]}
          />
        </div>

        <h3 className="text-lg font-semibold text-text-primary mb-2">{project.name}</h3>
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {project.description || 'No description provided'}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary">Progress</span>
              <span className="font-medium text-text-primary">
                {completedTasks}/{totalTasks} tasks
              </span>
            </div>
            <ProgressBar value={progress} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex -space-x-2">
              {project.members?.slice(0, 4).map((member, i) => (
                <Avatar key={i} name={member.name} size="sm" />
              ))}
              {project.members?.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-surface-subtle border-2 border-white flex items-center justify-center text-xs font-medium text-text-secondary">
                  +{project.members.length - 4}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-text-secondary">
              <Calendar className="w-4 h-4" />
              {project.dueDate
                ? format(new Date(project.dueDate), 'MMM d')
                : 'No deadline'}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
