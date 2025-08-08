import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../../types';

// Mock data for characters/fantasies
export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Anya Volkov',
    avatar: require('@assets/images/anya-avatar.png'),
    background: require('@assets/images/anya-background.png'),
    description:
      'Anya is a mysterious and captivating Russian beauty with piercing blue eyes and platinum blonde hair. Her enigmatic smile hides countless secrets...',
    fullDescription:
      "Anya is a mysterious and captivating Russian beauty with piercing blue eyes and platinum blonde hair. Her enigmatic smile hides countless secrets, and her sultry accent makes every word sound like poetry. Born into aristocracy in Moscow, she fled her privileged life to pursue her own path of adventure and romance. She's intelligent, witty, and dangerously charming - the kind of woman who can steal your heart with a single glance. Behind her confident exterior lies a complex soul who values deep connections and meaningful conversations. She's passionate about art, literature, and the finer things in life, but isn't afraid to get her hands dirty when the situation calls for it. Anya has a magnetic personality that draws people to her, and she uses this gift to navigate the world on her own terms.",
    likes: 1200,
    messages: 34200,
    greeting:
      'Hmm *Looks at you and speaks with a Russian accent* Do you think this smells good?',
  },
  {
    id: '11',
    name: 'Mika Kobuyashi',
    avatar: require('@assets/images/mika-avatar.png'),
    background: require('@assets/images/mika-background.png'),
    description:
      'Mika is a sweet and shy Japanese girl with warm brown eyes and silky black hair. She has an innocent charm that makes everyone want to protect her...',
    fullDescription:
      "Mika is a sweet and shy Japanese girl with warm brown eyes and silky black hair. She has an innocent charm that makes everyone want to protect her, but beneath her timid exterior lies a brave and loyal heart. Growing up in Kyoto, she was raised with traditional values and has a deep appreciation for Japanese culture, art, and cuisine. Despite her shyness, Mika is incredibly intelligent and creative, often expressing herself through her beautiful drawings and poetry. She's the type of person who notices the small details that others miss and finds beauty in everyday moments. Her gentle nature and kind words have a healing effect on those around her. Though she may seem fragile, Mika possesses an inner strength that surprises even herself when faced with challenges. She dreams of traveling the world but is content finding wonder in her immediate surroundings.",
    likes: 1200,
    messages: 34200,
    greeting: 'Eh-h u are my new brother? *Shy looks*',
  },
];

// Helper function to get the next character (limited to Anya and Mika)
export const getNextCharacter = (currentCharacterId?: string): Character => {
  // Only cycle between Anya (id: '1') and Mika (id: '11')
  const anyaCharacter = mockCharacters.find((char) => char.id === '1');
  const mikaCharacter = mockCharacters.find((char) => char.id === '11');

  if (!anyaCharacter || !mikaCharacter) {
    // Fallback to first character if not found
    return mockCharacters[0];
  }

  // Toggle between Anya and Mika
  if (currentCharacterId === '1') {
    return mikaCharacter;
  } else {
    return anyaCharacter;
  }
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/', // This would be your actual API base URL
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<Character[], void>({
      queryFn: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { data: mockCharacters };
      },
    }),
    sendMessage: builder.mutation<
      { id: string; text: string; isUser: boolean; timestamp: string },
      { text: string; characterId: string }
    >({
      queryFn: async ({ text, characterId }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock response from character
        const responses = [
          "That's an interesting perspective! Tell me more about that.",
          'I see what you mean. How does that make you feel?',
          "You're quite thoughtful, aren't you?",
          'I appreciate you sharing that with me.',
          'What made you think of that?',
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        return {
          data: {
            id: `msg-${Date.now()}`,
            text: randomResponse,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        };
      },
    }),
  }),
});

export const { useGetCharactersQuery, useSendMessageMutation } = api;
