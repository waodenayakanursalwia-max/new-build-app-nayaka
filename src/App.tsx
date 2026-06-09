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
  Check, 
  Compass, 
  ChevronRight,
  Smile,
  Stethoscope,
  Languages,
  Trophy,
  ClipboardList,
  Gamepad2,
  HeartHandshake,
  CheckSquare,
  Plus,
  Search
} from 'lucide-react';

import { InterpretationResponse, BehaviorType, InterpretationHistoryItem } from './types';
import { TRANSLATIONS, MILESTONE_CHECKLISTS, PLAY_ACTIVITIES, PlayActivity, translateAge } from './translations';
import { audioSystem, BGM_TRACKS } from './utils/audioSystem';
import { FriendlyButton } from './components/FriendlyButton';
import { CuteDoodleBackground } from './components/CuteDoodleBackground';
import { AppLogoTitle } from './components/AppLogoTitle';
import { DIY_GAMES_DATABASE, DIYGame } from './diyPlayDatabase';

// Import Cute Cartoon Age Baby/Child milestone illustrations
import baby12m from './assets/images/cartoon_baby_12m_1781011906778.png';
import toddler18m from './assets/images/cartoon_toddler_18m_1781011925199.png';
import toddler24m from './assets/images/cartoon_toddler_24m_1781011940909.png';
import child3y from './assets/images/cartoon_child_3y_1781011957928.png';
import child4y from './assets/images/cartoon_child_4y_1781011973203.png';
import child5y from './assets/images/cartoon_child_5y_1781011988177.png';

// Import Cute DIY Game visual layout mockups
import diySensoryRice from './assets/images/diy_craft_sensory_rice_1781012012496.png';
import diyGelBag from './assets/images/diy_craft_gel_bag_1781012028839.png';
import diyPostBox from './assets/images/diy_craft_post_box_1781012043268.png';
import diyRibbonWeaver from './assets/images/diy_craft_ribbon_weaver_1781012059179.png';
import diyLaserMaze from './assets/images/diy_craft_laser_maze_1781012074801.png';
import diyWaterPouring from './assets/images/diy_craft_water_pouring_1781012090338.png';

export default function App() {
  // Multilingual State: English ('en'), Indonesian ('id'), or Mandarin Chinese ('zh')
  const [lang, setLang] = useState<'id' | 'en' | 'zh'>(() => {
    try {
      const stored = localStorage.getItem('totspeak_lang');
      return (stored === 'en' || stored === 'id' || stored === 'zh') ? stored : 'id';
    } catch {
      return 'id';
    }
  });

  // Current dictionary translation object
  const t = TRANSLATIONS[lang];

  // Input form states
  const [prompt, setPrompt] = useState('');
  const [age, setAge] = useState('24 Months (2 Years)');
  const [behaviorType, setBehaviorType] = useState<BehaviorType>('babble');
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);

  // App UI Navigation states
  const [activeTab, setActiveTab] = useState<'interpreter' | 'history' | 'checklist' | 'activities' | 'about'>('interpreter');
  const [isLoading, setIsLoading] = useState(false);
  const [interpretation, setInterpretation] = useState<InterpretationResponse | null>(null);
  const [history, setHistory] = useState<InterpretationHistoryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Interactive Milestones Checklist Tracker state
  const [checklistAge, setChecklistAge] = useState<string>('24 Months (2 Years)');
  const [checkedMilestones, setCheckedMilestones] = useState<Record<string, boolean>>({});
  const [checklistFilter, setChecklistFilter] = useState<'all' | 'social' | 'language' | 'cognitive' | 'motor'>('all');

  // Interactive Play Routine Planner stage
  const [plannerAge, setPlannerAge] = useState<string>('24 Months (2 Years)');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [activityCelebrate, setActivityCelebrate] = useState<string | null>(null);

  // DIY Sensory & Motor Games state
  const [diySubTab, setDiySubTab] = useState<'diy' | 'planner'>('diy');
  const [diySearch, setDiySearch] = useState('');
  const [diyCategoryFilter, setDiyCategoryFilter] = useState<'all' | 'sensory' | 'fine_motor' | 'gross_motor'>('all');
  const [diyAgeFilter, setDiyAgeFilter] = useState<'all' | '6-12 Months' | '12-24 Months' | '2-3 Years' | '3-5 Years'>('all');
  const [diyCheckedMaterials, setDiyCheckedMaterials] = useState<Record<string, boolean>>({});
  const [completedDiyGames, setCompletedDiyGames] = useState<string[]>([]);
  const [diyCelebrate, setDiyCelebrate] = useState<string | null>(null);

  // Camera Snapshot states
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Audio system state and trigger hook on first user interaction
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(audioSystem.getCurrentTrackId());

  useEffect(() => {
    const handleFirstInteraction = () => {
      audioSystem.playBGM();
      setBgmPlaying(audioSystem.getIsBgmPlaying());
      // Clean up listeners
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Helper for age-based illustrations mapping
  const getMilestoneIllustration = (age: string) => {
    switch (age) {
      case '12 Months':
        return baby12m;
      case '18 Months':
        return toddler18m;
      case '24 Months (2 Years)':
        return toddler24m;
      case '3 Years':
        return child3y;
      case '4 Years':
        return child4y;
      case '5 Years+':
      default:
        return child5y;
    }
  };

  // Helper for DIY bubble captions
  const getBubbleText = (age: string, language: string) => {
    if (language === 'id') {
      switch (age) {
        case '12 Months': return "Hore, aku 1 tahun! 👋🏼";
        case '18 Months': return "Aku suka jalan-jalan! 👣";
        case '24 Months (2 Years)': return "Lihat aku susun balok! 🏰";
        case '3 Years': return "Ayo mewarnai bersama! 🎨";
        case '4 Years': return "Aku jago lompat lho! 🏃🏻‍♂️";
        case '5 Years+':
        default: return "Aku siap petualang sekolah! 🎒";
      }
    } else if (language === 'zh') {
      switch (age) {
        case '12 Months': return "我满一岁啦！👋🏼";
        case '18 Months': return "我会稳稳走路了！👣";
        case '24 Months (2 Years)': return "看我搭城堡！🏰";
        case '3 Years': return "我们一块画画吧！🎨";
        case '4 Years': return "跑跑跳跳真开心！🏃🏻‍♂️";
        case '5 Years+':
        default: return "准备好上学去喽！🎒";
      }
    } else {
      switch (age) {
        case '12 Months': return "Yay, I am 1! 👋🏼";
        case '18 Months': return "I explore by walking! 👣";
        case '24 Months (2 Years)': return "Look at my block tower! 🏰";
        case '3 Years': return "Let's color together! 🎨";
        case '4 Years': return "Catch me if you can! 🏃🏻‍♂️";
        case '5 Years+':
        default: return "Ready for kindergarten! 🎒";
      }
    }
  };

  // Helper for DIY games final-mockup illustrations mapping
  const getDiyGameMockup = (id: string) => {
    switch (id) {
      case 'diy_sensory_rice':
        return diySensoryRice;
      case 'diy_sensory_gel_bag':
        return diyGelBag;
      case 'diy_kancing_pintar':
        return diyPostBox;
      case 'diy_ribbon_cardboard':
        return diyRibbonWeaver;
      case 'diy_laser_maze':
        return diyLaserMaze;
      case 'diy_waterfalls_pouring':
      default:
        return diyWaterPouring;
    }
  };

  // Load history & persistent progress on mount
  useEffect(() => {
    try {
      const storedHist = localStorage.getItem('totspeak_history');
      if (storedHist) {
        setHistory(JSON.parse(storedHist));
      }

      const storedChecks = localStorage.getItem('totspeak_checklist_progress');
      if (storedChecks) {
        setCheckedMilestones(JSON.parse(storedChecks));
      }

      const storedActs = localStorage.getItem('totspeak_activities_completed');
      if (storedActs) {
        setCompletedActivities(JSON.parse(storedActs));
      }

      const storedDiyMats = localStorage.getItem('totspeak_diy_checked_materials');
      if (storedDiyMats) {
        setDiyCheckedMaterials(JSON.parse(storedDiyMats));
      }

      const storedDiyGames = localStorage.getItem('totspeak_diy_completed_games');
      if (storedDiyGames) {
        setCompletedDiyGames(JSON.parse(storedDiyGames));
      }
    } catch (e) {
      console.error("Failed loading local state on mount:", e);
    }
  }, []);

  // Save language helper
  const handleLanguageChange = (newLang: 'en' | 'id' | 'zh') => {
    audioSystem.playCutePop();
    setLang(newLang);
    try {
      localStorage.setItem('totspeak_lang', newLang);
    } catch (e) {
      console.error("Failed saving language preference:", e);
    }
  };

  // Save history helper
  const saveHistory = (updated: InterpretationHistoryItem[]) => {
    setHistory(updated);
    try {
      localStorage.setItem('totspeak_history', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed saving history:", e);
    }
  };

  // Toggle single milestone checkbox
  const handleToggleMilestone = (id: string) => {
    const updated = { ...checkedMilestones, [id]: !checkedMilestones[id] };
    setCheckedMilestones(updated);
    try {
      localStorage.setItem('totspeak_checklist_progress', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed saving checklist progress:", e);
    }
  };

  // Clear single milestone key helper
  const resetMilestonesForAge = (ageKey: string) => {
    const list = MILESTONE_CHECKLISTS[ageKey] || [];
    const updated = { ...checkedMilestones };
    list.forEach(item => {
      delete updated[item.id];
    });
    setCheckedMilestones(updated);
    try {
      localStorage.setItem('totspeak_checklist_progress', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed resetting age milestones:", e);
    }
  };

  // Toggle single activity completion check
  const handleToggleActivity = (id: string) => {
    let updated: string[];
    if (completedActivities.includes(id)) {
      updated = completedActivities.filter(item => item !== id);
    } else {
      updated = [...completedActivities, id];
      // trigger positive feedback celebration animation
      setActivityCelebrate(id);
      setTimeout(() => setActivityCelebrate(null), 1500);
    }
    setCompletedActivities(updated);
    try {
      localStorage.setItem('totspeak_activities_completed', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed saving activities:", e);
    }
  };

  // Toggle single DIY material checked off state
  const handleToggleDiyMaterial = (gameId: string, idx: number) => {
    const key = `${gameId}_${idx}`;
    const updated = { ...diyCheckedMaterials, [key]: !diyCheckedMaterials[key] };
    setDiyCheckedMaterials(updated);
    try {
      localStorage.setItem('totspeak_diy_checked_materials', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed saving DIY checked materials:", e);
    }
  };

  // Toggle completion of the whole DIY game
  const handleToggleDiyGame = (id: string) => {
    let updated: string[];
    if (completedDiyGames.includes(id)) {
      updated = completedDiyGames.filter(item => item !== id);
    } else {
      updated = [...completedDiyGames, id];
      setDiyCelebrate(id);
      setTimeout(() => setDiyCelebrate(null), 2000);
    }
    setCompletedDiyGames(updated);
    try {
      localStorage.setItem('totspeak_diy_completed_games', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed saving DIY completed games:", e);
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
    if (window.confirm(t.historyClearConfirm)) {
      saveHistory([]);
    }
  };

  // Populate form from sample scenario
  const handleSelectSample = (sampleId: string, sampleAge: string, sampleType: BehaviorType) => {
    audioSystem.playCutePop();
    let scenarioText = "";
    let sampleImgUrl: string | undefined = undefined;

    if (sampleId === "destruktor-balok") {
      scenarioText = t.scenarios.towerCrasherPlaceholder;
    } else if (sampleId === "naga-lingkaran") {
      scenarioText = t.scenarios.dragonScribblePlaceholder;
      sampleImgUrl = "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80";
    } else if (sampleId === "petualang-jendela") {
      scenarioText = t.scenarios.bahExplorerPlaceholder;
    }

    setPrompt(scenarioText);
    setAge(sampleAge);
    setBehaviorType(sampleType);
    setErrorMessage(null);
    setInterpretation(null);
    
    if (sampleImgUrl) {
      setImage(sampleImgUrl);
      setMimeType('image/jpeg');
    } else {
      setImage(null);
      setMimeType(null);
    }

    // Scroll smoothly to form workspace
    const formElement = document.getElementById('tot-interpreter-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle manual image files
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage(t.formPromptSubText);
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

  // Camera settings
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
      console.error("Webcam trigger failed:", err);
      setErrorMessage("Webcam Access Denied: Could not connect to camera peripherals. Make sure permissions are warm.");
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

  // Reset current interpreter panel
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

  // Perform Gemini translation analysis via API
  const handleInterpret = async (e: React.FormEvent) => {
    e.preventDefault();
    audioSystem.playCutePop();
    if (!prompt.trim()) {
      setErrorMessage(lang === 'id' ? 'Silakan isi kolom celoteh anak atau deskripsi terlebih dahulu.' : 'Please enter your child\'s description or text babble first.');
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
          mimeType: mimeType,
          lang: lang // Pass current active translation language
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "The AI server encountered an issue. Please retry.");
      }

      const result: InterpretationResponse = await response.json();
      setInterpretation(result);
      setSuccessAnimation(true);
      audioSystem.playSuccessSparkle();

      // Save into Grow Diary History
      const newItem: InterpretationHistoryItem = {
        id: Math.random().toString(36).substring(2, 11),
        timestamp: new Date().toLocaleString(lang === 'zh' ? 'zh-CN' : lang === 'id' ? 'id-ID' : 'en-US', {
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

      // Scroll smoothly to output
      setTimeout(() => {
        const resultsElement = document.getElementById('tot-interpretation-results');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      setErrorMessage(err.message || "Failed to reach model. Please double check model selection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Checklist Calculator
  const ageGroupKey = checklistAge;
  const currentChecklist = MILESTONE_CHECKLISTS[ageGroupKey] || [];
  const checkedForThisAge = currentChecklist.filter(item => checkedMilestones[item.id]);
  const progressPercent = currentChecklist.length > 0 
    ? Math.round((checkedForThisAge.length / currentChecklist.length) * 100) 
    : 0;

  // Render language-specific milestone items
  const renderMilestoneText = (item: typeof currentChecklist[0]) => {
    if (lang === 'zh') return item.zhText;
    if (lang === 'id') return item.idText;
    return item.enText;
  };

  // Filter checklist items
  const filteredChecklist = currentChecklist.filter(item => {
    if (checklistFilter === 'all') return true;
    return item.category === checklistFilter;
  });

  // Render language-specific Play Plan activities
  const currentActivities = PLAY_ACTIVITIES.filter(act => act.age === plannerAge);

  return (
    <div className="min-h-screen bg-brand-cream/60 flex flex-col font-sans selection:bg-brand-blush/40 relative">
      
      {/* Decorative Warm Top Blue Accent Strip */}
      <div className="h-2 bg-gradient-to-r from-brand-sky via-brand-sage to-brand-blush w-full z-10" />

      {/* Cute hand-drawn Doodle background layer rendered behind panels */}
      <CuteDoodleBackground />

      {/* Main App Bar Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-blue-100/80 py-5 px-4 md:px-8 sticky top-0 z-40 shadow-sm relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Logo Brand Title */}
          <AppLogoTitle subTitle={t.subTitle} tagText={t.resultsPsychologistTag} />

          {/* Tab Navigation Menu + Language Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            
            {/* Nav Tabs */}
            <nav className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/50 w-full overflow-x-auto sm:w-auto">
              <button
                onClick={() => { audioSystem.playDreamChime(); setActiveTab('interpreter'); setErrorMessage(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'interpreter' 
                    ? 'bg-white text-brand-sage shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                {t.tabInterpreter}
              </button>
              
              <button
                onClick={() => { audioSystem.playDreamChime(); setActiveTab('checklist'); setErrorMessage(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'checklist' 
                    ? 'bg-white text-brand-sage shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                {t.tabChecklist}
              </button>

              <button
                onClick={() => { audioSystem.playDreamChime(); setActiveTab('activities'); setErrorMessage(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'activities' 
                    ? 'bg-white text-brand-sage shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                {t.tabActivities}
              </button>

              <button
                onClick={() => { audioSystem.playDreamChime(); setActiveTab('history'); setErrorMessage(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap relative cursor-pointer ${
                  activeTab === 'history' 
                    ? 'bg-white text-brand-sage shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                {t.tabHistory}
                {history.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-terracotta text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {history.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { audioSystem.playDreamChime(); setActiveTab('about'); setErrorMessage(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'about' 
                    ? 'bg-white text-brand-sage shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {t.tabMilestones}
              </button>
            </nav>

            {/* Language Switch Ribbon Toggle */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <div className="flex items-center gap-1 bg-white border border-blue-100 p-1 rounded-2xl shadow-sm">
                <Languages className="w-3.5 h-3.5 text-stone-400 ml-2 mr-1" />
                <button
                  type="button"
                  onClick={() => handleLanguageChange('id')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    lang === 'id' ? 'bg-brand-sage text-white font-semibold' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  🇮🇩 ID
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    lang === 'en' ? 'bg-brand-sage text-white font-semibold' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('zh')}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                    lang === 'zh' ? 'bg-brand-sage text-white font-semibold' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  🇹🇼 繁中
                </button>
              </div>

              {/* Backsound/Music Controls Group */}
              <div className="flex items-center gap-1 bg-white border border-blue-100 p-1 rounded-2xl shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    if (audioSystem.getIsBgmPlaying()) {
                      audioSystem.pauseBGM();
                      setBgmPlaying(false);
                    } else {
                      audioSystem.playBGM();
                      setBgmPlaying(true);
                    }
                    audioSystem.playCutePop();
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    bgmPlaying 
                      ? 'bg-brand-sage text-white' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Toggle Lullaby Music Box"
                >
                  {bgmPlaying ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                      🔊 {lang === 'id' ? 'Musik' : lang === 'zh' ? '音樂' : 'Music'}
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                      🔇 {lang === 'id' ? 'Musik' : lang === 'zh' ? '音樂' : 'Music'}
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1 px-1 border-l border-blue-50/70">
                  <select
                    value={currentTrackId}
                    onChange={(e) => {
                      const trackId = e.target.value;
                      audioSystem.playCutePop();
                      audioSystem.setTrack(trackId);
                      setCurrentTrackId(trackId);
                      if (!audioSystem.getIsBgmPlaying()) {
                        audioSystem.playBGM();
                        setBgmPlaying(true);
                      }
                    }}
                    className="bg-transparent text-[11px] font-bold text-stone-600 outline-none cursor-pointer max-w-[130px] sm:max-w-[170px] truncate hover:text-stone-900 border-none"
                    title="Pilih Lagu Pengantar Tidur"
                  >
                    {BGM_TRACKS.map(track => (
                      <option key={track.id} value={track.id} className="text-xs text-stone-700 bg-white">
                        🎵 {track.name[lang] || track.name['en']}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Workspace Frame container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-10 z-10 relative">
        
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
                <h2 className="font-display font-extrabold text-3xl md:text-5xl text-neutral-800 leading-tight">
                  {t.heroHeader}
                  <span className="text-brand-sage underline decoration-brand-blush decoration-4 underline-offset-4 font-black">
                    {t.heroDecoration}
                  </span>
                </h2>
                <p className="text-stone-600 text-base md:text-lg leading-relaxed">
                  {t.heroSub}
                </p>
              </div>

              {/* Sample Presets Carousel */}
              <div className="space-y-3.5 bg-white/40 p-5 rounded-3xl border border-blue-50">
                <h3 className="font-display font-black text-xs text-neutral-700 tracking-widest uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-terracotta" />
                  {t.presetHeading} {t.presetSub}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Scenario 1: Block */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => handleSelectSample("destruktor-balok", "24 Months (2 Years)", "behavior")}
                    className="bg-white rounded-2xl border border-blue-100 p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-3 text-2.5xl opacity-10 group-hover:opacity-20 transition-opacity">
                      🧱
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider bg-orange-50 text-orange-600">
                        {t.presetBehavior}
                      </span>
                      <span className="text-xs text-stone-400 font-bold">24M (2Y)</span>
                    </div>
                    <h4 className="font-display font-bold text-base text-neutral-800 mb-1 group-hover:text-brand-sage transition-colors">
                      {t.scenarios.towerCrasherTitle}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {t.scenarios.towerCrasherDesc}
                    </p>
                  </motion.div>

                  {/* Scenario 2: Drawing */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => handleSelectSample("naga-lingkaran", "3 Years", "drawing")}
                    className="bg-white rounded-2xl border border-blue-100 p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-3 text-2.5xl opacity-10 group-hover:opacity-20 transition-opacity">
                      🎨
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider bg-pink-50 text-pink-600">
                        {t.presetDrawing}
                      </span>
                      <span className="text-xs text-stone-400 font-bold">3 Years</span>
                    </div>
                    <h4 className="font-display font-bold text-base text-neutral-800 mb-1 group-hover:text-brand-sage transition-colors">
                      {t.scenarios.dragonScribbleTitle}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {t.scenarios.dragonScribbleDesc}
                    </p>
                  </motion.div>

                  {/* Scenario 3: Babble */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => handleSelectSample("petualang-jendela", "12 Months", "babble")}
                    className="bg-white rounded-2xl border border-blue-100 p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-3 text-2.5xl opacity-10 group-hover:opacity-20 transition-opacity">
                      👶
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider bg-blue-50 text-blue-600">
                        {t.presetBabble}
                      </span>
                      <span className="text-xs text-stone-400 font-bold">12 Months</span>
                    </div>
                    <h4 className="font-display font-bold text-base text-neutral-800 mb-1 group-hover:text-brand-sage transition-colors">
                      {t.scenarios.bahExplorerTitle}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {t.scenarios.bahExplorerDesc}
                    </p>
                  </motion.div>

                </div>
              </div>

              {/* Analyzer Split Desk Layout */}
              <div id="tot-interpreter-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Form Capture */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-blue-100/80 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-sage/10 text-brand-sage rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-neutral-800">{t.formTitle}</h3>
                    </div>
                    <button 
                      type="button" 
                      onClick={resetForm} 
                      className="text-xs text-stone-400 hover:text-brand-terracotta flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {t.formReset}
                    </button>
                  </div>

                  <form onSubmit={handleInterpret} className="space-y-6">
                    
                    {/* Age Selector */}
                    <div>
                      <label className="block text-xs font-black text-stone-600 uppercase tracking-widest mb-2.5">
                        {t.formPromptLabel} / {t.formAgeLabel}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['12 Months', '18 Months', '24 Months (2 Years)', '3 Years', '4 Years', '5 Years+'].map((ageOpt) => (
                          <button
                            type="button"
                            key={ageOpt}
                            onClick={() => { audioSystem.playCutePop(); setAge(ageOpt); }}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              age === ageOpt 
                                ? 'bg-brand-sage border-brand-sage text-white font-bold' 
                                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            {translateAge(ageOpt, lang)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Behavior Type Selector */}
                    <div>
                      <label className="block text-xs font-black text-stone-600 uppercase tracking-widest mb-2.5">
                        {t.formTypeLabel}
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {[
                          { id: 'babble', label: t.presetBabble, icon: Baby, color: 'border-blue-100 hover:bg-blue-50/20' },
                          { id: 'drawing', label: t.presetDrawing, icon: ImageIcon, color: 'border-pink-100 hover:bg-pink-50/20' },
                          { id: 'behavior', label: t.presetBehavior, icon: Activity, color: 'border-orange-100 hover:bg-orange-50/20' }
                        ].map((bType) => {
                          const IconComponent = bType.icon;
                          return (
                            <button
                              type="button"
                              key={bType.id}
                              onClick={() => {
                                setBehaviorType(bType.id as BehaviorType);
                                if (bType.id !== 'drawing') {
                                  setImage(null);
                                  setMimeType(null);
                                }
                              }}
                              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer ${
                                behaviorType === bType.id 
                                  ? 'bg-brand-sage border-brand-sage text-white font-black shadow-sm' 
                                  : `bg-white text-stone-600 ${bType.color}`
                              }`}
                            >
                              <IconComponent className="w-6 h-6 mb-2" />
                              <span className="text-xs font-bold">{bType.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Text Input Prompt */}
                    <div>
                      <label className="block text-xs font-black text-stone-600 uppercase tracking-widest mb-2.5">
                        {t.formPromptLabel}
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={
                          behaviorType === 'babble' 
                            ? t.formPromptPlaceholderBabble
                            : behaviorType === 'drawing' 
                            ? t.formPromptPlaceholderDrawing
                            : t.formPromptPlaceholderBehavior
                        }
                        rows={4}
                        className="parent-input font-sans text-stone-800 placeholder:text-stone-400 focus:border-brand-sage focus:ring-brand-sage/20 border-blue-50"
                        maxLength={1000}
                      />
                      <div className="flex justify-between items-center text-[11px] mt-1 text-stone-400">
                        <span>{t.formPromptSubText}</span>
                        <span>{prompt.length}/1000 {t.formCharCount}</span>
                      </div>
                    </div>

                    {/* Image Capture / Attachment Section */}
                    <div className="space-y-3">
                      <label className="block text-xs font-black text-stone-600 uppercase tracking-widest">
                        {behaviorType === 'drawing' ? t.formPhotoRequired : t.formPhotoLabel}
                      </label>

                      {/* Preview Image */}
                      {image ? (
                        <div className="relative rounded-2xl overflow-hidden border border-blue-100 bg-stone-50 h-56 flex items-center justify-center group shadow-inner">
                          <img 
                            src={image} 
                            alt="Child drawing" 
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
                              {t.formRemoveImage}
                            </FriendlyButton>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-dashed border-blue-200 rounded-3xl p-6 bg-slate-50/50 hover:bg-slate-100/40 transition-colors flex flex-col items-center justify-center text-center relative overflow-hidden">
                          
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
                                  {t.formCapture}
                                </FriendlyButton>
                                <FriendlyButton variant="secondary" size="sm" onClick={stopCamera}>
                                  {t.formCancel}
                                </FriendlyButton>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-400 shadow-sm mx-auto border border-blue-50">
                                <Upload className="w-5 h-5 text-brand-sage" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-stone-600">
                                  {lang === 'id' ? 'Tarik gambar di sini' : 'Drag image or browse'}
                                </p>
                                <p className="text-xs text-stone-400 mt-1">
                                  {t.formPhotoSub}
                                </p>
                              </div>
                              
                              <div className="flex gap-2.5 items-center justify-center">
                                <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl cursor-pointer transition-all shadow-sm">
                                  <Upload className="w-4 h-4 text-stone-400" />
                                  {t.formBrowse}
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
                                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl cursor-pointer transition-all shadow-sm"
                                >
                                  <Camera className="w-4 h-4 text-stone-400" />
                                  {t.formWebcam}
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
                            <p className="font-bold">{lang === 'id' ? 'Perhatian' : 'Attention Required'}</p>
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
                          <span className="font-display font-semibold">{t.formSubmitLoading}</span>
                        </div>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-brand-blush" />
                          <span>{t.formSubmitBtn}</span>
                        </>
                      )}
                    </FriendlyButton>

                  </form>
                </div>

                {/* Right Side: Analytical Readings Show Case */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Results Terminal Card */}
                  <div id="tot-interpretation-results" className="min-h-[400px] bg-white rounded-3xl border border-blue-100/80 p-6 md:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Visual glowing ring decoration */}
                    <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-brand-sage/5 rounded-full blur-2xl" />

                    <AnimatePresence mode="wait">
                      {interpretation ? (
                        <motion.div
                          key="results-panel"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className="space-y-6"
                        >
                          
                          {/* Title output */}
                          <div>
                            <div className="flex items-center gap-2 text-brand-sage text-xs font-black uppercase tracking-widest mb-1 animate-pulse">
                              <Smile className="w-4 h-4 animate-bounce" />
                              {t.resultsSubtitle}
                            </div>
                            <h3 className="font-display font-black text-2xl text-neutral-800">
                              {t.resultsTitle}
                            </h3>
                          </div>

                          {/* 1. Magic Behind It */}
                          <div className="bg-blue-50/25 p-5 rounded-2xl border border-blue-100/40 space-y-1.5 hover:shadow-sm transition-shadow">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>🌟</span>
                              {t.resultsMagicBehindIt}
                            </h4>
                            <p className="text-sm text-stone-600 leading-relaxed font-sans mt-1">
                              {interpretation.magicBehindIt}
                            </p>
                          </div>

                          {/* 2. Hidden Milestone */}
                          <div className="bg-emerald-50/30 p-5 rounded-2xl border border-emerald-100/40 space-y-1.5 hover:shadow-sm transition-shadow">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>💡</span>
                              {t.resultsHiddenMilestone}
                            </h4>
                            <p className="text-sm text-stone-600 leading-relaxed font-sans mt-1">
                              {interpretation.hiddenMilestone}
                            </p>
                          </div>

                          {/* 3. Action Plan List */}
                          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/50 space-y-2.5">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>🚀</span>
                              {t.resultsPlayfulActionPlan}
                            </h4>
                            <ul className="space-y-2.5">
                              {interpretation.playfulActionPlan && interpretation.playfulActionPlan.map((act, i) => (
                                <li key={i} className="text-xs text-stone-600 leading-relaxed font-sans flex items-start gap-2.5">
                                  <span className="bg-brand-sage/15 text-brand-sage w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span className="flex-1 font-medium">{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 4. Encouragement */}
                          <div className="bg-pink-50/20 p-5 rounded-2xl border border-pink-100/30 space-y-1.5">
                            <h4 className="font-display font-black text-slate-800 text-sm tracking-wide uppercase flex items-center gap-2">
                              <span>🎈</span>
                              {t.resultsEncouragement}
                            </h4>
                            <p className="text-xs text-stone-500 italic leading-relaxed font-sans mt-1">
                              "{interpretation.wordOfEncouragement}"
                            </p>
                          </div>

                          {/* Pediatric Safety Warning callout */}
                          {interpretation.isWarning && (
                            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 flex items-start gap-3">
                              <Stethoscope className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div className="text-xs text-amber-800">
                                <p className="font-bold">{t.resultsWarningTitle}</p>
                                <p className="mt-0.5 opacity-90 leading-relaxed">
                                  {t.resultsWarningText}
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
                            <p className="font-display font-black text-lg text-stone-700 animate-pulse">
                              {lang === 'id' ? 'Menghubungkan Hati si Kecil...' : 'Interpreting toddler heart...'}
                            </p>
                            <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                              {t.resultsAnalyzingText}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
                          <div className="w-16 h-16 bg-blue-50/50 rounded-3xl flex items-center justify-center text-neutral-400 border border-blue-50">
                            <Baby className="w-8 h-8 text-brand-sage" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-display font-extrabold text-neutral-700">{t.resultsPlaceholder}</p>
                            <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                              {t.resultsWaiting}
                            </p>
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Informational Guidance Banner */}
                  <div className="bg-gradient-to-br from-brand-sage to-brand-sage/80 rounded-3xl p-6 text-white shadow-md relative overflow-hidden border border-brand-sage/10">
                    <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/10 rounded-full blur-xl" />
                    <h4 className="font-display font-bold text-base mb-1.5 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-brand-blush fill-brand-blush" />
                      Compassionate Parenting Science
                    </h4>
                    <p className="text-xs text-white/95 leading-relaxed font-sans">
                      {lang === 'id' 
                        ? "Seluruh hasil analisis didasarkan pada riset teoretis psikologi perkembangan kognitif anak (Piaget, Vygotsky, dan teori kecerdasan emosional kognisi)." 
                        : "Our deep interpretation engine maps baby behaviors to proven cognitive structures and motor milestones (Jean Piaget & Lev Vygotsky formulas)."}
                    </p>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE MILESTONES CHECKLIST TRACKER */}
          {activeTab === 'checklist' && (
            <motion.div
              key="checklist"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl border border-blue-100/80 p-6 md:p-8 shadow-sm space-y-6">
                
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-brand-sage flex items-center gap-1 uppercase tracking-widest">
                      <Trophy className="w-4 h-4 fill-amber-300 stroke-amber-500 animate-bounce" />
                      {lang === 'id' ? 'Alat Stimulasi Mandiri' : 'Self-Guided Diagnostic Tool'}
                    </span>
                    <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-800">
                      {t.tabChecklist}
                    </h2>
                    <p className="text-xs text-stone-500 max-w-xl font-medium font-sans">
                      {lang === 'id' 
                        ? 'Pantau progres pencapaian emas buah hati sesuai usianya berdasarkan indikator klinis tumbuh kembang anak.' 
                        : 'Track physical, social-emotional, cognitive and verbal achievements dynamically as your child grows.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <FriendlyButton 
                      variant="secondary" 
                      size="sm" 
                      className="text-xs font-bold"
                      onClick={() => resetMilestonesForAge(checklistAge)}
                    >
                      <RefreshCw className="w-3 h-3" />
                      {lang === 'id' ? 'Reset Kelompok Ini' : 'Reset This Age Group'}
                    </FriendlyButton>
                  </div>
                </div>

                {/* Sub Menu Age Navigation */}
                <div className="space-y-2">
                  <span className="block text-xs font-black text-stone-500 uppercase tracking-widest">{t.formAgeLabel}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['12 Months', '18 Months', '24 Months (2 Years)', '3 Years', '4 Years', '5 Years+'].map((ageItem) => (
                      <button
                        key={ageItem}
                        onClick={() => { audioSystem.playCutePop(); setChecklistAge(ageItem); }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          checklistAge === ageItem 
                            ? 'bg-brand-sage border-brand-sage text-white shadow-sm' 
                            : 'bg-slate-50 border-slate-200 text-stone-600 hover:bg-slate-100'
                        }`}
                      >
                        {translateAge(ageItem, lang)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Progress Visualizer Gauge Box with custom Cartoon Illustration & Speech Bubble */}
                <div className="bg-gradient-to-br from-brand-cream/80 to-slate-50/50 p-6 rounded-2xl border border-brand-clay flex flex-col md:flex-row items-center justify-between gap-6 overflow-visible relative">
                  
                  {/* Left part: Progress wheel & description */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 flex-1">
                    {/* Progress wheel circle ring with nested metrics */}
                    <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-full shadow-sm flex items-center justify-center p-1 border border-stone-100">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="stroke-slate-100" strokeWidth="6" fill="transparent" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          className="stroke-brand-sage transition-all duration-500" 
                          strokeWidth="8" 
                          fill="transparent" 
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - progressPercent / 100)} 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-display font-black text-xl text-neutral-800">
                        {progressPercent}%
                      </div>
                    </div>

                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[10px] font-black text-brand-sky uppercase tracking-wider block">
                        🎯 {lang === 'id' ? 'Milestone Kategori' : lang === 'zh' ? '里程碑阶段' : 'Milestone Age Bracket'}
                      </span>
                      <h3 className="font-display font-black text-lg text-slate-800">
                        {checklistAge} - {progressPercent === 100 ? (lang === 'id' ? 'Hebat! Semua Tercapai 🎉' : 'Amazing Progress! 🎉') : (lang === 'id' ? 'Progres Pertumbuhan' : 'Growth Tracking Progress')}
                      </h3>
                      <p className="text-xs text-stone-500 max-w-md font-sans leading-relaxed">
                        {lang === 'id'
                          ? `Buah hati telah memenuhi ${checkedForThisAge.length} dari total ${currentChecklist.length} target tumbuh kembang pada usia ini. Terus berikan stimulasi bermain!`
                          : `Your little one has met ${checkedForThisAge.length} out of ${currentChecklist.length} developmental parameters defined for this gold age brackets.`}
                      </p>
                    </div>
                  </div>

                  {/* Right part: Cartoon Illustration customised for current age group */}
                  <div className="flex items-center gap-3 relative self-center md:self-auto mt-2 md:mt-0 flex-shrink-0">
                    
                    {/* Cute Speech Bubble */}
                    <div className="bg-white border border-stone-200/80 rounded-2xl px-3 py-1.5 shadow-sm text-center max-w-[150px] relative">
                      <p className="text-[10px] font-black text-stone-700 leading-tight">
                        {getBubbleText(checklistAge, lang)}
                      </p>
                      {/* Speech bubble pointer pointing to the right */}
                      <div className="absolute right-[-5px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white border-r border-t border-stone-200/80 rotate-45" />
                    </div>

                    {/* Cartoon Rounded Face/Character Card Container */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl border border-brand-clay/35 shadow-sm flex items-center justify-center p-2 relative group overflow-hidden">
                      {/* Colorful soft background inside frame */}
                      <div className="absolute inset-0 bg-brand-cream/15 group-hover:scale-110 transition-transform duration-500" />
                      <img 
                        src={getMilestoneIllustration(checklistAge)} 
                        alt={`Cute cartoon representation of ${checklistAge}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                  </div>

                </div>

                {/* Categories filtering bar */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-100 pb-3">
                  {[
                    { id: 'all', label: lang === 'id' ? 'Semua Kategori' : 'All Spheres' },
                    { id: 'social', label: lang === 'id' ? 'Sosial & Emosi' : 'Social-Emotional' },
                    { id: 'language', label: lang === 'id' ? 'Bahasa & Suara' : 'Language' },
                    { id: 'cognitive', label: lang === 'id' ? 'Kognitif & Logika' : 'Cognitive' },
                    { id: 'motor', label: lang === 'id' ? 'Motorik & Fisik' : 'Motor Skills' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setChecklistFilter(cat.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                        checklistFilter === cat.id
                          ? 'bg-brand-sage/10 text-brand-sage border-brand-sage/20'
                          : 'border-transparent text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Main List items */}
                <div className="space-y-2.5">
                  {filteredChecklist.length === 0 ? (
                    <p className="text-xs text-stone-400 italic py-4">{lang === 'id' ? 'Tidak ada kriteria di bawah kategori ini.' : 'No criteria under this sphere.'}</p>
                  ) : (
                    filteredChecklist.map((item) => {
                      const isChecked = !!checkedMilestones[item.id];
                      return (
                        <motion.div
                          key={item.id}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleToggleMilestone(item.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                            isChecked 
                              ? 'bg-blue-50/20 border-brand-sage/30' 
                              : 'bg-white border-stone-200/80 hover:border-blue-100'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                            isChecked 
                              ? 'bg-brand-sage border-brand-sage text-white' 
                              : 'border-stone-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                          </div>

                          <div className="flex-1 space-y-0.5">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                              item.category === 'social' ? 'bg-purple-100 text-purple-700' :
                              item.category === 'language' ? 'bg-blue-100 text-blue-700' :
                              item.category === 'cognitive' ? 'bg-orange-100 text-orange-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {item.category}
                            </span>
                            <p className={`text-sm font-semibold transition-all ${
                              isChecked ? 'line-through text-stone-400' : 'text-stone-700'
                            }`}>
                              {renderMilestoneText(item)}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: DAILY PLAY SCHEDULER & PLAY ROUTINE PLANNER & DIY CRAFTS */}
          {activeTab === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Outer Container */}
              <div className="bg-white rounded-3xl border border-blue-100/80 p-6 md:p-8 shadow-sm space-y-6">
                
                {/* Header Section */}
                <div className="pb-5 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-brand-sage flex items-center gap-1.5 uppercase tracking-widest">
                      <HeartHandshake className="w-4 h-4 text-brand-sage fill-brand-blush stroke-brand-sage" />
                      {lang === 'id' ? 'Arena Bermain & Stimulasi Anak' : lang === 'zh' ? '亲子游戏与潜能开发中心' : 'Active Children Play Space'}
                    </span>
                    <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-800">
                      {lang === 'id' ? 'Eksplorasi Permainan Kreatif' : lang === 'zh' ? '探索创意亲子游戏' : 'Creative Play Explorer'}
                    </h2>
                    <p className="text-xs text-stone-500 max-w-xl font-semibold font-sans leading-relaxed">
                      {lang === 'id' 
                        ? 'Sediakan aneka permainan sensori, motorik kasar, dan motorik halus bermedia bahan dapur sederhana buatan sendiri di rumah!'
                        : lang === 'zh' ? '提供各种感官发育、精细动作以及大肢体运动游戏。使用厨房、家里闲置的简易废旧材料制作，安全趣味双重满足！' : 'Discover wonderful sensory and motor DIY play setups crafted inside your home using simple everyday household items!'}
                    </p>
                  </div>

                  {/* Dual Mode Sub-tab Navigator Button Segment */}
                  <div className="flex bg-slate-100/90 p-1 rounded-2xl border border-slate-200/40 self-start md:self-center">
                    <button
                      type="button"
                      onClick={() => setDiySubTab('diy')}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                        diySubTab === 'diy'
                          ? 'bg-white text-brand-sky shadow-sm'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      🌈 {lang === 'id' ? 'Mainan DIY Mandiri' : lang === 'zh' ? '自制DIY游戏' : 'DIY Home Crafts'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiySubTab('planner')}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                        diySubTab === 'planner'
                          ? 'bg-white text-brand-sky shadow-sm'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      📅 {lang === 'id' ? 'Jadwal Harian' : lang === 'zh' ? '日程计划' : 'Daily Routine'}
                    </button>
                  </div>
                </div>

                {/* MODE A: INTERACTIVE DIY SENSORY & MOTOR HOME GAMES CATALOG */}
                {diySubTab === 'diy' && (
                  <div className="space-y-6">
                    {/* Filter and Materials Search Panel */}
                    <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/30 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      
                      {/* Search Bar */}
                      <div className="md:col-span-4 space-y-1.5">
                        <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest">
                          🔍 {lang === 'id' ? 'Cari bahan sederhana' : lang === 'zh' ? '搜索材料关键词' : 'Search by materials'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={diySearch}
                            onChange={(e) => setDiySearch(e.target.value)}
                            placeholder={lang === 'id' ? 'Contoh: beras, air, koran, botol...' : lang === 'zh' ? '例：米、水、鞋盒、海绵...' : 'e.g., rice, water, shoebox, gel...'}
                            className="w-full bg-white border border-stone-200 focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/15 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-700 outline-none transition-all placeholder:text-stone-400"
                          />
                          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                        </div>
                      </div>

                      {/* Filter Category */}
                      <div className="md:col-span-4 space-y-1.5">
                        <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest">
                          🎮 {lang === 'id' ? 'Jenis Permainan' : lang === 'zh' ? '游戏类目' : 'Game Category'}
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {[
                            { value: 'all', label: lang === 'id' ? 'Semua' : lang === 'zh' ? '全部' : 'All' },
                            { value: 'sensory', label: lang === 'id' ? 'Sensori' : lang === 'zh' ? '感官' : 'Sensory' },
                            { value: 'fine_motor', label: lang === 'id' ? 'Motorik Halus' : lang === 'zh' ? '精细动作' : 'Fine Motor' },
                            { value: 'gross_motor', label: lang === 'id' ? 'Motorik Kasar' : lang === 'zh' ? '肢体运动' : 'Gross Motor' }
                          ].map(item => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => setDiyCategoryFilter(item.value as any)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                diyCategoryFilter === item.value 
                                  ? 'bg-brand-sky border-brand-sky text-white shadow-sm' 
                                  : 'bg-white border-slate-200 text-stone-600 hover:bg-slate-100'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Filter Age Group */}
                      <div className="md:col-span-4 space-y-1.5">
                        <label className="block text-[10px] font-black text-stone-500 uppercase tracking-widest">
                          👶 {lang === 'id' ? 'Kategori Umur' : lang === 'zh' ? '適齡階段' : 'Target Age Group'}
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {[
                            { value: 'all', label: lang === 'id' ? 'Semua' : lang === 'zh' ? '全部' : 'All' },
                            { value: '6-12 Months', label: lang === 'id' ? '6-12 Bulan' : lang === 'zh' ? '6-12個月' : '6-12 Months' },
                            { value: '12-24 Months', label: lang === 'id' ? '12-24 Bulan' : lang === 'zh' ? '12-24個月' : '12-24 Months' },
                            { value: '2-3 Years', label: lang === 'id' ? '2-3 Tahun' : lang === 'zh' ? '2-3歲' : '2-3 Years' },
                            { value: '3-5 Years', label: lang === 'id' ? '3-5 Tahun' : lang === 'zh' ? '3-5歲' : '3-5 Years' }
                          ].map(item => (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => { audioSystem.playCutePop(); setDiyAgeFilter(item.value as any); }}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                                diyAgeFilter === item.value 
                                  ? 'bg-brand-sky border-brand-sky text-white shadow-sm' 
                                  : 'bg-white border-slate-200 text-stone-600 hover:bg-slate-100'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* DIY Cards Render Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {(() => {
                        const filtered = DIY_GAMES_DATABASE.filter(game => {
                          const catVal = diyCategoryFilter;
                          const ageVal = diyAgeFilter;
                          if (catVal !== 'all' && game.category !== catVal) return false;
                          if (ageVal !== 'all' && game.ageGroup !== ageVal) return false;
                          if (diySearch.trim()) {
                            const query = diySearch.toLowerCase();
                            const titleStr = `${game.title.id} ${game.title.en} ${game.title.zh}`.toLowerCase();
                            const descStr = `${game.description.id} ${game.description.en} ${game.description.zh}`.toLowerCase();
                            const matsList = [...game.materials.id, ...game.materials.en, ...game.materials.zh].join(' ').toLowerCase();
                            return titleStr.includes(query) || descStr.includes(query) || matsList.includes(query);
                          }
                          return true;
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-stone-200 space-y-2">
                              <span className="text-3xl block">🎒</span>
                              <h4 className="font-display font-bold text-neutral-700 text-sm">
                                {lang === 'id' ? 'Bahan / Mainan DIY tidak ditemukan' : lang === 'zh' ? '未找到适配的DIY材质游戏' : 'No matching DIY games found'}
                              </h4>
                              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                                {lang === 'id' 
                                  ? 'Coba ganti filter jenis permainan, rentang umur anak, atau gunakan kata pencarian bahan lain seperti "air" atau "beras".'
                                  : lang === 'zh' ? '请尝试切换年龄层、游戏类型，或搜索“纸盒”、“米”等简易家常原料。' : 'Try adjusting the filters or search keywords to locate games using common items like "water" or "sponge".'}
                              </p>
                            </div>
                          );
                        }

                        return filtered.map((game) => {
                          const isFinished = completedDiyGames.includes(game.id);
                          const isCelebratingNow = diyCelebrate === game.id;
                          const tTitle = lang === 'zh' ? game.title.zh : lang === 'id' ? game.title.id : game.title.en;
                          const tDesc = lang === 'zh' ? game.description.zh : lang === 'id' ? game.description.id : game.description.en;
                          const tMaterials = lang === 'zh' ? game.materials.zh : lang === 'id' ? game.materials.id : game.materials.en;
                          const tSteps = lang === 'zh' ? game.steps.zh : lang === 'id' ? game.steps.id : game.steps.en;
                          const tBenefit = lang === 'zh' ? game.benefit.zh : lang === 'id' ? game.benefit.id : game.benefit.en;
                          const tDiff = lang === 'zh' ? game.difficulty.zh : lang === 'id' ? game.difficulty.id : game.difficulty.en;

                          return (
                            <motion.div
                              key={game.id}
                              whileHover={{ y: -2 }}
                              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-5 relative overflow-hidden ${
                                isFinished 
                                  ? 'bg-blue-50/10 border-brand-sage/20 shadow-inner' 
                                  : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
                              }`}
                            >
                              
                              {/* Celebration Pink Blur overlay */}
                              {isCelebratingNow && (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 bg-brand-sage/10 backdrop-blur-[1px] flex flex-col items-center justify-center z-15 text-center p-4 cursor-default"
                                >
                                  <div className="bg-white/90 shadow-xl px-6 py-4 rounded-2xl border border-brand-sage/20 animate-bounce">
                                    <span className="text-4xl block mb-1">🎉 🤩</span>
                                    <h5 className="font-display font-black text-base text-slate-800">
                                      {lang === 'id' ? 'Ayah & Bunda Luar Biasa!' : lang === 'zh' ? '超级好爸妈！完成制作' : 'Fantastic Craftsmanship!'}
                                    </h5>
                                    <p className="text-xs text-stone-500 font-bold mt-1">
                                      {lang === 'id' ? 'Eksplorasi sensorik motorik ananda siap dimulai!' : lang === 'zh' ? '亲子游戏与潜能开发时刻准备好了！' : 'Your kid is ready of beautiful exploration now!'}
                                    </p>
                                  </div>
                                </motion.div>
                              )}

                              {/* Card Header Info */}
                              <div className="space-y-3.5">
                                <div className="flex items-center justify-between">
                                  {/* Icon in Circle badge */}
                                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shadow-sm border ${
                                    game.category === 'sensory' ? 'bg-pink-50 border-pink-100 text-pink-600' :
                                    game.category === 'fine_motor' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                    'bg-indigo-50 border-indigo-100 text-indigo-600'
                                  }`}>
                                    {game.icon}
                                  </div>

                                  {/* Badges info list */}
                                  <div className="flex items-center gap-1.5">
                                    <span className="bg-slate-100 text-stone-600 border border-slate-200 font-sans font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      ⏱ {game.ageGroup}
                                    </span>
                                    <span className={`font-sans font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                      game.category === 'sensory' ? 'bg-pink-100/60 text-pink-700' :
                                      game.category === 'fine_motor' ? 'bg-emerald-100/60 text-emerald-700' :
                                      'bg-indigo-100/60 text-indigo-700'
                                    }`}>
                                      {game.category.replace('_', ' ')}
                                    </span>
                                    <span className="bg-[#FEF3C7] text-amber-800 border border-amber-200 font-sans font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                      {lang === 'id' ? 'Sifat: ' : lang === 'zh' ? '难易度: ' : 'Diff: '}{tDiff}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <h3 className="font-display font-black text-lg text-slate-800 hover:text-brand-sky transition-colors">
                                    {tTitle}
                                  </h3>
                                  <p className="text-xs font-semibold text-stone-500 font-sans leading-relaxed">
                                    {tDesc}
                                  </p>
                                </div>

                                {/* Final Made Illustration Mockup as requested by user */}
                                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-white border border-stone-100 group shadow-sm flex items-center justify-center">
                                  {/* Glassmorphic border lines and soft background */}
                                  <div className="absolute inset-0 bg-brand-cream/10 group-hover:scale-105 transition-transform duration-500" />
                                  <img 
                                    src={getDiyGameMockup(game.id)} 
                                    alt={`${tTitle} final craft visual tutorial mockup`}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover relative z-10 transition-transform duration-500"
                                  />
                                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wider select-none z-20 shadow-sm">
                                    📸 {lang === 'id' ? 'Visual Hasil Akhir' : lang === 'zh' ? '成品最终效果' : 'Final Crafted Result'}
                                  </div>
                                </div>

                                {/* Checklist of DIY materials */}
                                <div className="bg-slate-50/50 p-4 rounded-2xl border border-stone-100 space-y-2">
                                  <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest flex items-center gap-1.5 pb-1 border-b border-stone-200/50">
                                    <CheckSquare className="w-3.5 h-3.5 text-brand-sky" />
                                    {lang === 'id' ? 'Bahan Sederhana (Centang yang Ada)' : lang === 'zh' ? '简易配料包（勾选家中已有材料）' : 'Household Ingredients (Check off)'}
                                  </h4>
                                  <div className="space-y-1.5 pt-0.5">
                                    {tMaterials.map((mat, mIdx) => {
                                      const checkKey = `${game.id}_${mIdx}`;
                                      const isChecked = !!diyCheckedMaterials[checkKey];
                                      return (
                                        <div 
                                          key={mIdx}
                                          onClick={() => handleToggleDiyMaterial(game.id, mIdx)}
                                          className="flex items-center gap-2 cursor-pointer group"
                                        >
                                          {/* Tiny check box circle */}
                                          <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border transition-all text-[8px] ${
                                            isChecked 
                                              ? 'bg-brand-sky border-brand-sky text-white' 
                                              : 'bg-white border-stone-200 group-hover:border-brand-sky'
                                          }`}>
                                            {isChecked && "✓"}
                                          </div>
                                          <span className={`text-xs font-semibold transition-all ${
                                            isChecked ? 'line-through text-stone-400' : 'text-stone-700'
                                          }`}>
                                            {mat}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Step-by-Step DIY instructions */}
                                <div className="space-y-2">
                                  <h4 className="text-[10px] font-black text-stone-500 uppercase tracking-widest flex items-center gap-1">
                                    🛠 {lang === 'id' ? 'Cara Membuat & Bermain:' : lang === 'zh' ? 'DIY 制作步骤与玩法：' : 'Craft & Play Instructions:'}
                                  </h4>
                                  <div className="space-y-2 pl-1">
                                    {tSteps.map((step, sIdx) => {
                                      return (
                                        <div key={sIdx} className="flex gap-2 items-start text-xs text-slate-700 font-semibold font-sans leading-relaxed">
                                          <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-stone-500 shrink-0 border border-stone-200/40">
                                            {sIdx + 1}
                                          </span>
                                          <p className="pt-0.5">{step}</p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Developmental Benefit Badge */}
                                <div className="pt-3 border-t border-dashed border-stone-200/80 flex items-start gap-2 text-[11px] text-brand-sky font-semibold bg-blue-50/15 p-3 rounded-2xl">
                                  <span className="text-sm">💡</span>
                                  <p className="leading-normal font-sans italic">
                                    <strong className="not-italic tracking-wider uppercase font-black text-[9px] mr-1">
                                      {lang === 'id' ? 'Manfaat Perkembangan:' : lang === 'zh' ? '感官里程碑益处：' : 'Child Care Benefit:'}
                                    </strong>
                                    {tBenefit}
                                  </p>
                                </div>

                              </div>

                              {/* Card Action footer */}
                              <div className="pt-2 flex items-center justify-between">
                                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{lang === 'id' ? 'Mainan Buatan Sendiri' : lang === 'zh' ? '环保自制玩具' : 'DIY Homemade Toy'}</span>
                                <button
                                  type="button"
                                  onClick={() => handleToggleDiyGame(game.id)}
                                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                    isFinished 
                                      ? 'bg-brand-sky text-white shadow-inner scale-98' 
                                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>
                                    {isFinished 
                                      ? (lang === 'id' ? 'Sudah Dibuat di Rumah! ✓' : lang === 'zh' ? '已成功制作！✓' : 'Crafted at Home! ✓') 
                                      : (lang === 'id' ? 'Tandai Selesai Dibuat' : lang === 'zh' ? '标记已完成制作' : 'Mark as Crafted')}
                                  </span>
                                </button>
                              </div>

                            </motion.div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}

                {/* MODE B: CURATED DAILY STIMULATION PLANNERS SCREEN */}
                {diySubTab === 'planner' && (
                  <div className="space-y-6">
                    {/* Sub Menu Age Select */}
                    <div className="space-y-2">
                      <span className="block text-xs font-black text-stone-500 uppercase tracking-widest">{t.formAgeLabel}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['12 Months', '18 Months', '24 Months (2 Years)', '3 Years', '4 Years', '5 Years+'].map((ageItem) => (
                          <button
                            key={ageItem}
                            type="button"
                            onClick={() => { audioSystem.playCutePop(); setPlannerAge(ageItem); }}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              plannerAge === ageItem 
                                ? 'bg-brand-sage border-brand-sage text-white shadow-sm' 
                                : 'bg-slate-50 border-slate-200 text-stone-600 hover:bg-slate-100'
                            }`}
                          >
                            {translateAge(ageItem, lang)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Grid layout for activities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentActivities.length === 0 ? (
                        <p className="text-xs text-stone-400 italic py-4 col-span-full text-center">
                          {lang === 'id' ? 'Belum ada permainan terdaftar untuk usia ini.' : 'No items crafted for this age bracket yet.'}
                        </p>
                      ) : (
                        currentActivities.map((act) => {
                          const isDone = completedActivities.includes(act.id);
                          const isCelebrating = activityCelebrate === act.id;

                          return (
                            <motion.div
                              key={act.id}
                              whileHover={{ scale: 1.01 }}
                              className={`rounded-2.5xl p-5 border transition-all flex flex-col justify-between space-y-4 relative overflow-hidden ${
                                isDone 
                                  ? 'bg-blue-50/15 border-brand-sage/30 shadow-inner' 
                                  : 'bg-white border-stone-200/80 shadow-sm'
                              }`}
                            >
                              {/* Celebration overlay */}
                              {isCelebrating && (
                                <div className="absolute inset-0 bg-brand-sage/10 flex items-center justify-center animate-ping z-10 pointer-events-none">
                                  <span className="text-3xl">🎉 Yay! 🤩</span>
                                </div>
                              )}

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-2xl">{act.icon}</span>
                                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                    act.category === 'language' ? 'bg-blue-100 text-blue-700' :
                                    act.category === 'sensory' ? 'bg-pink-100 text-pink-700' :
                                    act.category === 'cognitive' ? 'bg-orange-100 text-orange-700' :
                                    'bg-emerald-100 text-emerald-700'
                                  }`}>
                                    {act.category}
                                  </span>
                                </div>

                                <div>
                                  <h4 className="font-display font-black text-base text-neutral-800">
                                    {lang === 'id' ? act.titleId : lang === 'zh' ? act.titleZh : act.titleEn}
                                  </h4>
                                  <p className="text-xs text-stone-500 font-medium font-sans leading-relaxed mt-1.5">
                                    {lang === 'id' ? act.descId : lang === 'zh' ? act.descZh : act.descEn}
                                  </p>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-stone-100/60 flex items-center justify-between">
                                <span className="text-[10px] text-stone-400 font-bold">{plannerAge}</span>
                                
                                <button
                                  type="button"
                                  onClick={() => handleToggleActivity(act.id)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    isDone 
                                      ? 'bg-brand-sage text-white shadow-inner scale-98' 
                                      : 'bg-slate-100 text-stone-600 hover:bg-slate-200/80'
                                  }`}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>
                                    {isDone 
                                      ? (lang === 'id' ? 'Selesai Hari Ini!' : 'Done Today!') 
                                      : (lang === 'id' ? 'Selesai Bermain' : 'Mark Completed')}
                                  </span>
                                </button>
                              </div>

                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}

          {/* TAB 4: GROWTH DIARY HISTORY LOG */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
                <div>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-neutral-800 flex items-center gap-2">
                    {t.historyTitle}
                  </h2>
                  <p className="text-xs md:text-sm text-stone-500 font-semibold font-sans mt-1">
                    {t.historySubtitle}
                  </p>
                </div>
                
                {history.length > 0 && (
                  <FriendlyButton variant="danger" size="sm" onClick={clearAllHistory} className="text-xs">
                    <Trash2 className="w-4 h-4" />
                    {t.historyClearAll}
                  </FriendlyButton>
                )}
              </div>

              {history.length === 0 ? (
                <div className="bg-white rounded-3xl border border-blue-100 p-12 text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-blue-50/50 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                    <History className="w-8 h-8 text-brand-sage" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-stone-700">{t.historyNoItemTitle}</h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      {t.historyNoItemDesc}
                    </p>
                  </div>
                  <FriendlyButton variant="secondary" size="sm" onClick={() => setActiveTab('interpreter')} className="text-xs font-bold">
                    {t.historyBtnBack}
                  </FriendlyButton>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              item.childBehaviorType === 'babble' ? 'bg-blue-50 text-blue-600' :
                              item.childBehaviorType === 'drawing' ? 'bg-pink-50 text-pink-600' :
                              'bg-orange-50 text-orange-600'
                            }`}>
                              {item.childBehaviorType === 'babble' ? t.presetBabble : item.childBehaviorType === 'drawing' ? t.presetDrawing : t.presetBehavior}
                            </span>
                            <span className="text-xs text-stone-400 font-bold">{item.timestamp}</span>
                          </div>
                          
                          <button
                            onClick={(e) => deleteHistoryItem(item.id, e)}
                            className="text-stone-400 hover:text-red-500 p-1 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                            title="Delete this history entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <p className="text-[10px] text-stone-400 font-black uppercase tracking-wider">{t.historyItemContext} ({item.childAge})</p>
                          <p className="text-xs font-medium text-stone-700 mt-1 line-clamp-3 leading-relaxed font-sans">
                            "{item.inputPrompt}"
                          </p>
                        </div>

                        {item.imageUrl && (
                          <div className="h-28 rounded-xl overflow-hidden border border-stone-100 bg-stone-50 flex items-center justify-center">
                            <img 
                              src={item.imageUrl} 
                              alt="Child scribble drawing" 
                              className="h-full object-contain" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <div className="border-t border-stone-100/80 pt-4 space-y-3 bg-slate-50/20 p-3 rounded-xl">
                          <div>
                            <p className="text-[10px] font-black text-brand-sky flex items-center gap-1.5 uppercase">
                              <span>🌟</span>
                              {t.historyItemReading}
                            </p>
                            <p className="text-xs text-stone-500 mt-1 leading-relaxed font-sans">
                              {item.response.magicBehindIt}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-black text-stone-700 flex items-center gap-1.5 uppercase">
                              <span>💡</span>
                              {t.historyItemMilestone}
                            </p>
                            <p className="text-xs text-stone-500 mt-1 leading-relaxed font-sans">
                              {item.response.hiddenMilestone}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                        <FriendlyButton 
                          variant="secondary" 
                          size="sm" 
                          className="text-xs font-bold"
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
                          {t.historyItemBtnDetails}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </FriendlyButton>
                      </div>

                    </motion.div>
                  ))}
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 5: SCIENTIFIC DEVELOPMENTAL STAGES GUIDE */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              
              <div className="text-center space-y-2">
                <h2 className="font-display font-black text-3xl text-neutral-800">
                  {t.stagesTitle}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 font-semibold font-sans">
                  {t.stagesSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Stage 1 details */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200/60 space-y-3.5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Baby className="w-6 h-6 text-brand-sky" />
                  </div>
                  <h3 className="font-display font-black text-slate-800 text-lg">{t.stagesBabbleTitle}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-medium">
                    {t.stagesBabbleDesc}
                  </p>
                </div>

                {/* Stage 2 details */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200/60 space-y-3.5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-brand-terracotta" />
                  </div>
                  <h3 className="font-display font-black text-slate-800 text-lg">{t.stagesDrawingTitle}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-medium">
                    {t.stagesDrawingDesc}
                  </p>
                </div>

                {/* Stage 3 details */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200/60 space-y-3.5 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="font-display font-black text-slate-800 text-lg">{t.stagesBehaviorTitle}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans font-medium">
                    {t.stagesBehaviorDesc}
                  </p>
                </div>

              </div>

              {/* Coach profile safety commitment cards */}
              <div className="bg-brand-cream/65 border border-brand-clay rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-white text-brand-terracotta flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Heart className="w-10 h-10 fill-brand-terracotta text-brand-terracotta" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-black text-neutral-800 text-lg">
                    {t.resultsCommitmentTitle}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans font-semibold">
                    {t.resultsCommitmentText}
                  </p>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Cozy Bottom Foot Footer Details */}
      <footer className="bg-white/90 border-t border-blue-100 py-8 px-4 text-center text-stone-400 text-xs z-10 relative">
        <div className="max-w-6xl mx-auto space-y-2">
          <p className="font-display font-black text-stone-500">
            © 2026 {t.appName}. {lang === 'id' ? 'Dibuat dengan kasih sayang untuk masa depan buah hati Anda.' : 'Crafted with absolute parental devotion.'}
          </p>
          <p className="text-[10px] opacity-75 max-w-2xl mx-auto leading-relaxed font-medium">
            {lang === 'id' 
              ? 'Didukung oleh kecerdasan buatan Google Gemini & kurikulum sains psikologi kognitif anak usia prasekolah.'
              : 'Powered by highly trained Google Gemini model proxies with pediatric development guideline mappings.'}
          </p>
        </div>
      </footer>

    </div>
  );
}
