
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Play, RefreshCw, Trash2, Info } from 'lucide-react';

const GATES = [
  { id: 'h', name: 'H', label: 'Hadamard', color: 'bg-blue-500', desc: 'Creates superposition' },
  { id: 'x', name: 'X', label: 'Pauli-X', color: 'bg-red-500', desc: 'Quantum NOT gate' },
  { id: 'y', name: 'Y', label: 'Pauli-Y', color: 'bg-green-500', desc: 'Phase & Bit flip' },
  { id: 'z', name: 'Z', label: 'Pauli-Z', color: 'bg-yellow-500', desc: 'Phase flip' },
  { id: 'cx', name: 'CX', label: 'CNOT', color: 'bg-purple-500', desc: 'Controlled NOT (Entanglement)' },
];

export default function CircuitLab() {
  const [qubits] = useState([0, 1, 2]);
  const [timeline, setTimeline] = useState<Record<string, string>>({});
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<{ [key: string]: number } | null>(null);

  const applyGate = (qubitIdx: number, step: number, gateId: string) => {
    setTimeline(prev => ({
      ...prev,
      [`${qubitIdx}-${step}`]: gateId
    }));
  };

  const clearCircuit = () => {
    setTimeline({});
    setResults(null);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setResults({
        '|000⟩': Math.random() * 50,
        '|101⟩': Math.random() * 50,
        '|111⟩': Math.random() * 20,
      });
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-[500px] md:min-h-[600px]">
      <Card className="lg:col-span-1 glass border-white/5 p-4 md:p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-base md:text-lg font-headline font-bold mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            Gate Toolbox
          </h3>
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3">
            {GATES.map((gate) => (
              <div 
                key={gate.id} 
                className="group relative"
                draggable
                onDragStart={(e) => e.dataTransfer.setData('gateId', gate.id)}
              >
                <div className={`${gate.color} w-full aspect-square rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl cursor-grab active:cursor-grabbing hover:scale-105 transition-transform neon-violet`}>
                  {gate.name}
                </div>
                <div className="absolute bottom-full left-0 mb-2 w-32 md:w-40 glass p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none text-[8px] md:text-[10px]">
                  <p className="font-bold">{gate.label}</p>
                  <p className="text-muted-foreground">{gate.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 md:gap-3">
          <Button 
            onClick={runSimulation} 
            disabled={isSimulating} 
            className="w-full bg-primary hover:bg-primary/90 neon-violet font-bold h-10 md:h-12 rounded-full px-4 md:px-6 text-xs"
          >
            {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            Run Simulation
          </Button>
          <Button 
            onClick={clearCircuit} 
            variant="outline" 
            className="w-full border-white/10 h-10 md:h-12 font-bold rounded-full px-4 md:px-6 text-xs"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Circuit
          </Button>
        </div>
      </Card>

      <Card className="lg:col-span-3 glass border-white/5 overflow-hidden flex flex-col relative">
        <div className="p-3 md:p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px]">Live Simulator</Badge>
            <span className="text-[10px] text-muted-foreground hidden sm:inline">Drag gates onto lines</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
              <Info className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 md:p-12 bg-black/20">
          <div className="flex flex-col gap-12 md:gap-16 min-w-[600px] md:min-w-[800px]">
            {qubits.map((q) => (
              <div key={q} className="relative flex items-center group h-12">
                <span className="absolute -left-6 md:-left-8 font-mono text-xs md:text-sm text-accent tracking-tighter w-8">q[{q}]</span>
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/10 group-hover:bg-primary/30 transition-colors" />
                <div className="flex gap-4 ml-4">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => {
                    const gateId = timeline[`${q}-${step}`];
                    const gate = GATES.find(g => g.id === gateId);
                    
                    return (
                      <div 
                        key={step} 
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-md border-2 border-dashed border-white/5 hover:border-primary/50 transition-all flex items-center justify-center relative z-10 cursor-pointer ${gate ? 'border-none' : ''}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          const id = e.dataTransfer.getData('gateId');
                          applyGate(q, step, id);
                        }}
                        onClick={() => {
                          if (gateId) {
                            const newTimeline = { ...timeline };
                            delete newTimeline[`${q}-${step}`];
                            setTimeline(newTimeline);
                          }
                        }}
                      >
                        {gate && (
                          <div className={`${gate.color} w-full h-full rounded flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg animate-in fade-in zoom-in duration-300`}>
                            {gate.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {results && (
          <div className="absolute bottom-0 inset-x-0 h-40 md:h-48 bg-card/80 backdrop-blur-xl border-t border-white/10 p-4 md:p-6 overflow-y-auto animate-in slide-in-from-bottom duration-500">
            <h4 className="text-[10px] md:text-xs font-headline font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              Measurement Probabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(results).map(([state, prob]) => (
                <div key={state} className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-accent">{state}</span>
                    <span className="text-white">{prob.toFixed(2)}%</span>
                  </div>
                  <div className="h-1 md:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary neon-violet transition-all duration-1000" 
                      style={{ width: `${prob}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
