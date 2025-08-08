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
      'A mysterious sorceress who dwells in the shadows, Elena possesses ancient knowledge of dark magic and forbidden spells. Her powers are feared across the realm...',
    likes: 850,
    messages: 12400,
    greeting: 'Welcome, mortal. What brings you to my domain?',
  },
  {
    id: '3',
    name: 'Captain Rex',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'A seasoned space marine with years of combat experience across the galaxy. Rex has seen it all and survived the impossible...',
    likes: 2100,
    messages: 45600,
    greeting: 'Soldier, ready for your next mission?',
  },
  {
    id: '4',
    name: 'Luna Starweaver',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'An ethereal being from the celestial realm, Luna weaves dreams and starlight into reality. Her gentle nature hides immense cosmic power...',
    likes: 3400,
    messages: 67800,
    greeting: '*Sparkles with starlight* The cosmos whispers your name to me.',
  },
  {
    id: '5',
    name: 'Kai Shadowblade',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'A master assassin turned protector, Kai walks the line between light and darkness. His past haunts him, but his resolve remains unshaken...',
    likes: 1800,
    messages: 29500,
    greeting: '*Steps from the shadows* You seek my aid? Choose your words carefully.',
  },
  {
    id: '6',
    name: 'Dr. Aria Chen',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'A brilliant scientist specializing in quantum physics and interdimensional research. Her discoveries have opened doorways to other realities...',
    likes: 920,
    messages: 15600,
    greeting: 'Fascinating! Your quantum signature is unlike anything I\'ve seen.',
  },
  {
    id: '7',
    name: 'Zara the Wanderer',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'A nomadic adventurer who has traveled through countless worlds and dimensions. Each journey teaches her something new about existence itself...',
    likes: 2750,
    messages: 41300,
    greeting: '*Tips her hat* Well met, fellow traveler. What tales do you carry?',
  },
  {
    id: '8',
    name: 'Prince Aldric',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'The rightful heir to a kingdom lost in time, Aldric carries the weight of his people\'s hopes. His noble heart burns with the desire for justice...',
    likes: 1650,
    messages: 22100,
    greeting: 'Honor guides my path. Will you walk alongside me?',
  },
  {
    id: '9',
    name: 'Raven Blackheart',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'A pirate captain who rules the seven seas with an iron fist and a cunning mind. Her ship is her kingdom, and her crew is her family...',
    likes: 2200,
    messages: 38700,
    greeting: '*Grins wickedly* Ahoy there! Ready to sail into adventure?',
  },
  {
    id: '10',
    name: 'Sage Moonwhisper',
    avatar: require('../../assets/images/avatar.jpg'),
    description:
      'An ancient druid who communes with nature itself. The forest spirits speak through her, sharing wisdom from ages past...',
    likes: 1100,
    messages: 18900,
    greeting: '*The wind carries her voice* The old woods have much to teach you.',
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