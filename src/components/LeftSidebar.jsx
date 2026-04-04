import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Bell, Users, MessageCircle, Bookmark, Star, User, MoreHorizontal, Feather } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../data/mockData';
import { useState } from 'react';
import AvatarModal from './AvatarModal';

// Initials circle for current user (matches PostCard design)
function CurrentUserCircle({ user, tierInfo }) {
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-base"
      style={{ background: '#1d9bf0', border: `2.5px solid ${tierInfo.color}`, color: '#fff' }}>
      {initials}
    </div>
  );
}

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Explore', path: '#' },
  { icon: Bell, label: 'Notifications', path: '#' },
  { icon: Users, label: 'Community', path: '#' },
  { icon: MessageCircle, label: 'Messages', path: '#' },
  { icon: Bookmark, label: 'Bookmarks', path: '#' },
  { icon: Star, label: 'Premium', path: '#' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: MoreHorizontal, label: 'More', path: '#' },
];

export default function LeftSidebar() {
  const location = useLocation();
  const { user, updateAvatar } = useApp();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const tierInfo = TIER_CONFIG[user.tier - 1];

  const animalBadge = user.tier >= 2 ? (user.avatar?.animal || null) : null;

  return (
    <>
      <aside className="fixed top-0 left-0 h-screen flex flex-col justify-between py-4 px-3 w-[88px] xl:w-[275px] z-40"
        style={{ borderRight: '1px solid #2f3336', background: '#000' }}>
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center justify-center xl:justify-start xl:px-3 mb-2 group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black text-white group-hover:bg-blue-950 transition-colors"
              style={{ color: '#1d9bf0' }}>
              ✓
            </div>
            <span className="hidden xl:block text-xl font-black ml-1" style={{ color: '#1d9bf0' }}>TruthCheck</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1 mt-2">
            {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
              const active = path !== '#' && location.pathname === path;
              return (
                <Link key={label} to={path}
                  className="flex items-center gap-4 px-3 py-3 rounded-full transition-all group w-fit xl:w-full"
                  style={{ background: active ? '#1e2028' : 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1a1d24'}
                  onMouseLeave={e => e.currentTarget.style.background = active ? '#1e2028' : 'transparent'}>
                  <Icon size={26} strokeWidth={active ? 2.5 : 1.8}
                    style={{ color: active ? '#fff' : '#e7e9ea' }} />
                  <span className="hidden xl:block text-xl"
                    style={{ color: '#e7e9ea', fontWeight: active ? 700 : 400 }}>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Post Button */}
          <button className="mt-4 xl:w-full w-12 h-12 xl:h-auto rounded-full xl:rounded-full flex items-center justify-center xl:gap-2 xl:py-3.5 font-bold text-lg text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#1d9bf0' }}>
            <Feather size={22} className="xl:hidden" />
            <span className="hidden xl:block">Post</span>
          </button>
        </div>

        {/* User Card */}
        <button onClick={() => setShowAvatarModal(true)}
          className="flex items-center gap-3 px-3 py-3 rounded-full w-full transition-all text-left"
          onMouseEnter={e => e.currentTarget.style.background = '#1a1d24'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <CurrentUserCircle user={user} tierInfo={tierInfo} />
          <div className="hidden xl:block min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm truncate" style={{ color: '#e7e9ea' }}>{user.name}</span>
              {animalBadge && <span className="text-base leading-none">{animalBadge}</span>}
            </div>
            <div className="text-sm truncate" style={{ color: '#71767b' }}>{user.handle}</div>
          </div>
        </button>
      </aside>

      {showAvatarModal && (
        <AvatarModal onClose={() => setShowAvatarModal(false)} />
      )}
    </>
  );
}
