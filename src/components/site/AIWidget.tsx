import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Send, X, MessageCircle } from 'lucide-react';
import { useLang } from '@/lib/i18n';

type Msg = { role: 'user' | 'assistant'; content: string };

function reply(input: string, lang: 'en' | 'sw'): string {
  const q = input.toLowerCase();
  const sw = lang === 'sw';
  if (/(hi|hello|jambo|habari|mambo)/.test(q))
    return sw
      ? 'Habari! Karibu SokoDigital. Ungependa kutafuta bidhaa gani leo?'
      : "Hello! Welcome to SokoDigital. What are you shopping for today?";
  if (/(track|order|oda|fuatilia)/.test(q))
    return sw
      ? 'Nenda kwenye Dashibodi > Oda zangu ili kufuatilia oda yako kwa muda halisi.'
      : 'Go to Dashboard > Your orders to track your order in real time.';
  if (/(pay|payment|malipo|lipa)/.test(q))
    return sw
      ? 'Tunapokea kadi za Visa/Mastercard, PayPal, na pochi za simu.'
      : 'We accept Visa/Mastercard, PayPal, and mobile wallets — all secured end-to-end.';
  if (/(sell|uza|muuz)/.test(q))
    return sw
      ? 'Jisajili kama Muuzaji kisha nenda Dashibodi > Ongeza bidhaa kupakia picha, bei na maelezo.'
      : 'Register as a Seller, then go to Dashboard > Add a product to upload photos, price and specs.';
  if (/(deliver|ship|usafirish)/.test(q))
    return sw
      ? 'Usafirishaji hutolewa duniani kote; muda ni siku 1–7 kulingana na eneo.'
      : 'We deliver worldwide, typically within 1–7 days depending on your location.';
  return sw
    ? 'Naweza kukusaidia kutafuta bidhaa, malipo, oda, au kuwa muuzaji. Uliza chochote!'
    : 'I can help with finding products, payments, orders, or becoming a seller. Ask me anything!';
}

export function AIWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const { t, lang } = useLang();
  const location = useLocation();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMsgs([{ role: 'assistant', content: t('ai.welcome') }]);
  }, [lang, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, open]);

  // Hide on the full-page /chat route
  if (location.pathname.startsWith('/chat')) return null;

  const send = (text?: string) => {
    const v = (text ?? input).trim();
    if (!v) return;
    setMsgs((m) => [...m, { role: 'user', content: v }]);
    setInput('');
    setTimeout(() => {
      setMsgs((m) => [...m, { role: 'assistant', content: reply(v, lang) }]);
    }, 500);
  };

  const quick = [
    t('ai.quick.find'),
    t('ai.quick.track'),
    t('ai.quick.sell'),
    t('ai.quick.pay'),
  ];

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI assistant"
          className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-elegant transition hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
            AI
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[540px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
          <div className="flex items-center justify-between gap-3 bg-primary p-3 text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{t('ai.title')}</div>
                <div className="flex items-center gap-1.5 text-[11px] opacity-90">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  {t('ai.online')}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto bg-muted/40 p-3">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    'max-w-[85%] rounded-2xl px-3 py-2 text-sm ' +
                    (m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-card border border-border text-foreground rounded-bl-sm')
                  }
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-card px-3 pt-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {quick.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground/80 hover:border-primary hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 pb-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('ai.placeholder')}
                className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
