import { motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import clsx from 'clsx'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const styles = {
  success: 'bg-status-success-bg border-status-success text-status-success',
  error: 'bg-status-destructive-bg border-status-destructive text-status-destructive',
  info: 'bg-status-info-bg border-status-info text-status-info',
  warning: 'bg-status-warning-bg border-status-warning text-status-warning',
}

export default function Toast({ message, type = 'info', onClose }) {
  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={clsx(
        'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-card min-w-[300px]',
        styles[type]
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button onClick={onClose} className="p-1 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}
