
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
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
  Calculator,
  Zap,
  Activity
} from 'lucide-react';
import ProfessorChat from '@/components/quantum/ProfessorChat';
import CircuitLab from '@/components/quantum/CircuitLab';
import QuantumNewsFeed from '@/components/quantum/QuantumNewsFeed';
import { CURRICULUM } from '@/app/lib/curriculum';

export default function DashboardPage() {
  const activeLesson = CURRICULUM[0];

  return (
    <div className="min-h-screen bg-[#050208] flex text-foreground font-body">
      {/* Sidebar Navigation - Space Station Style */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 glass hidden lg:flex">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center neon-violet group cursor-pointer">
            <Atom className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-1000" />
          </div>
          <span className="text-xl font-headline font-bold text-white tracking-tighter">Matrix Control</span>
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          {[
            { label: 'Overview', icon: TrendingUp, href: '/dashboard', active: true },
            { label: 'Curriculum', icon: BookOpen, href: '/dashboard/curriculum' },
            { label: 'Visual Lab', icon: Atom, href: '/dashboard' },
            { label: 'Coding Lab', icon: Code2, href: '/dashboard/coding' },
            { label: 'Lexicon', icon: Library, href: '/dashboard/tools' },
            { label: 'Intelligence', icon: Globe, href: '/dashboard/news' },
            { label: 'Leaderboard', icon: Trophy, href: '/dashboard' },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start gap-4 h-12 transition-all uppercase tracking-widest text-[10px] border border-transparent ${
                  item.active ? 'bg-primary/20 text-primary border-primary/20 neon-violet' : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.active ? 'text-primary' : ''}`} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start gap-4 text-muted-foreground h-12 uppercase tracking-widest text-[10px]">
            <Settings className="w-4 h-4" />
            System Prefs
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold text-white text-glow-violet">Quantum Explorer <span className="text-primary">v2.5</span></h1>
            <p className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] mt-2">Neural Link Status: <span className="text-accent">Synchronized</span></p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 glass">
              <Zap className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-xs font-bold text-white">0% INTEGRATION</span>
            </div>
            <div className="w-12 h-12 rounded-2xl border border-primary/30 overflow-hidden bg-primary/20 p-1">
              <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div whileHover={{ y: -5 }}>
                <Card className="glass-card holographic p-8 flex flex-col gap-6 rounded-3xl group">
                  <div className="scanline" />
                  <div className="flex justify-between items-start">
                    <div className="p-4 rounded-2xl bg-primary/20 text-primary group-hover:neon-violet transition-all">
                      <Target className="w-8 h-8" />
                    </div>
                    <Badge className="bg-primary text-white text-[10px] uppercase tracking-widest px-3">Primary Node</Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-white mb-2">{activeLesson.title}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{activeLesson.module}</p>
                  </div>
                  <div className="space-y-3 mt-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>Sync Progress</span>
                      <span className="text-white">0%</span>
                    </div>
                    <Progress value={0} className="h-2 bg-white/5" />
                  </div>
                  <Link href={`/dashboard/lessons/${activeLesson.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 mt-4 font-bold h-14 rounded-2xl group text-glow-violet">
                      INITIALIZE LESSON
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }}>
                <Card className="glass-card p-8 flex flex-col gap-6 rounded-3xl bg-accent/5">
                  <div className="flex justify-between items-start">
                    <div className="p-4 rounded-2xl bg-accent/20 text-accent group-hover:neon-cyan transition-all">
                      <Activity className="w-8 h-8" />
                    </div>
                    <Badge variant="outline" className="text-accent border-accent/30 text-[10px] uppercase tracking-widest px-3">Scientific Array</Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-white mb-2">Science Terminal</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Advanced Math & Lexicon Core</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Link href="/dashboard/tools" className="flex-1">
                      <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 h-14 rounded-2xl text-[10px] uppercase tracking-widest gap-2">
                        <Calculator className="w-4 h-4 text-accent" /> SOLVER
                      </Button>
                    </Link>
                    <Link href="/dashboard/tools" className="flex-1">
                      <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 h-14 rounded-2xl text-[10px] uppercase tracking-widest gap-2">
                        <Library className="w-4 h-4 text-accent" /> LEXICON
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </div>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-headline font-bold text-white flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Neural Recommendations
                </h2>
                <Link href="/dashboard/curriculum" className="text-[10px] uppercase tracking-widest text-primary hover:text-white flex items-center gap-2">
                  Browse Whole Matrix <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CURRICULUM.slice(0, 3).map((lesson, i) => (
                  <motion.div key={lesson.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Link href={`/dashboard/lessons/${lesson.id}`}>
                      <Card className="glass-card p-0 rounded-3xl group overflow-hidden border-white/5">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={`https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg`} 
                            className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" 
                            alt={lesson.title} 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050208] to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                              <Play className="w-6 h-6 text-white fill-current" />
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="text-sm font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">{lesson.title}</h4>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-widest">{lesson.module}</p>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="glass p-10 rounded-[3rem] border-white/5 bg-white/[0.02]">
              <h2 className="text-3xl font-headline font-bold text-white mb-8">Holographic Circuit Environment</h2>
              <CircuitLab />
            </section>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10">
            <section className="glass-card p-8 rounded-[2.5rem] bg-accent/[0.02]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-headline font-bold text-white uppercase tracking-widest">Industry Pulse</h2>
                <Link href="/dashboard/news" className="text-[10px] text-primary hover:underline">
                  Full Array
                </Link>
              </div>
              <QuantumNewsFeed limit={3} />
            </section>

            <section className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
              <h2 className="text-2xl font-headline font-bold text-white mb-8 flex items-center gap-3">
                <BrainCircuit className="w-6 h-6 text-primary" />
                AI Mentor Array
              </h2>
              <ProfessorChat />
            </section>

            <Card className="glass-card p-8 rounded-[2rem] holographic bg-yellow-500/[0.02] border-yellow-500/10">
              <div className="scanline" />
              <h3 className="text-lg font-headline font-bold text-white mb-6 uppercase tracking-widest">Neural Milestone</h3>
              <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-14 h-14 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center shrink-0">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white uppercase tracking-wider">Matrix Greeting</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Complete Node 01 to earn XP</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary">+50 CORE</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
