
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Sparkles, 
  Loader2, 
  Info, 
  ChevronRight,
  Sigma,
  Grid3X3,
  BoxSelect
} from 'lucide-react';
import { solveEquation } from '@/ai/flows/ai-solve-equation-flow';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const TEMPLATES = [
  { id: 'schrodinger', name: 'Schrödinger', icon: Sigma, text: 'H |ψ⟩ = E |ψ⟩' },
  { id: 'matrix', name: 'Matrix Ops', icon: Grid3X3, text: '[[0,1],[1,0]] * [1,0]' },
  { id: 'tensor', name: 'Tensor Product', icon: BoxSelect, text: '|0⟩ ⊗ |1⟩' },
];

export default function EquationSolver() {
  const [input, setInput] = useState('');
  const [type, setType] = useState<'schrodinger' | 'matrix' | 'tensor' | 'custom'>('custom');
  const [isSolving, setIsSolving] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSolve = async () => {
    if (!input.trim()) return;
    setIsSolving(true);
    try {
      const res = await solveEquation({ 
        equationType: type, 
        inputData: input 
      });
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <Card className="glass border-white/5 p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/20 text-accent rounded-xl flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-headline font-bold text-white">Equation Solver</h3>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Interactive Math Lab</p>
          </div>
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary">AI Powered</Badge>
      </div>

      <div className="flex gap-2">
        {TEMPLATES.map((t) => (
          <Button
            key={t.id}
            variant="ghost"
            className={`flex-1 h-auto py-3 flex-col gap-1 border border-white/5 ${type === t.id ? 'bg-primary/10 border-primary/50' : 'hover:bg-white/5'}`}
            onClick={() => {
              setType(t.id as any);
              setInput(t.text);
            }}
          >
            <t.icon className="w-4 h-4 mb-1" />
            <span className="text-[10px] font-bold">{t.name}</span>
          </Button>
        ))}
      </div>

      <div className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter quantum equation or operation..."
          className="bg-white/5 border-white/10 h-14 pr-32 font-mono text-sm"
        />
        <Button 
          onClick={handleSolve}
          disabled={isSolving || !input.trim()}
          className="absolute right-1 top-1 h-12 bg-primary hover:bg-primary/90 neon-violet font-bold px-6"
        >
          {isSolving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4 mr-2" /> Solve</>}
        </Button>
      </div>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-8 bg-black/40 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-accent">
            <BlockMath math={result.latex} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-primary" /> Steps
              </h4>
              <div className="space-y-3">
                {result.steps.map((step: string, i: number) => (
                  <div key={i} className="flex gap-3 text-sm text-muted-foreground bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="font-mono text-primary font-bold">{i + 1}.</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Info className="w-3 h-3 text-accent" /> Physical Significance
              </h4>
              <Card className="p-4 bg-accent/5 border-accent/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.explanation}
                </p>
              </Card>
              {result.visualizationHint && (
                <div className="text-[10px] text-muted-foreground/60 italic flex gap-2 items-start mt-2">
                  <Sparkles className="w-3 h-3 shrink-0" />
                  {result.visualizationHint}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
