'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Newspaper, 
  ExternalLink, 
  RefreshCw, 
  Zap, 
  Building2, 
  FileText, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { getQuantumNews } from '@/ai/flows/ai-quantum-news-flow';

type NewsItem = {
  title: string;
  source: string;
  summary: string;
  date: string;
  importance: 'high' | 'medium' | 'low';
};

export default function QuantumNewsFeed({ limit }: { limit?: number }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getQuantumNews();
      setNews(data.news);
    } catch (err: any) {
      // This catch is a safety net; the server action already provides fallbacks for quota issues.
      setError("Synchronizing with news matrix...");
      console.warn("News sync issue:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getSourceIcon = (source: string) => {
    if (source.includes('Research')) return <FileText className="w-3 h-3" />;
    return <Building2 className="w-3 h-3" />;
  };

  const getImportanceStyles = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  if (isLoading) {
    return (
      <Card className="glass-card p-8 flex flex-col items-center justify-center gap-4 min-h-[300px]">
        <div className="relative">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse uppercase tracking-widest font-bold">Curating News Matrix...</p>
      </Card>
    );
  }

  const displayedNews = limit ? news.slice(0, limit) : news;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(51,214,255,0.8)]" />
          Neural Industry Pulse
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={fetchNews}
          className="h-8 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-all gap-2"
        >
          <RefreshCw className="w-3 h-3" /> Re-Sync
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl flex items-center gap-3 text-accent text-xs mb-4">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {displayedNews.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm uppercase tracking-widest">
            Matrix Feed Empty
          </div>
        ) : (
          displayedNews.map((item, i) => (
            <Card key={i} className="glass-card p-6 hover:bg-white/5 transition-all group border-l-2 border-l-transparent hover:border-l-primary relative">
              <div className="scanline opacity-20" />
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[9px] py-0 h-5 border-white/10 text-muted-foreground bg-white/5 uppercase tracking-wider">
                    {getSourceIcon(item.source)}
                    <span className="ml-1.5">{item.source}</span>
                  </Badge>
                  <Badge variant="outline" className={`text-[9px] py-0 h-5 border-none uppercase tracking-wider px-2 font-bold ${getImportanceStyles(item.importance)}`}>
                    {item.importance} Priority
                  </Badge>
                </div>
                <span className="text-[9px] text-muted-foreground/60 font-mono uppercase tracking-tighter">{item.date}</span>
              </div>
              
              <h4 className="text-lg font-headline font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight group-hover:text-glow-violet">
                {item.title}
              </h4>
              
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 font-light">
                {item.summary}
              </p>
              
              <div className="mt-6 flex justify-end">
                <Button variant="ghost" size="sm" className="h-8 text-[9px] uppercase tracking-widest gap-2 group/btn text-muted-foreground hover:text-white hover:bg-white/5">
                  Link Neural Trace <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
