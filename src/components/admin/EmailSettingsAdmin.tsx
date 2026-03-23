import React, { useState, useEffect } from 'react';
import { 
  Settings,
  Mail,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { adminService } from '@/lib/firebase-services';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export const EmailSettingsAdmin = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getEmailSettings();
        setSettings(data || {
          enabled: true,
          adminEmail: 'admin@cineblend.com',
          notifyOnNewRequest: true,
          notifyOnNewSignup: true,
          notifyOnRevision: true,
          statusUpdatesEnabled: true,
          smtpStatus: 'operational'
        });
      } catch (error) {
        toast.error('Failed to load email settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminService.updateEmailSettings(settings);
      toast.success('Email settings updated');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="py-24 text-center text-white/20">
      <Settings className="animate-spin mx-auto mb-4" size={24} />
      <p className="text-[10px] font-black uppercase tracking-widest">Loading settings...</p>
    </div>
  );

  return (
    <div className="max-w-4xl space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase tracking-tight">Email Notifications</h2>
        <Button variant="glow" size="sm" onClick={handleSave} isLoading={saving}>
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-lg font-black uppercase italic flex items-center gap-3">
              <ShieldCheck className="text-mocha" size={20} />
              Core Configuration
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div>
                <p className="text-sm font-bold text-white">System Enabled</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Master switch for all emails</p>
              </div>
              <button 
                onClick={() => setSettings({...settings, enabled: !settings.enabled})}
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-all duration-500",
                  settings.enabled ? "bg-mocha" : "bg-white/10"
                )}
              >
                <div className={cn("w-4 h-4 rounded-full bg-white transition-all", settings.enabled ? "translate-x-6" : "translate-x-0")} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Admin Notification Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:border-mocha/40 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-lg font-black uppercase italic flex items-center gap-3">
              <AlertTriangle className="text-orange-500" size={20} />
              System Status
            </h3>
            <div className="flex items-center justify-between p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase">SMTP Gateway</p>
                  <p className="text-[10px] text-orange-500/60 font-black uppercase tracking-widest">Operational</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Test Connection</Button>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 space-y-8">
          <h3 className="text-lg font-black uppercase italic">Notification Triggers</h3>
          
          <div className="space-y-4">
            {[
              { key: 'notifyOnNewRequest', label: 'New Project Requests', desc: 'Alert admin when a client submits a new Cinebit' },
              { key: 'notifyOnNewSignup', label: 'New User Signups', desc: 'Alert admin when a new client registers' },
              { key: 'notifyOnRevision', label: 'Revision Requests', desc: 'Alert admin when a client asks for changes' },
              { key: 'statusUpdatesEnabled', label: 'Client Status Updates', desc: 'Notify clients when project status changes' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-mocha/20 transition-all">
                <div className="flex-1">
                  <p className="text-sm font-bold text-white group-hover:text-mocha transition-colors">{item.label}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.desc}</p>
                </div>
                <button 
                  onClick={() => setSettings({...settings, [item.key]: !settings[item.key]})}
                  className={cn(
                    "w-12 h-6 rounded-full p-1 transition-all duration-500",
                    settings[item.key] ? "bg-mocha" : "bg-white/10"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-all", settings[item.key] ? "translate-x-6" : "translate-x-0")} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5">
            <div className="p-4 bg-mocha/5 rounded-2xl border border-mocha/10">
              <p className="text-[10px] text-mocha font-bold uppercase tracking-widest leading-relaxed">
                Tip: Ensure the admin email is a monitored inbox to respond quickly to client requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
