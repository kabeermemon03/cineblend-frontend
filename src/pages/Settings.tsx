import { useState } from 'react'
import { User, Mail, Lock, Camera, Save, ChevronRight, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/lib/auth-service'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

const Settings = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await authService.updateUserProfile(displayName, photoURL)
    if (error) {
      toast.error(authService.getErrorMessage(error))
    } else {
      toast.success('Profile updated successfully')
    }
    setLoading(false)
  }

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await authService.updateUserEmail(email)
    if (error) {
      toast.error(authService.getErrorMessage(error))
    } else {
      toast.success('Email updated successfully')
    }
    setLoading(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    const { error } = await authService.updateUserPassword(newPassword)
    if (error) {
      toast.error(authService.getErrorMessage(error))
    } else {
      toast.success('Password updated successfully')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-mocha/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-dark/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors group mb-4"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
              </button>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                Account <span className="text-mocha">Settings</span>
              </h1>
              <p className="text-white/40 text-lg font-medium">Manage your profile and security preferences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Navigation (Sticky) */}
            <div className="lg:col-span-1 space-y-4 h-fit lg:sticky lg:top-32">
              {[
                { label: 'Profile Information', icon: User, id: 'profile' },
                { label: 'Email Address', icon: Mail, id: 'email' },
                { label: 'Password & Security', icon: Lock, id: 'password' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="w-full p-6 flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/5 hover:border-mocha/30 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-mocha transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-mocha group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Form */}
              <section id="profile" className="glass-card p-10 md:p-12 rounded-[3rem] border-white/5 bg-white/[0.02] backdrop-blur-3xl space-y-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-mocha/10 flex items-center justify-center text-mocha">
                    <User className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Profile Information</h2>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-8 pb-4">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 overflow-hidden group-hover:border-mocha/50 transition-all duration-500">
                        {photoURL ? (
                          <img src={photoURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10">
                            <User className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      <button 
                        type="button"
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-mocha text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 space-y-2 w-full">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Avatar URL</label>
                      <input 
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Full Name</label>
                    <input 
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  <Button type="submit" variant="glow" disabled={loading} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs">
                    {loading ? 'Saving Changes...' : 'Update Profile'}
                    {!loading && <Save className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              </section>

              {/* Email Form */}
              <section id="email" className="glass-card p-10 md:p-12 rounded-[3rem] border-white/5 bg-white/[0.02] backdrop-blur-3xl space-y-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Email Address</h2>
                </div>

                <form onSubmit={handleUpdateEmail} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Current Email</label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-mocha/40 transition-all"
                    />
                  </div>
                  <Button type="submit" variant="outline" disabled={loading} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs border-white/10 text-white/40 hover:text-white">
                    {loading ? 'Updating Email...' : 'Update Email'}
                  </Button>
                </form>
              </section>

              {/* Password Form */}
              <section id="password" className="glass-card p-10 md:p-12 rounded-[3rem] border-white/5 bg-white/[0.02] backdrop-blur-3xl space-y-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Password & Security</h2>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">New Password</label>
                    <input 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Confirm New Password</label>
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/10 outline-none focus:border-mocha/40 transition-all"
                    />
                  </div>
                  <Button type="submit" variant="outline" disabled={loading} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs border-white/10 text-white/40 hover:text-white">
                    {loading ? 'Changing Password...' : 'Change Password'}
                  </Button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings