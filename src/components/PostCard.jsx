import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Repeat2, MessageCircle, Share, BarChart2, ChevronDown, ChevronUp, ThumbsUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { USERS, TIER_CONFIG } from '../data/mockData';

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n;
}

// Colour palette for profile initials circles
const AVATAR_COLORS = [
  '#1d9bf0', '#8b5cf6', '#f59e0b', '#00ba7c', '#f43f5e',
  '#06b6d4', '#a78bfa', '#fb923c', '#34d399', '#f472b6',
];

function getAvatarColor(userId) {
  const idx = parseInt(userId.replace(/\D/g, '') || '0', 10);
  return AVATAR_COLORS[idx % AVATAR_COLORS.length];
}

// Profile circle — shows initials only, with tier-colour border
function ProfileCircle({ userId, size = 10, fontSize = 'text-base' }) {
  const isCurrentUser = userId === 'u0';
  const u = isCurrentUser ? { name: 'Alex Rivera' } : USERS[userId];
  const tier = isCurrentUser ? 2 : (USERS[userId]?.tier || 1);
  const tierInfo = TIER_CONFIG[tier - 1];
  const initials = (u?.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const bg = getAvatarColor(userId);

  return (
    <div
      className={`w-${size} h-${size} rounded-full flex-shrink-0 flex items-center justify-center font-bold ${fontSize}`}
      style={{ background: bg, border: `2.5px solid ${tierInfo.color}`, color: '#fff', letterSpacing: '-0.5px' }}
    >
      {initials}
    </div>
  );
}

// Small animal badge shown beside username
function AvatarBadge({ userId }) {
  const isCurrentUser = userId === 'u0';
  const u = isCurrentUser ? null : USERS[userId];
  const tier = isCurrentUser ? 2 : (u?.tier || 1);
  const avatar = isCurrentUser ? { animal: '🦊' } : u?.avatar;

  if (tier < 2 || !avatar?.animal) return null;

  // hat layered on top of animal
  return (
    <span className="relative inline-flex items-center justify-center select-none" style={{ width: 28, height: 28 }}>
      <span className="text-xl leading-none">{avatar.animal}</span>
      {avatar.hat && (
        <span className="absolute text-xs" style={{ top: -8, left: '50%', transform: 'translateX(-50%)' }}>
          {avatar.hat}
        </span>
      )}
      {avatar.outfit && (
        <span className="absolute text-[10px]" style={{ bottom: -6, right: -4 }}>
          {avatar.outfit}
        </span>
      )}
    </span>
  );
}

function FactCheckBadge({ post }) {
  const { factCheck } = post;
  const isVerified = factCheck.verdict === 'verified';
  const bg = isVerified ? 'rgba(0,186,124,0.10)' : 'rgba(244,144,12,0.10)';
  const border = isVerified ? '#00ba7c' : '#f4900c';
  const textColor = isVerified ? '#00ba7c' : '#f4900c';

  return (
    <div className="mt-3 rounded-xl px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 fade-in"
      style={{ background: bg, border: `1px solid ${border}` }}>
      <span className="text-sm font-semibold" style={{ color: textColor }}>
        {factCheck.label}
      </span>
      <Link to={`/report/${post.id}`}
        className="text-xs font-medium hover:underline whitespace-nowrap transition-opacity hover:opacity-80"
        style={{ color: '#1d9bf0' }}>
        Click to learn more →
      </Link>
    </div>
  );
}

function QuizSection({ post }) {
  const { quizAnswers, answerQuiz } = useApp();
  const answered = quizAnswers[post.id];
  const q = post.quiz;

  return (
    <div className="mt-3 rounded-xl p-3 fade-in" style={{ background: '#0f1117', border: '1px solid #2f3336' }}>
      <p className="text-sm font-semibold mb-3" style={{ color: '#e7e9ea' }}>
        🧠 Quick Quiz
      </p>
      <p className="text-sm mb-3" style={{ color: '#cdd3d8' }}>{q.question}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          let bg = '#1e2028';
          let border = '#2f3336';
          let textC = '#e7e9ea';

          if (answered) {
            if (i === q.correctIndex) { bg = 'rgba(0,186,124,0.15)'; border = '#00ba7c'; textC = '#00ba7c'; }
            else if (i === answered.chosen && !answered.correct) { bg = 'rgba(244,67,54,0.12)'; border = '#f44336'; textC = '#f44336'; }
          }

          return (
            <button key={i} disabled={!!answered}
              onClick={() => answerQuiz(post.id, i, q.correctIndex)}
              className="btn-quiz w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ background: bg, border: `1px solid ${border}`, color: textC, cursor: answered ? 'default' : 'pointer' }}>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-3 text-xs rounded-lg px-3 py-2 fade-in"
          style={{
            background: answered.correct ? 'rgba(0,186,124,0.12)' : 'rgba(29,155,240,0.1)',
            color: answered.correct ? '#00ba7c' : '#1d9bf0',
          }}>
          {answered.correct
            ? '✅ Correct! +1 point added to your credibility score.'
            : `The correct answer is: ${q.options[q.correctIndex]} — ${q.explanation}`}
        </div>
      )}
    </div>
  );
}

function CommunityNotes({ post }) {
  const { showNotes, toggleNotes, addCommunityNote, upvoteNote } = useApp();
  const [inputText, setInputText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const isOpen = showNotes[post.id];

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    addCommunityNote(post.id, inputText);
    setInputText('');
    setShowForm(false);
  };

  return (
    <div className="mt-3">
      {/* Controls Row */}
      <div className="flex items-center gap-3 text-xs" style={{ color: '#71767b' }}>
        <button onClick={() => toggleNotes(post.id)}
          className="flex items-center gap-1 hover:text-blue-400 transition-colors">
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          Community Notes {post.communityNotes.length > 0 && `(${post.communityNotes.length})`}
        </button>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-white/5 transition-colors">
          + Add Note
        </button>
      </div>

      {/* Add Note Form */}
      {showForm && (
        <div className="mt-2 fade-in">
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Write a community note with sources..."
            rows={3}
            className="w-full rounded-xl px-3 py-2 text-sm resize-none outline-none"
            style={{ background: '#0f1117', border: '1px solid #2f3336', color: '#e7e9ea' }}
          />
          <div className="flex gap-2 mt-1.5 justify-end">
            <button onClick={() => setShowForm(false)}
              className="text-xs px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
              style={{ color: '#71767b' }}>Cancel</button>
            <button onClick={handleSubmit}
              className="text-xs px-4 py-1.5 rounded-full font-semibold transition-all hover:opacity-90"
              style={{ background: '#1d9bf0', color: '#fff' }}>Submit</button>
          </div>
        </div>
      )}

      {/* Notes Panel */}
      {isOpen && (
        <div className="mt-2 slide-down space-y-2">
          {post.communityNotes.length === 0 && (
            <p className="text-xs py-2 text-center" style={{ color: '#71767b' }}>No community notes yet.</p>
          )}
          {post.communityNotes.map(note => {
            const authorId = note.userId;
            const author = authorId === 'u0' ? { name: 'Alex Rivera', handle: '@alex_rivera' } : USERS[authorId];
            return (
              <div key={note.id} className="rounded-xl px-3 py-2.5"
                style={{ background: '#0f1117', border: `1px solid ${note.approved ? '#00ba7c44' : '#2f3336'}` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold" style={{ color: '#e7e9ea' }}>
                    {author?.name}
                    {note.approved && <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(0,186,124,0.15)', color: '#00ba7c' }}>✓ Helpful</span>}
                    {!note.approved && <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#71767b' }}>Pending ({note.upvotes}/5 votes)</span>}
                  </span>
                  <button onClick={() => upvoteNote(post.id, note.id)}
                    className="flex items-center gap-1 text-xs hover:text-blue-400 transition-colors"
                    style={{ color: '#71767b' }}>
                    <ThumbsUp size={12} /> {note.upvotes}
                  </button>
                </div>
                <p className="text-xs" style={{ color: '#cdd3d8' }}>{note.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function PostCard({ post }) {
  const [showQuizPanel, setShowQuizPanel] = useState(false);
  const user = post.userId === 'u0' ? null : USERS[post.userId];
  const tier = user ? user.tier : 1;
  const tierInfo = TIER_CONFIG[tier - 1];

  return (
    <article className="px-4 py-4 border-b transition-colors"
      style={{ borderColor: '#2f3336' }}
      onMouseEnter={e => e.currentTarget.style.background = '#080808'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

      <div className="flex gap-3">
        {/* Profile Circle (initials) */}
        <ProfileCircle userId={post.userId} size={10} />

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-sm" style={{ color: '#e7e9ea' }}>{user?.name || 'Alex Rivera'}</span>
            {/* Animal badge beside username */}
            <AvatarBadge userId={post.userId} />
            <span className="text-sm" style={{ color: '#71767b' }}>{user?.handle || '@alex_rivera'}</span>
            <span className="text-sm" style={{ color: '#71767b' }}>·</span>
            <span className="text-sm" style={{ color: '#71767b' }}>{post.timestamp}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full ml-1"
              style={{ background: `${tierInfo.color}22`, color: tierInfo.color }}>
              {tierInfo.emoji} {tierInfo.label}
            </span>
          </div>

          {/* Content */}
          <p className="mt-1 text-sm leading-relaxed" style={{ color: '#e7e9ea' }}>{post.content}</p>

          {/* Fact Check Badge */}
          <FactCheckBadge post={post} />

          {/* Quiz Toggle */}
          <button
            onClick={() => setShowQuizPanel(!showQuizPanel)}
            className="mt-2 text-xs flex items-center gap-1.5 px-2 py-1 rounded-full transition-all hover:opacity-80"
            style={{ background: 'rgba(29,155,240,0.1)', color: '#1d9bf0' }}>
            🧠 {showQuizPanel ? 'Hide Quiz' : 'Take Quiz'}
          </button>

          {/* Quiz Panel */}
          {showQuizPanel && <QuizSection post={post} />}

          {/* Community Notes */}
          <CommunityNotes post={post} />

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-3 -ml-2"
            style={{ color: '#71767b' }}>
            {[
              { Icon: MessageCircle, val: post.replies },
              { Icon: Repeat2, val: post.reposts },
              { Icon: Heart, val: post.likes },
              { Icon: BarChart2, val: post.views },
              { Icon: Share, val: null },
            ].map(({ Icon, val }, i) => (
              <button key={i}
                className="flex items-center gap-1.5 text-xs p-2 rounded-full transition-colors hover:text-blue-400 hover:bg-blue-950"
                style={{ color: '#71767b' }}>
                <Icon size={18} strokeWidth={1.8} />
                {val && <span>{formatNum(val)}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
