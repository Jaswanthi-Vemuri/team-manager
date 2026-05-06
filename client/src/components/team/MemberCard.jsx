import { motion } from 'framer-motion'
import { Mail, MoreHorizontal } from 'lucide-react'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Dropdown from '../ui/Dropdown'

export default function MemberCard({ member, index = 0, onEdit, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover className="text-center">
        <div className="flex justify-end mb-2">
          <Dropdown
            align="right"
            trigger={
              <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            }
            items={[
              { label: 'Edit Role', onClick: () => onEdit?.(member) },
              { label: 'Remove', onClick: () => onRemove?.(member), danger: true },
            ]}
          />
        </div>

        <div className="flex flex-col items-center">
          <Avatar name={member.name} size="xl" />
          <h3 className="text-lg font-semibold text-text-primary mt-4">{member.name}</h3>
          <p className="text-sm text-text-secondary mt-1">{member.email}</p>

          <Badge
            variant={member.role === 'admin' ? 'primary' : 'default'}
            className="mt-3"
          >
            {member.role || 'Member'}
          </Badge>

          <div className="flex items-center gap-4 mt-6 text-sm text-text-secondary">
            <span>{member.tasksCompleted || 0} tasks</span>
            <span>•</span>
            <span>{member.projects || 0} projects</span>
          </div>

          <button className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            <Mail className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </Card>
    </motion.div>
  )
}
