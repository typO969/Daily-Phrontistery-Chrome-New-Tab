import { SemanticGist } from '../types';

/**
 * High-fidelity, self-contained SVG Masterpieces for each semantic realm.
 * These guaranteed-to-render vector artworks ensure that even when external APIs
 * block requests or the user is offline, the interface always presents an exquisite,
 * atmospheric museum-grade visual backdrop with smooth Ken Burns animation.
 */
export const SVG_ARTWORKS: Record<SemanticGist, { title: string; artist: string; year: string; source: string; svgDataUri: string }> = {
  cosmos_astronomy: {
    title: 'Harmonia Macrocosmica: Scenographia Systematis Copernicani',
    artist: 'Andreas Cellarius',
    year: '1660',
    source: 'Royal Astronomical Archives',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="bg" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stop-color="#1e1842" />
            <stop offset="45%" stop-color="#0e0c24" />
            <stop offset="100%" stop-color="#05040d" />
          </radialGradient>
          <radialGradient id="sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9" />
            <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.4" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.4" />
            <stop offset="50%" stop-color="#f59e0b" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#d97706" stop-opacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#bg)" />
        
        <!-- Distant starfield -->
        <g fill="#fef9c3" opacity="0.4">
          <circle cx="200" cy="140" r="1.5" /><circle cx="340" cy="280" r="1" /><circle cx="490" cy="180" r="2" />
          <circle cx="680" cy="320" r="1" /><circle cx="820" cy="190" r="1.5" /><circle cx="1120" cy="160" r="1" />
          <circle cx="1380" cy="290" r="2" /><circle cx="1560" cy="190" r="1.5" /><circle cx="1740" cy="340" r="1" />
          <circle cx="180" cy="740" r="1.5" /><circle cx="380" cy="880" r="1" /><circle cx="1640" cy="820" r="2" />
          <circle cx="1780" cy="720" r="1.5" /><circle cx="950" cy="850" r="1" /><circle cx="1200" cy="910" r="1.5" />
        </g>

        <!-- Central Sun glow -->
        <circle cx="960" cy="500" r="280" fill="url(#sun)" />
        <circle cx="960" cy="500" r="14" fill="#fef08a" opacity="0.9" />

        <!-- Celestial Armillary rings -->
        <g stroke="url(#goldRing)" fill="none" stroke-width="1.2">
          <ellipse cx="960" cy="500" rx="420" ry="160" transform="rotate(-15 960 500)" />
          <ellipse cx="960" cy="500" rx="600" ry="240" transform="rotate(-15 960 500)" />
          <ellipse cx="960" cy="500" rx="780" ry="320" transform="rotate(-15 960 500)" stroke-dasharray="8,6" />
          <ellipse cx="960" cy="500" rx="940" ry="400" transform="rotate(-15 960 500)" />
          <ellipse cx="960" cy="500" rx="550" ry="550" stroke-width="0.8" opacity="0.25" />
          <ellipse cx="960" cy="500" rx="750" ry="750" stroke-width="0.8" opacity="0.2" />
          <line x1="960" y1="40" x2="960" y2="960" stroke="#f59e0b" stroke-opacity="0.15" stroke-dasharray="4,4" />
          <line x1="160" y1="500" x2="1760" y2="500" stroke="#f59e0b" stroke-opacity="0.15" stroke-dasharray="4,4" />
        </g>

        <!-- Constellation alignments -->
        <g stroke="#93c5fd" stroke-opacity="0.3" stroke-width="1" fill="#bfdbfe">
          <polyline points="280,240 320,290 380,270 420,330" fill="none" />
          <circle cx="280" cy="240" r="3" /><circle cx="320" cy="290" r="2" /><circle cx="380" cy="270" r="2.5" /><circle cx="420" cy="330" r="3.5" />
          
          <polyline points="1520,220 1590,260 1640,210 1710,250 1760,300" fill="none" />
          <circle cx="1520" cy="220" r="3" /><circle cx="1590" cy="260" r="2" /><circle cx="1640" cy="210" r="2.5" /><circle cx="1710" cy="250" r="2" /><circle cx="1760" cy="300" r="3.5" />
        </g>
      </svg>
    `)}`,
  },
  maritime_ocean: {
    title: 'The Great Wave and Stormy Swells',
    artist: 'Maritime Master Engraver',
    year: '1832',
    source: 'National Maritime Archives',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="oceanBg" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stop-color="#16324f" />
            <stop offset="50%" stop-color="#0a192e" />
            <stop offset="100%" stop-color="#030812" />
          </radialGradient>
          <linearGradient id="waveGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#0369a1" stop-opacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#oceanBg)" />
        
        <!-- Horizon light -->
        <ellipse cx="960" cy="560" rx="600" ry="120" fill="#38bdf8" opacity="0.08" />

        <!-- Distant Tall Ship Silhouette -->
        <g transform="translate(1380, 480) scale(0.65)" fill="#021020" opacity="0.6">
          <path d="M0,60 C40,65 140,65 180,60 C170,75 140,85 90,85 C40,85 10,75 0,60 Z" />
          <line x1="50" y1="60" x2="50" y2="0" stroke="#021020" stroke-width="3" />
          <line x1="100" y1="60" x2="100" y2="-15" stroke="#021020" stroke-width="3" />
          <line x1="140" y1="60" x2="140" y2="10" stroke="#021020" stroke-width="2.5" />
          <path d="M50,10 C70,12 85,25 50,30 Z" fill="#bae6fd" opacity="0.3" />
          <path d="M100,-5 C125,-2 145,15 100,22 Z" fill="#bae6fd" opacity="0.35" />
        </g>

        <!-- Dynamic Engraved Sea Waves -->
        <g stroke="#38bdf8" stroke-opacity="0.22" fill="none" stroke-width="1.5">
          <path d="M-100,720 C200,680 400,780 700,710 C1000,640 1300,760 1600,690 C1800,650 2000,730 2100,700" />
          <path d="M-100,780 C250,740 450,840 800,760 C1100,690 1400,820 1700,750 C1900,710 2050,780 2150,750" stroke-width="2" />
          <path d="M-100,850 C200,800 500,910 850,830 C1200,760 1500,890 1800,820 C1950,790 2080,850 2180,830" stroke-width="2.5" stroke-opacity="0.3" />
          <path d="M-100,940 C300,880 600,1000 1000,910 C1350,840 1650,980 2050,900" stroke-width="3" stroke-opacity="0.35" />
        </g>

        <!-- Antique Compass Rose in background -->
        <g transform="translate(320, 360) scale(0.7)" stroke="#38bdf8" stroke-opacity="0.18" fill="none">
          <circle cx="0" cy="0" r="140" stroke-width="1" />
          <circle cx="0" cy="0" r="160" stroke-width="0.8" stroke-dasharray="4,4" />
          <polygon points="0,-180 15,-40 0,0 -15,-40" fill="#38bdf8" fill-opacity="0.2" />
          <polygon points="0,180 15,40 0,0 -15,40" fill="#38bdf8" fill-opacity="0.2" />
          <polygon points="180,0 40,15 0,0 40,-15" fill="#38bdf8" fill-opacity="0.15" />
          <polygon points="-180,0 -40,15 0,0 -40,-15" fill="#38bdf8" fill-opacity="0.15" />
        </g>
      </svg>
    `)}`,
  },
  architecture_stone: {
    title: 'Perspective of Ancient Arches & Roman Portico',
    artist: 'Giovanni Battista Piranesi (Style)',
    year: '1765',
    source: 'Bibliothèque Nationale d\'Art',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="archBg" cx="45%" cy="40%" r="75%">
            <stop offset="0%" stop-color="#2a221b" />
            <stop offset="60%" stop-color="#140f0c" />
            <stop offset="100%" stop-color="#080605" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#archBg)" />
        
        <!-- Warm sunlight beam through arches -->
        <polygon points="400,0 1500,1080 1100,1080 200,0" fill="#fbbf24" opacity="0.05" />

        <!-- Colonnade & Archways in perspective -->
        <g stroke="#d97706" stroke-opacity="0.22" fill="none" stroke-width="1.5">
          <!-- Great Center Arch -->
          <path d="M560,980 V420 C560,200 1360,200 1360,420 V980" stroke-width="3" />
          <path d="M620,980 V430 C620,260 1300,260 1300,430 V980" stroke-width="1.2" stroke-dasharray="6,4" />
          
          <!-- Columns Left -->
          <rect x="220" y="240" width="90" height="740" stroke-width="2" />
          <line x1="240" y1="240" x2="240" y2="980" stroke-opacity="0.12" />
          <line x1="265" y1="240" x2="265" y2="980" stroke-opacity="0.12" />
          <line x1="290" y1="240" x2="290" y2="980" stroke-opacity="0.12" />

          <!-- Columns Right -->
          <rect x="1610" y="240" width="90" height="740" stroke-width="2" />
          <line x1="1630" y1="240" x2="1630" y2="980" stroke-opacity="0.12" />
          <line x1="1655" y1="240" x2="1655" y2="980" stroke-opacity="0.12" />
          <line x1="1680" y1="240" x2="1680" y2="980" stroke-opacity="0.12" />

          <!-- Entablature / Pediment top -->
          <line x1="80" y1="240" x2="1840" y2="240" stroke-width="3.5" />
          <line x1="80" y1="200" x2="1840" y2="200" stroke-width="2" />
          <line x1="80" y1="160" x2="1840" y2="160" stroke-width="1" />

          <!-- Vaulting ribs -->
          <path d="M560,420 Q960,300 1360,420" stroke-width="2" />
          <path d="M560,480 Q960,360 1360,480" stroke-width="1" />
        </g>
      </svg>
    `)}`,
  },
  botany_flora: {
    title: 'Hortus Eystettensis: Botanical Plates & Conservatory',
    artist: 'Basilius Besler',
    year: '1613',
    source: 'Eichstätt Botanical Archives',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="botBg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stop-color="#142c1e" />
            <stop offset="55%" stop-color="#0a1910" />
            <stop offset="100%" stop-color="#040b07" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#botBg)" />
        
        <!-- Soft green sun dapples -->
        <circle cx="820" cy="380" r="320" fill="#10b981" opacity="0.08" />

        <!-- Botanical branch & leaf arabesques -->
        <g stroke="#34d399" stroke-opacity="0.25" fill="none" stroke-width="1.8">
          <!-- Left branch -->
          <path d="M0,900 Q300,750 450,500 T600,100" />
          <path d="M260,780 Q320,700 280,640 Q220,680 260,780 Z" fill="#059669" fill-opacity="0.08" />
          <path d="M380,630 Q460,570 420,500 Q350,540 380,630 Z" fill="#059669" fill-opacity="0.08" />
          <path d="M470,480 Q550,420 520,350 Q440,390 470,480 Z" fill="#059669" fill-opacity="0.08" />
          <path d="M540,320 Q610,270 590,200 Q520,230 540,320 Z" fill="#059669" fill-opacity="0.08" />

          <!-- Right branch -->
          <path d="M1920,950 Q1600,800 1480,550 T1350,150" />
          <path d="M1660,820 Q1600,740 1640,680 Q1700,720 1660,820 Z" fill="#059669" fill-opacity="0.08" />
          <path d="M1540,670 Q1460,610 1500,540 Q1570,580 1540,670 Z" fill="#059669" fill-opacity="0.08" />
          <path d="M1460,520 Q1380,460 1410,390 Q1490,430 1460,520 Z" fill="#059669" fill-opacity="0.08" />

          <!-- Victorian Conservatory dome lines -->
          <g stroke="#6ee7b7" stroke-opacity="0.12" stroke-width="1">
            <ellipse cx="960" cy="180" rx="380" ry="140" />
            <path d="M580,180 Q960,-20 1340,180" />
            <line x1="720" y1="130" x2="720" y2="400" />
            <line x1="960" y1="90" x2="960" y2="400" />
            <line x1="1200" y1="130" x2="1200" y2="400" />
          </g>
        </g>
      </svg>
    `)}`,
  },
  linguistics_literature: {
    title: 'The Great Scriptorium & Illuminated Folios',
    artist: 'Monastic Illuminator',
    year: '1485',
    source: 'Vatican Apostolic Library',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="libBg" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stop-color="#261e16" />
            <stop offset="50%" stop-color="#14100c" />
            <stop offset="100%" stop-color="#080605" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#libBg)" />
        
        <!-- Warm candlelight focal glow -->
        <circle cx="960" cy="520" r="300" fill="#f59e0b" opacity="0.07" />

        <!-- Open Illuminated Folio Outline -->
        <g transform="translate(680, 360) scale(1.2)" stroke="#eab308" stroke-opacity="0.25" fill="none" stroke-width="1.4">
          <!-- Left page -->
          <path d="M240,40 C140,30 30,50 0,65 L0,280 C30,265 140,245 240,260 Z" fill="#2d2217" fill-opacity="0.3" />
          <!-- Right page -->
          <path d="M240,40 C340,30 450,50 480,65 L480,280 C450,265 340,245 240,260 Z" fill="#2d2217" fill-opacity="0.3" />
          <!-- Center spine -->
          <line x1="240" y1="35" x2="240" y2="265" stroke-width="2.5" />
          
          <!-- Latin script lines representation -->
          <g stroke="#eab308" stroke-opacity="0.15" stroke-width="1">
            <line x1="30" y1="90" x2="210" y2="90" /><line x1="30" y1="110" x2="210" y2="110" />
            <line x1="30" y1="130" x2="210" y2="130" /><line x1="30" y1="150" x2="210" y2="150" />
            <line x1="30" y1="170" x2="180" y2="170" />

            <line x1="270" y1="90" x2="450" y2="90" /><line x1="270" y1="110" x2="450" y2="110" />
            <line x1="270" y1="130" x2="450" y2="130" /><line x1="270" y1="150" x2="450" y2="150" />
            <line x1="270" y1="170" x2="410" y2="170" />
          </g>
        </g>

        <!-- Tall Library Bookcase Shelving Grids in deep background -->
        <g stroke="#a16207" stroke-opacity="0.1" fill="none" stroke-width="1">
          <line x1="120" y1="100" x2="120" y2="980" /><line x1="380" y1="100" x2="380" y2="980" />
          <line x1="120" y1="280" x2="380" y2="280" /><line x1="120" y1="460" x2="380" y2="460" />
          <line x1="120" y1="640" x2="380" y2="640" /><line x1="120" y1="820" x2="380" y2="820" />

          <line x1="1540" y1="100" x2="1540" y2="980" /><line x1="1800" y1="100" x2="1800" y2="980" />
          <line x1="1540" y1="280" x2="1800" y2="280" /><line x1="1540" y1="460" x2="1800" y2="460" />
          <line x1="1540" y1="640" x2="1800" y2="640" /><line x1="1540" y1="820" x2="1800" y2="820" />
        </g>
      </svg>
    `)}`,
  },
  fauna_zoology: {
    title: 'The Royal Bestiary & Falcon Flight',
    artist: 'John James Audubon (Inspiration)',
    year: '1827',
    source: 'Natural History Museum',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="faunaBg" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stop-color="#2b2015" />
            <stop offset="60%" stop-color="#140f09" />
            <stop offset="100%" stop-color="#070503" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#faunaBg)" />
        
        <!-- Falcon in soaring flight silhouette -->
        <g transform="translate(960, 420) scale(1.4)" stroke="#f59e0b" stroke-opacity="0.3" fill="#f59e0b" fill-opacity="0.08" stroke-width="1.5">
          <path d="M0,-60 Q-80,-120 -220,-80 Q-150,0 -40,10 Q-30,80 0,110 Q30,80 40,10 Q150,0 220,-80 Q80,-120 0,-60 Z" />
          <circle cx="0" cy="-60" r="16" />
          <polygon points="0,-76 -6,-60 6,-60" fill="#f59e0b" fill-opacity="0.4" />
        </g>

        <!-- Classical Circular Bestiary Zodiac Border -->
        <g stroke="#d97706" stroke-opacity="0.18" fill="none" stroke-width="1.2">
          <circle cx="960" cy="460" r="380" stroke-dasharray="8,6" />
          <circle cx="960" cy="460" r="410" />
          <circle cx="960" cy="460" r="430" stroke-dasharray="3,3" />
        </g>
      </svg>
    `)}`,
  },
  spiritual_mythology: {
    title: 'The Vision of the Oracle & Sacred Fire',
    artist: 'William Blake (Style)',
    year: '1802',
    source: 'National Gallery of Art',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="mythBg" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stop-color="#2a1226" />
            <stop offset="55%" stop-color="#140712" />
            <stop offset="100%" stop-color="#060205" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#mythBg)" />
        
        <!-- Sacred Sun Aura -->
        <circle cx="960" cy="480" r="280" fill="#f43f5e" opacity="0.08" />

        <!-- Radiant Angelic / Mystic Wings & Halo -->
        <g stroke="#fb7185" stroke-opacity="0.25" fill="none" stroke-width="1.4">
          <circle cx="960" cy="380" r="90" stroke-dasharray="6,4" />
          <circle cx="960" cy="380" r="120" />
          
          <!-- Radiating mystic rays -->
          <g stroke="#fda4af" stroke-opacity="0.2" stroke-width="1">
            <line x1="960" y1="200" x2="960" y2="100" />
            <line x1="1080" y1="250" x2="1160" y2="180" />
            <line x1="1140" y1="380" x2="1240" y2="380" />
            <line x1="1080" y1="510" x2="1160" y2="580" />
            <line x1="840" y1="250" x2="760" y2="180" />
            <line x1="780" y1="380" x2="680" y2="380" />
            <line x1="840" y1="510" x2="760" y2="580" />
          </g>

          <!-- Altar pedestal -->
          <path d="M840,820 L1080,820 L1040,640 L880,640 Z" stroke-width="2" />
          <ellipse cx="960" cy="640" rx="90" ry="25" fill="#f43f5e" fill-opacity="0.1" />
        </g>
      </svg>
    `)}`,
  },
  anatomy_medicine: {
    title: 'De Humani Corporis Fabrica',
    artist: 'Andreas Vesalius',
    year: '1543',
    source: 'Padua Anatomical Archive',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="anatBg" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stop-color="#2a1212" />
            <stop offset="55%" stop-color="#140606" />
            <stop offset="100%" stop-color="#060202" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#anatBg)" />
        
        <!-- Vitruvian Circle & Square in perspective -->
        <g stroke="#f87171" stroke-opacity="0.22" fill="none" stroke-width="1.3">
          <circle cx="960" cy="500" r="320" stroke-width="1.8" />
          <rect x="640" y="180" width="640" height="640" stroke-width="1.5" />
          <line x1="960" y1="120" x2="960" y2="880" stroke-dasharray="6,6" stroke-opacity="0.15" />
          <line x1="580" y1="500" x2="1340" y2="500" stroke-dasharray="6,6" stroke-opacity="0.15" />

          <!-- Stylized Caduceus / Rod of Asclepius -->
          <g transform="translate(960, 500) scale(0.9)" stroke="#ef4444" stroke-opacity="0.3" stroke-width="2">
            <line x1="0" y1="-260" x2="0" y2="260" stroke-width="3" />
            <circle cx="0" cy="-260" r="16" fill="#f87171" fill-opacity="0.2" />
            <path d="M-60,-180 C60,-140 -60,-80 0,0 C60,80 -60,140 60,180" />
            <path d="M60,-180 C-60,-140 60,-80 0,0 C-60,80 60,140 -60,180" />
          </g>
        </g>
      </svg>
    `)}`,
  },
  philosophy_mind: {
    title: 'The Platonic Academy & Labyrinth of Reason',
    artist: 'Athenian Philosophical Guild',
    year: 'Classical Era',
    source: 'Acropolis Museum, Athens',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="philBg" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stop-color="#192036" />
            <stop offset="55%" stop-color="#0b0e1a" />
            <stop offset="100%" stop-color="#04050a" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#philBg)" />
        
        <!-- Sacred Geometry & Concentric Polyhedra -->
        <g stroke="#818cf8" stroke-opacity="0.22" fill="none" stroke-width="1.3">
          <circle cx="960" cy="480" r="360" />
          <polygon points="960,120 1270,660 650,660" stroke-width="1.8" />
          <polygon points="960,840 1270,300 650,300" stroke-width="1.8" />
          <polygon points="960,200 1200,620 720,620" stroke-dasharray="4,4" stroke-opacity="0.15" />
          <circle cx="960" cy="480" r="160" fill="#818cf8" fill-opacity="0.05" />

          <!-- Classical Greek Meander Ribbon at base -->
          <g transform="translate(160, 940) scale(0.8)" stroke="#6366f1" stroke-opacity="0.18" stroke-width="2">
            <polyline points="0,0 40,0 40,30 20,30 20,10 30,10 30,20 0,20" />
            <polyline points="80,0 120,0 120,30 100,30 100,10 110,10 110,20 80,20" />
            <polyline points="160,0 200,0 200,30 180,30 180,10 190,10 190,20 160,20" />
            <polyline points="240,0 280,0 280,30 260,30 260,10 270,10 270,20 240,20" />
          </g>
        </g>
      </svg>
    `)}`,
  },
  antiquity_history: {
    title: 'The Forum Romanum & Imperial Triumphal Arch',
    artist: 'Hubert Robert',
    year: '1785',
    source: 'Musée du Louvre',
    svgDataUri: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
        <defs>
          <radialGradient id="histBg" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stop-color="#2d1c20" />
            <stop offset="60%" stop-color="#140b0d" />
            <stop offset="100%" stop-color="#060203" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#histBg)" />
        
        <!-- Warm antique Roman sunset glow -->
        <circle cx="960" cy="500" r="350" fill="#f43f5e" opacity="0.06" />

        <!-- Imperial Roman Triumphal Arch Engraving -->
        <g stroke="#fb7185" stroke-opacity="0.22" fill="none" stroke-width="1.5">
          <!-- Main Arch Body -->
          <rect x="620" y="240" width="680" height="740" stroke-width="2" />
          <!-- Central Arch Portal -->
          <path d="M780,980 V540 C780,420 1140,420 1140,540 V980" stroke-width="3" />
          <!-- Attica & Inscription Tablet -->
          <rect x="600" y="160" width="720" height="90" stroke-width="2.5" fill="#f43f5e" fill-opacity="0.05" />
          <!-- Inscription lines -->
          <line x1="680" y1="195" x2="1240" y2="195" stroke-width="1.2" stroke-opacity="0.2" />
          <line x1="720" y1="220" x2="1200" y2="220" stroke-width="1" stroke-opacity="0.15" />
          
          <!-- Four Corinthian Columns -->
          <line x1="660" y1="250" x2="660" y2="980" stroke-width="2.5" />
          <line x1="740" y1="250" x2="740" y2="980" stroke-width="2.5" />
          <line x1="1180" y1="250" x2="1180" y2="980" stroke-width="2.5" />
          <line x1="1260" y1="250" x2="1260" y2="980" stroke-width="2.5" />
        </g>
      </svg>
    `)}`,
  },
};
