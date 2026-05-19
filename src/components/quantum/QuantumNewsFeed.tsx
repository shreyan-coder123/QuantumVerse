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
  Loader2 
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

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const data = await getQuantumNews();
      setNews(data.news);
    } catch (error) {
      console.error("Failed to fetch news:", error);
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
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">Curating latest quantum updates...</p>
      </Card>
    );
  }

  const displayedNews = limit ? news.slice(0, limit) : news;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          Industry Pulse
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={fetchNews}
          className="h-8 text-[10px] text-muted-foreground hover:text-white"
        >
          <RefreshCw className="w-3 h-3 mr-1" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {displayedNews.map((item, i) => (
          <Card key={i} className="glass-card p-5 hover:bg-white/5 transition-all group border-l-2 border-l-transparent hover:border-l-primary">
            <div className="flex justify-between items-start gap-4 mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] py-0 h-5 border-white/10 text-muted-foreground">
                  {getSourceIcon(item.source)}
                  <span className="ml-1">{item.source}</span>
                </Badge>
                <Badge variant="outline" className={`text-[10px] py-0 h-5 border-none capitalize ${getImportanceStyles(item.importance)}`}>
                  {item.importance} Impact
                </Badge>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.date}</span>
            </div>
            
            <h4 className="text-md font-bold text-white mb-2 group-hover:text-primary transition-colors leading-tight">
              {item.title}
            </h4>
            
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {item.summary}
            </p>
            
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1 group/btn">
                Read Full Update <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
