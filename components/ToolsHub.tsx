import React, { useState, useEffect } from 'react';
import { 
  Volume2, Shield, Search, Play, Pause, SkipForward, RefreshCw, CheckCircle2,
  Phone, HeartPulse, Plus, Trash2, Hospital, AlertCircle, BookOpen,
  ChevronRight, ArrowRight, ClipboardList
} from 'lucide-react';

interface CustomClinic {
  id: string;
  name: string;
  phone: string;
  address: string;
  hours: string;
}

interface CustomHotline {
  id: string;
  name: string;
  phone: string;
  category: string;
}

interface ToolsHubProps {
  activeSubTab: string;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ activeSubTab }) => {
  // White noise state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState('Gentle Rain');

  // Safety / Emergency state
  const [safetyTab, setSafetyTab] = useState<'emergency' | 'childproof'>('emergency');
  const [activeFirstAid, setActiveFirstAid] = useState<'cpr' | 'choking' | 'maternal'>('cpr');
  
  // Custom clinics persistence
  const [customClinics, setCustomClinics] = useState<CustomClinic[]>(() => {
    try {
      const saved = localStorage.getItem('mamabora_custom_clinics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom hotlines persistence
  const [customHotlines, setCustomHotlines] = useState<CustomHotline[]>(() => {
    try {
      const saved = localStorage.getItem('mamabora_custom_hotlines');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Clinic form state
  const [newClinic, setNewClinic] = useState({ name: '', phone: '', address: '', hours: 'Open 24/7' });
  const [showClinicForm, setShowClinicForm] = useState(false);

  // Hotline form state
  const [newHotline, setNewHotline] = useState({ name: '', phone: '', category: 'Maternal Care' });
  const [showHotlineForm, setShowHotlineForm] = useState(false);

  // Success indicator states
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('mamabora_custom_clinics', JSON.stringify(customClinics));
  }, [customClinics]);

  useEffect(() => {
    localStorage.setItem('mamabora_custom_hotlines', JSON.stringify(customHotlines));
  }, [customHotlines]);

  const showFeedback = (text: string) => {
    setActionFeedback(text);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleAddClinic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClinic.name || !newClinic.phone) return;
    const clinic: CustomClinic = {
      id: Date.now().toString(),
      ...newClinic
    };
    setCustomClinics([...customClinics, clinic]);
    setNewClinic({ name: '', phone: '', address: '', hours: 'Open 24/7' });
    setShowClinicForm(false);
    showFeedback('Local clinic added successfully!');
  };

  const handleDeleteClinic = (id: string) => {
    setCustomClinics(customClinics.filter(c => c.id !== id));
    showFeedback('Clinic contact removed.');
  };

  const handleAddHotline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotline.name || !newHotline.phone) return;
    const hotline: CustomHotline = {
      id: Date.now().toString(),
      ...newHotline
    };
    setAllHotlinesState([...customHotlines, hotline]);
    setNewHotline({ name: '', phone: '', category: 'Maternal Care' });
    setShowHotlineForm(false);
    showFeedback('Custom emergency hotline added!');
  };

  const setAllHotlinesState = (updatedList: CustomHotline[]) => {
    setCustomHotlines(updatedList);
  };

  const handleDeleteHotline = (id: string) => {
    setCustomHotlines(customHotlines.filter(h => h.id !== id));
    showFeedback('Custom hotline removed.');
  };

  const renderWhiteNoise = () => (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 px-4 sm:px-6">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-white">White Noise</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Soothing sounds to help your baby sleep deeper and longer.</p>
      </div>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-[3rem] p-6 sm:p-12 flex flex-col items-center space-y-8 sm:space-y-10 shadow-xl">
        <div className={`w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 sm:border-8 border-zinc-100 dark:border-zinc-800 flex items-center justify-center relative ${isPlaying ? 'animate-pulse' : ''}`}>
           <div className="absolute inset-0 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-2xl sm:blur-3xl"></div>
           <Volume2 className={`w-12 h-12 sm:w-20 sm:h-20 ${isPlaying ? 'text-red-600 dark:text-red-500' : 'text-zinc-300 dark:text-zinc-700'} transition-colors`} />
        </div>
        <div className="text-center space-y-1 sm:space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">{currentSound}</h3>
            <p className="text-zinc-400 dark:text-zinc-500 text-[10px] sm:text-sm uppercase tracking-widest font-black">Playing Now</p>
        </div>
        <div className="flex items-center gap-6 sm:gap-8">
            <button className="p-3 sm:p-4 text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"><RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" /></button>
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-600/20 active:scale-95 transition-all"
            >
                {isPlaying ? <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-current" /> : <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />}
            </button>
            <button className="p-3 sm:p-4 text-zinc-400 dark:text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"><SkipForward className="w-5 h-5 sm:w-6 sm:h-6" /></button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
            {['White Noise', 'Gentle Rain', 'Womb Sounds', 'Ocean Waves'].map(sound => (
                <button 
                    key={sound}
                    onClick={() => { setCurrentSound(sound); setIsPlaying(true); }}
                    className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl border transition-all text-xs sm:text-sm font-bold ${currentSound === sound ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400' : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700'}`}
                >
                    {sound}
                </button>
            ))}
        </div>
      </div>
    </div>
  );

  const defaultClinics: CustomClinic[] = [
    { id: '1', name: "St. Mary's Maternal & Pediatric Unit", phone: "1-800-555-0192", address: "120 Care Way, Suite A", hours: "Open 24/7" },
    { id: '2', name: "Green Valley Family Medical Care", phone: "1-800-555-0245", address: "45 Medical Plaza Rd", hours: "Mon-Fri 8 AM - 6 PM" },
    { id: '3', name: "Hope Women's Hospital Unit", phone: "1-800-555-0987", address: "88 Mercy Blvd, Main Wing", hours: "Open 24/7" }
  ];

  const defaultHotlines: CustomHotline[] = [
    { id: 'h1', name: "National Maternal Warning Line", phone: "1-833-852-6262", category: "Maternal Care" },
    { id: 'h2', name: "Maternal Mental Health Help", phone: "1-833-943-5746", category: "Mental Support" },
    { id: 'h3', name: "National Poison Control Center", phone: "1-800-222-1222", category: "Pediatric Help" },
  ];

  const allClinics = [...defaultClinics, ...customClinics];
  const allHotlines = [...defaultHotlines, ...customHotlines];

  const firstAidData = {
    cpr: {
      title: "Infant CPR Guide (Under 1 Year)",
      subtitle: "Cardiac arrest response instruction cycle",
      icon: HeartPulse,
      steps: [
        { num: "1", title: "Assess & Alert", desc: "Tap the sole of baby's foot & call their name. If unresponsive, shout for help. Dial emergency line instantly." },
        { num: "2", title: "Give 30 Compressions", desc: "Position 2 fingers on the center of the chest (just below nipple line). Press 1.5 inches deep at 100-120 bpm speed." },
        { num: "3", title: "Give 2 Gentle breaths", desc: "Tilt head slightly back. Cover baby's nose & mouth with yours. Blow gently for 1 sec. Watch for chest rise." },
        { num: "4", title: "Repeat Continuous Cycles", desc: "Continue the 30 compressions & 2 breaths cycle steadily until EMS responder takes over or child revives." }
      ]
    },
    choking: {
      title: "Conscious Infant Choking Rescue",
      subtitle: "Airway obstruction rapid relief cycle",
      icon: AlertCircle,
      steps: [
        { num: "1", title: "Position Face Down", desc: "Place baby face down on your forearm, supporting head/jaw firmly. Keep baby's head lower than chest." },
        { num: "2", title: "Give 5 Solid Back Blows", desc: "Deliver 5 firm blows with heel of your palm between child's shoulder blades to dislodge object." },
        { num: "3", title: "Support Face Up", desc: "Turn baby face up along other arm keeping head lower than body. Support occipital head region carefully." },
        { num: "4", title: "Give 5 Chest Thrusts", desc: "Press center of baby's chest (same point as CPR comp) firmly 5 times. Alternate with back blows until object clears." }
      ]
    },
    maternal: {
      title: "Emergency Maternal Warning Signs",
      subtitle: "Critical symptom lists & immediate safety steps",
      icon: BookOpen,
      steps: [
        { num: "1", title: "Severe Persistent Headache", desc: "Thicker throbbing headache that won't improve with medication. Highly indicative of preeclampsia." },
        { num: "2", title: "Vision Changes", desc: "Spot flashing, blurred field, temporary dimming or blind segments. Seizure threat requires immediate care." },
        { num: "3", title: "Extreme Sudden Swelling", desc: "Puffiness in hands, eyelids or feet. Extreme weight increase exceeding 2 lbs within a single day." },
        { num: "4", title: "Shortness of Breath", desc: "Difficulty breathing, dry hacking cough while lying flat, extreme chest pressure. Alert clinic at once." }
      ]
    }
  };

  const renderSafety = () => (
    <div className="space-y-8 sm:space-y-12 px-4 sm:px-6">
      
      {/* Toast Feedback notifications */}
      {actionFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up text-xs sm:text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">Safety & Emergency Hub</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
          Preparedness is the best protection. Access rapid dialing lines, essential pediatric emergency guides, and childproofing checklists instantly.
        </p>

        {/* Action Toggle Switch */}
        <div className="inline-flex p-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl justify-center gap-1.5">
          <button
            onClick={() => setSafetyTab('emergency')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${safetyTab === 'emergency' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            <Phone className="w-4 h-4" />
            <span>Emergency Hub Dial</span>
          </button>
          <button
            onClick={() => setSafetyTab('childproof')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${safetyTab === 'childproof' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Childproofing Checklists</span>
          </button>
        </div>
      </div>

      {safetyTab === 'emergency' ? (
        <div className="space-y-10 sm:space-y-16">
          
          {/* Section 1: Hotlines & Add Custom Hotlines */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-red-600" /> Emergency Hotline List
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">Directly swipe, dial, or save custom maternal-health emergency hotlines.</p>
              </div>
              <button
                onClick={() => setShowHotlineForm(!showHotlineForm)}
                className="py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 rounded-xl font-bold text-xs flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:border-red-200 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showHotlineForm ? "Cancel" : "Add Custom Hotline"}</span>
              </button>
            </div>

            {/* Form to add custom hotline */}
            {showHotlineForm && (
              <form onSubmit={handleAddHotline} className="bg-zinc-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-lg space-y-4 animate-slide-up">
                <h4 className="font-bold text-sm text-zinc-950 dark:text-white uppercase tracking-wider">New Hotline Contact</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400">Contact/Agency Name</label>
                    <input 
                      type="text" 
                      required
                      value={newHotline.name}
                      onChange={e => setNewHotline({...newHotline, name: e.target.value})}
                      placeholder="e.g., Personal Midwife"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-2.5 rounded-xl text-xs sm:text-sm focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400">Phone Number</label>
                    <input 
                      type="text" 
                      required
                      value={newHotline.phone}
                      onChange={e => setNewHotline({...newHotline, phone: e.target.value})}
                      placeholder="e.g., 555-010-2222"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-2.5 rounded-xl text-xs sm:text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 text-xs">
                  <button type="submit" className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg">
                    Save Hotline
                  </button>
                </div>
              </form>
            )}

            {/* Hotlines Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allHotlines.map((hotline) => (
                <div 
                  key={hotline.id} 
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-red-500/30 dark:hover:border-red-900/40 hover:shadow-md transition-all relative overflow-hidden group/hotline"
                >
                  <div className="absolute right-0 top-0 bg-red-500/5 hover:bg-red-500/10 text-red-600 font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-bl-xl border-l border-b border-zinc-100 dark:border-zinc-800">
                    {hotline.category}
                  </div>
                  <div className="space-y-2 mt-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate pr-16">{hotline.name}</h4>
                    <p className="font-mono text-zinc-500 dark:text-zinc-400 text-lg sm:text-xl font-bold">{hotline.phone}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4">
                    <a 
                      href={`tel:${hotline.phone}`}
                      onClick={() => showFeedback(`Simulating dial to ${hotline.name}...`)}
                      className="flex-1 text-center py-2 bg-red-50 dark:bg-red-950/20 hover:bg-red-600 hover:text-white transition-all text-red-600 dark:text-red-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 fill-current" />
                      <span>Call Now</span>
                    </a>
                    {hotline.id.startsWith('h') ? null : (
                      <button 
                        onClick={() => handleDeleteHotline(hotline.id)}
                        className="p-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-400 hover:text-red-600 rounded-xl transition-all border border-zinc-100 dark:border-zinc-800"
                        title="Delete custom hotline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: First-Aid Guides */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2.5">
                <Hospital className="w-5 h-5 text-red-600" /> First-Aid Response Guides
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">Step-by-step instructions for emergency conditions & pediatric airway rescue.</p>
            </div>

            {/* Guide Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl max-w-xl">
              {(Object.keys(firstAidData) as Array<keyof typeof firstAidData>).map((key) => {
                const guide = firstAidData[key];
                const TabIcon = guide.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFirstAid(key)}
                    className={`py-3 px-1 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${activeFirstAid === key ? 'bg-red-500 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="text-center sm:text-left">{key === 'cpr' ? 'CPR' : key === 'choking' ? 'Choking' : 'Maternal'}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Active Guide Content */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in">
              <div className="space-y-1 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Active First-Aid Response Manual</span>
                <h4 className="text-2xl font-extrabold text-zinc-900 dark:text-white">{firstAidData[activeFirstAid].title}</h4>
                <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500">{firstAidData[activeFirstAid].subtitle}</p>
              </div>

              {/* Steps Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {firstAidData[activeFirstAid].steps.map((step, idx) => (
                  <div key={idx} className="space-y-3 relative group/step bg-zinc-50/50 dark:bg-zinc-850/30 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <span className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 font-black flex items-center justify-center text-sm border border-red-100 dark:border-red-900/20 group-hover/step:bg-red-600 group-hover/step:text-white transition-all">
                      {step.num}
                    </span>
                    <h5 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover/step:text-red-600 transition-colors">{step.title}</h5>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Local Clinic Contact Info */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white flex items-center gap-2.5">
                  <Hospital className="w-5 h-5 text-red-600" /> Local Clinics & Medical Centers
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">Keep track of primary healthcare providers, specialists & nearest ER facilities.</p>
              </div>
              <button
                onClick={() => setShowClinicForm(!showClinicForm)}
                className="py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 rounded-xl font-bold text-xs flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:border-red-200 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showClinicForm ? "Cancel" : "Add Primary Clinic"}</span>
              </button>
            </div>

            {/* Custom Clinic Addition Form */}
            {showClinicForm && (
              <form onSubmit={handleAddClinic} className="bg-zinc-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-xl space-y-4 animate-slide-up">
                <h4 className="font-bold text-sm text-zinc-950 dark:text-white uppercase tracking-wider">Add Clinic Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400">Clinic / Hospital Name</label>
                    <input 
                      type="text" 
                      required
                      value={newClinic.name}
                      onChange={e => setNewClinic({...newClinic, name: e.target.value})}
                      placeholder="e.g., Mercy Health Clinic"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-2.5 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400">Contact Number</label>
                    <input 
                      type="text" 
                      required
                      value={newClinic.phone}
                      onChange={e => setNewClinic({...newClinic, phone: e.target.value})}
                      placeholder="e.g., 555-019-9999"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-2.5 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400">Address / Location</label>
                    <input 
                      type="text" 
                      value={newClinic.address}
                      onChange={e => setNewClinic({...newClinic, address: e.target.value})}
                      placeholder="e.g., Highway Blvd 21"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-2.5 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-zinc-400">Hours of Operation</label>
                    <input 
                      type="text" 
                      value={newClinic.hours}
                      onChange={e => setNewClinic({...newClinic, hours: e.target.value})}
                      placeholder="e.g., Mon-Fri 8 AM - 5 PM"
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-2.5 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 text-xs">
                  <button type="submit" className="py-2.5 px-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg">
                    Add Clinic
                  </button>
                </div>
              </form>
            )}

            {/* Clinic Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allClinics.map((clinic) => (
                <div 
                  key={clinic.id} 
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col justify-between hover:border-red-500/20 shadow-sm relative group/clinic"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-50 dark:bg-zinc-850 px-2.5 py-1 rounded-md">
                        {clinic.hours}
                      </span>
                      {['1', '2', '3'].includes(clinic.id) ? null : (
                        <button 
                          onClick={() => handleDeleteClinic(clinic.id)}
                          className="p-1 rounded bg-zinc-50 hover:bg-red-50 text-zinc-400 hover:text-red-600 select-none cursor-pointer border border-zinc-100 dark:border-zinc-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white leading-snug">{clinic.name}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold">{clinic.address}</p>
                    <p className="font-mono text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-850 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800 w-fit">
                      <Phone className="w-3.5 h-3.5 text-red-500" />
                      <span>{clinic.phone}</span>
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4">
                    <a 
                      href={`tel:${clinic.phone}`}
                      onClick={() => showFeedback(`Calling medical contact: ${clinic.name}...`)}
                      className="w-full text-center py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/10 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Place Direct Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <SafetyCard room="Living Room" items={["Anchor heavy furniture", "Cover electrical outlets", "Soften sharp corners"]} />
          <SafetyCard room="Kitchen" items={["Cabinet latches for cleaners", "Stove knob covers", "Keep knives out of reach"]} />
          <SafetyCard room="Nursery" items={["Crib safety standard check", "No loose blankets or toys", "Anchor changing table"]} />
          <SafetyCard room="Bathroom" items={["Toilet seat locks", "Anti-slip tub mat", "Medicine cabinet locks"]} />
        </div>
      )}
    </div>
  );

  const renderNames = () => (
    <div className="max-w-2xl mx-auto space-y-8 sm:space-y-12 px-4 sm:px-6">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 dark:text-white">Baby Names</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">Find the perfect name with our curated meaning-first database.</p>
      </div>
      <div className="relative group">
          <Search className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-4 h-4 sm:w-5 sm:h-5" />
          <input 
            type="text" 
            placeholder="Search by meaning or origin..." 
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl py-4 sm:py-6 pl-12 sm:pl-16 pr-5 sm:pr-6 text-base sm:text-lg focus:outline-none focus:border-red-600/50 transition-all text-zinc-950 dark:text-white shadow-sm"
          />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
         {[
           { name: "Aria", origin: "Italian", meaning: "Air; Song" },
           { name: "Leo", origin: "Latin", meaning: "Lion" },
           { name: "Maya", origin: "Sanskrit", meaning: "Illusion; Water" },
           { name: "Caleb", origin: "Hebrew", meaning: "Devotion; Whole Heart" }
         ].map(item => (
            <div key={item.name} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors shadow-sm">
              <div>
                 <h4 className="text-lg sm:text-xl font-black text-zinc-950 dark:text-white">{item.name}</h4>
                 <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm">{item.origin} origin • {item.meaning}</p>
              </div>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-zinc-100 dark:border-zinc-700">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
         ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-6 sm:py-10 animate-fade-in">
      {activeSubTab === 'white-noise' && renderWhiteNoise()}
      {activeSubTab === 'safety' && renderSafety()}
      {activeSubTab === 'baby-names' && renderNames()}
    </div>
  );
};

const SafetyCard = ({ room, items }: { room: string, items: string[] }) => (
  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 space-y-4 sm:space-y-6 shadow-sm group hover:border-red-600/20 dark:hover:border-red-900/40 transition-all">
    <div className="flex items-center gap-3">
        <div className="p-2 sm:p-3 bg-red-50 dark:bg-red-950/20 rounded-xl sm:rounded-2xl transition-colors group-hover:bg-red-100 dark:group-hover:bg-red-900/40">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white">{room}</h3>
    </div>
    <ul className="space-y-3 sm:space-y-4">
        {items.map(item => (
            <li key={item} className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
  </div>
);
