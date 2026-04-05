import { TRENDING } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../data/mockData';
import { Search } from 'lucide-react';

// Mock data for the leaderboard (you can move this to your mockData file)
const LEADERBOARD_TOP = [
  { id: 2, name: 'Chloë G.', score: 101, rank: 2, color: '#C0C0C0' },
  { id: 1, name: 'Dimitris P.', score: 113, rank: 1, color: '#FFD700' },
  { id: 3, name: 'Aamina S.', score: 86, rank: 3, color: '#CD7F32' },
];

const LEADERBOARD_LIST = [
  { id: 4, name: 'Alexandre L.', score: 80, level: 4 },
  { id: 5, name: 'Kimberley J.', score: 66, level: 3 },
  { id: 6, name: 'Jenny K.', score: 66, level: 3 },
  { id: 7, name: 'Amanda H.', score: 59, level: 2 },
];

export default function RightSidebar() {
  const { user } = useApp();
  const tierInfo = TIER_CONFIG[user.tier - 1] || TIER_CONFIG[0];
  const nextTier = TIER_CONFIG[user.tier] || null;
  const progressPct = nextTier
    ? Math.min(100, ((user.points - tierInfo.minPoints) / (nextTier.minPoints - tierInfo.minPoints)) * 100)
    : 100;

  // Quarterly reset countdown
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
    <aside className="sticky top-0 h-screen overflow-y-auto py-4 px-4 w-[350px] flex-shrink-0 hidden lg:block custom-scrollbar">

      {/* Search */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#71767b' }} />
        <input
          type="text"
          placeholder="Search TruthCheck"
          className="w-full py-3 pl-12 pr-4 rounded-full text-sm outline-none transition-all"
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

        <div className="flex justify-between text-sm mb-1.5">
          <span style={{ color: '#71767b' }}>{user.points} pts</span>
          {nextTier && <span style={{ color: '#71767b' }}>Next: {nextTier.minPoints} pts</span>}
        </div>

        <div className="w-full h-2 rounded-full mb-3" style={{ background: '#2f3336' }}>
          <div className="h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, background: tierInfo.color }} />
        </div>

        <div className="flex items-center gap-2 text-xs rounded-xl py-2 px-3"
          style={{ background: '#1e2028', color: '#71767b' }}>
          
          <span>Quarterly reset in <strong style={{ color: '#e7e9ea' }}>{daysLeft} days</strong> ({resetLabel})</span>
        </div>
      </div>

      {/* NEW: Leaderboard Widget */}
      <div className="rounded-2xl py-3 mb-4" style={{ background: '#16181c' }}>
        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="text-xl font-bold" style={{ color: '#e7e9ea' }}>Top Contributors</h2>
          <button className="text-sm hover:underline" style={{ color: '#1d9bf0' }}>View all</button>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="flex justify-between px-4 mb-2 gap-2">
          {LEADERBOARD_TOP.map((leader) => (
            <div key={leader.id} className="flex flex-col items-center flex-1 rounded-xl p-2 relative" 
                 style={{ background: '#202327', marginTop: leader.rank === 1 ? '0' : '12px' }}>
              <div className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: leader.color }}>
                {leader.rank === 1 && <span>👑</span>}
                {leader.rank}
              </div>
              <div className="w-10 h-10 rounded-full mb-1 flex items-center justify-center text-xs font-bold" 
                   style={{ background: '#16181c', border: `2px solid ${leader.color}`, color: '#e7e9ea' }}>
                {leader.name.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xs text-center truncate w-full font-medium" style={{ color: '#e7e9ea' }}>
                {leader.name}
              </span>
              <span className="text-[10px]" style={{ color: '#71767b' }}>{leader.score} pts</span>
            </div>
          ))}
        </div>

        {/* Leaderboard Table List */}
        <div className="mt-3">
          <div className="flex px-4 py-2 text-xs font-semibold" style={{ color: '#71767b', background: '#1e2028' }}>
            <div className="w-8">Rank</div>
            <div className="flex-1">Member</div>
            <div className="w-10 text-center">Lvl</div>
            <div className="w-12 text-right">Karma</div>
          </div>

          <div className="flex flex-col">
            {LEADERBOARD_LIST.map((u) => (
              <button key={u.id} className="flex px-4 py-3 items-center w-full text-left transition-colors hover:bg-white/5 border-b last:border-0" style={{ borderColor: '#2f3336' }}>
                <div className="w-8 text-sm font-medium" style={{ color: '#71767b' }}>{u.id}</div>
                <div className="flex-1 text-sm font-bold truncate pr-2" style={{ color: '#e7e9ea' }}>{u.name}</div>
                <div className="w-10 text-xs text-center font-medium" style={{ color: '#71767b' }}>{u.level}</div>
                <div className="w-12 text-right text-sm font-bold" style={{ color: '#1d9bf0' }}>{u.score}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Widget */}
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
      <p className="text-xs px-4 pb-6" style={{ color: '#71767b' }}>
        © 2026 TruthCheck · Terms · Privacy · Help
      </p>
    </aside>
  );
}
