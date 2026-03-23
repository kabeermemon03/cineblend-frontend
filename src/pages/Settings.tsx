import { useState, useEffect } from 'react'
import { 
  User, 
  Lock, 
  Camera, 
  Save, 
  ChevronRight, 
  ArrowLeft, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff,
  Trash2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/lib/auth-service'
import { userService } from '@/lib/firebase-services'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Toggle = ({ enabled, onChange, label, description }: { enabled: boolean, onChange: (val: boolean) => void, label: string, description?: string }) => (
  <div className="flex items-center justify-between group py-2">
    <div className="space-y-1">
      <p className="text-sm font-bold text-white group-hover:text-mocha transition-colors">{label}</p>
      {description && <p className="text-[10px] text-white/40 font-medium">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={cn(
        "w-12 h-6 rounded-full transition-all duration-500 relative flex items-center px-1",
        enabled ? "bg-mocha shadow-[0_0_15px_rgba(183,148,110,0.4)]" : "bg-white/10"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full bg-white transition-all duration-500 shadow-sm",
        enabled ? "translate-x-6" : "translate-x-0"
      )} />
    </button>
  </div>
);

const Settings = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [email] = useState(user?.email || '')
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [notificationPrefs, setNotificationPrefs] = useState({
    requests: true,
    promotional: false,
    security: true,
    revisions: true
  })

  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: true,
    dataSharing: false,
    showEmail: false
  })

  useEffect(() => {
    const fetchPrefs = async () => {
      if (user?.uid) {
        try {
          const profile = await userService.getProfile(user.uid);
          if (profile?.notificationPrefs) setNotificationPrefs(profile.notificationPrefs);
          if (profile?.privacySettings) setPrivacySettings(profile.privacySettings);
        } catch (e) {
          // Silent fail for profile fetch to avoid console clutter
        }
      }
    };
    fetchPrefs();
  }, [user]);

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

  const handleUpdatePrefs = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      await userService.updateProfile(user.uid, { 
        notificationPrefs,
        privacySettings 
      });
      toast.success('Preferences updated');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
    setLoading(false);
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

  const sections = [
    { label: 'Profile Info', icon: User, id: 'profile' },
    { label: 'Security', icon: Lock, id: 'password' },
    { label: 'Notifications', icon: Bell, id: 'notifications' },
    { label: 'Privacy & Data', icon: Shield, id: 'privacy' },
  ];

  return (
    <div className="min-h-screen pt-40 pb-20 bg-black relative overflow-hidden selection:bg-mocha/30">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-mocha/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-dark/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-6">
            <motion.button 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-white/40 hover:text-white transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Console</span>
            </motion.button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none"
                >
                  Account <span className="text-mocha italic">Control</span>
                </motion.h1>
                <p className="text-white/30 text-lg font-medium tracking-tight">Manage your identity, security, and experience.</p>
              </div>
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="" className="w-12 h-12 rounded-xl border border-mocha/20" />
                <div>
                  <p className="text-sm font-black uppercase text-white">{user?.displayName}</p>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Navigation (Sticky) */}
            <div className="lg:col-span-1 space-y-3 h-fit lg:sticky lg:top-40">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="w-full p-5 flex items-center justify-between rounded-2xl bg-white/[0.02] border border-white/5 hover:border-mocha/30 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-mocha transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-mocha group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Forms */}
            <div className="lg:col-span-3 space-y-12">
              {/* Profile Form */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                id="profile" 
                className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 space-y-10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-mocha/5 blur-[80px] pointer-events-none group-hover:bg-mocha/10 transition-all duration-700" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-mocha/10 flex items-center justify-center text-mocha shadow-xl shadow-mocha/5">
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Identity</h2>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Profile Information</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-10 pb-4">
                    <div className="relative group/avatar">
                      <div className="w-40 h-40 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden group-hover/avatar:border-mocha/50 transition-all duration-700 p-1">
                        <div className="w-full h-full rounded-[2rem] overflow-hidden">
                          {photoURL ? (
                            <img src={photoURL} alt="" className="w-full h-full object-cover scale-105 group-hover/avatar:scale-100 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/5">
                              <User className="w-16 h-16" />
                            </div>
                          )}
                        </div>
                      </div>
                      <button 
                        type="button"
                        className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-mocha text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
                      >
                        <Camera className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-1">Avatar URL</label>
                        <input 
                          type="text"
                          value={photoURL}
                          onChange={(e) => setPhotoURL(e.target.value)}
                          placeholder="https://example.com/avatar.jpg"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-1">Full Name</label>
                      <input 
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.05] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-1">Account Email</label>
                      <input 
                        type="email"
                        value={email}
                        readOnly
                        className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-5 px-8 text-sm text-white/40 outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="glow" disabled={loading} className="w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px]">
                    {loading ? 'Processing...' : 'Synchronize Identity'}
                    {!loading && <Save className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              </motion.section>

              {/* Security Form */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                id="password" 
                className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 space-y-10"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-xl shadow-purple-500/5">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Security</h2>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Authentication & Protection</p>
                  </div>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 relative">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-1">New Password</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.05] transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-[52px] text-white/20 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-1">Verify Password</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm text-white placeholder:text-white/10 outline-none focus:border-mocha/40 focus:bg-white/[0.05] transition-all"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="outline" disabled={loading} className="w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] border-white/10 text-white/40 hover:text-white hover:border-mocha/40 transition-all">
                    {loading ? 'Securing...' : 'Update Security Protocol'}
                  </Button>
                </form>
              </motion.section>

              {/* Notifications */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                id="notifications" 
                className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 space-y-10"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-xl shadow-orange-500/5">
                    <Bell className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Alerts</h2>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Notification Preferences</p>
                  </div>
                </div>

                <div className="space-y-6 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                  <Toggle 
                    label="Project Updates" 
                    description="Get notified when your request status changes."
                    enabled={notificationPrefs.requests} 
                    onChange={(val) => setNotificationPrefs({...notificationPrefs, requests: val})} 
                  />
                  <div className="h-[1px] bg-white/5" />
                  <Toggle 
                    label="Revision Alerts" 
                    description="Receive updates on your project revision requests."
                    enabled={notificationPrefs.revisions} 
                    onChange={(val) => setNotificationPrefs({...notificationPrefs, revisions: val})} 
                  />
                  <div className="h-[1px] bg-white/5" />
                  <Toggle 
                    label="Promotional Emails" 
                    description="Special offers, new features, and creative insights."
                    enabled={notificationPrefs.promotional} 
                    onChange={(val) => setNotificationPrefs({...notificationPrefs, promotional: val})} 
                  />
                  <div className="h-[1px] bg-white/5" />
                  <Toggle 
                    label="Security Protocols" 
                    description="Login alerts and account security notifications."
                    enabled={notificationPrefs.security} 
                    onChange={(val) => setNotificationPrefs({...notificationPrefs, security: val})} 
                  />
                </div>

                <Button onClick={handleUpdatePrefs} variant="glow" disabled={loading} className="w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px]">
                  {loading ? 'Saving...' : 'Confirm Alert Settings'}
                </Button>
              </motion.section>

              {/* Privacy */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                id="privacy" 
                className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 md:p-14 space-y-10"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-xl shadow-blue-500/5">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Privacy</h2>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Data & Visibility Settings</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-6 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                    <Toggle 
                      label="Public Profile Visibility" 
                      description="Allow others to see your public portfolio contributions."
                      enabled={privacySettings.publicProfile} 
                      onChange={(val) => setPrivacySettings({...privacySettings, publicProfile: val})} 
                    />
                    <div className="h-[1px] bg-white/5" />
                    <Toggle 
                      label="Data Analytics Sharing" 
                      description="Help us improve by sharing anonymous usage data."
                      enabled={privacySettings.dataSharing} 
                      onChange={(val) => setPrivacySettings({...privacySettings, dataSharing: val})} 
                    />
                  </div>

                  <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center gap-4 text-red-500">
                      <Trash2 size={24} />
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight">Danger Zone</p>
                        <p className="text-[10px] font-bold text-red-500/40 uppercase tracking-widest">Permanent Account Deletion</p>
                      </div>
                    </div>
                    <p className="text-xs text-red-500/60 leading-relaxed font-medium">
                      Deleting your account will permanently remove all your data, including active requests, 
                      completed projects, and personal information. This action cannot be undone.
                    </p>
                    <Button variant="outline" className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                      Terminate Account
                    </Button>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings