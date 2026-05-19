export type Lesson = {
  id: string;
  title: string;
  videoUrl: string;
  videoId: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  module: string;
};

export const CURRICULUM: Lesson[] = [
  {
    id: 'intro-quantum',
    title: 'Introduction to Quantum Computing',
    videoUrl: 'https://youtu.be/QuR969uMICM',
    videoId: 'QuR969uMICM',
    description: 'A foundational look at what makes quantum computing different and why it matters.',
    duration: '12:45',
    level: 'Beginner',
    module: 'Foundations'
  },
  {
    id: 'bits-vs-qubits',
    title: 'Bits vs Qubits',
    videoUrl: 'https://youtu.be/7exnVYeeUG4',
    videoId: '7exnVYeeUG4',
    description: 'Understanding the fundamental unit of information in classical vs quantum systems.',
    duration: '10:20',
    level: 'Beginner',
    module: 'Foundations'
  },
  {
    id: 'intro-qubits',
    title: 'Introduction to Qubits',
    videoUrl: 'https://youtu.be/90za6mazNps',
    videoId: '90za6mazNps',
    description: 'Deep dive into the properties of a single qubit.',
    duration: '15:10',
    level: 'Beginner',
    module: 'Foundations'
  },
  {
    id: 'superposition',
    title: 'Understanding Superposition',
    videoUrl: 'https://youtu.be/IHDMJqJHCQg',
    videoId: 'IHDMJqJHCQg',
    description: 'Learn how quantum systems can exist in multiple states simultaneously.',
    duration: '14:30',
    level: 'Beginner',
    module: 'Quantum Mechanics'
  },
  {
    id: 'entanglement',
    title: 'What is Entanglement?',
    videoUrl: 'https://youtu.be/rqmIVeheTVU',
    videoId: 'rqmIVeheTVU',
    description: "Explore Einstein's 'spooky action at a distance' and its role in quantum info.",
    duration: '18:15',
    level: 'Beginner',
    module: 'Quantum Mechanics'
  },
  {
    id: 'quantum-gates',
    title: 'Introduction to Quantum Gates',
    videoUrl: 'https://youtu.be/HHV-P4_Xp1E',
    videoId: 'HHV-P4_Xp1E',
    description: 'The building blocks of quantum circuits: X, Y, Z, and Hadamard gates.',
    duration: '22:00',
    level: 'Intermediate',
    module: 'Quantum Circuits'
  },
  {
    id: 'bloch-sphere',
    title: 'Introduction to Bloch Sphere',
    videoUrl: 'https://youtu.be/XSsUIlrOAYc',
    videoId: 'XSsUIlrOAYc',
    description: 'Visualizing qubit states using the geometric Bloch sphere representation.',
    duration: '16:40',
    level: 'Intermediate',
    module: 'Foundations'
  },
  {
    id: 'quantum-circuits',
    title: 'Introduction to Quantum Circuits',
    videoUrl: 'https://youtu.be/2uUfmSbgBYM',
    videoId: '2uUfmSbgBYM',
    description: 'How to string gates together to perform complex quantum operations.',
    duration: '25:30',
    level: 'Intermediate',
    module: 'Quantum Circuits'
  },
  {
    id: 'quantum-algorithms',
    title: 'Introduction to Quantum Algorithms',
    videoUrl: 'https://youtu.be/-ysVGWtAjio',
    videoId: '-ysVGWtAjio',
    description: 'An overview of how quantum algorithms provide exponential speedups.',
    duration: '20:15',
    level: 'Intermediate',
    module: 'Algorithms'
  },
  {
    id: 'grover-algorithm',
    title: "Introduction to Grover's Algorithm",
    videoUrl: 'https://youtu.be/YEI5vYdcoQ4',
    videoId: 'YEI5vYdcoQ4',
    description: 'Quantum search algorithm that provides a quadratic speedup for unstructured data.',
    duration: '28:50',
    level: 'Advanced',
    module: 'Algorithms'
  },
  {
    id: 'teleportation',
    title: 'What is Quantum Teleportation?',
    videoUrl: 'https://youtu.be/pSbHONaHrNE',
    videoId: 'pSbHONaHrNE',
    description: 'Transmitting quantum information using entanglement and classical bits.',
    duration: '19:40',
    level: 'Intermediate',
    module: 'Communication'
  },
  {
    id: 'cryptography',
    title: 'Introduction to Quantum Cryptography',
    videoUrl: 'https://youtu.be/fLJ9mvTS68Y',
    videoId: 'fLJ9mvTS68Y',
    description: 'Securing data using the laws of quantum mechanics (QKD).',
    duration: '21:20',
    level: 'Advanced',
    module: 'Communication'
  },
  {
    id: 'quantum-noise',
    title: 'Quantum Noise',
    videoUrl: 'https://youtu.be/gmbkokgR28Y',
    videoId: 'gmbkokgR28Y',
    description: 'The challenges of decoherence and environmental interaction in real hardware.',
    duration: '15:50',
    level: 'Advanced',
    module: 'Hardware'
  },
  {
    id: 'shor-algorithm',
    title: "Introduction to Shor's Algorithm",
    videoUrl: 'https://youtu.be/jiSAMeW_xRw',
    videoId: 'jiSAMeW_xRw',
    description: 'The algorithm that could break modern encryption by factoring large numbers.',
    duration: '32:10',
    level: 'Advanced',
    module: 'Algorithms'
  },
  {
    id: 'qec',
    title: 'Introduction to QEC',
    videoUrl: 'https://youtu.be/CR_fG4N6WAk',
    videoId: 'CR_fG4N6WAk',
    description: 'Quantum Error Correction: Protecting quantum information from noise.',
    duration: '24:00',
    level: 'Advanced',
    module: 'Hardware'
  },
  {
    id: 'qml',
    title: 'Introduction to QML',
    videoUrl: 'https://youtu.be/RWd-zjclFB0',
    videoId: 'RWd-zjclFB0',
    description: 'The intersection of Quantum Computing and Machine Learning.',
    duration: '22:30',
    level: 'Advanced',
    module: 'Algorithms'
  },
  {
    id: 'hardware-types',
    title: 'Types of Quantum Hardware',
    videoUrl: 'https://youtu.be/0xMX8mSeIKw',
    videoId: '0xMX8mSeIKw',
    description: 'Comparing superconducting qubits, trapped ions, and photonic systems.',
    duration: '18:45',
    level: 'Intermediate',
    module: 'Hardware'
  },
  {
    id: 'quantum-internet',
    title: 'Quantum Internet',
    videoUrl: 'https://youtu.be/rwcq59ODGvs',
    videoId: 'rwcq59ODGvs',
    description: 'Connecting quantum computers globally through quantum networks.',
    duration: '17:15',
    level: 'Advanced',
    module: 'Communication'
  },
  {
    id: 'quantum-chemistry',
    title: 'Quantum Chemistry Overview',
    videoUrl: 'https://youtu.be/7_gcpYHqEbY',
    videoId: '7_gcpYHqEbY',
    description: 'Simulating molecular interactions using quantum systems.',
    duration: '20:50',
    level: 'Intermediate',
    module: 'Applications'
  },
  {
    id: 'research-directions',
    title: 'Current Research Directions',
    videoUrl: 'https://youtu.be/EI_wlt_UJtI',
    videoId: 'EI_wlt_UJtI',
    description: 'What lies ahead in the next decade of quantum computing development.',
    duration: '14:20',
    level: 'Beginner',
    module: 'Foundations'
  }
];
