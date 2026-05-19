import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cpu, Sparkles, BrainCircuit, Rocket, Trophy, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Quantum Radiation Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center neon-violet">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-headline font-bold text-white tracking-tighter">
            Quantum<span className="text-accent">Verse</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-white transition-colors">Curriculum</Link>
          <Link href="#lab" className="hover:text-white transition-colors">Circuit Lab</Link>
          <Link href="#tutor" className="hover:text-white transition-colors">AI Professor</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white">Login</Button>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold neon-violet px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-24 text-center">
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/30 text-primary bg-primary/5 animate-bounce-slow">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            Next Generation Learning
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-white tracking-tighter leading-none">
            Master the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-pulse-glow">Quantum</span> Dimension.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            From the basics of qubits to advanced error correction. Learn quantum computing through interactive simulations, AI tutoring, and hands-on coding labs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-full group neon-violet">
                Explore Curriculum
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/10 hover:bg-white/5 rounded-full backdrop-blur-sm">
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 w-full">
            {[
              { label: "Active Students", value: "24k+", icon: Globe },
              { label: "Course Tracks", value: "12+", icon: BrainCircuit },
              { label: "Lab Projects", value: "500+", icon: Cpu },
              { label: "Achievements", value: "1.2M", icon: Trophy }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <stat.icon className="w-6 h-6 text-accent mb-1" />
                <div className="text-3xl font-headline font-bold text-white">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Decorative Features Preview */}
      <section id="features" className="relative z-10 w-full bg-card/30 py-24 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold text-white mb-4">Experience Progressive Learning</h2>
            <p className="text-muted-foreground">Tailored tracks for every level of expertise.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quantum Rookie",
                desc: "Master superposition, qubits, and basic gates through interactive visual stories.",
                icon: Rocket,
                color: "text-blue-400"
              },
              {
                title: "Entanglement Master",
                desc: "Build complex circuits and dive into Grover's and Deutsch-Jozsa algorithms.",
                icon: BrainCircuit,
                color: "text-purple-400"
              },
              {
                title: "Quantum Architect",
                desc: "Shor's algorithm, error correction, and real hardware integration.",
                icon: Trophy,
                color: "text-yellow-400"
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl flex flex-col gap-4">
                <feature.icon className={`w-12 h-12 ${feature.color}`} />
                <h3 className="text-2xl font-headline font-bold text-white">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
                <Link href="/dashboard" className="text-primary hover:text-primary/80 text-sm font-bold flex items-center mt-auto">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 w-full py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary" />
            <span className="text-xl font-headline font-bold text-white">QuantumVerse</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 QuantumVerse Educational Platform. All rights reserved.</p>
          <div className="flex gap-6 text-muted-foreground hover:text-white transition-colors">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Community</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
