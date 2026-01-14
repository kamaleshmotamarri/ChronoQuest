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
          },
          {
            question: "What type of plant was used by Ancient Egyptians to make paper-like material?",
            options: ["Bamboo", "Papyrus", "Cedar", "Flax"],
            correctAnswer: "Papyrus",
            hint: "It grows abundantly in the Nile Delta.",
          },
          {
            question: "Which desert covers most of the land in Egypt?",
            options: ["Gobi", "Sahara", "Mojave", "Kalahari"],
            correctAnswer: "Sahara",
            hint: "It is the largest hot desert in the world.",
          },
          {
            question: "What was the Ancient Egyptian writing system called?",
            options: ["Cuneiform", "Hieroglyphs", "Sanskrit", "Latin"],
            correctAnswer: "Hieroglyphs",
            hint: "It means 'sacred carvings' in Greek.",
          },
          {
            question: "Which Egyptian god was known as the god of the Sun?",
            options: ["Anubis", "Osiris", "Ra", "Horus"],
            correctAnswer: "Ra",
            hint: "He is often depicted with a hawk head and a sun disk.",
          },
          {
            question: "What was the capital city of the Old Kingdom of Egypt?",
            options: ["Thebes", "Memphis", "Alexandria", "Cairo"],
            correctAnswer: "Memphis",
            hint: "It was located south of the Nile River delta.",
          },
          {
            question: "Who was the female pharaoh who wore a false beard and ruled for over 20 years?",
            options: ["Nefertiti", "Cleopatra", "Hatshepsut", "Nefertari"],
            correctAnswer: "Hatshepsut",
            hint: "She is one of the most successful pharaohs, known for her trading expeditions.",
          },
          {
            question: "In Ancient Egyptian belief, what were Canopic jars used to store?",
            options: ["Grain", "Internal organs", "Water", "Perfume"],
            correctAnswer: "Internal organs",
            hint: "They were used during the mummification process.",
          },
          {
            question: "What stone was instrumental in deciphering Ancient Egyptian hieroglyphs?",
            options: ["The Rosetta Stone", "The Blarney Stone", "The Philosopher's Stone", "The Hope Diamond"],
            correctAnswer: "The Rosetta Stone",
            hint: "It has the same text written in three different scripts.",
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
          },
          {
            question: "What was a medieval soldier on horseback called?",
            options: ["Squire", "Knight", "Peasant", "Merchant"],
            correctAnswer: "Knight",
            hint: "They followed a code of chivalry.",
          },
          {
            question: "Which event killed nearly half of Europe's population in the 14th century?",
            options: ["The Hundred Years' War", "The Black Death", "The Great Famine", "The Crusades"],
            correctAnswer: "The Black Death",
            hint: "It was a devastating global pandemic of bubonic plague.",
          },
          {
            question: "What were the series of military expeditions to the Holy Land called?",
            options: ["The Explorations", "The Crusades", "The Conquests", "The Voyages"],
            correctAnswer: "The Crusades",
            hint: "They were religious wars sanctioned by the Church.",
          },
          {
            question: "What was the main style of massive, thick-walled architecture before Gothic?",
            options: ["Baroque", "Romanesque", "Renaissance", "Neoclassical"],
            correctAnswer: "Romanesque",
            hint: "It was named for its resemblance to Roman architecture.",
          },
          {
            question: "Who was the young French peasant girl who led the French army during the Hundred Years' War?",
            options: ["Marie Antoinette", "Joan of Arc", "Catherine de' Medici", "Eleanor of Aquitaine"],
            correctAnswer: "Joan of Arc",
            hint: "She was also known as the 'Maid of Orleans'.",
          },
          {
            question: "What was the long, colorful embroidery depicting the Norman Conquest called?",
            options: ["Bayeux Tapestry", "Sistine Chapel", "The Book of Kells", "The Magna Carta"],
            correctAnswer: "Bayeux Tapestry",
            hint: "It is over 70 meters long and displays a sequence of events.",
          },
          {
            question: "What animal is most commonly associated with spreading the Black Death via fleas?",
            options: ["Cats", "Dogs", "Rats", "Cows"],
            correctAnswer: "Rats",
            hint: "The plague was carried by fleas on these common urban rodents.",
          },
          {
            question: "What was the name of the legendary sword used by King Arthur?",
            options: ["Durandal", "Excalibur", "Sting", "Glamdring"],
            correctAnswer: "Excalibur",
            hint: "He is said to have pulled it from a stone or received it from the Lady of the Lake.",
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
          },
          {
            question: "What does the word 'Renaissance' literally mean?",
            options: ["Discovery", "Rebirth", "Enlightenment", "Invention"],
            correctAnswer: "Rebirth",
            hint: "It refers to the revival of classical learning.",
          },
          {
            question: "Which astronomer was tried for heresy for supporting the idea that the Earth revolves around the Sun?",
            options: ["Isaac Newton", "Galileo Galilei", "Nicolaus Copernicus", "Johannes Kepler"],
            correctAnswer: "Galileo Galilei",
            hint: "He is often called the 'father of modern science'.",
          },
          {
            question: "Which famous Italian explorer reached the Americas in 1492?",
            options: ["Marco Polo", "Christopher Columbus", "Amerigo Vespucci", "Vasco da Gama"],
            correctAnswer: "Christopher Columbus",
            hint: "He was sailing for the Spanish crown.",
          },
          {
            question: "Who is the author of 'The Prince', a famous work on political philosophy?",
            options: ["Dante", "Machiavelli", "Petrarch", "Boccaccio"],
            correctAnswer: "Machiavelli",
            hint: "The term for being cunning and duplicitous is named after him.",
          },
          {
            question: "Who painted 'The Last Supper' fresco in Milan?",
            options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
            correctAnswer: "Leonardo da Vinci",
            hint: "He was a true 'Renaissance Man' also known for his inventions.",
          },
          {
            question: "Which author wrote the 'Divine Comedy', an epic poem about Inferno, Purgatorio, and Paradiso?",
            options: ["Petrarch", "Dante Alighieri", "Boccaccio", "Castiglione"],
            correctAnswer: "Dante Alighieri",
            hint: "He is considered the father of the Italian language.",
          },
          {
            question: "What was the name of the powerful banking family that dominated Florence during the Renaissance?",
            options: ["Borgia", "Sforza", "Medici", "Pazzi"],
            correctAnswer: "Medici",
            hint: "They were major patrons of arts and sciences.",
          },
          {
            question: "Who sculpted the famous marble 'David' statue in Florence?",
            options: ["Donatello", "Michelangelo", "Bernini", "Verrocchio"],
            correctAnswer: "Michelangelo",
            hint: "The same artist who painted the Sistine Chapel ceiling.",
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
          },
          {
            question: "Which country launched the first artificial satellite, Sputnik 1?",
            options: ["USA", "Soviet Union", "China", "UK"],
            correctAnswer: "Soviet Union",
            hint: "It happened in 1957, starting the Space Race.",
          },
          {
            question: "Who was the first American to orbit the Earth?",
            options: ["John Glenn", "Alan Shepard", "Buzz Aldrin", "Jim Lovell"],
            correctAnswer: "John Glenn",
            hint: "He flew the Friendship 7 mission in 1962.",
          },
          {
            question: "What is the largest planet in our Solar System?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Jupiter",
            hint: "It is a gas giant with a Great Red Spot.",
          },
          {
            question: "Which telescope, launched in 1990, has provided stunning images of deep space?",
            options: ["James Webb", "Hubble", "Kepler", "Spitzer"],
            correctAnswer: "Hubble",
            hint: "It is named after an American astronomer who studied galaxies.",
          },
          {
            question: "Who was the first woman to travel into space?",
            options: ["Sally Ride", "Valentina Tereshkova", "Christa McAuliffe", "Peggy Whitson"],
            correctAnswer: "Valentina Tereshkova",
            hint: "She was a Soviet cosmonaut who flew in 1963.",
          },
          {
            question: "What does NASA stand for?",
            options: ["National Aeronautics and Space Administration", "North American Space Agency", "National Air and Space Association", "National Astronomy and Space Agency"],
            correctAnswer: "National Aeronautics and Space Administration",
            hint: "It is the US government agency responsible for the civilian space program.",
          },
          {
            question: "Which planet is known as the 'Red Planet'?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars",
            hint: "Its reddish appearance is due to iron oxide on its surface.",
          },
          {
            question: "What was the name of the first human-made object to reach interstellar space?",
            options: ["Sputnik 1", "Voyager 1", "Pioneer 10", "Apollo 11"],
            correctAnswer: "Voyager 1",
            hint: "It was launched in 1977 and continues to send data back to Earth.",
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
          },
          {
            question: "In what city was Apple founded?",
            options: ["San Francisco", "Cupertino", "Los Altos", "Palo Alto"],
            correctAnswer: "Los Altos",
            hint: "It was started in Steve Jobs' parents' garage.",
          },
          {
            question: "What was the revolutionary computer Apple released in 1984 with a famous Super Bowl ad?",
            options: ["Apple III", "Lisa", "Macintosh", "iMac"],
            correctAnswer: "Macintosh",
            hint: "It introduced the graphical user interface to the masses.",
          },
          {
            question: "What was the name of the portable music player Apple released in 2001?",
            options: ["iPhone", "iPod", "iPad", "iTunes"],
            correctAnswer: "iPod",
            hint: "It promised '1,000 songs in your pocket'.",
          },
          {
            question: "What is the name of the operating system used on Apple computers today?",
            options: ["Windows", "Linux", "macOS", "DOS"],
            correctAnswer: "macOS",
            hint: "It was previously known as Mac OS X.",
          },
          {
            question: "What year did the first iPhone release, changing the mobile industry forever?",
            options: ["2001", "2005", "2007", "2010"],
            correctAnswer: "2007",
            hint: "It was introduced by Steve Jobs as a 'widescreen iPod with touch controls', a 'revolutionary mobile phone', and a 'breakthrough internet communications device'.",
          },
          {
            question: "Who was the CEO of Apple that famously fired Steve Jobs in 1985?",
            options: ["Tim Cook", "John Sculley", "Gil Amelio", "Michael Spindler"],
            correctAnswer: "John Sculley",
            hint: "He was previously the president of PepsiCo.",
          },
          {
            question: "What was the name of the first portable computer released by Apple in 1989?",
            options: ["Macintosh Portable", "PowerBook", "MacBook", "iBook"],
            correctAnswer: "Macintosh Portable",
            hint: "It was Apple's first battery-powered Macintosh but was quite heavy.",
          },
          {
            question: "What color was the original translucent iMac G3 released in 1998?",
            options: ["Bondi Blue", "Space Gray", "Jet Black", "Rose Gold"],
            correctAnswer: "Bondi Blue",
            hint: "It was named after a beach in Australia.",
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
