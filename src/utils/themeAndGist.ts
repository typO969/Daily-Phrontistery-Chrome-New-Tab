import { SemanticGist, ColorTheme, ArtworkBackground } from '../types';
import { SVG_ARTWORKS } from './svgArtworks';

export const GIST_LABELS: Record<SemanticGist, { label: string; icon: string; description: string }> = {
  fauna_zoology: {
    label: 'Zoology & Bestiary',
    icon: 'Feather',
    description: 'Beasts, fowl, denizens of the wild, and creature lore',
  },
  botany_flora: {
    label: 'Botany & Herbarium',
    icon: 'Trees',
    description: 'Vines, blossoms, ancient trees, and herbal essences',
  },
  maritime_ocean: {
    label: 'Maritime & Abyssal',
    icon: 'Compass',
    description: 'The nautical sphere, rigging, pelagic depths, and tides',
  },
  cosmos_astronomy: {
    label: 'Cosmology & Celestial',
    icon: 'Moon',
    description: 'The vault of the heavens, meteorites, eclipses, and stars',
  },
  architecture_stone: {
    label: 'Architecture & Masonry',
    icon: 'Columns',
    description: 'Chambers, spires, carved stonework, and ancient citadels',
  },
  linguistics_literature: {
    label: 'Rhetoric & Lexicography',
    icon: 'BookOpen',
    description: 'Figures of speech, manuscripts, poetics, and idioms',
  },
  spiritual_mythology: {
    label: 'Mythology & Divination',
    icon: 'Sparkles',
    description: 'Oracles, auspices, sacred rites, and legendary spirits',
  },
  anatomy_medicine: {
    label: 'Anatomy & Therapeutics',
    icon: 'Activity',
    description: 'The human organism, humours, remedies, and pathologies',
  },
  philosophy_mind: {
    label: 'Philosophy & Metaphysics',
    icon: 'Brain',
    description: 'Epistemology, reason, moral inquiry, and consciousness',
  },
  antiquity_history: {
    label: 'Classical Antiquity',
    icon: 'Crown',
    description: 'Empires, feudal tenures, archaic coins, and ancient customs',
  },
};

export const GIST_THEMES: Record<SemanticGist, ColorTheme> = {
  fauna_zoology: {
    id: 'fauna_zoology',
    name: 'Sable & Ochre',
    bgDark: '#0e0b08',
    surfaceDark: 'rgba(26, 20, 15, 0.78)',
    surfaceBorderDark: 'rgba(217, 119, 6, 0.25)',
    textPrimary: '#fef3c7',
    textSecondary: '#d5c4a1',
    accentGold: '#f59e0b',
    accentSubtle: '#78350f',
    badgeBg: 'rgba(180, 83, 9, 0.2)',
    badgeText: '#fbbf24',
    gradientOverlay: 'linear-gradient(180deg, rgba(14,11,8,0.4) 0%, rgba(14,11,8,0.85) 100%)',
  },
  botany_flora: {
    id: 'botany_flora',
    name: 'Verdant Forest & Jade',
    bgDark: '#060d09',
    surfaceDark: 'rgba(11, 26, 17, 0.78)',
    surfaceBorderDark: 'rgba(16, 185, 129, 0.25)',
    textPrimary: '#ecfdf5',
    textSecondary: '#a7f3d0',
    accentGold: '#34d399',
    accentSubtle: '#065f46',
    badgeBg: 'rgba(5, 150, 105, 0.2)',
    badgeText: '#6ee7b7',
    gradientOverlay: 'linear-gradient(180deg, rgba(6,13,9,0.4) 0%, rgba(6,13,9,0.88) 100%)',
  },
  maritime_ocean: {
    id: 'maritime_ocean',
    name: 'Abyssal Ultramarine',
    bgDark: '#060f1c',
    surfaceDark: 'rgba(12, 28, 48, 0.78)',
    surfaceBorderDark: 'rgba(56, 189, 248, 0.25)',
    textPrimary: '#f0f9ff',
    textSecondary: '#bae6fd',
    accentGold: '#38bdf8',
    accentSubtle: '#0369a1',
    badgeBg: 'rgba(2, 132, 199, 0.2)',
    badgeText: '#7dd3fc',
    gradientOverlay: 'linear-gradient(180deg, rgba(6,15,28,0.4) 0%, rgba(6,15,28,0.88) 100%)',
  },
  cosmos_astronomy: {
    id: 'cosmos_astronomy',
    name: 'Nocturne Starlight',
    bgDark: '#0a0914',
    surfaceDark: 'rgba(20, 18, 38, 0.78)',
    surfaceBorderDark: 'rgba(168, 85, 247, 0.25)',
    textPrimary: '#faf5ff',
    textSecondary: '#e9d5ff',
    accentGold: '#c084fc',
    accentSubtle: '#6b21a8',
    badgeBg: 'rgba(147, 51, 234, 0.2)',
    badgeText: '#d8b4fe',
    gradientOverlay: 'linear-gradient(180deg, rgba(10,9,20,0.4) 0%, rgba(10,9,20,0.88) 100%)',
  },
  architecture_stone: {
    id: 'architecture_stone',
    name: 'Ancient Limestone & Bronze',
    bgDark: '#12100d',
    surfaceDark: 'rgba(32, 28, 24, 0.8)',
    surfaceBorderDark: 'rgba(214, 180, 137, 0.25)',
    textPrimary: '#fefcf8',
    textSecondary: '#d6cebe',
    accentGold: '#d97706',
    accentSubtle: '#78350f',
    badgeBg: 'rgba(120, 53, 15, 0.25)',
    badgeText: '#fde68a',
    gradientOverlay: 'linear-gradient(180deg, rgba(18,16,13,0.45) 0%, rgba(18,16,13,0.88) 100%)',
  },
  linguistics_literature: {
    id: 'linguistics_literature',
    name: 'Archival Ink & Parchment',
    bgDark: '#0d0d0f',
    surfaceDark: 'rgba(24, 23, 29, 0.82)',
    surfaceBorderDark: 'rgba(224, 203, 169, 0.25)',
    textPrimary: '#fbf9f5',
    textSecondary: '#cfc8ba',
    accentGold: '#eab308',
    accentSubtle: '#713f12',
    badgeBg: 'rgba(161, 98, 7, 0.2)',
    badgeText: '#fef08a',
    gradientOverlay: 'linear-gradient(180deg, rgba(13,13,15,0.4) 0%, rgba(13,13,15,0.9) 100%)',
  },
  spiritual_mythology: {
    id: 'spiritual_mythology',
    name: 'Sacred Gilt & Incense',
    bgDark: '#110a11',
    surfaceDark: 'rgba(31, 17, 31, 0.78)',
    surfaceBorderDark: 'rgba(236, 72, 153, 0.25)',
    textPrimary: '#fdf2f8',
    textSecondary: '#fbcfe8',
    accentGold: '#f43f5e',
    accentSubtle: '#881337',
    badgeBg: 'rgba(225, 29, 72, 0.2)',
    badgeText: '#fda4af',
    gradientOverlay: 'linear-gradient(180deg, rgba(17,10,17,0.4) 0%, rgba(17,10,17,0.88) 100%)',
  },
  anatomy_medicine: {
    id: 'anatomy_medicine',
    name: 'Madder & Apothecary',
    bgDark: '#120b0b',
    surfaceDark: 'rgba(32, 16, 16, 0.78)',
    surfaceBorderDark: 'rgba(239, 68, 68, 0.25)',
    textPrimary: '#fef2f2',
    textSecondary: '#fecaca',
    accentGold: '#f87171',
    accentSubtle: '#7f1d1d',
    badgeBg: 'rgba(220, 38, 38, 0.2)',
    badgeText: '#fca5a5',
    gradientOverlay: 'linear-gradient(180deg, rgba(18,11,11,0.4) 0%, rgba(18,11,11,0.88) 100%)',
  },
  philosophy_mind: {
    id: 'philosophy_mind',
    name: 'Athenian Marble & Indigo',
    bgDark: '#0b0e14',
    surfaceDark: 'rgba(20, 26, 38, 0.8)',
    surfaceBorderDark: 'rgba(99, 102, 241, 0.25)',
    textPrimary: '#e0e7ff',
    textSecondary: '#c7d2fe',
    accentGold: '#818cf8',
    accentSubtle: '#3730a3',
    badgeBg: 'rgba(79, 70, 229, 0.2)',
    badgeText: '#a5b4fc',
    gradientOverlay: 'linear-gradient(180deg, rgba(11,14,20,0.4) 0%, rgba(11,14,20,0.9) 100%)',
  },
  antiquity_history: {
    id: 'antiquity_history',
    name: 'Imperial Porphyry & Sand',
    bgDark: '#120d0e',
    surfaceDark: 'rgba(34, 20, 22, 0.8)',
    surfaceBorderDark: 'rgba(244, 63, 94, 0.25)',
    textPrimary: '#fff1f2',
    textSecondary: '#fecdd3',
    accentGold: '#fb7185',
    accentSubtle: '#881337',
    badgeBg: 'rgba(190, 18, 60, 0.2)',
    badgeText: '#fda4af',
    gradientOverlay: 'linear-gradient(180deg, rgba(18,13,14,0.4) 0%, rgba(18,13,14,0.88) 100%)',
  },
};

/**
 * High-definition, public domain masterpieces curated for each semantic realm.
 * These are verified museum / Wikimedia Commons public domain images that render
 * reliably and convey museum-grade atmosphere.
 */
export const CURATED_GIST_ARTWORKS: Record<SemanticGist, ArtworkBackground[]> = {
  maritime_ocean: [
    {
      id: 'maritime_1',
      title: 'The Fighting Temeraire',
      artist: 'J. M. W. Turner',
      year: '1839',
      gist: 'maritime_ocean',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/The_Fighting_Temeraire%2C_JMW_Turner%2C_National_Gallery.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg',
      source: 'National Gallery, London',
      dominantColor: '#1c2d42',
    },
    {
      id: 'maritime_2',
      title: 'The Great Wave off Kanagawa',
      artist: 'Katsushika Hokusai',
      year: '1831',
      gist: 'maritime_ocean',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Great_Wave_off_Kanagawa2.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Great_Wave_off_Kanagawa2.jpg',
      source: 'Metropolitan Museum of Art',
      dominantColor: '#162b44',
    },
    {
      id: 'maritime_3',
      title: 'Monk by the Sea',
      artist: 'Caspar David Friedrich',
      year: '1809',
      gist: 'maritime_ocean',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg',
      source: 'Alte Nationalgalerie, Berlin',
      dominantColor: '#1a2430',
    },
  ],
  cosmos_astronomy: [
    {
      id: 'cosmos_1',
      title: 'Celestial Planisphere (Harmonia Macrocosmica)',
      artist: 'Andreas Cellarius',
      year: '1660',
      gist: 'cosmos_astronomy',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Cellarius_ptolemaic_system.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Cellarius_ptolemaic_system.jpg',
      source: 'British Library Public Domain',
      dominantColor: '#171626',
    },
    {
      id: 'cosmos_2',
      title: 'The Starry Night over the Rhône',
      artist: 'Vincent van Gogh',
      year: '1888',
      gist: 'cosmos_astronomy',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Starry_Night_Over_the_Rhone.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Starry_Night_Over_the_Rhone.jpg',
      source: 'Musée d\'Orsay, Paris',
      dominantColor: '#0d182b',
    },
    {
      id: 'cosmos_3',
      title: 'Wanderer above the Sea of Fog',
      artist: 'Caspar David Friedrich',
      year: '1818',
      gist: 'cosmos_astronomy',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
      source: 'Hamburger Kunsthalle',
      dominantColor: '#1e242d',
    },
  ],
  botany_flora: [
    {
      id: 'botany_1',
      title: 'Water Lilies (Nymphéas)',
      artist: 'Claude Monet',
      year: '1916',
      gist: 'botany_flora',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Water_Lilies_-_Google_Art_Project.jpg',
      source: 'Metropolitan Museum of Art',
      dominantColor: '#13281a',
    },
    {
      id: 'botany_2',
      title: 'Botanical Illustration of Flowering Branch',
      artist: 'Pierre-Joseph Redouté',
      year: '1817',
      gist: 'botany_flora',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Rosa_centifolia_foliacea_17.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Rosa_centifolia_foliacea_17.jpg',
      source: 'Hunt Botanical Library',
      dominantColor: '#182b1c',
    },
  ],
  fauna_zoology: [
    {
      id: 'fauna_1',
      title: 'Gyrfalcon Plate XIX (Birds of America)',
      artist: 'John James Audubon',
      year: '1827',
      gist: 'fauna_zoology',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Audubon-gyrfalcon.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Audubon-gyrfalcon.jpg',
      source: 'National Gallery of Art',
      dominantColor: '#2b2319',
    },
    {
      id: 'fauna_2',
      title: 'The Monarch of the Glen',
      artist: 'Sir Edwin Landseer',
      year: '1851',
      gist: 'fauna_zoology',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Monarch_of_the_Glen%2C_Edwin_Landseer%2C_1851.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Monarch_of_the_Glen,_Edwin_Landseer,_1851.jpg',
      source: 'National Galleries of Scotland',
      dominantColor: '#2c221a',
    },
  ],
  architecture_stone: [
    {
      id: 'arch_1',
      title: 'Imaginary Prison (Carceri d\'Invenzione, Plate 1008)',
      artist: 'Giovanni Battista Piranesi',
      year: '1750',
      gist: 'architecture_stone',
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Piranesi-1008.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Piranesi-1008.jpg',
      source: 'Rijksmuseum, Amsterdam',
      dominantColor: '#211d19',
    },
    {
      id: 'arch_2',
      title: 'View of the Pantheon, Rome',
      artist: 'Giovanni Paolo Panini',
      year: '1734',
      gist: 'architecture_stone',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Giovanni_Paolo_Panini_-_Interior_of_the_Pantheon%2C_Rome_-_Google_Art_Project.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Giovanni_Paolo_Panini_-_Interior_of_the_Pantheon,_Rome_-_Google_Art_Project.jpg',
      source: 'National Gallery of Art, Washington',
      dominantColor: '#2d251d',
    },
  ],
  linguistics_literature: [
    {
      id: 'ling_1',
      title: 'The Bookworm (Der Bücherwurm)',
      artist: 'Carl Spitzweg',
      year: '1850',
      gist: 'linguistics_literature',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Carl_Spitzweg_-_%22The_Bookworm%22.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Carl_Spitzweg_-_%22The_Bookworm%22.jpg',
      source: 'Museum Georg Schäfer',
      dominantColor: '#241e17',
    },
    {
      id: 'ling_2',
      title: 'Saint Jerome in His Study',
      artist: 'Albrecht Dürer',
      year: '1514',
      gist: 'linguistics_literature',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Saint_Jerome_in_His_Study_MET_DP820349.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Saint_Jerome_in_His_Study_MET_DP820349.jpg',
      source: 'Städel Museum',
      dominantColor: '#1d1c1a',
    },
  ],
  spiritual_mythology: [
    {
      id: 'myth_1',
      title: 'The Great Red Dragon and the Woman Clothed with the Sun',
      artist: 'William Blake',
      year: '1805',
      gist: 'spiritual_mythology',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/William_Blake_003.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:William_Blake_003.jpg',
      source: 'Brooklyn Museum',
      dominantColor: '#2b1a20',
    },
    {
      id: 'myth_2',
      title: 'Witches Going to Their Sabbath',
      artist: 'Luis Ricardo Falero',
      year: '1878',
      gist: 'spiritual_mythology',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Witches_going_to_their_Sabbath_%281878%29%2C_by_Luis_Ricardo_Falero.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Witches_going_to_their_Sabbath_(1878),_by_Luis_Ricardo_Falero.jpg',
      source: 'Private Collection',
      dominantColor: '#1c1024',
    },
  ],
  anatomy_medicine: [
    {
      id: 'anat_1',
      title: 'Anatomy Lesson of Dr. Nicolaes Tulp',
      artist: 'Rembrandt van Rijn',
      year: '1632',
      gist: 'anatomy_medicine',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg',
      source: 'Mauritshuis, The Hague',
      dominantColor: '#1d1616',
    },
    {
      id: 'anat_2',
      title: 'Vitruvian Man',
      artist: 'Leonardo da Vinci',
      year: '1490',
      gist: 'anatomy_medicine',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Da_Vinci_Vitruve_Luc_Viatour.jpg',
      source: 'Gallerie dell\'Accademia, Venice',
      dominantColor: '#251c14',
    },
  ],
  philosophy_mind: [
    {
      id: 'phil_1',
      title: 'The School of Athens',
      artist: 'Raphael',
      year: '1511',
      gist: 'philosophy_mind',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
      source: 'Apostolic Palace, Vatican',
      dominantColor: '#232533',
    },
    {
      id: 'phil_2',
      title: 'The Thinker (Le Penseur)',
      artist: 'Auguste Rodin',
      year: '1904',
      gist: 'philosophy_mind',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/The_Thinker%2C_Rodin.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:The_Thinker,_Rodin.jpg',
      source: 'Musée Rodin, Paris',
      dominantColor: '#1a1d26',
    },
  ],
  antiquity_history: [
    {
      id: 'hist_1',
      title: 'The Ruins of Nîmes, Orange and Saint-Rémy',
      artist: 'Hubert Robert',
      year: '1789',
      gist: 'antiquity_history',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Robert_Ruinen_von_Nimes_Orange_Saint-Remy.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Robert_Ruinen_von_Nimes_Orange_Saint-Remy.jpg',
      source: 'Musée du Louvre, Paris',
      dominantColor: '#261b17',
    },
    {
      id: 'hist_2',
      title: 'The Course of Empire: The Arcadian or Pastoral State',
      artist: 'Thomas Cole',
      year: '1836',
      gist: 'antiquity_history',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cole_Thomas_The_Course_of_Empire_The_Arcadian_or_Pastoral_State_1836.jpg',
      commonsUrl: 'https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_The_Arcadian_or_Pastoral_State_1836.jpg',
      source: 'New-York Historical Society',
      dominantColor: '#241b18',
    },
  ],
};

/**
 * Intelligent semantic analyzer that detects the "gist" / realm of any word
 * based on lexical cues in its definition, word roots, and part of speech.
 */
export function detectWordGist(word: string, definition: string, pos?: string): SemanticGist {
  const text = `${word} ${definition} ${pos || ''}`.toLowerCase();

  // 1. Maritime / Ocean
  if (
    /ship|vessel|sea|ocean|sail|mast|helm|keel|anchor|tide|waterway|stern|bow|nautical|oar|creek|marine|bay|gulf|deep sea|abyss|harbour|wharf|buoy|rigging|deck|port\b/.test(
      text
    )
  ) {
    return 'maritime_ocean';
  }

  // 2. Cosmos / Astronomy / Sky / Weather
  if (
    /star|celestial|sun|moon|sky|cloud|wind|comet|meteor|astronomy|planet|orbit|atmosphere|solar|lunar|rain|snow|frost|twilight|dew|weather|tempest|thunder|lightning/.test(
      text
    )
  ) {
    return 'cosmos_astronomy';
  }

  // 3. Botany / Plants / Trees
  if (
    /tree|plant|flower|herb|leaf|leaves|grass|bark|branch|shrub|fruit|seed|root|flora|forest|wood|grove|foliage|berry|moss|algae|wheat|grain|botanical|lichen/.test(
      text
    )
  ) {
    return 'botany_flora';
  }

  // 4. Fauna / Zoology / Animals / Birds
  if (
    /animal|bird|quadruped|mammal|fish|hawk|eagle|owl|deer|goat|antelope|ox|cow|cattle|horse|wolf|fox|dog|cat|reptile|serpent|snake|lizard|insect|mite|spider|flea|rat|mouse|sloth|bear|whale|badger|leopard|lion|rooster|goose|duck/.test(
      text
    )
  ) {
    return 'fauna_zoology';
  }

  // 5. Architecture / Masonry / Structure
  if (
    /arch|column|wall|stone|building|church|chapel|monastery|fortification|temple|pedestal|moulding|pillar|palace|tower|castle|masonry|vault|parapet|roof|window|door|ditch|ramp|stair/.test(
      text
    )
  ) {
    return 'architecture_stone';
  }

  // 6. Linguistics / Literature / Writing / Speech
  if (
    /word|speech|language|rhyme|poem|verse|rhetoric|grammar|syllable|letter|consonant|vowel|writing|text|book|author|dictionary|glossary|dialect|syntax|phrase|pun|punning|oration|discourse|trope/.test(
      text
    )
  ) {
    return 'linguistics_literature';
  }

  // 7. Spiritual / Mythology / Divination / Occult
  if (
    /divination|magic|oracle|spirit|demon|god|goddess|deity|sacred|holy|prayer|blessing|curse|sacrifice|worship|heretic|mass|saint|altar|eucharist|baptism|monk|priest|bishop|pope|church|idol|omen/.test(
      text
    )
  ) {
    return 'spiritual_mythology';
  }

  // 8. Anatomy / Medicine / Body
  if (
    /blood|vein|organ|flesh|bone|skull|eye|ear|nose|tooth|teeth|mouth|tongue|limb|leg|foot|hand|finger|gland|stomach|wound|disease|illness|pain|fever|blindness|deafness|sweat|vomit|urine|surgical|medical|cure|remedy/.test(
      text
    )
  ) {
    return 'anatomy_medicine';
  }

  // 9. Philosophy / Mind / Thought
  if (
    /belief|doctrine|theory|knowledge|mind|thought|reason|philosoph|truth|moral|ethics|intellect|conscious|unconscious|logic|axiom|concept|doubt|soul|virtue|idea|will\b|volition/.test(
      text
    )
  ) {
    return 'philosophy_mind';
  }

  // 10. Antiquity / History / Society
  if (
    /ancient|roman|greek|medieval|feudal|monarch|king|queen|emperor|noble|knight|lord|vassal|coin|currency|tax|court|judge|law|custom|governance|ruler|empire|clan|tribe|serf|peasant/.test(
      text
    )
  ) {
    return 'antiquity_history';
  }

  // Fallback defaults
  return 'linguistics_literature';
}

/**
 * Gets a background artwork matching the semantic gist.
 */
export function getArtworkForGist(gist: SemanticGist, seed = 0): ArtworkBackground {
  const svgArt = SVG_ARTWORKS[gist] || SVG_ARTWORKS.linguistics_literature;
  return {
    id: `svg_${gist}`,
    title: svgArt.title,
    artist: svgArt.artist,
    year: svgArt.year,
    source: svgArt.source,
    gist,
    url: svgArt.svgDataUri,
    license: 'Public Domain Masterwork',
    dominantColor: '#1c1917',
  };
}

/**
 * Expands short parts of speech into elegant grammatical labels.
 */
export function formatPartOfSpeech(pos: string): string {
  const mapping: Record<string, string> = {
    noun: 'Noun',
    adj: 'Adjective',
    adjective: 'Adjective',
    adv: 'Adverb',
    adverb: 'Adverb',
    verb: 'Verb',
    propn: 'Proper Noun',
    pron: 'Pronoun',
    num: 'Numeral',
    adp: 'Preposition',
    cconj: 'Conjunction',
    x: 'Uninflected / Idiomatic',
  };
  return mapping[pos.toLowerCase()] || pos.toUpperCase();
}
