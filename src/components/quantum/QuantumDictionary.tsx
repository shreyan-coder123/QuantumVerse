
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Search, 
  Atom, 
  Cpu, 
  Waves, 
  Zap, 
  Ghost,
  Eye,
  Activity
} from 'lucide-react';

const TERMS = [
  {
    id: 'superposition',
    term: 'Superposition',
    icon: Waves,
    color: 'text-blue-400',
    def: 'The principle that a quantum system can exist in multiple states simultaneously until it is measured.',
    visual: 'Think of a spinning coin. While spinning, it is not heads or tails, but a blur of both states at once.',
    tags: ['Foundational', 'State']
  },
  {
    id: 'qubit',
    term: 'Qubit',
    icon: Atom,
    color: 'text-purple-400',
    def: 'The quantum version of a classical bit. Unlike a bit (0 or 1), a qubit can be 0, 1, or any linear combination of both.',
    visual: 'Visualized as a point on the surface of a Bloch Sphere, representing its probability vector.',
    tags: ['Hardware', 'Information']
  },
  {
    id: 'entanglement',
    term: 'Entanglement',
    icon: Zap,
    color: 'text-orange-400',
    def: 'A phenomenon where two or more particles become correlated such that the state of one instantly influences the others, regardless of distance.',
    visual: 'Two dice that always show the same number when rolled, no matter how far apart they are.',
    tags: ['Correlation', 'Mechanics']
  },
  {
    id: 'decoherence',
    term: 'Decoherence',
    icon: Ghost,
    color: 'text-red-400',
    def: 'The process where a quantum system loses its quantum properties (like superposition) due to interaction with the environment.',
    visual: 'A fragile bubble popping. The quantum info "leaks" into the surrounding environment and becomes classical noise.',
    tags: ['Hardware', 'Noise']
  },
  {
    id: 'measurement',
    term: 'Measurement',
    icon: Eye,
    color: 'text-green-400',
    def: 'The act of observing a quantum state, which forces it to "collapse" into one of the definite basis states (0 or 1).',
    visual: 'Opening the box to see if Schrödinger\'s cat is alive or dead. The observation fixes reality.',
    tags: ['Observation', 'State']
  },
  {
    id: 'interference',
    term: 'Interference',
    icon: Activity,
    color: 'text-yellow-400',
    def: 'The way quantum amplitudes can add together (constructive) or cancel each other out (destructive).',
    visual: 'Waves in a pond meeting and either making a bigger wave or flattening the surface.',
    tags: ['Algorithms', 'Mechanics']
  }
];

export default function QuantumDictionary() {
  const [search, setSearch] = useState('');

  const filtered = TERMS.filter(t => 
    t.term.toLowerCase().includes(search.toLowerCase()) || 
    t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
            <Book className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-headline font-bold text-white">Quantum Glossary</h3>
            <p className="text-sm text-muted-foreground">Demystifying the lexicon of the subatomic world.</p>
          </div>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms..."
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((term) => (
          <Card key={term.id} className="glass-card p-6 flex flex-col gap-4 group hover:bg-white/5 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl bg-white/5 ${term.color}`}>
                <term.icon className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                {term.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-[9px] uppercase tracking-widest border-white/5 text-muted-foreground/60">{tag}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-headline font-bold text-white mb-2 group-hover:text-primary transition-colors">{term.term}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {term.def}
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/5">
              <div className="flex items-start gap-3 bg-primary/5 p-3 rounded-lg border border-primary/10">
                <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Visual Analogy</span>
                  <p className="text-xs text-muted-foreground italic leading-tight">{term.visual}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
