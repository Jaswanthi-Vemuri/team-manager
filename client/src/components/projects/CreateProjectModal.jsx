import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'

const colors = [
  'hsl(252, 90%, 60%)',
  'hsl(263, 70%, 50%)',
  'hsl(330, 80%, 60%)',
  'hsl(200, 80%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
]

export default function CreateProjectModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: colors[0],
    dueDate: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit?.(formData)
      setFormData({ name: '', description: '', color: colors[0], dueDate: '' })
      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Project Name"
          placeholder="Enter project name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-text-primary">
            Description
          </label>
          <textarea
            placeholder="Enter project description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="input-base resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-text-primary">
            Color
          </label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-8 h-8 rounded-lg transition-transform ${
                  formData.color === color ? 'ring-2 ring-offset-2 ring-primary-500 scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" loading={loading} className="flex-1">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  )
}
