'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle2,
  BrainCircuit,
  Code2,
  Atom,
  Video
} from 'lucide-react';
import { CURRICULUM } from '@/app/lib/curriculum';
import ProfessorChat from '@/components/quantum/ProfessorChat';

// Dynamically import heavy 3D component with ssr: false (must be in client component)
const ConceptAnimator = dynamic(() => import('@/components/quantum/ConceptAnimator'), {
  ssr: false,
  loading: () => <div className="h-[300px] md:h-[400px] w-full flex items-center justify-center bg-black/20 rounded-2xl text-muted-foreground animate-pulse">Initializing Visualization Matrix...</div>
});

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const lessonIndex = CURRICULUM.findIndex(l => l.id === id);
  const lesson = CURRICULUM[lessonIndex];

  if (!lesson) notFound();

  const prevLesson = lessonIndex > 0 ? CURRICULUM[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < CURRICULUM.length - 1 ? CURRICULUM[lessonIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 glass sticky top-0 z-50">
        <div className="flex items-center gap-2 md:gap-6 min-w-0">
          <Link href="/dashboard/curriculum">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white px-2 md:px-4">
              <ChevronLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Back to Curriculum</span>
            </Button>
          </Link>
          <div className="h-4 w-[1px] bg-white/10 shrink-0" />
          <div className="min-w-0">
            <span className="text-[8px] md:text-xs text-muted-foreground block uppercase tracking-widest truncate">{lesson.module}</span>
            <h2 className="text-xs md:text-sm font-bold text-white leading-none mt-1 truncate max-w-[120px] md:max-w-none">{lesson.title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 h-8 md:h-9 px-2 md:px-4">
            <CheckCircle2 className="w-4 h-4 md:mr-2" />
            <span className="hidden sm:inline">Mark Complete</span>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Lesson Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <Tabs defaultValue="video" className="w-full">
              <TabsList className="bg-white/5 p-1 h-11 md:h-12 mb-4 w-fit">
                <TabsTrigger value="video" className="gap-2 px-4 md:px-6 text-xs md:text-sm">
                  <Video className="w-4 h-4" /> <span className="hidden xs:inline">Video Lecture</span>
                </TabsTrigger>
                <TabsTrigger value="visualization" className="gap-2 px-4 md:px-6 text-xs md:text-sm">
                  <Atom className="w-4 h-4" /> <span className="hidden xs:inline">Quantum Visualization</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="video" className="mt-0 ring-0">
                <div className="aspect-video w-full rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${lesson.videoId}?autoplay=0&rel=0`}
                    title={lesson.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </TabsContent>

              <TabsContent value="visualization" className="mt-0 ring-0">
                <ConceptAnimator conceptId={lesson.title} />
              </TabsContent>
            </Tabs>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-headline font-bold text-white">{lesson.title}</h1>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lesson.duration}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {lesson.level}</span>
                  <Badge variant="outline" className="border-primary/30 text-primary text-[10px] uppercase">{lesson.module}</Badge>
                </div>
              </div>
              
              <Card className="glass-card p-4 md:p-6 bg-white/5">
                <h3 className="text-base md:text-lg font-headline font-bold text-white mb-2 md:mb-3">Lesson Description</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {lesson.description} In this lesson, we dive deep into the specific mechanics of {lesson.title.toLowerCase()}. 
                  By the end, you'll have a strong conceptual understanding to apply in our labs.
                </p>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/dashboard/quiz?topic=${encodeURIComponent(lesson.title)}`} className="block">
                  <Card className="glass-card p-4 md:p-6 flex items-center gap-4 hover:border-primary transition-all cursor-pointer group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-5 h-5 md:w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white group-hover:text-primary transition-colors">Lesson Quiz</h4>
                      <p className="text-[10px] md:text-xs text-muted-foreground">Test your understanding.</p>
                    </div>
                  </Card>
                </Link>
                <Link href="/dashboard/coding" className="block">
                  <Card className="glass-card p-4 md:p-6 flex items-center gap-4 hover:border-accent transition-all cursor-pointer group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
                      <Code2 className="w-5 h-5 md:w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-white group-hover:text-accent transition-colors">Coding Lab</h4>
                      <p className="text-[10px] md:text-xs text-muted-foreground">Practice writing code.</p>
                    </div>
                  </Card>
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 md:pt-8">
                {prevLesson ? (
                  <Link href={`/dashboard/lessons/${prevLesson.id}`} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 h-12">
                      <ChevronLeft className="mr-2 w-4 h-4" />
                      <div className="text-left">
                        <span className="text-[9px] block text-muted-foreground">PREVIOUS</span>
                        <span className="text-[11px] font-bold">{prevLesson.title}</span>
                      </div>
                    </Button>
                  </Link>
                ) : <div className="hidden sm:block" />}

                {nextLesson ? (
                  <Link href={`/dashboard/lessons/${nextLesson.id}`} className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 h-12 neon-violet">
                      <div className="text-right">
                        <span className="text-[9px] block text-primary-foreground/70">NEXT UP</span>
                        <span className="text-[11px] font-bold">{nextLesson.title}</span>
                      </div>
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : <div className="hidden sm:block" />}
              </div>
            </div>
          </div>

          {/* AI Tutor & Resources Sidebar */}
          <div className="space-y-6 md:space-y-8">
            <section>
              <h3 className="text-lg md:text-xl font-headline font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Lesson AI Assistant
              </h3>
              <ProfessorChat />
            </section>

            <Card className="glass-card p-5 md:p-6">
              <h3 className="text-base md:text-lg font-headline font-bold text-white mb-4">Quick Resources</h3>
              <div className="space-y-2 md:space-y-3">
                {[
                  "Lecture Notes (PDF)",
                  "Interactive Exercises",
                  "Related Papers",
                  "Quiz Yourself"
                ].map((item, i) => (
                  <Button key={i} variant="ghost" className="w-full justify-start text-xs md:text-sm text-muted-foreground hover:text-white hover:bg-white/5 h-10 px-3">
                    <BookOpen className="mr-3 w-4 h-4 text-primary" />
                    {item}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
