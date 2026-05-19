"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, BrainCircuit, MessageSquare, User, Bot, Loader2 } from 'lucide-react';
import { explainConcept } from '@/ai/flows/ai-quantum-professor-explain';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ProfessorChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Greetings, explorer! I am Professor Quantum. I can help you demystify entanglement, explain superposition, or help you debug your quantum circuits. What would you like to learn today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await explainConcept({
        question: userMsg,
        currentUnderstandingLevel: 'Beginner' // Could be dynamic based on profile
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.explanation }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Ah, it seems there's a bit of decoherence in my connection. Could you try asking that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass border-white/5 flex flex-col h-[600px] overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-primary/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10 border border-primary/20">
              <AvatarImage src="https://picsum.photos/seed/prof/200/200" alt="Professor Quantum" />
              <AvatarFallback>PQ</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <h3 className="text-sm font-headline font-bold text-white leading-none">Professor Quantum</h3>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 mt-1">
              <Sparkles className="w-2.5 h-2.5 text-primary" /> AI Mentor Active
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <BrainCircuit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-accent" /> : <Bot className="w-4 h-4 text-primary" />}
              </div>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-accent/10 text-white rounded-tr-none border border-accent/20' 
                : 'bg-white/5 text-muted-foreground rounded-tl-none border border-white/5'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-primary animate-spin" />
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-2xl flex gap-1 items-center border border-white/5">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 bg-background/50 border-t border-white/5">
        <form 
          className="flex gap-2" 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Superposition, Entanglement..." 
            className="bg-white/5 border-white/10 focus-visible:ring-primary h-12"
          />
          <Button type="submit" size="icon" className="h-12 w-12 bg-primary hover:bg-primary/90 neon-violet shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
