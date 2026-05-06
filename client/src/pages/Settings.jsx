import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, Globe } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'language', label: 'Language', icon: Globe },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const { user } = useAuth()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    addToast('Settings saved successfully', 'success')
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      <Header title="Settings" />

      <div className="p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Card className="lg:w-64 p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-muted'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <Card>
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Profile Information</h3>
                    <p className="text-sm text-text-secondary">Update your personal details and avatar.</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <Button variant="secondary" size="sm">Change Avatar</Button>
                      <p className="text-xs text-text-muted mt-2">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input label="Full Name" defaultValue={user?.name} />
                    <Input label="Email" type="email" defaultValue={user?.email} />
                    <Input label="Job Title" placeholder="e.g. Software Engineer" />
                    <Input label="Department" placeholder="e.g. Engineering" />
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button onClick={handleSave} loading={loading}>Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Notification Preferences</h3>
                    <p className="text-sm text-text-secondary">Choose how you want to be notified.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Email notifications', description: 'Receive updates via email' },
                      { label: 'Push notifications', description: 'Receive push notifications in browser' },
                      { label: 'Task assignments', description: 'When someone assigns you a task' },
                      { label: 'Task comments', description: 'When someone comments on your tasks' },
                      { label: 'Project updates', description: 'Updates to projects you\'re part of' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-surface-muted">
                        <div>
                          <p className="font-medium text-text-primary">{item.label}</p>
                          <p className="text-sm text-text-secondary">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-surface-subtle peer-focus:ring-2 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button onClick={handleSave} loading={loading}>Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Security Settings</h3>
                    <p className="text-sm text-text-secondary">Manage your password and security options.</p>
                  </div>

                  <div className="space-y-6">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                  </div>

                  <div className="p-4 rounded-xl bg-status-warning-bg border border-status-warning/20">
                    <p className="text-sm font-medium text-status-warning">Two-Factor Authentication</p>
                    <p className="text-sm text-text-secondary mt-1">Add an extra layer of security to your account.</p>
                    <Button variant="outline" size="sm" className="mt-3">Enable 2FA</Button>
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button onClick={handleSave} loading={loading}>Update Password</Button>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Appearance</h3>
                    <p className="text-sm text-text-secondary">Customize the look and feel of the app.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Light', 'Dark', 'System'].map((theme) => (
                        <button
                          key={theme}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            theme === 'Light'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-border hover:border-primary-200'
                          }`}
                        >
                          <div className={`w-full h-16 rounded-lg mb-2 ${
                            theme === 'Dark' ? 'bg-sidebar' : theme === 'System' ? 'bg-gradient-to-r from-white to-sidebar' : 'bg-white border border-border'
                          }`} />
                          <p className="text-sm font-medium text-text-primary">{theme}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button onClick={handleSave} loading={loading}>Save Changes</Button>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-1">Language & Region</h3>
                    <p className="text-sm text-text-secondary">Set your preferred language and regional settings.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text-primary">Language</label>
                      <select className="input-base">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text-primary">Timezone</label>
                      <select className="input-base">
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>UTC</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-text-primary">Date Format</label>
                      <select className="input-base">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <Button onClick={handleSave} loading={loading}>Save Changes</Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
