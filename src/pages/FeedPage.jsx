import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import PostCard from '../components/PostCard';
import { useApp } from '../context/AppContext';
import { TIER_CONFIG } from '../data/mockData';
import { Sparkles } from 'lucide-react';

export default function FeedPage() {
  const { posts, user } = useApp();
  const tierInfo = TIER_CONFIG[user.tier - 1];
  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen flex justify-center" style={{ background: '#000' }}>
      <LeftSidebar />

      {/* Main content */}
      <main className="flex-1 min-w-0 max-w-[600px] ml-[88px] xl:ml-[275px] border-x"
        style={{ borderColor: '#2f3336' }}>

        {/* Top bar */}
        <div className="sticky top-0 z-30 px-4 py-3 backdrop-blur-md border-b flex items-center justify-between"
          style={{ borderColor: '#2f3336', background: 'rgba(0,0,0,0.85)' }}>
          <h1 className="text-xl font-bold" style={{ color: '#e7e9ea' }}>Home</h1>
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(29,155,240,0.12)', color: '#1d9bf0' }}>
            <Sparkles size={14} />
            AI Fact-Checking Active
          </div>
        </div>

        {/* Compose box */}
        <div className="flex gap-3 px-4 py-4 border-b" style={{ borderColor: '#2f3336' }}>
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-base"
            style={{ background: '#1d9bf0', border: `2px solid ${tierInfo.color}`, color: '#fff' }}>
            {initials}
          </div>
          <div className="flex-1">
            <input type="text" placeholder="What's happening?"
              className="w-full bg-transparent outline-none text-lg py-1"
              style={{ color: '#e7e9ea' }} />
            <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: '#2f3336' }}>
              <div className="flex gap-3 text-xs" style={{ color: '#1d9bf0' }}>
                <button className="hover:opacity-70 transition-opacity">🖼️</button>
                <button className="hover:opacity-70 transition-opacity">🎬</button>
                <button className="hover:opacity-70 transition-opacity">📊</button>
                <button className="hover:opacity-70 transition-opacity">😊</button>
              </div>
              <button className="px-5 py-1.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: '#1d9bf0', color: '#fff' }}>Post</button>
            </div>
          </div>
        </div>

        {/* Feed tabs */}
        <div className="flex border-b" style={{ borderColor: '#2f3336' }}>
          {['For You', 'Following', 'Verified Only'].map((tab, i) => (
            <button key={tab}
              className="flex-1 py-4 text-sm font-semibold relative transition-colors hover:bg-white/5"
              style={{ color: i === 0 ? '#e7e9ea' : '#71767b' }}>
              {tab}
              {i === 0 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
                  style={{ background: '#1d9bf0' }} />
              )}
            </button>
          ))}
        </div>

        {/* Posts */}
        {posts.map(post => <PostCard key={post.id} post={post} />)}

        {/* Load more */}
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{ borderColor: '#1d9bf0', borderTopColor: 'transparent' }} />
        </div>
      </main>

      <RightSidebar />
    </div>
  );
}
