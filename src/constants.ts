import { Level } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Dino Forest",
    description: "Begin your quest through the lush leafy woods!",
    ageRange: "Ages 6-7",
    color: "#22c55e",
    emoji: "🦖",
    challenges: [
      {
        id: "l1-c1",
        question: "The green dinosaur eats an [___].",
        options: [
          { id: "apple", label: "Apple", icon: "🍎" },
          { id: "cake", label: "Cake", icon: "🍰" }
        ],
        correctIds: ["apple"],
        complexity: 'simple'
      },
      {
        id: "l1-c2",
        question: "Look at the big [___].",
        options: [
          { id: "tree", label: "Tree", icon: "🌳" },
          { id: "cloud", label: "Cloud", icon: "☁️" }
        ],
        correctIds: ["tree"],
        complexity: 'simple'
      },
      {
        id: "l1-c3",
        question: "A small [___] is jumping.",
        options: [
          { id: "frog", label: "Frog", icon: "🐸" },
          { id: "fish", label: "Fish", icon: "🐟" }
        ],
        correctIds: ["frog"],
        complexity: 'medium'
      },
      {
        id: "l1-c4",
        question: "The [___] is very bright.",
        options: [
          { id: "sun", label: "Sun", icon: "☀️" },
          { id: "moon", label: "Moon", icon: "🌙" }
        ],
        correctIds: ["sun"],
        complexity: 'medium'
      },
      {
        id: "l1-c5",
        question: "The [___] likes the [___].",
        options: [
          { id: "dino", label: "Dino", icon: "🦖" },
          { id: "egg", label: "Egg", icon: "🥚" },
          { id: "star", label: "Star", icon: "⭐" }
        ],
        correctIds: ["dino", "egg"],
        complexity: 'boss'
      }
    ]
  },
  {
    id: 2,
    title: "Space Station",
    description: "Build sentences among the stars and rockets!",
    ageRange: "Ages 8-9",
    color: "#3b82f6",
    emoji: "🚀",
    challenges: [
      {
        id: "l2-c1",
        question: "The rocket is [___] to the moon.",
        options: [
          { id: "flying", label: "flying", icon: "✈️" },
          { id: "walking", label: "walking", icon: "🚶" }
        ],
        correctIds: ["flying"],
        complexity: 'simple'
      },
      {
        id: "l2-c2",
        question: "Stars are [___] in the sky.",
        options: [
          { id: "shining", label: "shining", icon: "✨" },
          { id: "sleeping", label: "sleeping", icon: "😴" }
        ],
        correctIds: ["shining"],
        complexity: 'simple'
      },
      {
        id: "l2-c3",
        question: "The [___] wears a [___].",
        options: [
          { id: "spacer", label: "Astronaut", icon: "👨‍🚀" },
          { id: "helmet", label: "Helmet", icon: "🪖" },
          { id: "hat", label: "Hat", icon: "🎩" }
        ],
        correctIds: ["spacer", "helmet"],
        complexity: 'medium'
      },
      {
        id: "l2-c4",
        question: "Eat your [___] in space.",
        options: [
          { id: "pizza", label: "Pizza", icon: "🍕" },
          { id: "juice", label: "Juice", icon: "🧃" }
        ],
        correctIds: ["pizza"],
        complexity: 'medium'
      },
      {
        id: "l2-c5",
        question: "We [___] the [___] to Earth.",
        options: [
          { id: "ride", label: "ride", icon: "🏇" },
          { id: "rocket", label: "rocket", icon: "🚀" },
          { id: "walk", label: "walk", icon: "🚶" }
        ],
        correctIds: ["ride", "rocket"],
        complexity: 'boss'
      }
    ]
  },
  {
    id: 3,
    title: "Pirate Cove",
    description: "Master grammar to find the hidden treasure!",
    ageRange: "Ages 10-12",
    color: "#6366f1",
    emoji: "🏴‍☠️",
    challenges: [
      {
        id: "l3-c1",
        question: "Yesterday, we [___] the secret key.",
        options: [
          { id: "find", label: "find", icon: "🔍" },
          { id: "found", label: "found", icon: "🗝️" }
        ],
        correctIds: ["found"],
        complexity: 'simple'
      },
      {
        id: "l3-c2",
        question: "The parrot [___] a shiny gold coin.",
        options: [
          { id: "has", label: "has", icon: "✅" },
          { id: "have", label: "have", icon: "👐" }
        ],
        correctIds: ["has"],
        complexity: 'simple'
      },
      {
        id: "l3-c3",
        question: "They [___] sailing [___] the ocean.",
        options: [
          { id: "are", label: "are", icon: "👥" },
          { id: "across", label: "across", icon: "🌊" },
          { id: "is", label: "is", icon: "☝️" }
        ],
        correctIds: ["are", "across"],
        complexity: 'medium'
      },
      {
        id: "l3-c4",
        question: "If I [___] a pirate, I would find gold.",
        options: [
          { id: "was", label: "was", icon: "🕰️" },
          { id: "were", label: "were", icon: "👥" }
        ],
        correctIds: ["were"],
        complexity: 'medium'
      },
      {
        id: "l3-c5",
        question: "[___] [___] the treasure map now!",
        options: [
          { id: "we", label: "We", icon: "👥" },
          { id: "read", label: "read", icon: "📖" },
          { id: "reads", label: "reads", icon: "📚" }
        ],
        correctIds: ["we", "read"],
        complexity: 'boss'
      }
    ]
  }
];

export const STICKERS = [
  { id: 'dragon', icon: '🐲', name: 'Friendly Dragon' },
  { id: 'star', icon: '⭐', name: 'Sparkling Star' },
  { id: 'ship', icon: '🚢', name: 'Treasure Ship' },
  { id: 'apple', icon: '🍎', name: 'Magic Apple' },
  { id: 'rocket', icon: '🚀', name: 'Swift Rocket' },
];
