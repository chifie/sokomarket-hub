import { useState, useEffect, useRef } from 'react';
import { Bot, Send, ShoppingBag, Truck, Shield, CreditCard } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickActions = [
  { label: 'Find products', query: 'Help me find products', icon: ShoppingBag },
  { label: 'Delivery info', query: 'How does delivery work?', icon: Truck },
  { label: 'Payment methods', query: 'What payment methods are available?', icon: CreditCard },
  { label: 'Seller verification', query: 'How are sellers verified?', icon: Shield },
];

function generateAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('find') || lowerMessage.includes('product') || lowerMessage.includes('search')) {
    return `Great! I can help you find products! 🛍️\n\nSokoMarket has thousands of products across categories like:\n\n• **Electronics** - Phones, laptops, accessories\n• **Fashion** - Clothing, shoes, jewelry\n• **Agriculture** - Fresh produce, seeds, tools\n• **Home & Living** - Furniture, decor\n• **Beauty & Health** - Skincare, wellness\n\nWhat are you looking for today? Just tell me the category or specific item!`;
  }

  if (lowerMessage.includes('delivery') || lowerMessage.includes('ship') || lowerMessage.includes('arrive')) {
    return `Our delivery options are designed for Kenya! 🚚\n\n**Delivery Times:**\n• Nairobi & Kiambu: Same-day delivery\n• Major towns: 1-2 business days\n• Remote areas: 3-5 business days\n\n**Delivery Fees:**\n• Orders over KSh 5,000: FREE delivery\n• Standard delivery: KSh 200-500\n• Express delivery: KSh 800\n\nTrack your order in real-time through your account!`;
  }

  if (lowerMessage.includes('pay') || lowerMessage.includes('mpesa') || lowerMessage.includes('card') || lowerMessage.includes('payment')) {
    return `We accept multiple payment methods! 💳\n\n**Mobile Money:**\n• M-Pesa (most popular!)\n• Airtel Money\n• T-Kash\n\n**Cards:**\n• Visa\n• Mastercard\n\n**Other:**\n• Bank Transfer\n• Cash on Delivery (selected areas)\n\nAll payments are secured with bank-level encryption. Your financial info is never stored on our servers!`;
  }

  if (lowerMessage.includes('seller') || lowerMessage.includes('trust') || lowerMessage.includes('verify') || lowerMessage.includes('safe')) {
    return `Your safety is our priority! ✅\n\n**Seller Verification Process:**\n1. ID verification (National ID/Passport)\n2. Business registration check\n3. Physical address verification\n4. Quality inspection\n\n**Buyer Protection:**\n• Money-back guarantee\n• Secure payment holding\n• Dispute resolution team\n\nLook for the ✓ Verified badge on seller profiles!`;
  }

  if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('money back')) {
    return `Our return policy is buyer-friendly! 🔄\n\n**Return Window:**\n• 7 days for most products\n• 14 days for electronics\n• 30 days for defective items\n\n**Refund Process:**\n1. Initiate return in your account\n2. Print return label (free!)\n3. Drop at nearest collection point\n4. Refund in 3-5 business days\n\nQuestions about a specific order? I can help with that!`;
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('jambo') || lowerMessage.includes('hey')) {
    return `Jambo! 👋 Welcome to SokoMarket AI Assistant!\n\nI'm here to help you:\n• Find products and deals\n• Track your orders\n• Answer questions about delivery\n• Connect with sellers\n\nWhat can I help you with today?`;
  }

  if (lowerMessage.includes('thank')) {
    return `You're welcome! 😊 Happy shopping!\n\nFeel free to ask me anything else. I'm here 24/7 to help you have a great experience on SokoMarket!`;
  }

  return `I'd be happy to help! 🌟\n\nI can assist you with:\n• **Finding products** - Tell me what you're looking for\n• **Delivery information** - Shipping times and costs\n• **Payment methods** - M-Pesa, cards, and more\n• **Seller verification** - How we keep you safe\n• **Returns & refunds** - Our buyer-friendly policy\n\nJust ask your question and I'll provide detailed answers!`;
}

export default function AIChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Jambo! 👋 I'm your SokoMarket AI assistant!\n\nI can help you find products, track orders, learn about delivery, and answer any questions about shopping on our marketplace.\n\nWhat are you looking for today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAIResponse(userMessage);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="fixed top-16 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">SokoMarket AI</h2>
            <p className="text-sm text-emerald-500">Always ready to help</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-32 pb-48">
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'border border-border bg-card text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl px-4 py-3 border border-border bg-card">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  setInput(action.query);
                  setTimeout(() => handleSend(), 100);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap bg-muted text-muted-foreground hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/50 transition"
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask me anything about SokoMarket..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-3 rounded-xl transition ${
                input.trim()
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
