
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, BrainCircuit, Rocket, Trophy, Globe, Atom, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Dynamically import heavy 3D component
const QuantumUniverse = dynamic(() => import('@/components/quantum/QuantumUniverse'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050208] -z-10" />
});

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      {/* 3D Universe Background */}
      <QuantumUniverse />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 backdrop-blur-md border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center neon-violet">
            <Atom className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-headline font-bold text-white tracking-tighter">
            Quantum<span className="text-accent">Verse</span>
          </span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {['Curriculum', 'Circuit Lab', 'AI Professor', 'Pricing'].map((item, i) => (
            <Link key={i} href="#" className="hover:text-white hover:text-glow-violet transition-all uppercase tracking-widest text-[10px]">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/5 hidden sm:flex">Login</Button>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold neon-violet px-4 md:px-8 rounded-full h-9 md:h-11 text-xs md:text-sm">
              Access Matrix
            </Button>
          </Link>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 border-white/5 backdrop-blur-xl">
              <div className="flex flex-col gap-6 mt-12">
                {['Curriculum', 'Circuit Lab', 'AI Professor', 'Pricing'].map((item, i) => (
                  <Link key={i} href="#" className="text-lg font-headline font-bold text-white hover:text-primary transition-colors">
                    {item}
                  </Link>
                ))}
                <div className="pt-6 border-t border-white/10">
                  <Button className="w-full bg-primary font-bold rounded-full h-12">Sign In</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-24 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="px-3 md:px-5 py-1.5 md:py-2 border-primary/30 text-primary bg-primary/5 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px] glass">
              <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5 mr-2" />
              Intelligence Optimized
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-headline font-bold text-white tracking-tighter leading-[0.9] md:leading-[0.85]"
          >
            BECOME THE <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-pulse-glow">QUANTUM</span> <br />
            ARCHITECT.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed font-light tracking-wide px-4"
          >
            Navigate the superposition of knowledge. Master entanglement, qubits, and advanced algorithms within our neural-simulated educational collective.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 w-full sm:w-auto"
          >
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 md:h-16 px-6 md:px-10 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-full group neon-violet border-t border-white/20">
                Initialize Learning
                <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 md:h-16 px-6 md:px-10 text-base md:text-lg font-bold border-white/10 hover:bg-white/5 rounded-full backdrop-blur-md glass">
              Neural Demo
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mt-20 md:mt-32 w-full max-w-4xl">
            {[
              { label: "Neural Nodes", value: "24k+", icon: Globe },
              { label: "Synapse Tracks", value: "12+", icon: BrainCircuit },
              { label: "Matrix Labs", value: "500+", icon: Cpu },
              { label: "Core XP", value: "1.2M", icon: Trophy }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex flex-col items-center gap-1 md:gap-2 group cursor-default"
              >
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-accent mb-1 md:mb-2 group-hover:scale-125 transition-transform" />
                <div className="text-2xl md:text-4xl font-headline font-bold text-white text-glow-cyan">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-[0.1em] md:tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Holographic Features */}
      <section className="relative z-10 w-full bg-black/40 py-20 md:py-32 border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-4">Neural Learning Tiers</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-[10px] md:text-xs">Architected for exponential growth</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Matrix Novice",
                desc: "Collapse the wavefunction of ignorance. Master qubits and basic gates.",
                icon: Rocket,
                color: "text-blue-400"
              },
              {
                title: "Synapse Master",
                desc: "Build complex circuit matrices. Dive into Grover's and advanced entanglement.",
                icon: BrainCircuit,
                color: "text-purple-400"
              },
              {
                title: "Quantum Overlord",
                desc: "Shor's algorithm, error correction, and real-time hardware interfacing.",
                icon: Trophy,
                color: "text-yellow-400"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card holographic p-8 md:p-10 rounded-3xl flex flex-col gap-4 md:gap-6"
              >
                <div className="scanline" />
                <feature.icon className={`w-10 h-10 md:w-14 md:h-14 ${feature.color}`} />
                <h3 className="text-2xl md:text-3xl font-headline font-bold text-white leading-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.desc}
                </p>
                <Link href="/dashboard" className="text-primary hover:text-white transition-colors text-xs font-bold flex items-center mt-auto uppercase tracking-widest">
                  Access Node <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 w-full py-12 md:py-16 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Atom className="w-8 h-8 text-primary" />
            <span className="text-xl md:text-2xl font-headline font-bold text-white tracking-tighter">QuantumVerse</span>
          </div>
          <p className="text-muted-foreground text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em]">© 2024 Neural Educational Collective</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[8px] md:text-[10px] uppercase tracking-widest text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Nodes</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
