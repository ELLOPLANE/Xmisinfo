import { TRENDING } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../data/mockData';
import { Search } from 'lucide-react';

export default function RightSidebar() {
  const { user } = useApp();
  const tierInfo = TIER_CONFIG[user.tier - 1];
  const nextTier = TIER_CONFIG[user.tier] || null;
  const progressPct = nextTier
    ? Math.min(100, ((user.points - tierInfo.minPoints) / (nextTier.minPoints - tierInfo.minPoints)) * 100)
    : 100;

  // Quarterly reset countdown — real time
  const now = new Date();
  const quarters = [3, 6, 9, 0];
  let nextReset;
  for (const month of quarters) {
    const candidate = new Date(now.getFullYear() + (month < now.getMonth() ? 1 : 0), month, 1);
    if (candidate > now) { nextReset = candidate; break; }
  }
  if (!nextReset) nextReset = new Date(now.getFullYear() + 1, 0, 1);
  const daysLeft = Math.ceil((nextReset - now) / (1000 * 60 * 60 * 24));
  const resetLabel = nextReset.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' });
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const animalBadge = user.tier >= 2 ? (user.avatar?.animal || null) : null;

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto py-4 px-4 w-[350px] flex-shrink-0 hidden lg:block">

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#71767b' }} />
        <input
          type="text"
          placeholder="Search TruthCheck"
          className="w-full py-3 pl-12 pr-4 rounded-full text-sm outline-none focus:ring-2 transition-all"
          style={{
            background: '#202327',
            color: '#e7e9ea',
            border: '1px solid transparent',
          }}
          onFocus={e => {
            e.target.style.background = '#000';
            e.target.style.borderColor = '#1d9bf0';
          }}
          onBlur={e => {
            e.target.style.background = '#202327';
            e.target.style.borderColor = 'transparent';
          }}
        />
      </div>

      {/* Credibility Score Widget */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: '#16181c' }}>
        <h2 className="text-xl font-bold mb-3" style={{ color: '#e7e9ea' }}>Your Credibility</h2>
        <div className="flex items-center gap-3 mb-3">
          {/* Initials circle */}
          <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-base"
            style={{ background: '#1d9bf0', border: `2px solid ${tierInfo.color}`, color: '#fff' }}>
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold" style={{ color: '#e7e9ea' }}>{user.name}</span>
              {animalBadge && <span className="text-lg">{animalBadge}</span>}
            </div>
            <div className="text-sm flex items-center gap-1.5">
              <span style={{ color: tierInfo.color }}>{tierInfo.emoji} {tierInfo.label}</span>
            </div>
          </div>
        </div>

        {/* Points */}
        <div className="flex justify-between text-sm mb-1.5">
          <span style={{ color: '#71767b' }}>{user.points} pts</span>
          {nextTier && <span style={{ color: '#71767b' }}>Next: {nextTier.minPoints} pts</span>}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full mb-3" style={{ background: '#2f3336' }}>
          <div className="h-2 rounded-full progress-bar-fill"
            style={{ width: `${progressPct}%`, background: tierInfo.color }} />
        </div>

        {/* Reset Countdown */}
        <div className="flex items-center gap-2 text-xs rounded-xl py-2 px-3"
          style={{ background: '#1e2028', color: '#71767b' }}>
          <span>🔄</span>
          <span>Quarterly reset in <strong style={{ color: '#e7e9ea' }}>{daysLeft} days</strong> ({resetLabel})</span>
        </div>
      </div>

      {/* Trending */}
      <div className="rounded-2xl py-3 mb-4" style={{ background: '#16181c' }}>
        <h2 className="text-xl font-bold px-4 pb-2" style={{ color: '#e7e9ea' }}>What's happening</h2>
        {TRENDING.map(t => (
          <button key={t.id} className="w-full text-left px-4 py-3 transition-colors hover:bg-white/5">
            <div className="text-xs" style={{ color: '#71767b' }}>{t.category}</div>
            <div className="font-bold text-sm mt-0.5" style={{ color: '#e7e9ea' }}>{t.topic}</div>
            <div className="text-xs mt-0.5" style={{ color: '#71767b' }}>{t.posts}</div>
          </button>
        ))}
        <button className="px-4 py-3 text-sm w-full text-left transition-colors hover:bg-white/5 rounded-b-2xl"
          style={{ color: '#1d9bf0' }}>Show more</button>
      </div>

      {/* Footer */}
      <p className="text-xs px-1" style={{ color: '#71767b' }}>
        © 2026 TruthCheck · Terms · Privacy · Help
      </p>
    </aside>
  );
}
