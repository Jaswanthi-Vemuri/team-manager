import { useState, useEffect, useCallback } from 'react'
import { Plus, Filter, CheckSquare } from 'lucide-react'
import Header from '../components/layout/Header'
import KanbanBoard from '../components/tasks/KanbanBoard'
import CreateTaskModal from '../components/tasks/CreateTaskModal'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import { useToast } from '../hooks/useToast'

const mockTasks = [
  { id: 1, title: 'Design system updates', description: 'Update color tokens and typography', status: 'todo', priority: 'High', dueDate: '2025-02-15', assignee: { name: 'Alex Chen' } },
  { id: 2, title: 'API integration', description: 'Connect payment gateway API', status: 'in-progress', priority: 'High', dueDate: '2025-02-12', assignee: { name: 'Sarah Kim' } },
  { id: 3, title: 'User testing', description: 'Conduct usability testing sessions', status: 'todo', priority: 'Medium', dueDate: '2025-02-18', assignee: { name: 'Mike Ross' } },
  { id: 4, title: 'Documentation', description: 'Write API documentation', status: 'completed', priority: 'Low', dueDate: '2025-02-10', assignee: { name: 'Emma Liu' } },
  { id: 5, title: 'Performance optimization', description: 'Improve page load times', status: 'in-progress', priority: 'Medium', dueDate: '2025-02-20', assignee: { name: 'John Doe' } },
  { id: 6, title: 'Mobile responsive fixes', description: 'Fix layout issues on mobile devices', status: 'todo', priority: 'High', dueDate: '2025-02-14', assignee: { name: 'Alex Chen' } },
  { id: 7, title: 'Database migration', description: 'Migrate to new database schema', status: 'completed', priority: 'High', dueDate: '2025-02-08', assignee: { name: 'Sarah Kim' } },
  { id: 8, title: 'Security audit', description: 'Conduct security review', status: 'in-progress', priority: 'High', dueDate: '2025-02-16', assignee: { name: 'Mike Ross' } },
]

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createStatus, setCreateStatus] = useState('todo')
  const { addToast } = useToast()

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      // const res = await api.get('/api/tasks')
      // setTasks(res.tasks)
      setTimeout(() => {
        setTasks(mockTasks)
        setLoading(false)
      }, 800)
    } catch {
      addToast('Failed to load tasks', 'error')
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    Promise.resolve().then(fetchTasks)
  }, [fetchTasks])

  const handleCreateTask = async (data) => {
    try {
      const newTask = {
        id: Date.now(),
        ...data,
        assignee: { name: 'You' },
      }
      setTasks([...tasks, newTask])
      addToast('Task created successfully', 'success')
    } catch (err) {
      addToast('Failed to create task', 'error')
      throw err
    }
  }

  const handleTaskMove = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        (task.id || task._id) === taskId
          ? { ...task, status: newStatus }
          : task
      )
    )
    addToast('Task updated', 'success')
  }

  const handleAddTask = (status) => {
    setCreateStatus(status)
    setShowCreateModal(true)
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Tasks"
        action
        actionLabel="New Task"
        onAction={() => setShowCreateModal(true)}
      />

      <div className="p-4 lg:p-8">
        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <Button variant="secondary">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button onClick={() => setShowCreateModal(true)} className="sm:hidden">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Kanban Board */}
        {loading ? (
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 min-w-[300px] bg-surface-subtle rounded-2xl p-4">
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-32 w-full rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No tasks yet"
            description="Create your first task to start tracking your work."
            action={() => setShowCreateModal(true)}
            actionLabel="Create Task"
          />
        ) : (
          <KanbanBoard
            tasks={tasks}
            onTaskMove={handleTaskMove}
            onAddTask={handleAddTask}
          />
        )}
      </div>

      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTask}
        initialStatus={createStatus}
      />
    </div>
  )
}
