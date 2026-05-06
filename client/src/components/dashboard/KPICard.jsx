import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-border p-6 shadow-soft"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
          {change && (
            <p
              className={clsx(
                'text-sm font-medium mt-2',
                changeType === 'positive' && 'text-status-success',
                changeType === 'negative' && 'text-status-destructive',
                !changeType && 'text-text-secondary'
              )}
            >
              {changeType === 'positive' && '+'}
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
