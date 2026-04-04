import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { POSTS } from '../data/mockData';
import { USERS } from '../data/mockData';

const VERDICT_CONFIG = {
  Verified:    { bg: '#e8f5e9', border: '#00ba7c', text: '#1b5e20', badge: 'bg-green-600', emoji: '✅' },
  Misleading:  { bg: '#fff8e1', border: '#f4900c', text: '#7b4000', badge: 'bg-amber-500', emoji: '⚠️' },
  False:       { bg: '#ffebee', border: '#f44336', text: '#7f0000', badge: 'bg-red-600',   emoji: '❌' },
};

export default function AnalysisReportPage() {
  const { postId } = useParams();
  const post = POSTS.find(p => p.id === postId);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8f9fa' }}>
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-600">Report not found</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">← Back to feed</Link>
      </div>
    </div>
  );

  const { report } = post.factCheck;
  const vc = VERDICT_CONFIG[report.verdict] || VERDICT_CONFIG['Misleading'];
  const author = USERS[post.userId];

  return (
    <div className="min-h-screen" style={{ background: '#f5f4f0', fontFamily: "'Inter', sans-serif" }}>

      {/* Top nav */}
      <nav className="sticky top-0 z-20 py-3 px-6 flex items-center gap-4 border-b"
        style={{ background: '#fff', borderColor: '#e0e0e0' }}>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
          style={{ color: '#1d9bf0' }}>
          <ArrowLeft size={18} /> Back to Feed
        </Link>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs px-2 py-1 rounded-full font-semibold"
            style={{ background: '#1d9bf0', color: '#fff' }}>
            ✓ TruthCheck AI Analysis
          </span>
        </div>
      </nav>

      {/* Article container */}
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Category tag */}
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#888' }}>
          AI Fact-Check Report · {new Date(2026, 2, 26).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        {/* Claim title */}
        <h1 className="text-3xl font-bold leading-tight mb-6 report-body" style={{ color: '#111', fontFamily: "'Merriweather', Georgia, serif" }}>
          Claim: "{report.claim}"
        </h1>

        {/* Original post reference */}
        <div className="flex items-center gap-3 p-4 rounded-xl mb-8 border"
          style={{ background: '#fff', borderColor: '#e0e0e0' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: '#f0f0f0' }}>
            {author?.avatar?.animal || '👤'}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#111' }}>{author?.name}
              <span className="font-normal text-gray-400 ml-2">{author?.handle}</span>
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#555', lineHeight: 1.5 }}>{post.content}</p>
          </div>
        </div>

        {/* Verdict Banner */}
        <div className="rounded-2xl px-6 py-5 mb-10 flex items-center gap-4 border-2"
          style={{ background: vc.bg, borderColor: vc.border }}>
          <span className="text-4xl">{vc.emoji}</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: vc.text, opacity: 0.7 }}>Verdict</p>
            <p className="text-2xl font-black" style={{ color: vc.text, fontFamily: "'Merriweather', Georgia, serif" }}>
              {report.verdict}
            </p>
          </div>
        </div>

        {/* Three-section framework */}
        <div className="space-y-8">
          {/* Section 1: The Facts */}
          <section className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e0e0e0' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                style={{ background: '#e8f5e9' }}>✅</div>
              <h2 className="text-xl font-bold" style={{ color: '#111', fontFamily: "'Merriweather', Georgia, serif" }}>
                The Facts
              </h2>
            </div>
            <div className="border-l-4 pl-5" style={{ borderColor: '#00ba7c' }}>
              <p className="text-base leading-relaxed" style={{ color: '#333', fontFamily: "'Merriweather', Georgia, serif", lineHeight: 1.9 }}>
                {report.theFacts}
              </p>
            </div>
          </section>

          {/* Section 2: Why Flawed */}
          <section className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e0e0e0' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                style={{ background: '#fff8e1' }}>⚠️</div>
              <h2 className="text-xl font-bold" style={{ color: '#111', fontFamily: "'Merriweather', Georgia, serif" }}>
                Why This Claim is Flawed
              </h2>
            </div>
            <div className="border-l-4 pl-5" style={{ borderColor: '#f4900c' }}>
              <p className="text-base leading-relaxed" style={{ color: '#333', fontFamily: "'Merriweather', Georgia, serif", lineHeight: 1.9 }}>
                {report.whyFlawed}
              </p>
            </div>
          </section>

          {/* Section 3: What Explains This */}
          <section className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e0e0e0' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                style={{ background: '#e3f2fd' }}>🔍</div>
              <h2 className="text-xl font-bold" style={{ color: '#111', fontFamily: "'Merriweather', Georgia, serif" }}>
                What Actually Explains This
              </h2>
            </div>
            <div className="border-l-4 pl-5" style={{ borderColor: '#1d9bf0' }}>
              <p className="text-base leading-relaxed" style={{ color: '#333', fontFamily: "'Merriweather', Georgia, serif", lineHeight: 1.9 }}>
                {report.whatExplains}
              </p>
            </div>
          </section>
        </div>

        {/* Sources */}
        <div className="mt-10 pt-8 border-t" style={{ borderColor: '#ddd' }}>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#888' }}>
            Verified Sources
          </h3>
          <div className="space-y-3">
            {report.sources.map((source, i) => (
              <a key={i} href={source.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border transition-all hover:border-blue-300 hover:bg-blue-50 group"
                style={{ background: '#fff', borderColor: '#e0e0e0', textDecoration: 'none' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#e3f2fd' }}>
                  <ExternalLink size={14} style={{ color: '#1d9bf0' }} />
                </div>
                <span className="text-sm font-medium group-hover:underline" style={{ color: '#1d9bf0' }}>
                  {source.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 p-4 rounded-xl text-sm" style={{ background: '#eee', color: '#666' }}>
          <strong>About this report:</strong> TruthCheck AI Analysis uses automated content screening cross-referenced against reputable news sources (Reuters, BBC, AP, gov.sg, WHO). Analysis reports are for informational purposes and should not be the sole basis for any decision.
        </div>
      </div>
    </div>
  );
}
