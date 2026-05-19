
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Cpu, 
  Flame, 
  Target, 
  Trophy, 
  Play, 
  Calendar, 
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Atom,
  Settings,
  BookOpen,
  Code2,
  Globe,
  Newspaper,
  Library,
  Calculator
} from 'lucide-react';
import ProfessorChat from '@/components/quantum/ProfessorChat';
import CircuitLab from '@/components/quantum/CircuitLab';
import QuantumNewsFeed from '@/components/quantum/QuantumNewsFeed';
import { CURRICULUM } from '@/app/lib/curriculum';

export default function DashboardPage() {
  const activeLesson = CURRICULUM[0]; // Start with the first lesson

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 glass hidden lg:flex">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center neon-violet">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-headline font-bold text-white">QuantumVerse</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Button variant="ghost" className="justify-start gap-3 h-12 text-primary bg-primary/10">
            <TrendingUp className="w-5 h-5" /> Dashboard
          </Button>
          <Link href="/dashboard/curriculum">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 hover:text-white hover:bg-white/5">
              <BookOpen className="w-5 h-5" /> Curriculum
            </Button>
          </Link>
          <Button variant="ghost" className="justify-start gap-3 h-12 text-muted-foreground hover:text-white hover:bg-white/5">
            <Atom className="w-5 h-5" /> Circuit Lab
          </Button>
          <Link href="/dashboard/coding">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 hover:text-white hover:bg-white/5">
              <Code2 className="w-5 h-5" /> Coding Lab
            </Button>
          </Link>
          <Link href="/dashboard/tools">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 hover:text-white hover:bg-white/5">
              <Library className="w-5 h-5" /> Tools & Lexicon
            </Button>
          </Link>
          <Link href="/dashboard/news">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12 hover:text-white hover:bg-white/5">
              <Globe className="w-5 h-5" /> News Feed
            </Button>
          </Link>
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-headline font-bold text-white">Welcome, Qubit Explorer!</h1>
            <p className="text-muted-foreground">Ready to start your quantum journey? 0% complete.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Flame className="w-4 h-4 text-orange-500/50" />
              <span className="text-sm font-bold text-white/50">0 Day Streak</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-primary/30 overflow-hidden bg-primary/20">
              <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Progress & Paths */}
          <div className="xl:col-span-2 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card p-6 flex flex-col gap-4 relative overflow-hidden">
                <div className="flex justify-between items-start z-10">
                  <div className="p-3 rounded-xl bg-primary/20 text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <Badge className="bg-primary text-white">Start Path</Badge>
                </div>
                <div className="z-10">
                  <h3 className="text-xl font-headline font-bold text-white mb-1">{activeLesson.title}</h3>
                  <p className="text-sm text-muted-foreground">Module: {activeLesson.module}</p>
                </div>
                <div className="space-y-2 mt-2 z-10">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-white font-bold">0%</span>
                  </div>
                  <Progress value={0} className="h-1.5" />
                </div>
                <Link href={`/dashboard/lessons/${activeLesson.id}`} className="z-10">
                  <Button className="w-full bg-primary hover:bg-primary/90 mt-2 font-bold group">
                    Begin Lesson
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              </Card>

              <Card className="glass-card p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-accent/20 text-accent">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-accent border-accent/30">Science Tools</Badge>
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold text-white mb-1">Quantum Lab Tools</h3>
                  <p className="text-sm text-muted-foreground">Solve equations or look up complex terms.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link href="/dashboard/tools">
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 h-10 gap-2 text-xs">
                      <Calculator className="w-4 h-4" /> Solver
                    </Button>
                  </Link>
                  <Link href="/dashboard/tools">
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 h-10 gap-2 text-xs">
                      <Library className="w-4 h-4" /> Lexicon
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headline font-bold text-white">Recommended for You</h2>
                <Link href="/dashboard/curriculum" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Browse Curriculum <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CURRICULUM.slice(0, 3).map((lesson) => (
                  <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}>
                    <Card className="glass-card p-4 hover:bg-white/5 transition-colors h-full">
                      <div className="aspect-video rounded-lg bg-black/40 mb-3 overflow-hidden relative">
                        <img 
                          src={`https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg`} 
                          className="w-full h-full object-cover opacity-60" 
                          alt={lesson.title} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white/50" />
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{lesson.title}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{lesson.module}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-headline font-bold text-white mb-6">Visual Circuit Lab</h2>
              <CircuitLab />
            </section>
          </div>

          {/* Right Column: AI Tutor & Stats */}
          <div className="flex flex-col gap-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-headline font-bold text-white">Quantum Industry News</h2>
                <Link href="/dashboard/news" className="text-xs text-primary hover:underline flex items-center gap-1">
                  Full Feed <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <QuantumNewsFeed limit={3} />
            </section>

            <section>
              <h2 className="text-2xl font-headline font-bold text-white mb-6">AI Quantum Professor</h2>
              <ProfessorChat />
            </section>

            <Card className="glass-card p-6">
              <h3 className="text-lg font-headline font-bold text-white mb-4">First Mission</h3>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">The Qubit Greeting</p>
                  <p className="text-xs text-muted-foreground">Watch the first lesson to earn your first XP points.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary">+50 XP</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
