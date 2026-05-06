import { useState } from 'react'
import { Search, Bell, Plus } from 'lucide-react'
import Button from '../ui/Button'
import Dropdown from '../ui/Dropdown'
import Avatar from '../ui/Avatar'
import { useAuth } from '../../hooks/useAuth'

export default function Header({ title, action, actionLabel, onAction }) {
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 bg-surface-muted/80 backdrop-blur-xl border-b border-border">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Title */}
          <div className="lg:hidden w-12" /> {/* Spacer for mobile menu button */}
          <h1 className="text-2xl font-bold text-text-primary hidden lg:block">{title}</h1>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {action && (
              <Button onClick={onAction} className="hidden sm:flex">
                <Plus className="w-4 h-4" />
                {actionLabel}
              </Button>
            )}

            <button className="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-status-destructive rounded-full" />
            </button>

            <Dropdown
              align="right"
              trigger={
                <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface transition-colors">
                  <Avatar name={user?.name} size="sm" />
                </button>
              }
              items={[
                { label: 'Profile', onClick: () => {} },
                { label: 'Settings', onClick: () => {} },
                { label: 'Logout', onClick: () => {}, danger: true },
              ]}
            />
          </div>
        </div>

        {/* Mobile title */}
        <h1 className="text-xl font-bold text-text-primary mt-4 lg:hidden">{title}</h1>
      </div>
    </header>
  )
}
