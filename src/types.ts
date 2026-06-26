export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'breakfast' | 'salads' | 'pastries' | 'drinks';
  tags: ('Vegan' | 'Gluten-Free' | 'Signature' | 'Classic' | 'Matcha' | 'House Special')[];
  spicyLevel?: number;
  customizable: boolean;
  customizations?: CustomizationOption[];
}

export interface CustomizationOption {
  title: string;
  required: boolean;
  options: {
    name: string;
    price: number;
  }[];
}

export interface CartItem {
  cartId: string; // Composite of itemId + customization hashes to isolate different selections
  item: MenuItem;
  quantity: number;
  selectedSelections: {
    [customizationTitle: string]: {
      name: string;
      price: number;
    };
  };
  specialInstructions?: string;
}

export interface TableBooking {
  id: string;
  date: string;
  timeSlot: string;
  guests: number;
  sectionId: 'atrium' | 'cozy-corners' | 'panda-niches' | 'wellness-matcha';
  tableNumber: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  specialRequests?: string;
  confirmedAt: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    value: string;
    tagMatch: string; // Tag or keyword to recommend matching beverage
  }[];
}
