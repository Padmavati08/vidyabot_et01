import { LanguageCode } from '../types';

export const ttsService = {
  isSpeaking: false,

  speak(text: string, lang: LanguageCode, onEnd?: () => void): boolean {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return false;
    }

    window.speechSynthesis.cancel();

    // Clean markdown/special characters
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .slice(0, 400);

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Map language code to BCP 47
    if (lang === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.05; // Friendly tone

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('TTS playback error', e);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    this.isSpeaking = true;
    window.speechSynthesis.speak(utterance);
    return true;
  },

  stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  },
};
