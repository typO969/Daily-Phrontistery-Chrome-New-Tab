import { ArtworkBackground, SemanticGist } from '../types';
import { CURATED_GIST_ARTWORKS } from './themeAndGist';

// Cache to prevent duplicate API requests
const artCache = new Map<string, ArtworkBackground>();

/**
 * Searches the Metropolitan Museum of Art Open Access API or Wikimedia Commons
 * for public domain artworks complementary to the word or its semantic gist.
 */
export async function fetchPublicArtForWord(
  word: string,
  gist: SemanticGist
): Promise<ArtworkBackground> {
  const cacheKey = `${word}_${gist}`.toLowerCase();
  if (artCache.has(cacheKey)) {
    return artCache.get(cacheKey)!;
  }

  // Fallback default from curated public domain collection
  const defaultArtworks = CURATED_GIST_ARTWORKS[gist] || CURATED_GIST_ARTWORKS.linguistics_literature;
  const fallbackArtwork = defaultArtworks[Math.floor(Math.random() * defaultArtworks.length)];

  // Terms to search in public museum APIs based on semantic gist
  const searchKeywords: Record<SemanticGist, string[]> = {
    fauna_zoology: [word, 'wildlife painting', 'birds', 'falcon', 'deer', 'fauna'],
    botany_flora: [word, 'botanical illustration', 'water lilies', 'garden', 'forest flora'],
    maritime_ocean: [word, 'marine painting', 'ocean waves', 'tall ship', 'seascape Turner'],
    cosmos_astronomy: [word, 'celestial map', 'starry night', 'constellation', 'astronomy print'],
    architecture_stone: [word, 'classical architecture', 'ancient ruins Piranesi', 'cathedral vault'],
    linguistics_literature: [word, 'scholar study', 'illuminated manuscript', 'ancient library', 'antique books'],
    spiritual_mythology: [word, 'mythological painting', 'divine oracle', 'classical mythology Blake'],
    anatomy_medicine: [word, 'anatomical study Leonardo', 'apothecary historical', 'ancient medicine'],
    philosophy_mind: [word, 'philosophers Athens', 'allegory of wisdom', 'classical contemplation'],
    antiquity_history: [word, 'ancient forum ruins', 'classical antiquity', 'historical landscape'],
  };

  const candidateQueries = searchKeywords[gist] || [word, 'museum fine art'];
  const primaryQuery = candidateQueries[0];

  try {
    // Attempt Met Museum Open Access API (Free, Public Domain, No Key Required)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(
      primaryQuery
    )}`;
    
    const searchRes = await fetch(searchUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (searchRes.ok) {
      const data = await searchRes.json();
      if (data.objectIDs && data.objectIDs.length > 0) {
        // Pick one of the first few matches
        const targetId = data.objectIDs[Math.min(data.objectIDs.length - 1, Math.floor(Math.random() * 5))];
        const detailRes = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${targetId}`
        );

        if (detailRes.ok) {
          const item = await detailRes.json();
          const imageUrl = item.primaryImage || item.primaryImageSmall;
          if (imageUrl) {
            const foundArt: ArtworkBackground = {
              id: `met_${targetId}`,
              title: item.title || `${word} (Study)`,
              artist: item.artistDisplayName || 'Unknown Master',
              year: item.objectDate || 'Historical Archive',
              gist,
              url: imageUrl,
              source: 'The Metropolitan Museum of Art, Open Access',
              license: 'Public Domain (CC0)',
              dominantColor: '#1c1917',
            };
            artCache.set(cacheKey, foundArt);
            return foundArt;
          }
        }
      }
    }
  } catch (error) {
    // Silent failover to curated museum collection to ensure zero broken image state
    console.debug('Public Museum API fetch gracefully fell back to curated archive:', error);
  }

  // Cache and return reliable curated artwork
  artCache.set(cacheKey, fallbackArtwork);
  return fallbackArtwork;
}
