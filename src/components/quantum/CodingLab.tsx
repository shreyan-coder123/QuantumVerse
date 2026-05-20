'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, 
  Terminal, 
  Code2, 
  Loader2, 
  BarChart3, 
  Info,
  Cpu
} from 'lucide-react';
import { simulateExecution } from '@/ai/flows/ai-simulate-execution';

const EXAMPLES = {
  qiskit: `from qiskit import QuantumCircuit, assemble, Aer
from qiskit.visualization import plot_histogram

# Create a Quantum Circuit with 2 qubits
qc = QuantumCircuit(2)

# Apply H gate to qubit 0
qc.h(0)

# Apply CNOT gate
qc.cx(0, 1)

# Measure qubits
qc.measure_all()`,
  cirq: `import cirq

# Pick a qubit
qubit = cirq.GridQubit(0, 0)

# Create a circuit
circuit = cirq.Circuit(
    cirq.X(qubit)**0.5,  # Square root of NOT
    cirq.measure(qubit, key='m')
)
print("Circuit:")
print(circuit)`,
  python: `# Basic quantum-classical hybrid logic simulation
import numpy as np

def quantum_coin_flip():
    # Simulate a qubit measurement
    state = np.array([1, 1]) / np.sqrt(2)
    return np.random.choice(['Heads', 'Tails'], p=[0.5, 0.5])

print(f"Result: {quantum_coin_flip()}")`
};

export default function CodingLab() {
  const [language, setLanguage] = useState<'qiskit' | 'cirq' | 'python'>('qiskit');
  const [code, setCode] = useState(EXAMPLES.qiskit);
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleLanguageChange = (val: string) => {
    const lang = val as any;
    setLanguage(lang);
    setCode(EXAMPLES[lang as keyof typeof EXAMPLES]);
  };

  const handleRun = async () => {
    setIsExecuting(true);
    try {
      const res = await simulateExecution({ code, language });
      setResults(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            Quantum Coding Lab
          </h2>
          <p className="text-muted-foreground text-sm">Design, simulate, and analyze quantum algorithms in real-time.</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          {(['qiskit', 'cirq', 'python'] as const).map((lang) => (
            <Button
              key={lang}
              variant={language === lang ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleLanguageChange(lang)}
              className="capitalize h-8 px-4"
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 flex-1 min-h-[500px]">
        <Card className="glass-card flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider ml-4">main.{language === 'python' ? 'py' : 'qasm'}</span>
            </div>
            <Button 
              size="sm" 
              onClick={handleRun} 
              disabled={isExecuting}
              className="bg-primary hover:bg-primary/90 neon-violet h-9 px-6 font-bold rounded-full"
            >
              {isExecuting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <Play />
                  Run Code
                </>
              )}
            </Button>
          </div>
          <div className="flex-1 relative">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 w-full h-full bg-transparent border-none focus-visible:ring-0 font-mono text-sm leading-relaxed p-6 resize-none text-white/90 selection:bg-primary/30"
              spellCheck={false}
            />
          </div>
        </Card>

        <Card className="glass-card flex flex-col overflow-hidden bg-black/20">
          <Tabs defaultValue="logs" className="flex-1 flex flex-col">
            <div className="px-4 border-b border-white/5">
              <TabsList className="bg-transparent h-12 gap-6">
                <TabsTrigger value="logs" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 gap-2">
                  <Terminal className="w-4 h-4" /> Console
                </TabsTrigger>
                <TabsTrigger value="visualization" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 gap-2">
                  <BarChart3 className="w-4 h-4" /> Probabilities
                </TabsTrigger>
                <TabsTrigger value="circuit" className="data-[state=active]:bg-transparent data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 gap-2">
                  <Cpu className="w-4 h-4" /> Circuit
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="logs" className="m-0 p-6 h-full">
                {!results ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-40 gap-3">
                    <Terminal className="w-12 h-12" />
                    <p>Run your code to see console output</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="font-mono text-sm text-green-400/90 whitespace-pre-wrap">
                      {results.logs}
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Info className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Analysis</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{results.explanation}</p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="visualization" className="m-0 p-6 h-full">
                {!results?.measurements ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-40 gap-3">
                    <BarChart3 className="w-12 h-12" />
                    <p>No measurement data available</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">State Probabilities</h3>
                    <div className="space-y-4">
                      {Object.entries(results.measurements as Record<string, number>).map(([state, prob]) => (
                        <div key={state} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-accent">|{state}⟩</span>
                            <span className="text-white">{(prob * 100).toFixed(2)}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary neon-violet transition-all duration-1000" 
                              style={{ width: `${prob * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="circuit" className="m-0 p-6 h-full">
                {!results?.circuitDiagram ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-40 gap-3">
                    <Cpu className="w-12 h-12" />
                    <p>No circuit diagram found in code</p>
                  </div>
                ) : (
                  <div className="bg-black/40 p-6 rounded-lg font-mono text-xs whitespace-pre text-accent/80 overflow-x-auto border border-white/5">
                    {results.circuitDiagram}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}