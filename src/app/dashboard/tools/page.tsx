
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
  Calculator,
  Globe,
  Library
} from 'lucide-react';
import EquationSolver from '@/components/quantum/EquationSolver';
import QuantumDictionary from '@/components/quantum/QuantumDictionary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ToolsPage() {
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
            <Library className="w-5 h-5" /> Tools & Resources
          </Button>
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

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto flex flex-col h-full">
          <header className="mb-8">
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 mb-4 group">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-headline font-bold text-white mb-2">Science Lab & Lexicon</h1>
            <p className="text-muted-foreground">Advanced tools for quantum mathematical exploration and conceptual mastery.</p>
          </header>

          <Tabs defaultValue="dictionary" className="flex-1">
            <TabsList className="bg-white/5 p-1 h-14 w-full justify-start gap-4 mb-8">
              <TabsTrigger value="dictionary" className="h-12 px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">
                <BookOpen className="w-4 h-4 mr-2" /> Quantum Dictionary
              </TabsTrigger>
              <TabsTrigger value="solver" className="h-12 px-8 font-bold data-[state=active]:bg-accent data-[state=active]:text-white">
                <Calculator className="w-4 h-4 mr-2" /> Equation Solver
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dictionary" className="mt-0 focus-visible:ring-0">
              <QuantumDictionary />
            </TabsContent>

            <TabsContent value="solver" className="mt-0 focus-visible:ring-0">
              <div className="max-w-4xl mx-auto">
                <EquationSolver />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
