export interface Recommendation {
  id?: string;
  name: string;
  author: string;
  description: string;
  date: string;  // Ici, on utilise une chaîne de caractères pour la date au format ISO
  category: string;  // category sera envoyé sous forme de string
}
