import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, BookOpen, ChevronRight, Cpu } from 'lucide-react';
import { CURRICULUM } from '@/app/lib/curriculum';

export default function CurriculumPage() {
  const modules = Array.from(new Set(CURRICULUM.map(l => l.module)));

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
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground h-12">
              <Play className="w-5 h-5" /> Dashboard
            </Button>
          </Link>
          <Button variant="ghost" className="justify-start gap-3 h-12 text-primary bg-primary/10">
            <BookOpen className="w-5 h-5" /> Curriculum
          </Button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Learning Tracks</Badge>
            <h1 className="text-4xl font-headline font-bold text-white mb-4">The Quantum Roadmap</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Master quantum computing through our structured curriculum. From qubits to algorithms, we've got you covered.
            </p>
          </header>

          <div className="space-y-16">
            {modules.map((module) => (
              <section key={module}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-headline font-bold text-white">{module}</h2>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {CURRICULUM.filter(l => l.module === module).map((lesson) => (
                    <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}>
                      <Card className="glass-card h-full flex flex-col hover:scale-[1.02] transition-all group overflow-hidden">
                        <div className="relative aspect-video bg-black/40">
                          <img 
                            src={`https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg`} 
                            alt={lesson.title}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white neon-violet">
                              <Play className="w-6 h-6 fill-current" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-[10px] text-white font-mono">
                            {lesson.duration}
                          </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col gap-3">
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="text-lg font-headline font-bold text-white group-hover:text-primary transition-colors leading-tight">
                              {lesson.title}
                            </h3>
                            <Badge className={`${
                              lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                              lesson.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            } border-none text-[10px]`}>
                              {lesson.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {lesson.description}
                          </p>
                          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-white/5">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                            </span>
                            <span className="text-primary font-bold flex items-center group-hover:gap-2 transition-all">
                              Start Lesson <ChevronRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
