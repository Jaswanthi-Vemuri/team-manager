import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'
import Card from '../ui/Card'
import clsx from 'clsx'

const deadlines = [
  { id: 1, title: 'Q1 Report submission', date: '2025-02-15', project: 'Finance' },
  { id: 2, title: 'Product launch', date: '2025-02-18', project: 'Marketing' },
  { id: 3, title: 'Client presentation', date: '2025-02-20', project: 'Sales' },
  { id: 4, title: 'Code review deadline', date: '2025-02-22', project: 'Engineering' },
]

export default function UpcomingDeadlines() {
  const today = new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card>
        <h3 className="text-lg font-semibold text-text-primary mb-6">Upcoming Deadlines</h3>
        <div className="space-y-4">
          {deadlines.map((deadline) => {
            const daysUntil = differenceInDays(new Date(deadline.date), today)
            const isUrgent = daysUntil <= 3

            return (
              <div
                key={deadline.id}
                className={clsx(
                  'p-4 rounded-xl border transition-colors',
                  isUrgent
                    ? 'bg-status-destructive-bg border-status-destructive/20'
                    : 'bg-surface-muted border-border hover:border-primary-200'
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-text-primary">{deadline.title}</p>
                    <p className="text-sm text-text-secondary mt-1">{deadline.project}</p>
                  </div>
                  <div
                    className={clsx(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      isUrgent
                        ? 'bg-status-destructive text-white'
                        : 'bg-primary-100 text-primary-700'
                    )}
                  >
                    {daysUntil === 0
                      ? 'Today'
                      : daysUntil === 1
                      ? 'Tomorrow'
                      : `${daysUntil} days`}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(deadline.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}
