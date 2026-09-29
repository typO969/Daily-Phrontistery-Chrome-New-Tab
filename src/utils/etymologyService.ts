/**
 * Etymology Service
 * Fetches REAL historical etymologies from Wiktionary Open API.
 * Never invents speculative procedural guesses.
 * Caches retrieved etymologies in localStorage so they work offline once loaded.
 */

// In-memory + persistent localStorage cache
const CACHE_KEY = 'phrontistery_real_etymologies_v1';

function getLocalCache(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveToCache(word: string, etymology: string) {
  try {
    const cache = getLocalCache();
    cache[word.toLowerCase()] = etymology;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

// Pre-seeded verified scholarly etymologies for key Phrontistery words
const PRE_SEEDED_ETYMOLOGIES: Record<string, string> = {
  aardwolf: "From Afrikaans aardwolf, compound of aard ('earth') + wolf ('wolf').",
  aasvogel: "From Afrikaans aasvogel, from Dutch aas ('carrion') + vogel ('bird, vulture').",
  aba: "From Arabic عباءة (ʿabāʾa, 'sleeveless woolen cloak').",
  abacinate: "From Medieval Latin abacinare ('to blind with hot metal'), from Latin bacina ('basin').",
  abactor: "From Latin abāctor ('cattle-thief'), from abigō ('to drive away cattle').",
  abaculus: "From Latin abaculus, diminutive of abacus ('counting board, slab, tile').",
  abaft: "From Middle English abaften, from Old English onbæftan ('at the back, behind').",
  abampere: "From ab- ('absolute CGS unit') + ampere, named after French physicist André-Marie Ampère.",
  abasement: "From Old French abaissement, from abaissier ('to lower, cause to fall').",
  abasia: "From New Latin, from Ancient Greek ἀ- (a-, 'without') + βάσις (básis, 'step, walking').",
  abask: "From a- ('in state of') + bask, from Old Norse baðask ('to bathe oneself').",
  abatis: "From French abattis ('debris, felled trees'), from abattre ('to strike down, fell').",
  abattoir: "From French abattoir, from abattre ('to fell, knock down').",
  abature: "From French abatture, from abattre ('to beat down').",
  abecedarian: "From Medieval Latin abecedārius, formed from the names of the letters A, B, C, D.",
  abele: "From Middle Dutch abeel, from Late Latin albellus ('white poplar'), diminutive of albus ('white').",
  abject: "From Latin abiectus ('cast off, downcast'), from abiciō ('to throw away').",
  ablaut: "Coined by Jacob Grimm in German, from ab- ('down from, off') + Laut ('sound, tone').",
  ablepsia: "From Ancient Greek ἀβλεψία (ablepsía, 'blindness'), from ἀ- (a-, 'without') + βλέπω (blépō, 'I see').",
  ablution: "From Latin ablūtiō ('a washing, cleansing'), from abluō ('to wash away').",
  abnegate: "From Latin abnegātus, past participle of abnegō ('to refuse, deny').",
  aboulia: "From Ancient Greek ἀβουλία (aboulía, 'indecision, thoughtlessness'), from ἀ- + βουλή ('will, determination').",
  abscissa: "From Latin līnea abscissa ('a line cut off'), from abscindō ('to cut off').",
  abseil: "Borrowed from German abseilen ('to rope down'), from ab- ('down') + Seil ('rope').",
  absquatulate: "19th-century American humorous mock-Latin pseudo-formation, from ab- + squat ('to depart abruptly').",
  absterge: "From Latin abstergēre ('to wipe clean, expunge'), from ab- ('away') + tergēre ('to wipe').",
  absurdism: "From Latin absurdus ('out of tune, foolish') + -ism.",
  phrontistery: "From Ancient Greek φροντιστήριον (phrontistḗrion, 'a place of thinking or study'), from φροντιστής (phrontistḗs, 'thinker'), coined satirically by Aristophanes in The Clouds.",
  callipygous: "From Ancient Greek καλλίπυγος (kallípūgos), from κάλλος (kállos, 'beauty') + πῡγή (pūgḗ, 'buttocks').",
  sesquipedalian: "From Latin sesquipedālis ('a foot and a half long'), from sēsqui- ('one and a half') + pēs ('foot'), used by Horace to satirize bloated words.",
  defenestration: "Coined from New Latin dēfenestrātiō, from dē- ('down from') + fenestra ('window'), after the 1618 Defenestration of Prague.",
  boustrophedon: "From Ancient Greek βουστροφηδόν (boustrophēdón, 'turning like an ox in plowing'), from βοῦς (boûs, 'ox') + στρέφειν (stréphein, 'to turn').",
  chryselephantine: "From Ancient Greek χρῡσελεφάντινος (khrūselephántinos), from χρῡσός (khrūsós, 'gold') + ἐλεφάντινος (elephántinos, 'of ivory').",
  quidnunc: "From Latin quid nunc? ('what now?'), used in 18th-century English for a busybody always asking for news.",
  ultracrepidate: "From the Latin proverb 'Sutor, ne ultra crepidam' ('Shoemaker, not beyond the shoe'), attributed to the Greek painter Apelles.",
  sempiternal: "From Late Latin sempiternālis, from Latin semper ('always') + aeternus ('eternal').",
  aporia: "From Ancient Greek ἀπορία (aporía, 'state of being at a loss'), from ἄπορος (áporos, 'impassable').",
  taradiddle: "18th-century English colloquial playful alteration of diddle ('to cheat, waste time').",
  zyzzyva: "Coined in 1922 by American entomologist Thomas Lincoln Casey Jr. to ensure it would be the absolute last word in any alphabetical index.",
};

/**
 * Retrieves etymology for a word.
 * 1. Checks pre-seeded dictionary
 * 2. Checks local cache
 * 3. Attempts asynchronous fetch from Wiktionary Open API
 */
export async function getRealEtymology(word: string): Promise<string | null> {
  const cleanWord = word.trim().toLowerCase();

  // 1. Check pre-seeded dictionary
  if (PRE_SEEDED_ETYMOLOGIES[cleanWord]) {
    return PRE_SEEDED_ETYMOLOGIES[cleanWord];
  }

  // 2. Check localStorage cache
  const cache = getLocalCache();
  if (cache[cleanWord]) {
    return cache[cleanWord];
  }

  // 3. Fetch from Wiktionary REST API or MediaWiki Action API
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    // MediaWiki plain text extract endpoint
    const url = `https://en.wiktionary.org/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(
      cleanWord
    )}&format=json&origin=*`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const pages = data.query?.pages;
      if (pages) {
        const pageKey = Object.keys(pages)[0];
        const page = pages[pageKey];
        if (page && page.extract) {
          const extract = page.extract as string;
          const parsedEtym = extractEtymologyFromWiktionaryText(extract);
          if (parsedEtym) {
            saveToCache(cleanWord, parsedEtym);
            return parsedEtym;
          }
        }
      }
    }
  } catch (err) {
    console.debug('Wiktionary lookup error or timeout:', err);
  }

  return null;
}

/**
 * Parses Wiktionary plain-text extract to locate the exact "=== Etymology ===" section.
 */
function extractEtymologyFromWiktionaryText(text: string): string | null {
  // Look for "=== Etymology ===" or "=== Etymology 1 ==="
  const etymRegex = /===\s*Etymology(?:\s*\d+)?\s*===([\s\S]*?)(?=(?:===[^=]+===|==[^=]+==|$))/i;
  const match = text.match(etymRegex);
  if (match && match[1]) {
    // Clean up lines and get the concise etymology paragraph
    const lines = match[1]
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith('===') && !l.startsWith('=='));

    if (lines.length > 0) {
      let etym = lines.join(' ');
      // Truncate to reasonable length if too long
      if (etym.length > 280) {
        const periodIdx = etym.indexOf('.', 200);
        if (periodIdx !== -1) {
          etym = etym.slice(0, periodIdx + 1);
        } else {
          etym = etym.slice(0, 280) + '...';
        }
      }
      return etym;
    }
  }

  return null;
}
