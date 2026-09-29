/**
 * Pronunciation Service
 * Handles phonetic respelling ([AHRD-woolf]), IPA notation (/ˌɑːrdˈwʊlf/),
 * and live Wiktionary lookup for verified pronunciations.
 */

// Cache for verified Wiktionary IPAs
const IPA_CACHE_KEY = 'phrontistery_ipa_cache_v1';

function getIpaCache(): Record<string, string> {
  try {
    const raw = localStorage.getItem(IPA_CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveIpaToCache(word: string, ipa: string) {
  try {
    const cache = getIpaCache();
    cache[word.toLowerCase()] = ipa;
    localStorage.setItem(IPA_CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

// Curated verified phonetics for notable rare words
const PRE_SEEDED_PRONUNCIATIONS: Record<string, { ipa: string; respelling: string }> = {
  aardwolf: { ipa: '/ˈɑːrdˌwʊlf/', respelling: 'AHRD-woolf' },
  aasvogel: { ipa: '/ˈɑːsˌfoʊ.ɡəl/', respelling: 'AHS-voh-guhl' },
  aba: { ipa: '/əˈbɑː/', respelling: 'uh-BAH' },
  abacinate: { ipa: '/əˈbæs.ɪ.neɪt/', respelling: 'uh-BASS-ih-nayt' },
  abactor: { ipa: '/əˈbæk.tər/', respelling: 'uh-BAK-ter' },
  abaculus: { ipa: '/əˈbæk.jʊ.ləs/', respelling: 'uh-BAK-yuh-luhs' },
  abaft: { ipa: '/əˈbæft/', respelling: 'uh-BAFT' },
  abampere: { ipa: '/æbˈæm.pɪər/', respelling: 'ab-AM-peer' },
  abasement: { ipa: '/əˈbeɪs.mənt/', respelling: 'uh-BAYS-muhnt' },
  abasia: { ipa: '/əˈbeɪ.ʒi.ə/', respelling: 'uh-BAY-zhee-uh' },
  abask: { ipa: '/əˈbæsk/', respelling: 'uh-BASK' },
  abatis: { ipa: '/ˈæb.ə.ti/', respelling: 'AB-uh-tee' },
  abattoir: { ipa: '/ˈæb.ə.twɑːr/', respelling: 'AB-uh-twahr' },
  abature: { ipa: '/ˈæb.ə.tʃər/', respelling: 'AB-uh-cher' },
  abecedarian: { ipa: '/ˌeɪ.biː.siːˈdɛə.ri.ən/', respelling: 'ay-bee-see-DAIR-ee-uhn' },
  abele: { ipa: '/əˈbiːl/', respelling: 'uh-BEEL' },
  abject: { ipa: '/ˈæb.dʒɛkt/', respelling: 'AB-jekt' },
  ablaut: { ipa: '/ˈɑːp.laʊt/', respelling: 'AHP-lowt' },
  ablepsia: { ipa: '/eɪˈblɛp.si.ə/', respelling: 'ay-BLEP-see-uh' },
  ablution: { ipa: '/əˈbluː.ʃən/', respelling: 'uh-BLOO-shuhn' },
  abnegate: { ipa: '/ˈæb.nɪ.ɡeɪt/', respelling: 'AB-nih-gayt' },
  aboulia: { ipa: '/əˈbuː.li.ə/', respelling: 'uh-BOO-lee-uh' },
  abscissa: { ipa: '/æbˈsɪs.ə/', respelling: 'ab-SIS-uh' },
  abseil: { ipa: '/ˈæb.seɪl/', respelling: 'AB-sayl' },
  absquatulate: { ipa: '/æbˈskwɒt.jʊ.leɪt/', respelling: 'ab-SKWOT-yoo-layt' },
  absterge: { ipa: '/æbˈstɜːrdʒ/', respelling: 'ab-STURJ' },
  absurdism: { ipa: '/æbˈsɜːr.dɪ.zəm/', respelling: 'ab-SUR-diz-uhm' },
  phrontistery: { ipa: '/frɒnˈtɪs.tər.i/', respelling: 'fron-TIS-ter-ee' },
  callipygous: { ipa: '/ˌkæl.ɪˈpaɪ.ɡəs/', respelling: 'kal-ih-PY-guhs' },
  sesquipedalian: { ipa: '/ˌsɛs.kwɪ.pɪˈdeɪ.li.ən/', respelling: 'ses-kwih-pih-DAY-lee-uhn' },
  defenestration: { ipa: '/diːˌfɛn.ɪˈstreɪ.ʃən/', respelling: 'dee-fen-ih-STRAY-shuhn' },
  boustrophedon: { ipa: '/ˌbuː.strəˈfiː.dən/', respelling: 'boo-struh-FEE-duhn' },
  chryselephantine: { ipa: '/ˌkrɪs.ɛl.ɪˈfæn.taɪn/', respelling: 'kris-el-ih-FAN-tyn' },
  quidnunc: { ipa: '/ˈkwɪd.nʌŋk/', respelling: 'KWID-nuhngk' },
  ultracrepidate: { ipa: '/ˌʌl.trəˈkrɛp.ɪ.deɪt/', respelling: 'ul-truh-KREP-ih-dayt' },
  sempiternal: { ipa: '/ˌsɛm.pɪˈtɜːr.nəl/', respelling: 'sem-pih-TUR-nuhl' },
  aporia: { ipa: '/əˈpɔː.ri.ə/', respelling: 'uh-POR-ee-uh' },
  taradiddle: { ipa: '/ˌtær.əˈdɪd.əl/', respelling: 'tair-uh-DID-uhl' },
  zyzzyva: { ipa: '/ˈzɪz.ɪ.və/', respelling: 'ZIZ-ih-vuh' },
};

/**
 * Procedurally generates a clean, readable dictionary phonetic respelling
 * with stressed syllable in UPPERCASE.
 */
export function generatePhoneticRespelling(word: string): string {
  const clean = word.toLowerCase().trim();
  if (PRE_SEEDED_PRONUNCIATIONS[clean]?.respelling) {
    return `[${PRE_SEEDED_PRONUNCIATIONS[clean].respelling}]`;
  }

  // Break into approximate phonetic syllables
  const syllables = syllabify(clean);
  if (syllables.length === 0) return `[${clean.toUpperCase()}]`;

  // Determine stress (usually penultimate for 3+ syllables or initial for 2 syllables)
  const stressIdx = syllables.length <= 2 ? 0 : syllables.length === 3 ? 1 : syllables.length - 2;

  const respelled = syllables.map((syl, i) => {
    let resp = syl
      .replace(/ph/g, 'f')
      .replace(/ck/g, 'k')
      .replace(/c(?=[eiy])/g, 's')
      .replace(/c(?=[aou])/g, 'k')
      .replace(/qu/g, 'kw')
      .replace(/x/g, 'ks')
      .replace(/ee/g, 'ee')
      .replace(/oo/g, 'oo')
      .replace(/igh/g, 'eye')
      .replace(/tion/g, 'shuhn')
      .replace(/sion/g, 'zhuhn')
      .replace(/ture/g, 'cher')
      .replace(/ous/g, 'uhs');

    // Capitalize primary stressed syllable
    return i === stressIdx ? resp.toUpperCase() : resp.toLowerCase();
  });

  return `[${respelled.join('-')}]`;
}

/**
 * Procedurally generates standard IPA notation with stress ticks.
 */
export function generateApproxIpa(word: string): string {
  const clean = word.toLowerCase().trim();
  if (PRE_SEEDED_PRONUNCIATIONS[clean]?.ipa) {
    return PRE_SEEDED_PRONUNCIATIONS[clean].ipa;
  }

  const cached = getIpaCache();
  if (cached[clean]) {
    return cached[clean];
  }

  const syllables = syllabify(clean);
  const stressIdx = syllables.length <= 2 ? 0 : syllables.length === 3 ? 1 : syllables.length - 2;

  const ipaSyls = syllables.map((syl, idx) => {
    let s = syl
      .replace(/ph/g, 'f')
      .replace(/c(?=[eiy])/g, 's')
      .replace(/c(?=[aou])/g, 'k')
      .replace(/qu/g, 'kw')
      .replace(/th/g, 'θ')
      .replace(/sh/g, 'ʃ')
      .replace(/ch/g, 'tʃ')
      .replace(/tion/g, 'ʃən')
      .replace(/sion/g, 'ʒən')
      .replace(/ee/g, 'iː')
      .replace(/oo/g, 'uː')
      .replace(/ae/g, 'eɪ')
      .replace(/a(?=[^aeiou]*e$)/g, 'eɪ')
      .replace(/i(?=[^aeiou]*e$)/g, 'aɪ')
      .replace(/o(?=[^aeiou]*e$)/g, 'oʊ')
      .replace(/u(?=[^aeiou]*e$)/g, 'juː')
      .replace(/y$/g, 'i')
      .replace(/ous$/g, 'əs');

    return (idx === stressIdx ? 'ˈ' : '') + s;
  });

  return `/${ipaSyls.join('.')}/`;
}

/**
 * Queries Wiktionary MediaWiki extract or definition API to retrieve scholarly IPA.
 * Caches in localStorage for instant offline access.
 */
export async function fetchVerifiedIpa(word: string): Promise<string | null> {
  const clean = word.toLowerCase().trim();
  if (PRE_SEEDED_PRONUNCIATIONS[clean]?.ipa) {
    return PRE_SEEDED_PRONUNCIATIONS[clean].ipa;
  }

  const cached = getIpaCache();
  if (cached[clean]) {
    return cached[clean];
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const url = `https://en.wiktionary.org/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(
      clean
    )}&format=json&origin=*`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const pages = data.query?.pages;
      if (pages) {
        const pageKey = Object.keys(pages)[0];
        const page = pages[pageKey];
        if (page?.extract) {
          const extract = page.extract as string;
          // Look for "IPA: /.../" or "/.../"
          const match = extract.match(/IPA(?:\s*\(key\))?:\s*(\/[^/]+\/|\[[^\]]+\])/i);
          if (match && match[1]) {
            const ipa = match[1];
            saveIpaToCache(clean, ipa);
            return ipa;
          }
        }
      }
    }
  } catch (e) {
    console.debug('IPA lookup timeout or error', e);
  }

  return null;
}

/**
 * Helper to segment English words into phonetic syllables.
 */
function syllabify(word: string): string[] {
  if (word.length <= 3) return [word];

  const vowels = 'aeiouy';
  const syllables: string[] = [];
  let current = '';

  for (let i = 0; i < word.length; i++) {
    current += word[i];
    const isVowel = vowels.includes(word[i]);
    const nextIsVowel = i + 1 < word.length && vowels.includes(word[i + 1]);
    const nextNextIsVowel = i + 2 < word.length && vowels.includes(word[i + 2]);

    if (isVowel && !nextIsVowel && nextNextIsVowel && i + 2 < word.length) {
      syllables.push(current);
      current = '';
    } else if (isVowel && !nextIsVowel && !nextNextIsVowel && i + 3 < word.length) {
      current += word[i + 1];
      i++;
      syllables.push(current);
      current = '';
    }
  }

  if (current) {
    if (syllables.length > 0 && current.length <= 2 && !vowels.includes(current[0])) {
      syllables[syllables.length - 1] += current;
    } else {
      syllables.push(current);
    }
  }

  return syllables.length > 0 ? syllables : [word];
}
