// Web Audio API procedural audio synthesizer for Little Things app
// Provides lovely music box background music and playful click sound effects.

export interface BGMTrack {
  id: string;
  name: {
    en: string;
    id: string;
    zh: string;
  };
  melody: Array<{ note: string; dur: number }>;
}

export const BGM_TRACKS: BGMTrack[] = [
  {
    id: 'twinkle',
    name: {
      en: "Twinkle Twinkle Little Star",
      id: "Bintang Kecil",
      zh: "一閃一閃亮晶晶"
    },
    melody: [
      { note: 'C5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'G5', dur: 1 }, { note: 'G5', dur: 1 },
      { note: 'A5', dur: 1 }, { note: 'A5', dur: 1 }, { note: 'G5', dur: 2 },
      { note: 'F5', dur: 1 }, { note: 'F5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 },
      { note: 'D5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 2 },
      
      { note: 'G5', dur: 1 }, { note: 'G5', dur: 1 }, { note: 'F5', dur: 1 }, { note: 'F5', dur: 1 },
      { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'D5', dur: 2 },
      { note: 'G5', dur: 1 }, { note: 'G5', dur: 1 }, { note: 'F5', dur: 1 }, { note: 'F5', dur: 1 },
      { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'D5', dur: 2 },
      
      { note: 'C5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'G5', dur: 1 }, { note: 'G5', dur: 1 },
      { note: 'A5', dur: 1 }, { note: 'A5', dur: 1 }, { note: 'G5', dur: 2 },
      { note: 'F5', dur: 1 }, { note: 'F5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 },
      { note: 'D5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 2 }
    ]
  },
  {
    id: 'sleeping',
    name: {
      en: "Are You Sleeping? (Frère Jacques)",
      id: "Dua Mata Saya / Bapak Tani",
      zh: "兩隻老虎 (雅克兄弟)"
    },
    melody: [
      { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 },
      { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 },
      { note: 'E5', dur: 1 }, { note: 'F5', dur: 1 }, { note: 'G5', dur: 2 },
      { note: 'E5', dur: 1 }, { note: 'F5', dur: 1 }, { note: 'G5', dur: 2 },
      { note: 'G5', dur: 0.5 }, { note: 'A5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 },
      { note: 'G5', dur: 0.5 }, { note: 'A5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 },
      { note: 'C5', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'C5', dur: 2 },
      { note: 'C5', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'C5', dur: 2 }
    ]
  },
  {
    id: 'lamb',
    name: {
      en: "Mary Had a Little Lamb",
      id: "Mary Punya Domba Kecil",
      zh: "瑪麗有隻小綿羊"
    },
    melody: [
      { note: 'E5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 },
      { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'E5', dur: 2 },
      { note: 'D5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'D5', dur: 2 },
      { note: 'E5', dur: 1 }, { note: 'G5', dur: 1 }, { note: 'G5', dur: 2 },
      { note: 'E5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 },
      { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'E5', dur: 1 },
      { note: 'D5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'D5', dur: 1 },
      { note: 'C5', dur: 3 }
    ]
  },
  {
    id: 'boat',
    name: {
      en: "Row, Row, Row Your Boat",
      id: "Dayung Perahumu",
      zh: "划船歌"
    },
    melody: [
      { note: 'C5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'C5', dur: 0.75 }, { note: 'D5', dur: 0.25 }, { note: 'E5', dur: 1 },
      { note: 'E5', dur: 0.75 }, { note: 'D5', dur: 0.25 }, { note: 'E5', dur: 0.75 }, { note: 'F5', dur: 0.25 }, { note: 'G5', dur: 2 },
      { note: 'C6', dur: 0.33 }, { note: 'C6', dur: 0.33 }, { note: 'C6', dur: 0.33 }, { note: 'G5', dur: 0.33 }, { note: 'G5', dur: 0.33 }, { note: 'G5', dur: 0.33 }, 
      { note: 'E5', dur: 0.33 }, { note: 'E5', dur: 0.33 }, { note: 'E5', dur: 0.33 }, { note: 'C5', dur: 0.33 }, { note: 'C5', dur: 0.33 }, { note: 'C5', dur: 0.33 },
      { note: 'G5', dur: 0.75 }, { note: 'F5', dur: 0.25 }, { note: 'E5', dur: 0.75 }, { note: 'D5', dur: 0.25 }, { note: 'C5', dur: 2 }
    ]
  },
  {
    id: 'brahms',
    name: {
      en: "Brahms' Lullaby",
      id: "Lullaby Klasik (Brahms)",
      zh: "勃拉姆斯搖籃曲"
    },
    melody: [
      { note: 'E5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 1.5 },
      { note: 'E5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 1.5 },
      { note: 'E5', dur: 0.5 }, { note: 'G5', dur: 0.5 }, { note: 'C6', dur: 1.5 }, { note: 'B5', dur: 0.5 },
      { note: 'A5', dur: 0.5 }, { note: 'A5', dur: 0.5 }, { note: 'G5', dur: 1.5 },
      { note: 'D5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'F5', dur: 1.5 },
      { note: 'D5', dur: 0.5 }, { note: 'D5', dur: 0.5 }, { note: 'E5', dur: 0.5 }, { note: 'F5', dur: 1.5 },
      { note: 'D5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'B5', dur: 1.5 }, { note: 'A5', dur: 0.5 },
      { note: 'G5', dur: 0.5 }, { note: 'B5', dur: 0.5 }, { note: 'C6', dur: 2 }
    ]
  }
];

class AudioSystem {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayFeedback: GainNode | null = null;
  
  private isBgmPlaying = false;
  private currentTrackId = 'twinkle';
  private currentNoteIndex = 0;
  private timerId: any = null;
  private bpm = 80; // Calm, soothing lullaby speed
  private volumeValue = 0.08; // Delicate ambient volume level

  // Soft, harmonious C-major pentatonic star lullaby notes
  private melody = BGM_TRACKS[0].melody;

  // Frequency mapping for music box
  private freqs: Record<string, number> = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
    'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
  };

  constructor() {
    // Lazy AudioContext initialization
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.volumeValue, this.ctx.currentTime);

    // Warm echo/delay line for realistic ambient music-box decay
    this.delayNode = this.ctx.createDelay(2.0);
    this.delayNode.delayTime.setValueAtTime(0.4, this.ctx.currentTime);

    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Connect delay network
    this.bgmGain.connect(this.ctx.destination);
    
    // Feedback loop: bgmGain -> delayNode -> feedbackGain -> delayNode -> bgmGain
    this.bgmGain.connect(this.delayNode);
    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayFeedback.connect(this.bgmGain);
  }

  public resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays an incredibly warm, peaceful, comforting Acoustic Harp & Music Box chime
  private playAcousticSoftNote(freq: number, startTime: number, duration: number, isHarmony = false) {
    if (!this.ctx || !this.bgmGain) return;

    // Create musical nodes
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const noteGain = this.ctx.createGain();

    // Pure, sweet sine wave of the fundamental frequency (for pure comfort and clarity)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Mild, warm triangle wave for the acoustic body/wood resonance
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, startTime);

    // Gentle lowpass filter to smooth out all upper frequencies (keeps it perfectly warm, soft, and comforting)
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isHarmony ? freq * 1.5 : freq * 2.0, startTime);
    filter.Q.setValueAtTime(0.7, startTime);

    // Warm, organic pluck envelope: ultra-gentle attack to avoid harsh clicking,
    // followed by a peaceful, soothing exponential decay.
    const peakGain = isHarmony ? 0.05 : 0.08;
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.03); // Soft pluck ramp
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    // Blend primary sine wave and subtle triangle wood resonance
    osc1.connect(filter);
    
    const triangleBlend = this.ctx.createGain();
    triangleBlend.gain.setValueAtTime(isHarmony ? 0.06 : 0.10, startTime);
    osc2.connect(triangleBlend);
    triangleBlend.connect(filter);

    filter.connect(noteGain);
    noteGain.connect(this.bgmGain);

    // Start acoustic oscillations
    osc1.start(startTime);
    osc2.start(startTime);

    // Gracefully stop when sound has decayed
    const stopTime = startTime + duration + 0.1;
    osc1.stop(stopTime);
    osc2.stop(stopTime);
  }

  // Melodic scheduler loop
  private scheduleNextNotes() {
    if (!this.isBgmPlaying || !this.ctx) return;

    const lookAheadTime = 0.5; // schedule ahead by 500ms
    const scheduleTime = this.ctx.currentTime;

    const secPerBeat = 60.0 / this.bpm;
    const currentItem = this.melody[this.currentNoteIndex];
    const freq = this.freqs[currentItem.note] || 440;
    const duration = currentItem.dur * secPerBeat;

    // Play primary sweet melody note
    this.playAcousticSoftNote(freq, scheduleTime, duration, false);

    // Occasional gentle harmonies on 1st/3rd beat to sound incredibly warm and comforting
    if (this.currentNoteIndex % 4 === 0) {
      const harmonyNote = this.melody[(this.currentNoteIndex + 2) % this.melody.length];
      const harmFreq = (this.freqs[harmonyNote.note] || 440) / 2; // play one octave lower for comforting drone base
      this.playAcousticSoftNote(harmFreq, scheduleTime, duration * 1.5, true);
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
    
    // Set timer for the next note
    this.timerId = setTimeout(() => {
      this.scheduleNextNotes();
    }, duration * 1000);
  }

  public playBGM() {
    this.resume();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.scheduleNextNotes();
  }

  public pauseBGM() {
    this.isBgmPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public setVolume(vol: number) {
    this.resume();
    this.volumeValue = vol;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volumeValue;
  }

  public getCurrentTrackId(): string {
    return this.currentTrackId;
  }

  public setTrack(trackId: string) {
    const track = BGM_TRACKS.find(t => t.id === trackId);
    if (!track) return;
    
    this.currentTrackId = trackId;
    this.melody = track.melody;
    this.currentNoteIndex = 0;

    // Reset loop if active to immediately start playing the new track
    if (this.isBgmPlaying) {
      this.pauseBGM();
      this.playBGM();
    }
  }

  // CUTE SOUND EFFECTS: Procedurally synthesized

  // Sound 1: Bubble Pop - satisfying tick/pop for buttons
  public playCutePop() {
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';
    
    const now = this.ctx.currentTime;
    // Fast frequency sweep (from low to high for bubble feel)
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.08);

    // Sharp decay envelope
    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Sound 2: Dreamy Chime - for category swaps page sweeps
  public playDreamChime() {
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // First high chime
    this.playSingleChime(880, now, 0.25);
    // Second higher chime slightly delayed
    this.playSingleChime(1318.51, now + 0.06, 0.35);
  }

  private playSingleChime(freq: number, startTime: number, duration: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0.07, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  // Sound 3: Sparkle Success - play on successful decode readings
  public playSuccessSparkle() {
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Beautiful C Major chord (C5, E5, G5, C6)
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gainNode.gain.setValueAtTime(0, now + idx * 0.07);
      gainNode.gain.linearRampToValueAtTime(0.1, now + idx * 0.07 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.35);
    });
  }
}

export const audioSystem = new AudioSystem();
