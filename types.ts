export interface DailySpecial {
  id: string;
  day: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  highlightColor: string; // Hex code for accents
}

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export interface AISuggestionResponse {
  title: string;
  description: string;
}
