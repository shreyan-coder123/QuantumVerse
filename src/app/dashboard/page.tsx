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
  Bell
} from 'lucide-react';
import ProfessorChat from '@/components/quantum/ProfessorChat';
import CircuitLab from '@/components/quantum/CircuitLab';

export default function DashboardPage() {
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
          {[
            { label: 'Dashboard', icon: TrendingUp, active: true },
            { label: 'Learning Tracks', icon: BrainCircuit },
            { label: 'Circuit Lab', icon: Atom },
            { label: 'Coding Lab', icon: Cpu },
            { label: 'Leaderboard', icon: Trophy },
            { label: 'Community', icon: Bell },
          ].map((item, i) => (
            <Button 
              key={i} 
              variant="ghost" 
              className={`justify-start gap-3 h-12 text-muted-foreground hover:text-white hover:bg-white/5 ${item.active ? 'text-primary bg-primary/10 hover:bg-primary/20' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          ))}
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
            <h1 className="text-3xl font-headline font-bold text-white">Welcome back, Qubit Explorer!</h1>
            <p className="text-muted-foreground">Your quantum journey is 42% complete.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-white">12 Day Streak</span>
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
              <Card className="glass-card p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-primary/20 text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <Badge className="bg-primary text-white">Active Track</Badge>
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold text-white mb-1">Intermediate Circuits</h3>
                  <p className="text-sm text-muted-foreground">Module 4: Multi-qubit Gates</p>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-white font-bold">65%</span>
                  </div>
                  <Progress value={65} className="h-1.5" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 mt-2 font-bold group">
                  Continue Learning
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>

              <Card className="glass-card p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-xl bg-accent/20 text-accent">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-accent border-accent/30">Next Level</Badge>
                </div>
                <div>
                  <h3 className="text-xl font-headline font-bold text-white mb-1">Entanglement Master</h3>
                  <p className="text-sm text-muted-foreground">Gain 450 more XP to unlock rank</p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                        <img src={`https://picsum.photos/seed/rank${i}/100/100`} alt="Avatar" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Join 124 others in this rank</span>
                </div>
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 mt-auto font-bold">
                  View Achievements
                </Button>
              </Card>
            </div>

            <section>
              <h2 className="text-2xl font-headline font-bold text-white mb-6">Interactive Lab Preview</h2>
              <CircuitLab />
            </section>
          </div>

          {/* Right Column: AI Tutor & Stats */}
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="text-2xl font-headline font-bold text-white mb-6">AI Quantum Professor</h2>
              <ProfessorChat />
            </section>

            <Card className="glass-card p-6">
              <h3 className="text-lg font-headline font-bold text-white mb-4">Daily Mission</h3>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">The Bell State Challenge</p>
                  <p className="text-xs text-muted-foreground">Complete 3 circuit simulations with CNOT gates.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-primary">+150 XP</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-headline font-bold text-white">Leaderboard</h3>
                <Link href="#" className="text-xs text-primary hover:underline">View All</Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Satoshi_Q", rank: 1, xp: "14.2k", avatar: "p1" },
                  { name: "ElectronFlyer", rank: 2, xp: "12.8k", avatar: "p2" },
                  { name: "Superposition101", rank: 3, xp: "11.5k", avatar: "p3" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-sm font-bold w-4 ${i === 0 ? 'text-yellow-500' : 'text-muted-foreground'}`}>{user.rank}</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${user.avatar}/100/100`} alt={user.name} />
                    </div>
                    <span className="text-sm text-white flex-1">{user.name}</span>
                    <span className="text-xs font-mono text-accent">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
