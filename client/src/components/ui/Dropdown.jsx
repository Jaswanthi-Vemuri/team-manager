import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

export default function Dropdown({
  trigger,
  items,
  align = 'left',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger || (
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-surface-muted transition-colors">
            Select
            <ChevronDown className={clsx('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={clsx(
              'absolute z-50 mt-2 min-w-[180px] py-1 bg-white rounded-xl border border-border shadow-elevated',
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  item.onClick?.()
                  setIsOpen(false)
                }}
                className={clsx(
                  'w-full px-4 py-2 text-left text-sm hover:bg-surface-muted transition-colors flex items-center gap-2',
                  item.danger && 'text-status-destructive hover:bg-status-destructive-bg'
                )}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
