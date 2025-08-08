import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from '../types';

// Mock data for characters/fantasies
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Anya Volkov',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
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
    id: '2',
    name: 'Elena Nightshade',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'A mysterious sorceress who dwells in the shadows, Elena possesses ancient knowledge of dark magic and forbidden spells. Her powers are feared across the realm...',
    fullDescription:
      'A mysterious sorceress who dwells in the shadows, Elena possesses ancient knowledge of dark magic and forbidden spells. Her powers are feared across the realm, yet she uses them with careful consideration. Born during a lunar eclipse, she was marked by fate to walk between worlds. Her violet eyes can see through illusions and her silver hair shimmers with otherworldly energy. Elena has spent centuries studying the arcane arts, collecting rare tomes and artifacts from forgotten civilizations. Despite her intimidating reputation, she has a soft spot for those who seek knowledge genuinely and will mentor worthy apprentices. Her tower, hidden in the Whispering Woods, is filled with magical experiments and protective wards. She speaks in riddles and ancient languages, but those who earn her trust discover a brilliant mind and a surprisingly compassionate heart.',
    likes: 850,
    messages: 12400,
    greeting: 'Welcome, mortal. What brings you to my domain?',
  },
  {
    id: '3',
    name: 'Captain Rex',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'A seasoned space marine with years of combat experience across the galaxy. Rex has seen it all and survived the impossible...',
    fullDescription:
      "A seasoned space marine with years of combat experience across the galaxy. Rex has seen it all and survived the impossible - from alien invasions to interdimensional wars. His cybernetic enhancements and battle scars tell the story of countless conflicts fought in the name of galactic peace. Born on a frontier colony, he enlisted young and quickly rose through the ranks due to his tactical brilliance and unwavering courage. Rex leads from the front, never asking his troops to do anything he wouldn't do himself. His gruff exterior masks a deep loyalty to his squad and an unshakeable moral compass. Between missions, he can be found in the ship's workshop, maintaining his equipment or sharing war stories with younger marines. Despite the horrors he's witnessed, Rex maintains his humanity and fights to protect those who cannot protect themselves.",
    likes: 2100,
    messages: 45600,
    greeting: 'Soldier, ready for your next mission?',
  },
  {
    id: '4',
    name: 'Luna Starweaver',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'An ethereal being from the celestial realm, Luna weaves dreams and starlight into reality. Her gentle nature hides immense cosmic power...',
    likes: 3400,
    messages: 67800,
    greeting: '*Sparkles with starlight* The cosmos whispers your name to me.',
  },
  {
    id: '5',
    name: 'Kai Shadowblade',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'A master assassin turned protector, Kai walks the line between light and darkness. His past haunts him, but his resolve remains unshaken...',
    likes: 1800,
    messages: 29500,
    greeting:
      '*Steps from the shadows* You seek my aid? Choose your words carefully.',
  },
  {
    id: '6',
    name: 'Dr. Aria Chen',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'A brilliant scientist specializing in quantum physics and interdimensional research. Her discoveries have opened doorways to other realities...',
    likes: 920,
    messages: 15600,
    greeting:
      "Fascinating! Your quantum signature is unlike anything I've seen.",
  },
  {
    id: '7',
    name: 'Zara the Wanderer',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'A nomadic adventurer who has traveled through countless worlds and dimensions. Each journey teaches her something new about existence itself...',
    likes: 2750,
    messages: 41300,
    greeting:
      '*Tips her hat* Well met, fellow traveler. What tales do you carry?',
  },
  {
    id: '8',
    name: 'Prince Aldric',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      "The rightful heir to a kingdom lost in time, Aldric carries the weight of his people's hopes. His noble heart burns with the desire for justice...",
    likes: 1650,
    messages: 22100,
    greeting: 'Honor guides my path. Will you walk alongside me?',
  },
  {
    id: '9',
    name: 'Raven Blackheart',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'A pirate captain who rules the seven seas with an iron fist and a cunning mind. Her ship is her kingdom, and her crew is her family...',
    likes: 2200,
    messages: 38700,
    greeting: '*Grins wickedly* Ahoy there! Ready to sail into adventure?',
  },
  {
    id: '10',
    name: 'Sage Moonwhisper',
    avatar: require('../../assets/images/anya-avatar.png'),
    background: require('../../assets/images/anya-background.png'),
    description:
      'An ancient druid who communes with nature itself. The forest spirits speak through her, sharing wisdom from ages past...',
    likes: 1100,
    messages: 18900,
    greeting:
      '*The wind carries her voice* The old woods have much to teach you.',
  },
  {
    id: '11',
    name: 'Mika Kobuyashi',
    avatar: require('../../assets/images/mika-avatar.png'),
    background: require('../../assets/images/mika-background.png'),
    description:
      'Mika is a sweet and shy Japanese girl with warm brown eyes and silky black hair. She has an innocent charm that makes everyone want to protect her...',
    fullDescription:
      "Mika is a sweet and shy Japanese girl with warm brown eyes and silky black hair. She has an innocent charm that makes everyone want to protect her, but beneath her timid exterior lies a brave and loyal heart. Growing up in Kyoto, she was raised with traditional values and has a deep appreciation for Japanese culture, art, and cuisine. Despite her shyness, Mika is incredibly intelligent and creative, often expressing herself through her beautiful drawings and poetry. She's the type of person who notices the small details that others miss and finds beauty in everyday moments. Her gentle nature and kind words have a healing effect on those around her. Though she may seem fragile, Mika possesses an inner strength that surprises even herself when faced with challenges. She dreams of traveling the world but is content finding wonder in her immediate surroundings.",
    likes: 1200,
    messages: 34200,
    greeting: 'Eh-h u are my new brother? *Shy looks*',
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
