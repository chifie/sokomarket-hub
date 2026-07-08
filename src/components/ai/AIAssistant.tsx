import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, X, Bot, User, MessageSquare, Mic,
  Paperclip, Zap, ShoppingBag, HelpCircle, TrendingUp,
  ChevronDown, PanelBottomClose
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { aiSuggestions } from "@/lib/constants";
import type { AIMessage, AISuggestion } from "@/types";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your Soko Digital AI assistant. I can help you find products, compare items, track orders, and more. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions] = useState(aiSuggestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great choice! I found several options that match your search. Would you like me to show you the top picks?",
        "I can help you with that! Here are some recommendations based on your preferences.",
        "Let me check our inventory... We have excellent options available in that category.",
        "Sure! I'll help you find the best deals. Here are some suggestions tailored for you.",
      ];
      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);

    // Another auto response
    setTimeout(() => {
      if (!isTyping) return;
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: AISuggestion) => {
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: suggestion.text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: `Great question about "${suggestion.text}"! Let me search our marketplace for you. I'll find the best options available.`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-blue-700 text-white shadow-xl hover:shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-[9px] font-bold flex items-center justify-center shadow-lg border-2 border-background animate-pulse">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "auto",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)]",
              "rounded-2xl border border-border/50 bg-card shadow-2xl overflow-hidden",
              isMinimized ? "" : "h-[600px] max-h-[calc(100vh-6rem)]"
            )}
          >
            {/* Header */}
            <div className="relative p-4 bg-gradient-to-r from-primary to-blue-700 text-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold">Soko AI Assistant</h3>
                  <p className="text-[11px] text-white/80">Online • Ready to help</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    {isMinimized ? (
                      <PanelBottomClose className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4 h-[380px]">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex gap-2.5",
                          msg.role === "user" ? "flex-row-reverse" : ""
                        )}
                      >
                        <div
                          className={cn(
                            "h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-1",
                            msg.role === "assistant"
                              ? "bg-primary/10"
                              : "bg-muted"
                          )}
                        >
                          {msg.role === "assistant" ? (
                            <Bot className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                            msg.role === "assistant"
                              ? "bg-muted/50 text-foreground rounded-tl-sm"
                              : "bg-primary text-primary-foreground rounded-tr-sm"
                          )}
                        >
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2.5"
                      >
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Bot className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                }}
                                className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Suggested Prompts */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {suggestions.slice(0, 4).map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleSuggestionClick(s)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all duration-200"
                        >
                          {s.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="px-4 pb-2 flex gap-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
                          <Mic className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Voice input</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
                          <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Attach file</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Input */}
                <div className="border-t border-border/50 p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask me anything..."
                      className="flex-1 h-10 rounded-full bg-muted/50 border border-border/50 px-4 text-sm outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                    />
                    <Button
                      size="icon"
                      onClick={handleSend}
                      disabled={!input.trim() || isTyping}
                      className="h-10 w-10 rounded-full shrink-0 shadow-sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
