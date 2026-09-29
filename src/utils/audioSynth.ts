/**
 * Audio synthesis utility for voice pronunciation and ambient background atmosphere.
 * Built with standard Web Speech API and Web Audio API for zero-dependency reliability.
 */

let audioCtx: AudioContext | null = null;
let ambientNodes: { source: AudioNode; gain: GainNode }[] = [];
let isPlayingAmbient = false;

/**
 * Pronounces a word using native browser speech synthesis with dignified, clear cadence.
 */
export function speakWord(word: string): void {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending utterances
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.85; // Slightly measured, scholarly cadence
  utterance.pitch = 0.95;

  // Try to pick a natural English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    (v) => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Oliver') || v.name.includes('Serena')))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Toggles subtle library ambience (soft pink-noise rain and warm harmonic resonance).
 */
export function toggleAmbientSound(enable: boolean, volume = 0.15): boolean {
  if (!enable) {
    stopAmbientSound();
    return false;
  }

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    stopAmbientSound(); // Reset any existing nodes

    // Gentle filtered noise simulating soft rain or distant library wind
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    // Generate brown/pink ambient noise
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to warm low-mids (soft acoustic rain)
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, audioCtx.currentTime);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(volume * 0.08, audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noise.start();
    ambientNodes.push({ source: noise, gain: gainNode });
    isPlayingAmbient = true;
    return true;
  } catch (e) {
    console.warn('Failed to start ambient audio:', e);
    return false;
  }
}

export function stopAmbientSound(): void {
  ambientNodes.forEach(({ source }) => {
    try {
      (source as AudioBufferSourceNode).stop?.();
      source.disconnect();
    } catch {}
  });
  ambientNodes = [];
  isPlayingAmbient = false;
}

export function isAmbientPlaying(): boolean {
  return isPlayingAmbient;
}
