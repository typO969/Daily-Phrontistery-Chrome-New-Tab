import React, { useState } from 'react';
import { Volume2, Bookmark, BookmarkCheck, Search, Sparkles, Compass, Feather, Trees, Moon, Columns, BookOpen, Activity, Brain, Crown, ExternalLink } from 'lucide-react';
import { PhrontisteryWord, ColorTheme, LayoutStyle, ComponentVisibility, ArtworkBackground, PronunciationStyle } from '../types';
import { formatPartOfSpeech, GIST_LABELS } from '../utils/themeAndGist';
import { speakWord } from '../utils/audioSynth';
import { generatePhoneticRespelling, generateApproxIpa } from '../utils/pronunciationService';

interface WordDisplayProps {
  word: PhrontisteryWord;
  theme: ColorTheme;
  layoutStyle: LayoutStyle;
  components: ComponentVisibility;
  fontFamily: 'cormorant' | 'playfair' | 'cinzel' | 'instrument' | 'sans';
  wordSize: 'compact' | 'balanced' | 'monumental';
  overlayOpacity: number;
  frameOpacity?: number;
  isFrameTranslucent?: boolean;
  pronunciationStyle?: PronunciationStyle;
  onCycleFrameOpacity?: () => void;
  artwork: ArtworkBackground;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onNextWord: () => void;
  onOpenColophon?: () => void;
}

const EtymologySection: React.FC<{
  word: PhrontisteryWord;
  align?: 'center' | 'left';
}> = ({ word, align = 'center' }) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  if (word.etymology) {
    return (
      <div className={`mt-6 pt-5 border-t border-white/10 text-xs text-stone-300 font-sans-ui max-w-lg leading-relaxed ${alignClass}`}>
        <span className="text-amber-300/90 font-medium uppercase tracking-wider block mb-1">
          Historical Etymology
        </span>
        <p className="text-stone-300/90 leading-relaxed font-editorial-body text-sm sm:text-base">{word.etymology}</p>
        <div className={`mt-2 flex items-center gap-3 text-[11px] text-stone-400 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
          <a
            href={`https://en.wiktionary.org/wiki/${encodeURIComponent(word.word)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
          >
            <span>Wiktionary</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <a
            href={`https://www.etymonline.com/word/${encodeURIComponent(word.word)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
          >
            <span>Online Etymology Dict</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`mt-4 pt-4 border-t border-white/10 text-[11px] text-stone-400 font-sans-ui max-w-md ${alignClass}`}>
      <span className="text-stone-400 block mb-1.5">
        Etymology unrecorded in current local dictionary:
      </span>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <a
          href={`https://en.wiktionary.org/wiki/${encodeURIComponent(word.word)}`}
          target="_blank"
          rel="noreferrer"
          className="text-amber-300/90 hover:text-amber-200 inline-flex items-center gap-1 transition-colors"
        >
          <span>Consult Wiktionary</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        <span aria-hidden="true" className="text-stone-600">·</span>
        <a
          href={`https://www.etymonline.com/word/${encodeURIComponent(word.word)}`}
          target="_blank"
          rel="noreferrer"
          className="text-amber-300/90 hover:text-amber-200 inline-flex items-center gap-1 transition-colors"
        >
          <span>Etymonline</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

export const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  theme,
  layoutStyle,
  components,
  fontFamily,
  wordSize,
  overlayOpacity,
  frameOpacity,
  isFrameTranslucent,
  pronunciationStyle = 'respelling',
  onCycleFrameOpacity,
  artwork,
  isFavorite,
  onToggleFavorite,
  onNextWord,
  onOpenColophon,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchEngine, setSearchEngine] = useState<'google' | 'wikipedia' | 'etymonline'>('google');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const effectiveOpacity = isFrameTranslucent !== false ? (frameOpacity ?? overlayOpacity ?? 0.65) : 1.0;
  const isTranslucent = effectiveOpacity < 0.98;

  const gistInfo = word.gist ? GIST_LABELS[word.gist] : GIST_LABELS.linguistics_literature;

  // Renders the configured pronunciation format (respelling, IPA, both, or audio-only)
  const renderPronunciationGuide = () => {
    if (!components.showPhonetics || pronunciationStyle === 'off') return null;

    const ipa = word.ipa || generateApproxIpa(word.word);
    const respelling = word.respelling || generatePhoneticRespelling(word.word);

    if (pronunciationStyle === 'audio_only') return null;

    if (pronunciationStyle === 'respelling') {
      return (
        <span
          onClick={handlePronounce}
          className="font-sans-ui text-xs text-amber-200/90 font-medium tracking-wide hover:text-amber-100 cursor-pointer transition-colors"
          title="Click to hear pronunciation"
        >
          {respelling}
        </span>
      );
    }

    if (pronunciationStyle === 'ipa') {
      return (
        <span
          onClick={handlePronounce}
          className="font-mono-data text-xs text-stone-300 tracking-wide hover:text-amber-200 cursor-pointer transition-colors"
          title="Click to hear pronunciation"
        >
          {ipa}
        </span>
      );
    }

    // 'both'
    return (
      <span
        onClick={handlePronounce}
        className="text-xs text-stone-300 tracking-wide hover:text-amber-200 cursor-pointer transition-colors inline-flex items-center gap-1.5"
        title="Click to hear pronunciation"
      >
        <span className="font-sans-ui text-amber-200/90 font-medium">{respelling}</span>
        <span className="text-stone-500 font-mono-data text-[11px]">{ipa}</span>
      </span>
    );
  };

  // Render appropriate semantic icon
  const renderGistIcon = () => {
    switch (word.gist) {
      case 'fauna_zoology':
        return <Feather className="w-3.5 h-3.5" />;
      case 'botany_flora':
        return <Trees className="w-3.5 h-3.5" />;
      case 'maritime_ocean':
        return <Compass className="w-3.5 h-3.5" />;
      case 'cosmos_astronomy':
        return <Moon className="w-3.5 h-3.5" />;
      case 'architecture_stone':
        return <Columns className="w-3.5 h-3.5" />;
      case 'spiritual_mythology':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'anatomy_medicine':
        return <Activity className="w-3.5 h-3.5" />;
      case 'philosophy_mind':
        return <Brain className="w-3.5 h-3.5" />;
      case 'antiquity_history':
        return <Crown className="w-3.5 h-3.5" />;
      case 'linguistics_literature':
      default:
        return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  // Font family selector class
  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'cormorant':
        return 'font-cormorant';
      case 'playfair':
        return 'font-playfair';
      case 'cinzel':
        return 'font-cinzel';
      case 'instrument':
        return 'font-instrument';
      case 'sans':
        return 'font-sans-ui';
      default:
        return 'font-cormorant';
    }
  };

  // Word heading size scaling
  const getWordSizeClass = () => {
    switch (wordSize) {
      case 'compact':
        return 'text-4xl sm:text-5xl lg:text-6xl';
      case 'monumental':
        return 'text-6xl sm:text-7xl lg:text-9xl tracking-tight';
      case 'balanced':
      default:
        return 'text-5xl sm:text-6xl lg:text-7xl tracking-normal';
    }
  };

  const handlePronounce = () => {
    speakWord(word.word);
  };

  const handleCopyWord = () => {
    navigator.clipboard.writeText(`${word.word}: ${word.definition}`);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    let targetUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    if (searchEngine === 'wikipedia') {
      targetUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(searchQuery)}`;
    } else if (searchEngine === 'etymonline') {
      targetUrl = `https://www.etymonline.com/search?q=${encodeURIComponent(searchQuery)}`;
    }

    window.location.href = targetUrl;
  };

  // Time & Date format for the new tab experience
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-6 md:py-10 max-w-7xl mx-auto w-full">
      {/* Optional Top Clock / Gregorian Ribbon */}
      {(components.showClock || components.showDate) && (
        <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase font-mono-data text-stone-400 mb-6 px-2">
          {components.showDate && <span>{dateString}</span>}
          {components.showClock && <span className="text-amber-300/90 font-medium ml-auto">{timeString}</span>}
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT PRESET: MUSEUM PLACARD (Gallery centered card)                      */}
      {/* ========================================================================= */}
      {layoutStyle === 'museum_placard' && (
        <div
          className={`w-full max-w-3xl rounded-2xl p-6 sm:p-10 md:p-12 border ${
            isTranslucent ? 'border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-2xl'
          } transition-all duration-300 relative text-center`}
          style={{ backgroundColor: `rgba(18, 16, 14, ${effectiveOpacity})` }}
        >
          {/* Top category & actions */}
          <div className="flex items-center justify-between gap-4 mb-6 text-xs text-stone-400 font-sans-ui border-b border-white/10 pb-4">
            {components.showGistBadge && (
              <span className="inline-flex items-center gap-1.5 text-amber-300/90 tracking-wider uppercase font-medium">
                {renderGistIcon()}
                <span>{gistInfo.label}</span>
              </span>
            )}
            <div className="flex items-center gap-3 ml-auto">
              {onCycleFrameOpacity && (
                <button
                  onClick={onCycleFrameOpacity}
                  className="hover:text-amber-200 transition-colors font-mono-data text-[11px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10"
                  title="Cycle frame opacity (50% -> 65% -> 80% -> 100%)"
                >
                  Opacity: {Math.round(effectiveOpacity * 100)}%
                </button>
              )}
              <button
                onClick={handleCopyWord}
                className="hover:text-amber-200 transition-colors"
                title="Copy word and definition"
              >
                {copiedNotification ? <span className="text-emerald-400">Copied!</span> : 'Copy'}
              </button>
              <button
                onClick={onToggleFavorite}
                className={`transition-colors ${isFavorite ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'}`}
                title={isFavorite ? 'Saved in favorites' : 'Save to favorites'}
              >
                {isFavorite ? <BookmarkCheck className="w-4 h-4 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Word Heading */}
          {components.showWord && (
            <div className="mb-4">
              <h1 className={`${getFontFamilyClass()} ${getWordSizeClass()} font-semibold text-stone-100 leading-none text-glow-gold capitalize`}>
                {word.word}
              </h1>
            </div>
          )}

          {/* Role in Language & Phonetics */}
          {(components.showPartOfSpeech || components.showPhonetics) && (
            <div className="flex items-center justify-center gap-3 text-sm text-stone-300 mb-6 font-editorial-body italic">
              {components.showPartOfSpeech && (
                <span className="font-sans-ui not-italic text-xs tracking-wider uppercase text-amber-300/80 font-semibold">
                  {formatPartOfSpeech(word.part_of_speech)}
                </span>
              )}
              {components.showPartOfSpeech && components.showPhonetics && pronunciationStyle !== 'off' && pronunciationStyle !== 'audio_only' && (
                <span className="text-stone-500" aria-hidden="true">·</span>
              )}
              {renderPronunciationGuide()}
              {components.showAudioButton && (
                <button
                  onClick={handlePronounce}
                  className="p-1 text-stone-400 hover:text-amber-300 transition-colors rounded-full hover:bg-white/10"
                  title="Pronounce word"
                  aria-label="Pronounce word"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Definition */}
          {components.showDefinition && (
            <div className="mb-8 max-w-xl mx-auto">
              <p className="font-cormorant text-xl sm:text-2xl text-stone-100 leading-relaxed font-normal">
                {word.definition}
              </p>
            </div>
          )}

          {/* Etymology / Roots */}
          {components.showEtymology && (
            <EtymologySection word={word} align="center" />
          )}

          {/* Literary Example */}
          {components.showExample && word.example && (
            <blockquote className="mt-4 text-xs italic text-stone-300/80 font-cormorant max-w-md mx-auto">
              "{word.example}"
            </blockquote>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT PRESET: MONOGRAPH (Editorial left-anchored book layout)             */}
      {/* ========================================================================= */}
      {layoutStyle === 'monograph' && (
        <div
          className={`w-full max-w-4xl rounded-2xl p-8 sm:p-12 border ${
            isTranslucent ? 'border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-2xl'
          } transition-all duration-300 relative text-left`}
          style={{ backgroundColor: `rgba(18, 16, 14, ${effectiveOpacity})` }}
        >
          {/* Header Metadata */}
          <div className="flex items-center justify-between gap-4 text-xs text-stone-400 font-sans-ui border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="tracking-widest uppercase text-stone-400">Folio Vol. IV</span>
              <span aria-hidden="true">·</span>
              {components.showGistBadge && (
                <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
                  {renderGistIcon()}
                  <span>{gistInfo.label}</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {onCycleFrameOpacity && (
                <button
                  onClick={onCycleFrameOpacity}
                  className="hover:text-amber-200 transition-colors font-mono-data text-[11px] px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10"
                  title="Cycle frame opacity"
                >
                  Opacity: {Math.round(effectiveOpacity * 100)}%
                </button>
              )}
              <button
                onClick={onToggleFavorite}
                className={`transition-colors ${isFavorite ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'}`}
                title={isFavorite ? 'Saved in favorites' : 'Save to favorites'}
              >
                {isFavorite ? <BookmarkCheck className="w-4 h-4 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {components.showWord && (
                <h1 className={`${getFontFamilyClass()} ${getWordSizeClass()} font-bold text-stone-100 leading-tight mb-2 capitalize text-glow-subtle`}>
                  {word.word}
                </h1>
              )}

              {(components.showPartOfSpeech || components.showPhonetics) && (
                <div className="flex items-center gap-3 text-sm text-stone-300 mb-5 font-editorial-body italic">
                  {components.showPartOfSpeech && (
                    <span className="font-sans-ui not-italic text-xs tracking-wider uppercase text-amber-300/90 font-semibold">
                      {formatPartOfSpeech(word.part_of_speech)}
                    </span>
                  )}
                  {components.showPartOfSpeech && components.showPhonetics && pronunciationStyle !== 'off' && pronunciationStyle !== 'audio_only' && (
                    <span className="text-stone-500" aria-hidden="true">·</span>
                  )}
                  {renderPronunciationGuide()}
                  {components.showAudioButton && (
                    <button
                      onClick={handlePronounce}
                      className="p-1 text-stone-400 hover:text-amber-300 transition-colors rounded-full hover:bg-white/10"
                      title="Pronounce word"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {components.showDefinition && (
                <div className="mb-6">
                  <p className="font-cormorant text-xl sm:text-2xl text-stone-100 leading-relaxed font-normal first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-300 first-letter:float-left first-letter:mr-2">
                    {word.definition}
                  </p>
                </div>
              )}

              {components.showExample && word.example && (
                <div className="pl-4 border-l-2 border-amber-400/40 text-sm italic text-stone-300/90 font-cormorant my-4">
                  "{word.example}"
                </div>
              )}
            </div>

            {/* Margin Notes Column */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6 text-xs text-stone-400 font-sans-ui space-y-4">
              {components.showEtymology && (
                <EtymologySection word={word} align="left" />
              )}
              {word.origin_language && (
                <div>
                  <span className="text-amber-300/90 font-semibold uppercase tracking-wider block mb-1">
                    Origin Classification
                  </span>
                  <p className="leading-relaxed text-stone-300/90">{word.origin_language}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT PRESET: ZENITH MINIMAL (Maximum negative space & typographic focus) */}
      {/* ========================================================================= */}
      {layoutStyle === 'zenith_minimal' && (
        <div className="w-full max-w-4xl text-center py-12 transition-all duration-300">
          {components.showGistBadge && (
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300/80 mb-4 font-sans-ui font-medium">
              {renderGistIcon()}
              <span>{gistInfo.label}</span>
            </div>
          )}

          {components.showWord && (
            <h1 className={`${getFontFamilyClass()} ${getWordSizeClass()} font-bold text-stone-100 mb-4 capitalize text-glow-gold drop-shadow-md`}>
              {word.word}
            </h1>
          )}

          {(components.showPartOfSpeech || components.showPhonetics) && (
            <div className="flex items-center justify-center gap-3 text-sm text-stone-300 mb-6 font-sans-ui">
              {components.showPartOfSpeech && (
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  {formatPartOfSpeech(word.part_of_speech)}
                </span>
              )}
              {components.showPartOfSpeech && components.showPhonetics && pronunciationStyle !== 'off' && pronunciationStyle !== 'audio_only' && (
                <span className="text-stone-500" aria-hidden="true">·</span>
              )}
              {renderPronunciationGuide()}
              {components.showAudioButton && (
                <button
                  onClick={handlePronounce}
                  className="text-stone-400 hover:text-amber-300 transition-colors"
                  title="Pronounce word"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {components.showDefinition && (
            <p className="font-cormorant text-2xl sm:text-3xl text-stone-100 max-w-2xl mx-auto leading-relaxed font-light drop-shadow">
              {word.definition}
            </p>
          )}

          {components.showEtymology && (
            <EtymologySection word={word} align="center" />
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT PRESET: SPLIT CURATORIAL (Art showcase on left, Lexicon on right)  */}
      {/* ========================================================================= */}
      {layoutStyle === 'split_curatorial' && (
        <div
          className={`w-full max-w-5xl rounded-2xl overflow-hidden border ${
            isTranslucent ? 'border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-2xl'
          } transition-all duration-300 grid grid-cols-1 md:grid-cols-12`}
          style={{ backgroundColor: `rgba(18, 16, 14, ${effectiveOpacity})` }}
        >
          {/* Left Art Plate */}
          <div className="md:col-span-5 relative min-h-[260px] md:min-h-[460px] overflow-hidden group">
            <img
              src={artwork.url}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-left">
              <span className="text-[10px] font-mono-data tracking-widest uppercase text-amber-300/90 mb-1">
                Complementary Masterwork
              </span>
              <p className="text-sm font-serif font-medium text-stone-100 line-clamp-1">{artwork.title}</p>
              <p className="text-xs text-stone-400 font-sans-ui">{artwork.artist} {artwork.year && `(${artwork.year})`}</p>
            </div>
          </div>

          {/* Right Lexicon Details */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 text-xs text-stone-400 font-sans-ui border-b border-white/10 pb-3">
                {components.showGistBadge && (
                  <span className="inline-flex items-center gap-1.5 text-amber-300 font-medium">
                    {renderGistIcon()}
                    <span>{gistInfo.label}</span>
                  </span>
                )}
                <button
                  onClick={onToggleFavorite}
                  className={`transition-colors ${isFavorite ? 'text-amber-400' : 'text-stone-400 hover:text-stone-200'}`}
                >
                  {isFavorite ? <BookmarkCheck className="w-4 h-4 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>

              {components.showWord && (
                <h1 className={`${getFontFamilyClass()} ${getWordSizeClass()} font-bold text-stone-100 leading-tight mb-2 capitalize`}>
                  {word.word}
                </h1>
              )}

              {(components.showPartOfSpeech || components.showPhonetics) && (
                <div className="flex items-center gap-2.5 text-sm text-stone-300 mb-5">
                  {components.showPartOfSpeech && (
                    <span className="font-sans-ui text-xs uppercase tracking-wider text-amber-300/90 font-semibold">
                      {formatPartOfSpeech(word.part_of_speech)}
                    </span>
                  )}
                  {components.showPartOfSpeech && components.showPhonetics && pronunciationStyle !== 'off' && pronunciationStyle !== 'audio_only' && (
                    <span className="text-stone-500" aria-hidden="true">·</span>
                  )}
                  {renderPronunciationGuide()}
                  {components.showAudioButton && (
                    <button onClick={handlePronounce} className="text-stone-400 hover:text-amber-300">
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {components.showDefinition && (
                <p className="font-cormorant text-xl sm:text-2xl text-stone-100 leading-relaxed font-normal mb-5">
                  {word.definition}
                </p>
              )}

              {components.showExample && word.example && (
                <p className="text-xs italic text-stone-300/90 font-cormorant pl-3 border-l border-amber-400/50 mb-5">
                  "{word.example}"
                </p>
              )}
            </div>

            {components.showEtymology && (
              <EtymologySection word={word} align="left" />
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LAYOUT PRESET: BROADSHEET (Dual column historical folio)                   */}
      {/* ========================================================================= */}
      {layoutStyle === 'broadsheet' && (
        <div
          className={`w-full max-w-4xl rounded-2xl p-8 sm:p-12 border ${
            isTranslucent ? 'border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-2xl'
          } transition-all duration-300 text-left`}
          style={{ backgroundColor: `rgba(18, 16, 14, ${effectiveOpacity})` }}
        >
          <div className="border-b-2 border-stone-100/20 pb-4 mb-6 flex items-center justify-between">
            <span className="font-cinzel text-xs tracking-widest uppercase text-stone-400">The Scholastic Gazette</span>
            <span className="font-mono-data text-xs text-amber-300/90">{dateString}</span>
          </div>

          {components.showWord && (
            <h1 className={`${getFontFamilyClass()} text-5xl sm:text-6xl lg:text-7xl font-black text-stone-100 leading-none mb-3 capitalize text-glow-gold`}>
              {word.word}
            </h1>
          )}

          <div className="flex items-center gap-3 text-xs text-stone-300 uppercase tracking-widest font-sans-ui mb-6 pb-4 border-b border-white/10">
            {components.showPartOfSpeech && <span>{formatPartOfSpeech(word.part_of_speech)}</span>}
            {renderPronunciationGuide()}
            {components.showAudioButton && (
              <button onClick={handlePronounce} className="text-amber-300">
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="ml-auto text-amber-300/80">{gistInfo.label}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-stone-200">
            <div>
              <span className="text-xs uppercase font-sans-ui tracking-wider text-amber-300/80 block mb-1">Definition</span>
              <p className="font-cormorant text-xl leading-relaxed text-stone-100">{word.definition}</p>
            </div>
            <div>
              {components.showEtymology && (
                <EtymologySection word={word} align="left" />
              )}
              {word.example && (
                <p className="text-xs italic font-cormorant text-stone-400 mt-3">"{word.example}"</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OPTIONAL QUICK SEARCH BAR (For New Tab utility)                           */}
      {/* ========================================================================= */}
      {components.showSearchBar && (
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-lg mt-8 relative flex items-center group transition-all"
        >
          <div className="relative w-full flex items-center bg-black/40 hover:bg-black/55 focus-within:bg-black/60 border border-white/15 focus-within:border-amber-400/50 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-lg transition-all">
            <Search className="w-4 h-4 text-stone-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search with ${searchEngine === 'google' ? 'Google' : searchEngine === 'wikipedia' ? 'Wikipedia' : 'Etymonline'}...`}
              className="w-full bg-transparent text-sm text-stone-100 placeholder:text-stone-400/70 focus:outline-none font-sans-ui"
            />
            {/* Quick Engine Selector */}
            <div className="flex items-center gap-1.5 ml-2 border-l border-white/15 pl-2 text-[11px] font-sans-ui">
              <button
                type="button"
                onClick={() => setSearchEngine('google')}
                className={`px-1.5 py-0.5 rounded transition-colors ${searchEngine === 'google' ? 'text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-200'}`}
              >
                G
              </button>
              <button
                type="button"
                onClick={() => setSearchEngine('wikipedia')}
                className={`px-1.5 py-0.5 rounded transition-colors ${searchEngine === 'wikipedia' ? 'text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-200'}`}
              >
                W
              </button>
              <button
                type="button"
                onClick={() => setSearchEngine('etymonline')}
                className={`px-1.5 py-0.5 rounded transition-colors ${searchEngine === 'etymonline' ? 'text-amber-300 font-semibold' : 'text-stone-400 hover:text-stone-200'}`}
                title="Online Etymology Dictionary"
              >
                Etym
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Artwork Attribution & Colophon Pill at Bottom-Right */}
      <aside className="mt-8 text-[11px] text-stone-400 font-sans-ui flex flex-wrap items-center justify-center sm:justify-start gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <span>
          Artwork:{' '}
          {artwork.commonsUrl ? (
            <a
              href={artwork.commonsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-amber-300 font-serif underline decoration-stone-600 hover:decoration-amber-300 transition-colors"
              title="View masterwork on Wikimedia Commons"
            >
              {artwork.title}
            </a>
          ) : (
            <em className="text-stone-300 not-italic font-serif">{artwork.title}</em>
          )}{' '}
          by {artwork.artist}
        </span>
        <span aria-hidden="true">·</span>
        <span className="text-stone-400">{artwork.source}</span>
        {onOpenColophon && (
          <>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenColophon}
              className="text-amber-400/80 hover:text-amber-300 underline decoration-dotted hover:decoration-solid transition-colors cursor-pointer"
              title="View Colophon, API disclosures, and privacy matrix"
            >
              Colophon & APIs
            </button>
          </>
        )}
      </aside>
    </main>
  );
};
