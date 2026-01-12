import { DailySpecial } from './types';

export const DEFAULT_SPECIALS: DailySpecial[] = [
  {
    id: 'mon',
    day: 'Monday',
    title: 'Burger Night',
    price: '$20.00',
    description: 'Start your week right with our famous gourmet burger, served with golden fries and a handle of beer or house wine.',
    imageUrl: 'https://picsum.photos/id/163/1920/1080',
    highlightColor: '#eab308' // Yellow-500
  },
  {
    id: 'tue',
    day: 'Tuesday',
    title: 'Steak Night',
    price: '$25.00',
    description: 'Juicy 250g Sirloin steak cooked to your liking, served with salad, fries, and your choice of mushroom or peppercorn sauce.',
    imageUrl: 'https://picsum.photos/id/292/1920/1080',
    highlightColor: '#ef4444' // Red-500
  },
  {
    id: 'wed',
    day: 'Wednesday',
    title: 'Schnitzel & Pint',
    price: '$22.00',
    description: 'Crispy golden chicken schnitzel topped with gravy or parmigiana style. Includes a pint of tap beer.',
    imageUrl: 'https://picsum.photos/id/493/1920/1080',
    highlightColor: '#f97316' // Orange-500
  },
  {
    id: 'thu',
    day: 'Thursday',
    title: 'BBQ Ribs',
    price: '$24.00',
    description: 'Slow-cooked pork ribs smothered in our house-made smoky BBQ sauce, served with slaw and wedges.',
    imageUrl: 'https://picsum.photos/id/488/1920/1080',
    highlightColor: '#8b5cf6' // Violet-500
  },
  {
    id: 'fri',
    day: 'Friday',
    title: 'Fish & Chips',
    price: '$20.00',
    description: 'Traditional beer-battered blue cod served with tartare sauce, lemon, and a heap of chunky fries.',
    imageUrl: 'https://picsum.photos/id/429/1920/1080',
    highlightColor: '#3b82f6' // Blue-500
  },
  {
    id: 'sat',
    day: 'Saturday',
    title: 'Chef\'s Platter',
    price: '$45.00',
    description: 'A sharing board for two featuring cured meats, cheeses, pickles, crackers, and hot bites. Perfect for a relaxed evening.',
    imageUrl: 'https://picsum.photos/id/365/1920/1080',
    highlightColor: '#10b981' // Emerald-500
  },
  {
    id: 'sun',
    day: 'Sunday',
    title: 'Sunday Roast',
    price: '$24.00',
    description: 'Classic roast of the day with roast potatoes, seasonal vegetables, yorkshire pudding and rich gravy.',
    imageUrl: 'https://picsum.photos/id/22/1920/1080',
    highlightColor: '#ef4444' // Red-500
  }
];