import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  BookOpen, 
  ChevronRight, 
  Cpu, 
  Code2, 
  ArrowLeft,
  Terminal,
  BrainCircuit,
  Atom,
  Trophy,
  Settings
} from 'lucide-react';
import CodingLab from '@/components/quantum/CodingLab';

export default function CodingPage() {
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
          <Button variant="ghost" className="justify-start gap-3 h-12 text-primary bg-primary/10">
            <Code2 className="w-5 h-5" /> Coding Lab
          </Button>
          <Button variant="ghost" className="justify-start gap-3 h-12 text-muted-foreground hover:text-white hover:bg-white/5">
            <Atom className="w-5 h-5" /> Circuit Lab
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
        <div className="max-w-7xl mx-auto flex flex-col h-full">
          <header className="mb-8">
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 mb-4 group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
          </header>

          <div className="flex-1">
            <CodingLab />
          </div>
        </div>
      </main>
    </div>
  );
}
