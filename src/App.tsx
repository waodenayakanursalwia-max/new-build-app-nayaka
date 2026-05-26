import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Baby, 
  Image as ImageIcon, 
  Activity, 
  Sparkles, 
  History, 
  HelpCircle, 
  Heart, 
  Upload, 
  Camera, 
  Trash2, 
  AlertCircle, 
  RefreshCw, 
  BookOpen, 
  Check, 
  Compass, 
  Dribbble, 
  ChevronRight,
  Smile,
  Megaphone,
  Stethoscope
} from 'lucide-react';
import { InterpretationResponse, BehaviorType, InterpretationHistoryItem } from './types';
import { SAMPLE_SCENARIOS, APP_INFO } from './constants';
import { FriendlyButton } from './components/FriendlyButton';

export default function App() {
  // Input form states
  const [prompt, setPrompt] = useState('');
  const [age, setAge] = useState('24 Months (2 Years)');
  const [behaviorType, setBehaviorType] = useState<BehaviorType>('babble');
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  // App UI states
  const [activeTab, setActiveTab] = useState<'interpreter' | 'history' | 'about'>('interpreter');
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<InterpretationResponse | null>(null);
  const [history, setHistory] = useState<InterpretationHistoryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Camera Snapshot states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('totspeak_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed loading local history:", e);
    }
  }, []);

  // Save history helper
  const saveHistory = (updated: InterpretationHistoryItem[]) => {
    setHistory(updated);
    try {
      localStorage.setItem('totspeak_history', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed saving local history:", e);
    }
  };

  // Clear single history item
  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    saveHistory(updated);
  };

  // Clear all history
  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear your child's entire history log?")) {
      saveHistory([]);
    }
  };

  // Populate form from sample scenario
  const handleSelectSample = (sample: typeof SAMPLE_SCENARIOS[0]) => {
    setPrompt(sample.placeholderText || sample.description);
    setAge(sample.age);
    setBehaviorType(sample.type);
    setErrorMessage(null);
    setInterpretation(null);
    
    if (sample.imageUrl) {
      setImage(sample.imageUrl);
      setMimeType('image/jpeg');
    } else {
      setImage(null);
      setMimeType(null);
    }

    // Scroll to form smoothly
    const formElement = document.getElementById('tot-interpreter-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle manual image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage("The image file size is too large. The maximum limit is 8 MB.");
        return;
      }
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Camera snapshot controller
  const startCamera = async () => {
    setIsCameraOpen(true);
    setErrorMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      setErrorMessage("Could not open the camera. Please make sure you have granted camera permissions.");
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImage(dataUrl);
        setMimeType('image/jpeg');
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // Reset current form inputs
  const resetForm = () => {
    setPrompt('');
    setAge('24 Months (2 Years)');
    setBehaviorType('babble');
    setImage(null);
    setMimeType(null);
    setInterpretation(null);
    setErrorMessage(null);
    stopCamera();
  };

  // Submit trigger
  const handleInterpret = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setErrorMessage("Please enter your child's babble, drawing description, or behavior details first.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setInterpretation(null);
    setSuccessAnimation(false);

    try {
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          age,
          type: behaviorType,
          image: image,
          mimeType: mimeType
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to contact the AI server for interpretation.");
      }

      const result: InterpretationResponse = await response.json();
      setInterpretation(result);
      setSuccessAnimation(true);

      // Create history item
      const newItem: InterpretationHistoryItem = {
        id: Math.random().toString(36).substring(2, 11),
        timestamp: new Date().toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        inputPrompt: prompt,
        childAge: age,
        childBehaviorType: behaviorType,
        imageUrl: image,
        response: result
      };

      saveHistory([newItem, ...history]);

      // Scroll smoothly to results card
      setTimeout(() => {
        const resultsElement = document.getElementById('tot-interpretation-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      setErrorMessage(err.message || "Connection lost. Please check your API configuration or try again shortly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream/40 flex flex-col font-sans selection:bg-brand-blush/20">
      
      {/* Decorative Warm Top Strip */}
      <div className="h-2 bg-gradient-to-r from-brand-sage via-brand-terracotta to-brand-blush w-full" />

      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/60 py-6 px-4 md:px-8 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-sage/10 flex items-center justify-center text-brand-sage">
              <Baby className="w-7 h-7 stroke-[2.25]" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-2xl tracking-tight text-neutral-800 flex items-center gap-2">
                {APP_INFO.name}
                <span className="bg-brand-terracotta/10 text-brand-terracotta px-2.5 py-0.5 rounded-full text-xs font-bold font-sans tracking-wide uppercase">
                  Psycho-Coach
                </span>
              </h1>
              <p className="text-xs font-medium text-stone-500">{APP_INFO.subtitle}</p>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl border border-stone-200/50">
            <button
              onClick={() => { setActiveTab('interpreter'); setErrorMessage(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'interpreter' 
                  ? 'bg-white text-brand-sage shadow-sm font-semibold' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              Interpreter
            </button>
            <button
              onClick={() => { setActiveTab('history'); setErrorMessage(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                activeTab === 'history' 
                  ? 'bg-white text-brand-sage shadow-sm font-semibold' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <History className="w-4 h-4" />
              History
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                  {history.length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('about'); setErrorMessage(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'about' 
                  ? 'bg-white text-brand-sage shadow-sm font-semibold' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Milestones Guide
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-10">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: INTERPRETER WORKSPACE */}
          {activeTab === 'interpreter' && (
            <motion.div
              key="interpreter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              
              {/* Landing Hero */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-neutral-800 leading-tight">
                  Tiny Actions, <span className="text-brand-sage underline decoration-brand-blush decoration-4 underline-offset-4">Giant Meanings</span>
                </h2>
                <p className="text-stone-600 text-base leading-relaxed">
                  {APP_INFO.tagline} Let's decode what your little one is really thinking when they make a loud boom, draw a wild scribble, or babble away.
                </p>
              </div>

              {/* Sample Presets Carousel */}
              <div className="space-y-3">
                <h3 className="font-display font-bold text-sm text-neutral-700 tracking-wider uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-terracotta" />
                  Need Inspiration? Choose a Toddler Scenario:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SAMPLE_SCENARIOS.map((sample) => (
                    <motion.div
                      key={sample.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onClick={() => handleSelectSample(sample)}
                      className="bg-white rounded-2xl border border-stone-200/70 p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-3 text-2xl opacity-10 group-hover:opacity-20 transition-opacity">
                        {sample.type === 'babble' ? '👶' : sample.type === 'drawing' ? '🎨' : '🧱'}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-extrabold px-2.2 py-0.5 rounded-full uppercase tracking-wider ${
                          sample.type === 'babble' ? 'bg-blue-50 text-blue-600' :
                          sample.type === 'drawing' ? 'bg-pink-50 text-pink-600' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {sample.type === 'babble' ? 'Babble' : sample.type === 'drawing' ? 'Drawing/Scribble' : 'Behavior'}
                        </span>
                        <span className="text-xs text-stone-400 font-medium">{sample.age}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-neutral-800 mb-1 group-hover:text-brand-sage transition-colors">
                        {sample.title}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {sample.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Analyzer Split Desk Layout */}
              <div id="tot-interpreter-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Form Capture */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/70 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-sage/10 text-brand-sage rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-neutral-800">TotSpeak Workspace</h3>
                    </div>
                    <button 
                      type="button" 
                      onClick={resetForm} 
                      className="text-xs text-stone-400 hover:text-brand-terracotta flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reset Form
                    </button>
                  </div>

                  <form onSubmit={handleInterpret} className="space-y-6">
                    
                    {/* Age Selector */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">
                        How old is your child now?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['12 Months', '18 Months', '24 Months (2 Years)', '3 Years', '4 Years', '5 Years+'].map((ageOpt) => (
                          <button
                            type="button"
                            key={ageOpt}
                            onClick={() => setAge(ageOpt)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                              age === ageOpt 
                                ? 'bg-brand-sage text-white font-semibold' 
                                : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            {ageOpt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Behavior Type Selector */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">
                        What would you like to interpret?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'babble', label: 'Babble', icon: Baby, color: 'border-blue-200 hover:bg-blue-50/30' },
                          { id: 'drawing', label: 'Drawing/Scribble', icon: ImageIcon, color: 'border-pink-200 hover:bg-pink-50/30' },
                          { id: 'behavior', label: 'Behavior', icon: Activity, color: 'border-amber-200 hover:bg-amber-50/30' }
                        ].map((bType) => {
                          const IconComponent = bType.icon;
                          return (
                            <button
                              type="button"
                              key={bType.id}
                              onClick={() => setBehaviorType(bType.id as BehaviorType)}
                              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer ${
                                behaviorType === bType.id 
                                  ? 'bg-brand-sage border-brand-sage text-white font-semibold shadow-sm' 
                                  : `bg-white text-stone-600 ${bType.color}`
                              }`}
                            >
                              <IconComponent className="w-6 h-6 mb-2" />
                              <span className="text-xs">{bType.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Text Input Prompt */}
                    <div>
                      <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">
                        Write the babbles or describe the behavior/drawing
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={
                          behaviorType === 'babble' 
                            ? 'Example: Keeps shouting "Ma-ma-da-da!" with excitement while jumping on the pillow...' 
                            : behaviorType === 'drawing' 
                            ? 'Example: Slashed thick black loops over her drawing, then started crying with panic...' 
                            : 'Example: Loves arranging plastic spoons on the floor into an extremely straight long line...'
                        }
                        rows={4}
                        className="parent-input font-sans text-stone-800 placeholder:text-stone-400"
                        maxLength={1000}
                      />
                      <div className="flex justify-between items-center text-xs mt-1 text-stone-400">
                        <span>Min. 5 words for a deep psychological reading</span>
                        <span>{prompt.length}/1000 characters</span>
                      </div>
                    </div>

                    {/* Optional Image Capture Section & Drag and Drop */}
                    <div className="space-y-3">
                      <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider">
                        {behaviorType === 'drawing' ? 'Upload or Capture Drawing Image (Required)' : 'Photo Attachment (Optional)'}
                      </label>

                      {/* Preview Image */}
                      {image ? (
                        <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 h-56 flex items-center justify-center group shadow-inner">
                          <img 
                            src={image} 
                            alt="Child preview" 
                            className="h-full object-contain pointer-events-none" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-all">
                            <FriendlyButton 
                              variant="danger" 
                              size="sm" 
                              onClick={() => { setImage(null); setMimeType(null); }}
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove Image
                            </FriendlyButton>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-dashed border-stone-300 rounded-3xl p-6 bg-stone-50 hover:bg-stone-100/50 transition-colors flex flex-col items-center justify-center text-center relative overflow-hidden">
                          
                          {isCameraOpen ? (
                            <div className="w-full flex flex-col items-center gap-4">
                              <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline 
                                className="w-full max-h-48 rounded-xl object-cover bg-black"
                              />
                              <div className="flex gap-2">
                                <FriendlyButton variant="primary" size="sm" onClick={capturePhoto}>
                                  <Camera className="w-4 h-4" />
                                  Capture Photo
                                </FriendlyButton>
                                <FriendlyButton variant="secondary" size="sm" onClick={stopCamera}>
                                  Cancel
                                </FriendlyButton>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-400 shadow-sm mx-auto">
                                <Upload className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-stone-600">
                                  Drag image or click to browse
                                </p>
                                <p className="text-xs text-stone-400 mt-1">
                                  Supports JPEG or PNG format (Max 8 MB)
                                </p>
                              </div>
                              
                              <div className="flex gap-2.5 items-center justify-center">
                                <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl cursor-pointer transition-all shadow-sm">
                                  <Upload className="w-4 h-4 text-stone-400" />
                                  File Library
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    className="hidden" 
                                  />
                                </label>
                                
                                <button
                                  type="button"
                                  onClick={startCamera}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl cursor-pointer transition-all shadow-sm"
                                >
                                  <Camera className="w-4 h-4 text-stone-400" />
                                  Use Webcam
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Error Alerts */}
                    <AnimatePresence>
                      {errorMessage && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-red-50 text-red-700 border border-red-100 p-4 rounded-2xl flex items-start gap-3"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-bold">Attention Required</p>
                            <p className="opacity-90">{errorMessage}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Interpreter Submit Button */}
                    <FriendlyButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full relative h-14"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span className="font-display font-bold">TotSpeak is decoding the meaning...</span>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-brand-blush" />
                          <span>Decode Your Little One</span>
                        </>
                      )}
                    </FriendlyButton>

                  </form>
                </div>

                {/* Right Side: Showcase Analysis Output */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Results Panel */}
                  <div id="tot-interpretation-results" className="min-h-[400px] bg-white rounded-3xl border border-stone-200/70 p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Tiny visual deco */}
                    <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-brand-sage/5 rounded-full blur-2xl" />

                    <AnimatePresence mode="wait">
                      {interpretation ? (
                        <motion.div
                          key="results-ready"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-6"
                        >
                          
                          {/* Title Output Summary */}
                          <div>
                            <div className="flex items-center gap-2 text-brand-sage text-xs font-extrabold uppercase tracking-widest mb-1">
                              <Smile className="w-4 h-4" />
                              Interpretation Complete
                            </div>
                            <h3 className="font-display font-extrabold text-2xl text-neutral-800">
                              Child Development Reading
                            </h3>
                          </div>

                          {/* 1. Magic Behind It */}
                          <div className="bg-brand-cream/30 p-5 rounded-2xl border border-brand-clay/30 space-y-1.5">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>🌟</span>
                              The Magic Behind It (Interpretation)
                            </h4>
                            <p className="text-sm text-stone-600 leading-relaxed font-sans mt-1">
                              {interpretation.magicBehindIt}
                            </p>
                          </div>

                          {/* 2. Hidden Milestone */}
                          <div className="bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100/30 space-y-1.5">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>💡</span>
                              Hidden Milestone
                            </h4>
                            <p className="text-sm text-stone-600 leading-relaxed font-sans mt-1">
                              {interpretation.hiddenMilestone}
                            </p>
                          </div>

                          {/* 3. Action Plan list */}
                          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/50 space-y-2.5">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>🚀</span>
                              Playful Action Plan
                            </h4>
                            <ul className="space-y-2">
                              {interpretation.playfulActionPlan.map((act, i) => (
                                <li key={i} className="text-xs text-stone-600 leading-relaxed font-sans flex items-start gap-2">
                                  <span className="bg-brand-sage/10 text-brand-sage w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-extrabold mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 4. Encouragement */}
                          <div className="bg-pink-50/20 p-5 rounded-2xl border border-pink-100/30 space-y-1.5">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>🎈</span>
                              Word of Encouragement
                            </h4>
                            <p className="text-xs text-stone-500 italic leading-relaxed font-sans mt-1">
                              "{interpretation.wordOfEncouragement}"
                            </p>
                          </div>

                          {/* Special Safety warning popover */}
                          {interpretation.isWarning && (
                            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 flex items-start gap-3">
                              <Stethoscope className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div className="text-xs text-amber-800">
                                <p className="font-bold">Professional Medical Advice Required</p>
                                <p className="mt-0.5 opacity-90 leading-relaxed">
                                  This milestone entry indicates signs of severe or persistent distress. TotSpeak AI warmly advises consulting with a pediatrician or professional child developmental clinician to support your child's optimal growth.
                                </p>
                              </div>
                            </div>
                          )}

                        </motion.div>
                      ) : isLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-8">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-brand-sage/10 border-t-brand-sage animate-spin" />
                            <Baby className="w-6 h-6 text-brand-sage absolute inset-0 m-auto animate-bounce" />
                          </div>
                          <div>
                            <p className="font-display font-bold text-lg text-stone-700 animate-pulse">Connecting with Child's Heart...</p>
                            <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                              Analyzing fine motor, emotional expressions, and compiling age-appropriate support suggestions using developmental cognitive psychology foundations.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
                          <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-400">
                            <Baby className="w-8 h-8" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-display font-bold text-neutral-700">Results Will Appear Here</p>
                            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                              Complete the details on the left panel and click "Decode Your Little One" to start a scientific reading.
                            </p>
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Informational Pediatric Coach Banner */}
                  <div className="bg-gradient-to-br from-brand-sage to-brand-sage/80 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
                    <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                    <h4 className="font-display font-bold text-base mb-1.5 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-brand-blush fill-brand-blush" />
                      Compassionate Guidance
                    </h4>
                    <p className="text-xs text-white/90 leading-relaxed font-sans">
                      All explanations are structurally grounded in child cognitive development theories (Jean Piaget & Lev Vygotsky). Use this reading to inspire creative, playful learning together!
                    </p>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: HISTORY LOG */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-neutral-800 flex items-center gap-2">
                    Interpretation History
                  </h2>
                  <p className="text-sm text-stone-500 mt-1">
                    Here is the log of developmental psychology insights you have unlocked for your child so far.
                  </p>
                </div>
                
                {history.length > 0 && (
                  <FriendlyButton variant="danger" size="sm" onClick={clearAllHistory}>
                    <Trash2 className="w-4 h-4" />
                    Delete All History
                  </FriendlyButton>
                )}
              </div>

              {history.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200/70 p-12 text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                    <History className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-stone-700">No History Logged Yet</h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      Analyze your child's first babble, drawing, or behavioral milestone in the "Interpreter" tab to start your digital growth diary here.
                    </p>
                  </div>
                  <FriendlyButton variant="secondary" size="sm" onClick={() => setActiveTab('interpreter')}>
                    Interpret Now
                  </FriendlyButton>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white rounded-3xl border border-stone-200/70 p-6 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              item.childBehaviorType === 'babble' ? 'bg-blue-50 text-blue-600' :
                              item.childBehaviorType === 'drawing' ? 'bg-pink-50 text-pink-600' :
                              'bg-amber-50 text-amber-600'
                            }`}>
                              {item.childBehaviorType === 'babble' ? 'Babble' : item.childBehaviorType === 'drawing' ? 'Drawing' : 'Behavior'}
                            </span>
                            <span className="text-xs text-stone-400">{item.timestamp}</span>
                          </div>
                          
                          <button
                            onClick={(e) => deleteHistoryItem(item.id, e)}
                            className="text-stone-400 hover:text-red-500 p-1 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                            title="Delete this item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Context ({item.childAge})</p>
                          <p className="text-sm text-stone-700 mt-1 line-clamp-3 leading-relaxed">
                            "{item.inputPrompt}"
                          </p>
                        </div>

                        {item.imageUrl && (
                          <div className="h-28 rounded-xl overflow-hidden border border-stone-100 bg-stone-50 flex items-center justify-center">
                            <img 
                              src={item.imageUrl} 
                              alt="Child drawing" 
                              className="h-full object-contain" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <div className="border-t border-stone-100 pt-4 space-y-3">
                          <div>
                            <p className="text-xs font-extrabold text-brand-sage flex items-center gap-1.5 uppercase">
                              <span>🌟</span>
                              Psychological Reading
                            </p>
                            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                              {item.response.magicBehindIt}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-extrabold text-stone-700 flex items-center gap-1.5 uppercase">
                              <span>💡</span>
                              Milestone Unlocked
                            </p>
                            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                              {item.response.hiddenMilestone}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                        <FriendlyButton 
                          variant="secondary" 
                          size="sm" 
                          onClick={() => {
                            setPrompt(item.inputPrompt);
                            setAge(item.childAge);
                            setBehaviorType(item.childBehaviorType);
                            setInterpretation(item.response);
                            setImage(item.imageUrl || null);
                            setActiveTab('interpreter');
                            // Scroll up smoothly
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          View Details
                          <ChevronRight className="w-3.5 h-3.5" />
                        </FriendlyButton>
                      </div>

                    </motion.div>
                  ))}
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: DEVELOPMENTAL STAGES GUIDE */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              
              <div className="text-center space-y-2">
                <h2 className="font-display font-extrabold text-3xl text-neutral-800">
                  Child & Toddler Developmental Milestones
                </h2>
                <p className="text-sm text-stone-500">
                  How developmental science explains the babbles, curious drawings, and play-based behaviors of children in their precious Golden Age.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white rounded-3xl p-6 border border-stone-200/70 space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Baby className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-lg">The Mystery of Babbling</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    Between 10-18 months, infants love articulating double-syllabled vocalizations like "ma-ma" or "ba-ba". This repetition is the neural foundation scaffolding their vocal apparatus and brain's phonological network to prepare for coherent vocabulary.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200/70 space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-lg">Scribbles & Child Fine Art</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    Lively loops and black sweeps made by 2-4 year-olds are vital expressions of unstructured thoughts. As motor control develops, children advance to primitive representational stages where a simple circle represents a puppy or a parent's warm hug.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200/70 space-y-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-lg">Behavioral Cycles & Action</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    Actions exploring spatial bounds (dropping toys or toppling building block towers) are actually intuitive scientific experiments. Toddlers are testing physical boundaries to internalize natural causes and effects.
                  </p>
                </div>

              </div>

              {/* Informational Q&A / Coach profile card */}
              <div className="bg-brand-cream/45 border border-brand-clay rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-brand-sage/10 text-brand-sage flex items-center justify-center flex-shrink-0">
                  <Heart className="w-10 h-10 text-brand-sage fill-brand-sage" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-neutral-800 text-lg">
                    TotSpeak AI Safety & Developmental Commitment
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    This application serves as a supportive, scientifically grounded parenting guide. It does NOT provide formal clinical medical diagnosis or psychiatric therapy. If your child exhibits severe persistent anxiety, significant speech delays, or other developmental distress, we warmly advise consulting with a credentialed pediatrician or child psychologist to best support your child's growth.
                  </p>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Cozy Bottom Foot Footer */}
      <footer className="bg-white border-t border-stone-200/60 py-8 px-4 text-center text-stone-400 text-xs">
        <div className="max-w-6xl mx-auto space-y-2">
          <p className="font-display font-semibold text-stone-500">
            © 2026 TotSpeak AI. Crafted with love for your child's brilliant future.
          </p>
          <p className="text-[10px] opacity-75 max-w-2xl mx-auto leading-relaxed">
            Powered by Google Gemini models & developmental cognitive psychology theory. Fully compatible with easy GitHub deployment and instant Vercel cloud publishing.
          </p>
        </div>
      </footer>

    </div>
  );
}
