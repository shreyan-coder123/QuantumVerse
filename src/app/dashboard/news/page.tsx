import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  BookOpen, 
  Cpu, 
  ArrowLeft,
  Terminal,
  BrainCircuit,
  Atom,
  Trophy,
  Settings,
  Newspaper,
  Globe
} from 'lucide-react';
import QuantumNewsFeed from '@/components/quantum/QuantumNewsFeed';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Consistent with Dashboard */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 glass hidden lg:flex">
        <div className="flex items-center gap-2 mb-12">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-violet">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-headline font-bold text-white">QuantumVerse</span>
          </Link>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 hover:text-white hover:bg-white/5">
              <Play className="w-5 h-5" /> Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/curriculum">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 hover:text-white hover:bg-white/5">
              <BookOpen className="w-5 h-5" /> Curriculum
            </Button>
          </Link>
          <Link href="/dashboard/coding">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 hover:text-white hover:bg-white/5">
              <Terminal className="w-5 h-5" /> Coding Lab
            </Button>
          </Link>
          <Button variant="ghost" className="justify-start gap-3 h-12 text-primary bg-primary/10">
            <Globe className="w-5 h-5" /> News Feed
          </Button>
          <Button variant="ghost" className="justify-start gap-3 h-12 text-muted-foreground hover:text-white hover:bg-white/5">
            <Trophy className="w-5 h-5" /> Leaderboard
          </Button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12">
            <Settings className="w-5 h-5" />
            Settings
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto flex flex-col h-full">
          <header className="mb-8">
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 mb-4 group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-2xl flex items-center justify-center">
                <Newspaper className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-bold text-white">Quantum Intelligence Feed</h1>
                <p className="text-muted-foreground">AI-curated breakthroughs from IBM, Google, Microsoft, and academia.</p>
              </div>
            </div>
          </header>

          <div className="flex-1">
            <QuantumNewsFeed />
          </div>
        </div>
      </main>
    </div>
  );
}
