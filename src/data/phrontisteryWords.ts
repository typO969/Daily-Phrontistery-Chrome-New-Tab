import { PhrontisteryWord } from '../types';
import { detectWordGist } from '../utils/themeAndGist';
import { generatePhoneticRespelling, generateApproxIpa } from '../utils/pronunciationService';
import hugeWordsList from './hugeWords.json';

// Comprehensive dictionary seeded from the 17,000+ Phrontistery lexicon
export const RAW_PHRONTISTERY_WORDS: Array<{ word: string; definition: string; part_of_speech: string }> = hugeWordsList as Array<{ word: string; definition: string; part_of_speech: string }>;

let cachedWords: PhrontisteryWord[] | null = null;

export function clearWordsCache(): void {
  cachedWords = null;
}

/**
 * Hydrates and standardizes the word objects with detected gist, etymology, and phonetics.
 */
export function enrichWord(raw: { word: string; definition: string; part_of_speech: string; etymology?: string; custom?: boolean }): PhrontisteryWord {
  const gist = detectWordGist(raw.word, raw.definition, raw.part_of_speech);
  
  // Generate phonetics
  const ipa = generateApproxIpa(raw.word);
  const respelling = generatePhoneticRespelling(raw.word);
  const example = generateExampleSentence(raw.word, raw.definition, raw.part_of_speech);

  return {
    word: raw.word.toLowerCase(),
    definition: raw.definition,
    part_of_speech: raw.part_of_speech,
    ipa,
    respelling,
    etymology: raw.etymology || undefined,
    origin_language: undefined,
    gist,
    example,
    custom: raw.custom || false,
  };
}

export function getAllPhrontisteryWords(): PhrontisteryWord[] {
  if (cachedWords) {
    return cachedWords;
  }

  // Check if custom words are stored in localStorage
  let customWords: PhrontisteryWord[] = [];
  try {
    const stored = localStorage.getItem('phrontistery_custom_words');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        customWords = parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse custom words from localStorage', e);
  }

  const baseEnriched = RAW_PHRONTISTERY_WORDS.map(enrichWord);
  cachedWords = [...customWords, ...baseEnriched];
  return cachedWords;
}

/**
 * Deterministically retrieves the Daily Word based on year, month, and day.
 * Ensures that all users see the exact same word on the same date.
 */
export function getDailyWord(date: Date = new Date(), words: PhrontisteryWord[] = getAllPhrontisteryWords()): PhrontisteryWord {
  if (!words.length) {
    return enrichWord({ word: 'phrontistery', definition: 'a thinking-place; a place for study', part_of_speech: 'noun' });
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Simple deterministic integer hash
  const dateHash = (year * 372) + (month * 31) + day;
  const index = Math.abs(dateHash * 2654435761) % words.length;
  
  return words[index];
}

/**
 * Picks an unvisited random word (for "New Word Every Tab" mode) that hasn't
 * been viewed yet in the user's history, avoiding immediate repetition.
 */
export function getFreshWord(
  viewedWords: string[],
  words: PhrontisteryWord[] = getAllPhrontisteryWords()
): PhrontisteryWord {
  if (!words.length) {
    return enrichWord({ word: 'phrontistery', definition: 'a thinking-place', part_of_speech: 'noun' });
  }

  const unviewed = words.filter((w) => !viewedWords.includes(w.word.toLowerCase()));
  const candidatePool = unviewed.length > 0 ? unviewed : words;
  const randomIndex = Math.floor(Math.random() * candidatePool.length);
  return candidatePool[randomIndex];
}

function generateExampleSentence(word: string, def: string, pos: string): string {
  const w = word.toLowerCase();
  if (pos === 'adj' || pos === 'adjective') {
    return `The scholar observed an almost ${w} stillness across the vaulted scriptorium archives.`;
  }
  if (pos === 'noun') {
    return `In his dusty folio, the antiquarian lingered over the ancient ${w}, noting its curious rarity.`;
  }
  if (pos === 'verb') {
    return `The chroniclers sought to ${w} the dispute before the sovereign's arrival.`;
  }
  return `A rare demonstration of ${w}, noted in the annals of forgotten terminology.`;
}
