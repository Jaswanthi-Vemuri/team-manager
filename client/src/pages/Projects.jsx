import { useState, useEffect, useCallback } from 'react'
import { Plus, Search, Filter, FolderKanban } from 'lucide-react'
import Header from '../components/layout/Header'
import ProjectCard from '../components/projects/ProjectCard'
import CreateProjectModal from '../components/projects/CreateProjectModal'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useToast } from '../hooks/useToast'

const mockProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    color: 'hsl(252, 90%, 60%)',
    dueDate: '2025-03-15',
    members: [{ name: 'Alex Chen' }, { name: 'Sarah Kim' }, { name: 'Mike Ross' }],
    tasks: [
      { status: 'completed' },
      { status: 'completed' },
      { status: 'in-progress' },
      { status: 'todo' },
    ],
  },
  {
    id: 2,
    name: 'Mobile App v2',
    description: 'New version of mobile application with enhanced features',
    color: 'hsl(263, 70%, 50%)',
    dueDate: '2025-04-01',
    members: [{ name: 'John Doe' }, { name: 'Emma Liu' }],
    tasks: [
      { status: 'completed' },
      { status: 'in-progress' },
      { status: 'in-progress' },
      { status: 'todo' },
      { status: 'todo' },
    ],
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Third-party API integrations for payment and analytics',
    color: 'hsl(200, 80%, 50%)',
    dueDate: '2025-02-28',
    members: [{ name: 'Sarah Kim' }, { name: 'Alex Chen' }, { name: 'John Doe' }, { name: 'Emma Liu' }, { name: 'Mike Ross' }],
    tasks: [
      { status: 'completed' },
      { status: 'completed' },
      { status: 'completed' },
    ],
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    description: 'Q2 marketing campaign planning and execution',
    color: 'hsl(330, 80%, 60%)',
    dueDate: '2025-03-30',
    members: [{ name: 'Mike Ross' }],
    tasks: [
      { status: 'todo' },
      { status: 'todo' },
    ],
  },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { addToast } = useToast()

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      // const res = await api.get('/api/projects')
      // setProjects(res.projects)
      // Using mock data for demo
      setTimeout(() => {
        setProjects(mockProjects)
        setLoading(false)
      }, 800)
    } catch {
      addToast('Failed to load projects', 'error')
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    Promise.resolve().then(fetchProjects)
  }, [fetchProjects])

  const handleCreateProject = async (data) => {
    try {
      // await api.post('/api/projects', data)
      const newProject = {
        id: Date.now(),
        ...data,
        members: [],
        tasks: [],
      }
      setProjects([newProject, ...projects])
      addToast('Project created successfully', 'success')
    } catch (err) {
      addToast('Failed to create project', 'error')
      throw err
    }
  }

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <Header
        title="Projects"
        action
        actionLabel="New Project"
        onAction={() => setShowCreateModal(true)}
      />

      <div className="p-4 lg:p-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-10"
            />
          </div>
          <Button variant="secondary">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button onClick={() => setShowCreateModal(true)} className="sm:hidden">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            description="Create your first project to start organizing your team's work."
            action={() => setShowCreateModal(true)}
            actionLabel="Create Project"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  )
}
