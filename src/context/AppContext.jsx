import { createContext, useContext, useState, useCallback } from 'react';
import { CURRENT_USER, POSTS } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(CURRENT_USER);
  const [posts, setPosts] = useState(POSTS);
  const [quizAnswers, setQuizAnswers] = useState({}); // postId → { chosen, correct }
  const [noteSubmissions, setNoteSubmissions] = useState({}); // postId → string
  const [showNotes, setShowNotes] = useState({}); // postId → bool
  const [showQuiz, setShowQuiz] = useState({}); // postId → bool

  // ── Quiz ────────────────────────────────
  const answerQuiz = useCallback((postId, chosenIndex, correctIndex) => {
    const correct = chosenIndex === correctIndex;
    setQuizAnswers(prev => ({ ...prev, [postId]: { chosen: chosenIndex, correct } }));
    if (correct) {
      setUser(u => ({ ...u, points: u.points + 1, tier: getTier(u.points + 1) }));
    }
  }, []);

  // ── Community Notes ──────────────────────
  const addCommunityNote = useCallback((postId, text) => {
    if (!text.trim()) return;
    const newNote = {
      id: `cn_${Date.now()}`,
      userId: 'u0',
      text: text.trim(),
      upvotes: 0,
      approved: false,
    };
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, communityNotes: [...p.communityNotes, newNote] }
        : p
    ));
    setNoteSubmissions(prev => ({ ...prev, [postId]: '' }));
  }, []);

  const upvoteNote = useCallback((postId, noteId) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const updatedNotes = p.communityNotes.map(n => {
        if (n.id !== noteId) return n;
        const newUpvotes = n.upvotes + 1;
        const nowApproved = newUpvotes >= 5;
        // Award point when newly approved
        if (nowApproved && !n.approved && n.userId === 'u0') {
          setUser(u => ({ ...u, points: u.points + 1, tier: getTier(u.points + 1) }));
        }
        return { ...n, upvotes: newUpvotes, approved: nowApproved };
      });
      return { ...p, communityNotes: updatedNotes };
    }));
  }, []);

  const toggleNotes = useCallback((postId) => {
    setShowNotes(prev => ({ ...prev, [postId]: !prev[postId] }));
  }, []);

  const toggleQuiz = useCallback((postId) => {
    setShowQuiz(prev => ({ ...prev, [postId]: !prev[postId] }));
  }, []);

  // ── Avatar Update ─────────────────────────
  const updateAvatar = useCallback((avatarData) => {
    setUser(u => ({ ...u, avatar: avatarData }));
  }, []);

  return (
    <AppContext.Provider value={{
      user, posts, quizAnswers, noteSubmissions, showNotes, showQuiz,
      answerQuiz, addCommunityNote, upvoteNote, toggleNotes, toggleQuiz,
      updateAvatar, setNoteSubmissions,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

function getTier(points) {
  if (points <= 10) return 1;
  if (points <= 40) return 2;
  if (points <= 70) return 3;
  return 4;
}
