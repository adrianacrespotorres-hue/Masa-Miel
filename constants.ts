import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Hogaza de Masa Madre',
    description: 'Fermentación de 48 horas, corteza crujiente y miga alveolada. Harina orgánica integral.',
    price: 6.50,
    category: 'pan',
    imageUrl: 'https://picsum.photos/id/1084/600/600',
    calories: 220,
    tags: ['Vegano', 'Orgánico', 'Masa Madre']
  },
  {
    id: 'p2',
    name: 'Croissant de Almendras',
    description: 'Mantequilla francesa AOP, relleno de crema de almendras tostadas y laminado perfecto.',
    price: 4.20,
    category: 'dulce',
    imageUrl: 'https://picsum.photos/id/292/600/600',
    calories: 380,
    tags: ['Dulce', 'Mantequilla']
  },
  {
    id: 'p3',
    name: 'Brownie de Batata (Sin Gluten)',
    description: 'Increíblemente húmedo, hecho con batata dulce y cacao 70%. Sin harinas refinadas.',
    price: 3.80,
    category: 'saludable',
    imageUrl: 'https://picsum.photos/id/486/600/600',
    calories: 190,
    tags: ['Sin Gluten', 'Saludable', 'Bajo Azúcar']
  },
  {
    id: 'p4',
    name: 'Pan de Centeno y Semillas',
    description: 'Denso, nutritivo y lleno de semillas de girasol, lino y calabaza. Alto contenido en fibra.',
    price: 7.00,
    category: 'pan',
    imageUrl: 'https://picsum.photos/id/768/600/600',
    calories: 210,
    tags: ['Fibra', 'Semillas']
  },
  {
    id: 'p5',
    name: 'Tartaleta de Frutos Rojos',
    description: 'Base de almendra crujiente, crema pastelera ligera y fruta fresca de temporada.',
    price: 5.50,
    category: 'dulce',
    imageUrl: 'https://picsum.photos/id/429/600/600',
    calories: 290,
    tags: ['Fresco', 'Postre']
  },
  {
    id: 'p6',
    name: 'Galleta de Avena y Pasas',
    description: 'La opción perfecta para un snack de media tarde. Sin azúcar refinada, endulzada con miel.',
    price: 2.50,
    category: 'saludable',
    imageUrl: 'https://picsum.photos/id/433/600/600',
    calories: 150,
    tags: ['Avena', 'Energía']
  }
];

export const SYSTEM_INSTRUCTION = `
Eres "Aura", la asistente virtual experta de la panadería "Masa & Miel".
Tu tono es cálido, acogedor, artesanal y experto.
Conoces perfectamente nuestros productos:
- Panes de masa madre y centeno (opciones veganas y ricas en fibra).
- Repostería clásica (croissants de alta calidad).
- Opciones saludables (sin gluten, bajos en azúcar).

Tu objetivo es ayudar a los clientes a elegir el mejor producto según sus gustos o necesidades dietéticas.
Si preguntan por algo saludable, sugiere el Pan de Centeno o el Brownie de Batata.
Si quieren darse un gusto, el Croissant o la Tartaleta.
Siempre sé breve y amable. Intenta guiar hacia la compra.
NO inventes precios, usa el sentido común basado en productos de panadería si no tienes el dato exacto, pero prefiere describir sabores y texturas.
`;