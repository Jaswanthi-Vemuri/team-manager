import { useState, useEffect, useCallback } from 'react'
import { Plus, Search, Users } from 'lucide-react'
import Header from '../components/layout/Header'
import MemberCard from '../components/team/MemberCard'
import InviteMemberModal from '../components/team/InviteMemberModal'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { SkeletonCard } from '../components/ui/Skeleton'
import { useToast } from '../hooks/useToast'

const mockMembers = [
  { id: 1, name: 'Alex Chen', email: 'alex@example.com', role: 'admin', tasksCompleted: 45, projects: 8 },
  { id: 2, name: 'Sarah Kim', email: 'sarah@example.com', role: 'member', tasksCompleted: 38, projects: 6 },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', role: 'member', tasksCompleted: 52, projects: 10 },
  { id: 4, name: 'Emma Liu', email: 'emma@example.com', role: 'member', tasksCompleted: 29, projects: 4 },
  { id: 5, name: 'John Doe', email: 'john@example.com', role: 'admin', tasksCompleted: 61, projects: 12 },
  { id: 6, name: 'Lisa Wang', email: 'lisa@example.com', role: 'member', tasksCompleted: 33, projects: 5 },
]

export default function Team() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { addToast } = useToast()

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    try {
      setTimeout(() => {
        setMembers(mockMembers)
        setLoading(false)
      }, 800)
    } catch {
      addToast('Failed to load team members', 'error')
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    Promise.resolve().then(fetchMembers)
  }, [fetchMembers])

  const handleInvite = async (data) => {
    try {
      addToast(`Invitation sent to ${data.email}`, 'success')
    } catch (err) {
      addToast('Failed to send invitation', 'error')
      throw err
    }
  }

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <Header
        title="Team"
        action
        actionLabel="Invite Member"
        onAction={() => setShowInviteModal(true)}
      />

      <div className="p-4 lg:p-8">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-base pl-10"
            />
          </div>
          <Button onClick={() => setShowInviteModal(true)} className="sm:hidden">
            <Plus className="w-4 h-4" />
            Invite
          </Button>
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No team members found"
            description="Invite your first team member to start collaborating."
            action={() => setShowInviteModal(true)}
            actionLabel="Invite Member"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={handleInvite}
      />
    </div>
  )
}
