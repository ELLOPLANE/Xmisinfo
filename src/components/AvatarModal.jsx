import { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AVATAR_OPTIONS, TIER_CONFIG } from '../data/mockData';

export default function AvatarModal({ onClose }) {
  const { user, updateAvatar } = useApp();
  const tierInfo = TIER_CONFIG[user.tier - 1];
  const [avatar, setAvatar] = useState({ ...user.avatar });
  const [activeTab, setActiveTab] = useState('animal');

  const canChooseAnimal = user.tier >= 2;
  const canChooseHat = user.tier >= 3;
  const canChooseOutfit = user.tier >= 4;

  const tabs = [
    { key: 'animal', label: '🐾 Animal', unlocked: canChooseAnimal },
    { key: 'hat', label: '🎩 Hat', unlocked: canChooseHat },
    { key: 'outfit', label: '👗 Outfit', unlocked: canChooseOutfit },
  ];

  const handleSave = () => {
    updateAvatar(avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-md rounded-2xl fade-in overflow-hidden"
        style={{ background: '#16181c', border: '1px solid #2f3336' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#2f3336' }}>
          <h2 className="text-lg font-bold" style={{ color: '#e7e9ea' }}>Customise Avatar</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
            <X size={20} style={{ color: '#71767b' }} />
          </button>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center py-6">
          {/* Initials profile circle */}
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
            style={{ background: '#1d9bf0', border: `3px solid ${tierInfo.color}`, color: '#fff' }}>
            {user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          {/* Badge row: animal + hat + outfit beside tier label */}
          <div className="mt-3 flex items-center gap-2">
            {avatar.animal && <span className="text-3xl">{avatar.animal}</span>}
            {avatar.hat && <span className="text-2xl">{avatar.hat}</span>}
            {avatar.outfit && <span className="text-2xl">{avatar.outfit}</span>}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: tierInfo.color }}>
              {tierInfo.emoji} {tierInfo.label}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: '#1e2028', color: '#71767b' }}>
              {user.points} pts
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: '#2f3336' }}>
          {tabs.map(tab => (
            <button key={tab.key}
              onClick={() => tab.unlocked && setActiveTab(tab.key)}
              className="flex-1 py-3 text-sm font-medium transition-colors relative"
              style={{
                color: !tab.unlocked ? '#3f4247' : activeTab === tab.key ? '#1d9bf0' : '#71767b',
                cursor: tab.unlocked ? 'pointer' : 'not-allowed',
              }}>
              {tab.label}
              {!tab.unlocked && <span className="ml-1 text-xs">🔒</span>}
              {activeTab === tab.key && tab.unlocked && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: '#1d9bf0' }} />
              )}
            </button>
          ))}
        </div>

        {/* Options Grid */}
        <div className="p-4 max-h-52 overflow-y-auto">
          {activeTab === 'animal' && !canChooseAnimal && (
            <div className="text-center py-6">
              <p className="text-4xl mb-2">🔒</p>
              <p className="text-sm" style={{ color: '#71767b' }}>Reach Tier 2 (11 pts) to unlock animal avatars</p>
              <div className="mt-3 w-full h-2 rounded-full" style={{ background: '#2f3336' }}>
                <div className="h-2 rounded-full progress-bar-fill"
                  style={{ width: `${(user.points / 11) * 100}%`, background: '#3b82f6' }} />
              </div>
            </div>
          )}
          {activeTab === 'animal' && canChooseAnimal && (
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_OPTIONS.animals.map(a => (
                <button key={a}
                  onClick={() => setAvatar(av => ({ ...av, animal: a }))}
                  className={`avatar-option w-full py-2 rounded-xl text-2xl flex items-center justify-center ${avatar.animal === a ? 'selected' : ''}`}
                  style={{ background: '#1e2028' }}>
                  {a}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'hat' && !canChooseHat && (
            <div className="text-center py-6">
              <p className="text-4xl mb-2">🔒</p>
              <p className="text-sm" style={{ color: '#71767b' }}>Reach Tier 3 (41 pts) to unlock hats</p>
              <div className="mt-3 w-full h-2 rounded-full" style={{ background: '#2f3336' }}>
                <div className="h-2 rounded-full progress-bar-fill"
                  style={{ width: `${Math.min(100, (user.points / 41) * 100)}%`, background: '#8b5cf6' }} />
              </div>
            </div>
          )}
          {activeTab === 'hat' && canChooseHat && (
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => setAvatar(av => ({ ...av, hat: null }))}
                className={`avatar-option w-full py-2 rounded-xl text-2xl flex items-center justify-center ${!avatar.hat ? 'selected' : ''}`}
                style={{ background: '#1e2028' }}>✕</button>
              {AVATAR_OPTIONS.hats.map(h => (
                <button key={h}
                  onClick={() => setAvatar(av => ({ ...av, hat: h }))}
                  className={`avatar-option w-full py-2 rounded-xl text-2xl flex items-center justify-center ${avatar.hat === h ? 'selected' : ''}`}
                  style={{ background: '#1e2028' }}>
                  {h}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'outfit' && !canChooseOutfit && (
            <div className="text-center py-6">
              <p className="text-4xl mb-2">🔒</p>
              <p className="text-sm" style={{ color: '#71767b' }}>Reach Tier 4 (71+ pts) to unlock outfits</p>
              <div className="mt-3 w-full h-2 rounded-full" style={{ background: '#2f3336' }}>
                <div className="h-2 rounded-full progress-bar-fill"
                  style={{ width: `${Math.min(100, (user.points / 71) * 100)}%`, background: '#f59e0b' }} />
              </div>
            </div>
          )}
          {activeTab === 'outfit' && canChooseOutfit && (
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => setAvatar(av => ({ ...av, outfit: null }))}
                className={`avatar-option w-full py-2 rounded-xl text-2xl flex items-center justify-center ${!avatar.outfit ? 'selected' : ''}`}
                style={{ background: '#1e2028' }}>✕</button>
              {AVATAR_OPTIONS.outfits.map(o => (
                <button key={o}
                  onClick={() => setAvatar(av => ({ ...av, outfit: o }))}
                  className={`avatar-option w-full py-2 rounded-xl text-2xl flex items-center justify-center ${avatar.outfit === o ? 'selected' : ''}`}
                  style={{ background: '#1e2028' }}>
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t flex gap-3 justify-end" style={{ borderColor: '#2f3336' }}>
          <button onClick={onClose}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
            style={{ color: '#e7e9ea', border: '1px solid #2f3336' }}>Cancel</button>
          <button onClick={handleSave}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: '#1d9bf0', color: '#fff' }}>Save Avatar</button>
        </div>
      </div>
    </div>
  );
}
