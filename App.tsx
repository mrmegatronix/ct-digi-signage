import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { DailySpecial } from './types';
import { getSpecials, saveSpecials, updateSpecial } from './services/storageService';
import { Slide } from './components/Slide';
import { EditModal } from './components/EditModal';
import { Settings, Play, ArrowLeft, Edit2, Clock } from 'lucide-react';

/* --- Components defined in file for single-file constraints where possible, but split logically --- */

const LOGO_URL = "./Coasters-Logo-Web.png";

const Slideshow: React.FC<{ specials: DailySpecial[] }> = ({ specials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Only auto-rotate if there's more than one slide
    if (specials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % specials.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, [specials.length]);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {specials.map((special, index) => (
        <div 
          key={special.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Slide special={special} isActive={index === currentIndex} />
        </div>
      ))}

      {/* Admin Link (Hidden/Subtle) */}
      <Link 
        to="/admin" 
        className="absolute top-4 right-4 z-50 p-2 text-white/10 hover:text-white/80 transition-colors"
        title="Open Admin"
      >
        <Settings size={24} />
      </Link>
      
      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {specials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ 
  specials: DailySpecial[], 
  onEdit: (special: DailySpecial) => void 
}> = ({ specials, onEdit }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-10 w-auto bg-white/5 rounded p-1 flex items-center justify-center">
                <img src={LOGO_URL} alt="Coasters Tavern" className="h-full object-contain" />
             </div>
             <h1 className="text-xl font-bold tracking-tight">Coasters Tavern <span className="text-zinc-500 font-normal ml-2">Admin</span></h1>
          </div>
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <Play size={16} />
            Launch Slideshow
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specials.map((special) => (
            <div 
              key={special.id} 
              className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition group hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="h-48 relative overflow-hidden bg-zinc-800">
                <img src={special.imageUrl} alt={special.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <span className="absolute bottom-4 left-4 font-bold text-white text-lg drop-shadow-md">
                  {special.day}
                </span>
                <button
                  onClick={() => onEdit(special)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-amber-500 hover:text-white backdrop-blur-sm p-2 rounded-full text-white transition-all transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <Edit2 size={18} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-1 font-serif truncate">{special.title}</h3>
                <p className="text-amber-500 font-bold text-lg mb-3">{special.price}</p>
                <p className="text-zinc-400 text-sm line-clamp-3 mb-4 h-16">
                  {special.description}
                </p>
                <div className="flex items-center justify-between text-xs text-zinc-600 border-t border-zinc-800 pt-4">
                  <span className="flex items-center gap-1"><Clock size={12}/> Updated recently</span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: special.highlightColor }} title="Theme Color"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [specials, setSpecials] = useState<DailySpecial[]>([]);
  const [editingSpecial, setEditingSpecial] = useState<DailySpecial | null>(null);

  useEffect(() => {
    // Load data on mount
    setSpecials(getSpecials());
  }, []);

  const handleSave = (updated: DailySpecial) => {
    const newSpecials = updateSpecial(updated);
    setSpecials(newSpecials);
    setEditingSpecial(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slideshow specials={specials} />} />
        <Route 
          path="/admin" 
          element={
            <>
              <Dashboard specials={specials} onEdit={setEditingSpecial} />
              {editingSpecial && (
                <EditModal 
                  special={editingSpecial} 
                  onClose={() => setEditingSpecial(null)} 
                  onSave={handleSave} 
                />
              )}
            </>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;