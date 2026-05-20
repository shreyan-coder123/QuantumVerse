import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  BookOpen, 
  Cpu, 
  ArrowLeft,
  BrainCircuit,
  Atom,
  Trophy,
  Settings,
  Sparkles
} from 'lucide-react';
import QuizComponent from '@/components/quantum/QuizComponent';

export default async function QuizPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const topic = resolvedSearchParams.topic || "Quantum Computing Fundamentals";

  return (
    <div className="min-h-screen bg-background flex">
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
          <Button variant="ghost" className="justify-start gap-3 h-12 text-muted-foreground hover:text-white hover:bg-white/5">
            <BrainCircuit className="w-5 h-5" /> Coding Lab
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
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 mb-6 group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 text-primary rounded-2xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-headline font-bold text-white leading-tight">AI Knowledge Assessment</h1>
                <p className="text-muted-foreground">Evaluating your grasp of {topic}.</p>
              </div>
            </div>
          </header>

          <QuizComponent topic={topic} />
        </div>
      </main>
    </div>
  );
}
