import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
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
import ConceptAnimator from '@/components/quantum/ConceptAnimator';

export default function LessonPage({ params }: { params: { id: string } }) {
  const lessonIndex = CURRICULUM.findIndex(l => l.id === params.id);
  const lesson = CURRICULUM[lessonIndex];

  if (!lesson) notFound();

  const prevLesson = lessonIndex > 0 ? CURRICULUM[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < CURRICULUM.length - 1 ? CURRICULUM[lessonIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b border-white/5 flex items-center justify-between px-8 glass sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/curriculum">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
              <ChevronLeft className="mr-2 w-4 h-4" /> Back to Curriculum
            </Button>
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <div>
            <span className="text-xs text-muted-foreground block uppercase tracking-widest">{lesson.module}</span>
            <h2 className="text-sm font-bold text-white leading-none mt-1">{lesson.title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button size="sm" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
            <CheckCircle2 className="mr-2 w-4 h-4" /> Mark Complete
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Lesson Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="video" className="w-full">
              <TabsList className="bg-white/5 p-1 h-12 mb-4 w-fit">
                <TabsTrigger value="video" className="gap-2 px-6">
                  <Video className="w-4 h-4" /> Video Lecture
                </TabsTrigger>
                <TabsTrigger value="visualization" className="gap-2 px-6">
                  <Atom className="w-4 h-4" /> Quantum Visualization
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

            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-headline font-bold text-white mb-2">{lesson.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {lesson.duration}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {lesson.level} Level</span>
                    <Badge variant="outline" className="border-primary/30 text-primary">{lesson.module}</Badge>
                  </div>
                </div>
              </div>
              <Card className="glass-card p-6 bg-white/5">
                <h3 className="text-lg font-headline font-bold text-white mb-3">Lesson Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {lesson.description} In this lesson, we dive deep into the specific mechanics of {lesson.title.toLowerCase()}. 
                  By the end, you'll have a strong conceptual understanding to apply in our Circuit Lab.
                </p>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/dashboard/quiz?topic=${encodeURIComponent(lesson.title)}`} className="block">
                  <Card className="glass-card p-6 flex items-center gap-4 hover:border-primary transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors">Lesson Quiz</h4>
                      <p className="text-xs text-muted-foreground">Test your understanding of this topic.</p>
                    </div>
                  </Card>
                </Link>
                <Link href="/dashboard/coding" className="block">
                  <Card className="glass-card p-6 flex items-center gap-4 hover:border-accent transition-all cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center shrink-0">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-accent transition-colors">Coding Lab</h4>
                      <p className="text-xs text-muted-foreground">Practice writing quantum code for this lesson.</p>
                    </div>
                  </Card>
                </Link>
              </div>

              <div className="flex justify-between items-center pt-8">
                {prevLesson ? (
                  <Link href={`/dashboard/lessons/${prevLesson.id}`}>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12">
                      <ChevronLeft className="mr-2 w-4 h-4" />
                      <div className="text-left">
                        <span className="text-[10px] block text-muted-foreground">PREVIOUS</span>
                        <span className="text-xs font-bold">{prevLesson.title}</span>
                      </div>
                    </Button>
                  </Link>
                ) : <div />}

                {nextLesson ? (
                  <Link href={`/dashboard/lessons/${nextLesson.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 h-12 neon-violet">
                      <div className="text-right">
                        <span className="text-[10px] block text-primary-foreground/70">NEXT UP</span>
                        <span className="text-xs font-bold">{nextLesson.title}</span>
                      </div>
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : <div />}
              </div>
            </div>
          </div>

          {/* AI Tutor & Resources Sidebar */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-headline font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Lesson AI Assistant
              </h3>
              <ProfessorChat />
            </section>

            <Card className="glass-card p-6">
              <h3 className="text-lg font-headline font-bold text-white mb-4">Quick Resources</h3>
              <div className="space-y-3">
                {[
                  "Lecture Notes (PDF)",
                  "Interactive Exercises",
                  "Related Papers",
                  "Quiz Yourself"
                ].map((item, i) => (
                  <Button key={i} variant="ghost" className="w-full justify-start text-sm text-muted-foreground hover:text-white hover:bg-white/5 h-10">
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
