import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../types';

// Mock data for characters/fantasies
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Anya Volkov',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      "Shin Lewis is a quiet, introverted soul who'd rather stay in his cozy apartment with his sketches than deal with the outside world. He's the type... Read More",
    likes: 1200,
    messages: 34200,
    greeting:
      'Hmm *Looks at you and speaks with a Russian accent* Do you think this smells good?',
  },
  {
    id: '2',
    name: 'Elena Nightshade',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'A mysterious sorceress who dwells in the shadows, Elena possesses ancient knowledge of dark magic and forbidden spells...',
    likes: 850,
    messages: 12400,
    greeting: 'Welcome, mortal. What brings you to my domain?',
  },
  {
    id: '3',
    name: 'Captain Rex',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'A seasoned space marine with years of combat experience across the galaxy. Rex has seen it all and survived...',
    likes: 2100,
    messages: 45600,
    greeting: 'Soldier, ready for your next mission?',
  },
];

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/', // This would be your actual API base URL
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { data: Character[]; hasMore: boolean },
      { page: number; limit: number }
    >({
      queryFn: async ({ page, limit }) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const startIndex = page * limit;
        const endIndex = startIndex + limit;
        const paginatedData = mockCharacters.slice(startIndex, endIndex);

        return {
          data: {
            data: paginatedData,
            hasMore: endIndex < mockCharacters.length,
          },
        };
      },
    }),
    sendMessage: builder.mutation<
      { text: string; timestamp: Date },
      { message: string; characterId: string }
    >({
      queryFn: async ({ message }) => {
        // Simulate AI response delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const responses = [
          "That's an interesting perspective. Tell me more about what you think.",
          '*Nods thoughtfully* I can see why you would feel that way.',
          'Hmm, that reminds me of something that happened to me once...',
          "You're quite perceptive. Most people don't notice that.",
          '*Smiles* I appreciate you sharing that with me.',
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        return {
          data: {
            text: randomResponse,
            timestamp: new Date(),
          },
        };
      },
    }),
  }),
});

export const { useGetCharactersQuery, useSendMessageMutation } = api;