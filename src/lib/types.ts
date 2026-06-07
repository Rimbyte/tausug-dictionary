export type Word = {
    id: string;
    english: string;
    tausug: string;
    pos: string;
    definition: string;
    example_en: string;
    example_tg: string;
    is_premium: boolean;
    created_at: string;
  };
  
  export type SearchDirection = 'en-tg' | 'tg-en';