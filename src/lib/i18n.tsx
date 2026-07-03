import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'en' | 'sw';

const STORAGE_KEY = 'sokodigital-lang';

const DICT: Record<string, Record<Lang, string>> = {
  'nav.home': { en: 'Home', sw: 'Mwanzo' },
  'nav.marketplace': { en: 'Marketplace', sw: 'Soko' },
  'nav.categories': { en: 'Categories', sw: 'Aina' },
  'nav.shops': { en: 'Shops', sw: 'Maduka' },
  'nav.deals': { en: 'Deals', sw: 'Ofa' },
  'nav.about': { en: 'About', sw: 'Kuhusu' },
  'nav.contact': { en: 'Contact', sw: 'Wasiliana' },
  'nav.login': { en: 'Login', sw: 'Ingia' },
  'nav.register': { en: 'Register', sw: 'Jisajili' },
  'nav.sell': { en: 'Sell on SokoDigital', sw: 'Uza kwenye SokoDigital' },
  'nav.help': { en: 'Help Center', sw: 'Msaada' },
  'nav.ai': { en: 'AI Assistant', sw: 'Msaidizi wa AI' },
  'nav.search': { en: 'Search products, shops...', sw: 'Tafuta bidhaa, maduka...' },
  'nav.trust': {
    en: 'Trusted by thousands of buyers and sellers worldwide',
    sw: 'Inaaminika na maelfu ya wanunuzi na wauzaji duniani kote',
  },
  'ai.title': { en: 'SokoDigital Assistant', sw: 'Msaidizi wa SokoDigital' },
  'ai.online': { en: 'Online — ready to help', sw: 'Mtandaoni — tayari kusaidia' },
  'ai.placeholder': { en: 'Type a message...', sw: 'Andika ujumbe...' },
  'ai.welcome': {
    en: "Hi there! I'm your SokoDigital assistant. How can I help you today?",
    sw: 'Habari! Mimi ni msaidizi wako wa SokoDigital. Naweza kukusaidiaje leo?',
  },
  'ai.quick.find': { en: 'Find a product', sw: 'Tafuta bidhaa' },
  'ai.quick.track': { en: 'Track my order', sw: 'Fuatilia oda yangu' },
  'ai.quick.sell': { en: 'Selling on Soko', sw: 'Kuuza kwenye Soko' },
  'ai.quick.pay': { en: 'Payment help', sw: 'Msaada wa malipo' },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}
const LangCtx = createContext<Ctx | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem(STORAGE_KEY) as Lang) || 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  const t = (key: string) => DICT[key]?.[lang] ?? key;
  return <LangCtx.Provider value={{ lang, setLang: setLangState, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
