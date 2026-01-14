// Game Data Structure for ChronoQuest: Fractures in Time

export const gameData = {
  organization: {
    name: "Temporal Preservation Agency",
    mission: "Repair the timeline and prevent reality from collapsing",
  },
  eras: [
    {
      id: "ancient-egypt",
      name: "Ancient Egypt",
      year: "1332 BCE",
      description: "The reign of Pharaoh Tutankhamun. Something is disrupting the timeline...",
      background: "🏺",
      image: "/ancient_egypt_era.png",
      puzzle: {
        type: "trivia",
        questions: [
          {
            question: "What was the name of the famous boy pharaoh who ruled Ancient Egypt during the 18th dynasty?",
            options: ["Ramesses II", "Tutankhamun", "Cleopatra", "Akhenaten"],
            correctAnswer: "Tutankhamun",
            hint: "His tomb was discovered by Howard Carter in 1922 and contained incredible treasures.",
          },
          {
            question: "Which river was the lifeblood of Ancient Egyptian civilization?",
            options: ["The Nile", "The Amazon", "The Euphrates", "The Tigris"],
            correctAnswer: "The Nile",
            hint: "It flows northwards through northeastern Africa.",
          },
          {
            question: "What structure famously guards the Pyramids of Giza?",
            options: ["The Lighthouse of Alexandria", "The Great Sphinx", "The Colossus of Rhodes", "The Temple of Karnak"],
            correctAnswer: "The Great Sphinx",
            hint: "It has the body of a lion and the head of a human.",
          }
        ]
      },
      historicalFigure: {
        name: "Nebet, High Priestess",
        dialogue: "Greetings, traveler from another time. The timeline is fractured here. You must solve the riddle of the sands to restore balance.",
      },
      artifact: "Sacred Ankh of Temporal Harmony",
      completed: false,
    },
    {
      id: "medieval-europe",
      name: "Medieval Europe",
      year: "1066 CE",
      description: "The Battle of Hastings. History is being rewritten...",
      background: "⚔️",
      image: "/medieval_europe_era.png",
      puzzle: {
        type: "trivia",
        questions: [
          {
            question: "Which famous battle in 1066 CE marked the beginning of Norman rule in England?",
            options: ["Battle of Agincourt", "Battle of Hastings", "Battle of Waterloo", "Battle of Bosworth"],
            correctAnswer: "Battle of Hastings",
            hint: "This battle took place in October 1066 and resulted in William the Conqueror becoming King of England.",
          },
          {
            question: "What was the primary system of land ownership and duties in Medieval Europe?",
            options: ["Feudalism", "Capitalism", "Communism", "Mercantilism"],
            correctAnswer: "Feudalism",
            hint: "It involved lords, vassals, and fiefs.",
          },
          {
            question: "Which document signed in 1215 limited the power of the English King?",
            options: ["The Domesday Book", "The Magna Carta", "The Declaration of Arbroath", "The Treaty of Windsor"],
            correctAnswer: "The Magna Carta",
            hint: "It was signed by King John at Runnymede.",
          }
        ]
      },
      historicalFigure: {
        name: "William the Conqueror",
        dialogue: "Time traveler! The fabric of history tears around us. Order these events correctly, or the timeline shall never heal.",
      },
      artifact: "Crown of Chronological Order",
      completed: false,
    },
    {
      id: "renaissance",
      name: "Renaissance Italy",
      year: "1503 CE",
      description: "Florence during the Italian Renaissance. Art and science are merging in unexpected ways...",
      background: "🎨",
      image: "/renaissance_italy_era.png",
      puzzle: {
        type: "trivia",
        questions: [
          {
            question: "Which famous painting by Leonardo da Vinci depicts a woman with an enigmatic smile?",
            options: ["The Last Supper", "The Mona Lisa", "The Vitruvian Man", "The Annunciation"],
            correctAnswer: "The Mona Lisa",
            hint: "This painting is currently housed in the Louvre Museum in Paris and is one of the most famous artworks in the world.",
          },
          {
            question: "Who painted the ceiling of the Sistine Chapel?",
            options: ["Raphael", "Donatello", "Michelangelo", "Botticelli"],
            correctAnswer: "Michelangelo",
            hint: "He was also a famous sculptor known for 'David'.",
          },
          {
            question: "Which city is considered the birthplace of the Renaissance?",
            options: ["Rome", "Venice", "Florence", "Milan"],
            correctAnswer: "Florence",
            hint: "It was ruled by the Medici family.",
          }
        ]
      },
      historicalFigure: {
        name: "Leonardo da Vinci",
        dialogue: "Ah, a fellow scholar! The anomalies in time have caught my attention. Mathematics holds the key to temporal mechanics.",
      },
      artifact: "Vitruvian Man's Temporal Key",
      completed: false,
    },
    {
      id: "space-age",
      name: "Space Age",
      year: "1969 CE",
      description: "The Moon Landing. But something went wrong in the timeline...",
      background: "🚀",
      image: "/space_age_era.png",
      puzzle: {
        type: "trivia",
        questions: [
          {
            question: "What was the name of the Apollo mission that first landed humans on the Moon in 1969?",
            options: ["Apollo 10", "Apollo 11", "Apollo 12", "Apollo 13"],
            correctAnswer: "Apollo 11",
            hint: "Neil Armstrong and Buzz Aldrin were the first two humans to walk on the Moon during this mission.",
          },
          {
            question: "Who was the first human to travel into space?",
            options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
            correctAnswer: "Yuri Gagarin",
            hint: "He was a Soviet cosmonaut who orbited Earth in 1961.",
          },
          {
            question: "What is the name of the galaxy that contains our Solar System?",
            options: ["Andromeda", "The Milky Way", "Triangulum", "Whirlpool"],
            correctAnswer: "The Milky Way",
            hint: "It looks like a milky band of light in the night sky.",
          }
        ]
      },
      historicalFigure: {
        name: "Neil Armstrong",
        dialogue: "One small step... but the timeline has taken a giant leap into chaos. We need your help to restore the mission sequence.",
      },
      artifact: "Lunar Module Temporal Stabilizer",
      completed: false,
    },
    {
      id: "early-apple",
      name: "Early Days of Apple",
      year: "1976 CE",
      description: "A garage in Los Altos. The personal computing revolution is about to begin...",
      background: "💻",
      image: "/apple_era.png",
      puzzle: {
        type: "trivia",
        questions: [
          {
            question: "Who co-founded Apple Computer with Steve Jobs?",
            options: ["Bill Gates", "Steve Wozniak", "Tim Cook", "Elon Musk"],
            correctAnswer: "Steve Wozniak",
            hint: "He is an electronics engineer displaying technical genius.",
          },
          {
            question: "What was the first product released by Apple?",
            options: ["Apple I", "Macintosh", "iPod", "Apple II"],
            correctAnswer: "Apple I",
            hint: "It was a desktop computer released in 1976.",
          },
          {
            question: "In which year was Apple Computer, Inc. incorporated?",
            options: ["1976", "1984", "1990", "2007"],
            correctAnswer: "1976",
            hint: "The same year the Apple I was released.",
          }
        ]
      },
      historicalFigure: {
        name: "Steve Jobs",
        dialogue: "We're here to put a dent in the universe. But right now, the timeline is glitching harder than a prototype logic board.",
      },
      artifact: "The First Byte of Innovation",
      completed: false,
    },
  ],
};

export const initialGameState = {
  currentEra: null,
  completedEras: [],
  playerProgress: 0,
  artifacts: [],
  gameStarted: false,
  currentPuzzleSolution: null,
};
