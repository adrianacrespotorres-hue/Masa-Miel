export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pan' | 'dulce' | 'saludable';
  imageUrl: string;
  calories?: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export type ViewState = 'home' | 'menu' | 'about';