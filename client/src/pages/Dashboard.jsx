import { useState, useEffect } from 'react'
import {
  CheckSquare,
  FolderKanban,
  Users,
  TrendingUp,
} from 'lucide-react'
import Header from '../components/layout/Header'
import KPICard from '../components/dashboard/KPICard'
import TaskAnalytics from '../components/dashboard/TaskAnalytics'
import RecentTasks from '../components/dashboard/RecentTasks'
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import { SkeletonCard } from '../components/ui/Skeleton'

const kpiData = [
  { title: 'Total Tasks', value: '128', change: '12% from last week', changeType: 'positive', icon: CheckSquare },
  { title: 'Active Projects', value: '12', change: '2 new this month', changeType: 'positive', icon: FolderKanban },
  { title: 'Team Members', value: '24', change: '3 pending invites', icon: Users },
  { title: 'Productivity', value: '87%', change: '5% increase', changeType: 'positive', icon: TrendingUp },
]

export default function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      <Header title="Dashboard" />

      <div className="p-4 lg:p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : kpiData.map((kpi, index) => (
                <KPICard key={kpi.title} {...kpi} index={index} />
              ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <TaskAnalytics />
            <RecentTasks />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <UpcomingDeadlines />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  )
}
