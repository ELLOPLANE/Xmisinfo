import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../data/mockData';
import { useState } from 'react';
import AvatarModal from '../components/AvatarModal';

export default function ProfilePage() {
  const { user } = useApp();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const tierInfo = TIER_CONFIG[user.tier - 1];
  const nextTier = TIER_CONFIG[user.tier] || null;

  const progressPct = nextTier
    ? Math.min(100, ((user.points - tierInfo.minPoints) / (nextTier.minPoints - tierInfo.minPoints)) * 100)
    : 100;

  const now = new Date();
  // Next quarterly reset: Apr 1, Jul 1, Oct 1, Jan 1
  const quarters = [3, 6, 9, 0]; // months (0-indexed)
  let nextReset;
  for (const month of quarters) {
    const candidate = new Date(now.getFullYear() + (month < now.getMonth() ? 1 : 0), month, 1);
    if (candidate > now) { nextReset = candidate; break; }
  }
  if (!nextReset) nextReset = new Date(now.getFullYear() + 1, 0, 1);
  const daysLeft = Math.ceil((nextReset - now) / (1000 * 60 * 60 * 24));
  const resetLabel = nextReset.toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' });

  const allTiers = TIER_CONFIG;
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const animalBadge = user.tier >= 2 ? (user.avatar?.animal || null) : null;

  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-20 px-4 py-3 flex items-center gap-4 border-b backdrop-blur-md"
        style={{ borderColor: '#2f3336', background: 'rgba(0,0,0,0.85)' }}>
        <Link to="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} style={{ color: '#e7e9ea' }} />
        </Link>
        <div>
          <h1 className="text-xl font-bold" style={{ color: '#e7e9ea' }}>{user.name}</h1>
          <p className="text-xs" style={{ color: '#71767b' }}>Credibility Profile</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Cover / Avatar Card */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2f3336' }}>
          <div className="h-32" style={{ background: `linear-gradient(135deg, #0d1b2a 0%, #1d9bf033 100%)` }} />
          <div className="px-5 pb-5" style={{ background: '#16181c' }}>
            <div className="flex items-end justify-between -mt-10 mb-3">
              {/* Profile circle with initials */}
              <button onClick={() => setShowAvatarModal(true)}
                className="relative group hover:opacity-90 transition-opacity">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold relative"
                  style={{ background: '#1d9bf0', border: `4px solid ${tierInfo.color}`, color: '#fff' }}>
                  {initials}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white">Edit</span>
                </div>
              </button>
              <button onClick={() => setShowAvatarModal(true)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
                style={{ border: '1px solid #2f3336', color: '#e7e9ea' }}>
                Edit Avatar
              </button>
            </div>

            <h2 className="text-xl font-bold" style={{ color: '#e7e9ea' }}>{user.name}</h2>
            {/* Animal badge beside name */}
            {animalBadge && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{animalBadge}</span>
                {user.avatar?.hat && <span className="text-xl">{user.avatar.hat}</span>}
                {user.avatar?.outfit && <span className="text-xl">{user.avatar.outfit}</span>}
              </div>
            )}
            <p className="text-sm mb-2" style={{ color: '#71767b' }}>{user.handle}</p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm px-3 py-1 rounded-full font-semibold"
                style={{ background: `${tierInfo.color}22`, color: tierInfo.color }}>
                {tierInfo.emoji} {tierInfo.label}
              </span>
              <span className="text-sm" style={{ color: '#71767b' }}>
                {user.points} credibility points
              </span>
            </div>
          </div>
        </div>

        {/* Progress to Next Tier */}
        <div className="rounded-2xl p-5" style={{ background: '#16181c', border: '1px solid #2f3336' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold" style={{ color: '#e7e9ea' }}>Progress to Next Tier</h3>
            <span className="text-sm" style={{ color: '#71767b' }}>
              {nextTier ? `${user.points}/${nextTier.minPoints} pts` : 'Max Tier Reached!'}
            </span>
          </div>
          <div className="w-full h-3 rounded-full mb-2" style={{ background: '#2f3336' }}>
            <div className="h-3 rounded-full progress-bar-fill"
              style={{ width: `${progressPct}%`, background: nextTier ? TIER_CONFIG[user.tier].color : tierInfo.color }} />
          </div>
          {nextTier && (
            <p className="text-xs" style={{ color: '#71767b' }}>
              {nextTier.minPoints - user.points} more pts to reach {nextTier.emoji} {nextTier.label}
            </p>
          )}

          {/* Quarterly Reset */}
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl"
            style={{ background: '#0f1117' }}>
            <span className="text-lg">🔄</span>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#e7e9ea' }}>Quarterly Reset</p>
              <p className="text-xs" style={{ color: '#71767b' }}>
                Points reset in <strong style={{ color: '#1d9bf0' }}>{daysLeft} days</strong> on {resetLabel}. Earn as many as you can!
              </p>
            </div>
          </div>
        </div>

        {/* All Tiers Breakdown */}
        <div className="rounded-2xl p-5" style={{ background: '#16181c', border: '1px solid #2f3336' }}>
          <h3 className="font-bold mb-4" style={{ color: '#e7e9ea' }}>Credibility Tier System</h3>
          <div className="space-y-3">
            {allTiers.map(t => {
              const isCurrentTier = t.tier === user.tier;
              const isUnlocked = user.points >= t.minPoints;
              return (
                <div key={t.tier} className="flex items-center gap-4 p-3 rounded-xl transition-all"
                  style={{
                    background: isCurrentTier ? `${t.color}18` : 'transparent',
                    border: isCurrentTier ? `1px solid ${t.color}44` : '1px solid transparent',
                  }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: '#0f1117', opacity: isUnlocked ? 1 : 0.4 }}>
                    {t.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm" style={{ color: isUnlocked ? t.color : '#71767b' }}>
                        Tier {t.tier}: {t.label}
                      </p>
                      {isCurrentTier && (
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: t.color, color: '#000' }}>Current</span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: '#71767b' }}>
                      {t.maxPoints === Infinity ? `${t.minPoints}+ pts` : `${t.minPoints}–${t.maxPoints} pts`}
                      {t.tier >= 2 && ` · Unlocks: ${t.tier === 2 ? 'Animal avatars' : t.tier === 3 ? 'Hat customisation' : 'Full outfit'}`}
                    </p>
                  </div>
                  {!isUnlocked && <span className="text-xs" style={{ color: '#3f4247' }}>🔒</span>}
                  {isUnlocked && !isCurrentTier && <span className="text-xs" style={{ color: t.color }}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="rounded-2xl p-5" style={{ background: '#16181c', border: '1px solid #2f3336' }}>
          <h3 className="font-bold mb-3" style={{ color: '#e7e9ea' }}>How to Earn Points</h3>
          <div className="space-y-3">
            {[
              { emoji: '🧠', label: 'Answer a quiz correctly', pts: '+1 pt' },
              { emoji: '📝', label: 'Community note rated helpful (5+ upvotes)', pts: '+1 pt' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 text-sm">
                <span className="text-xl">{item.emoji}</span>
                <span style={{ color: '#cdd3d8' }}>{item.label}</span>
                <span className="ml-auto font-bold" style={{ color: '#00ba7c' }}>{item.pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAvatarModal && <AvatarModal onClose={() => setShowAvatarModal(false)} />}
    </div>
  );
}
