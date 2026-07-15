// Traduções das perguntas do jogo Bom de Bíblia
// Este arquivo contém as traduções para inglês e espanhol
// O português já está no questions.ts
// ⚠️ ARQUIVO COMPLETO - TODAS AS 262 TRADUÇÕES

export interface QuestionTranslation {
  question: string;
  options: string[];
  verse?: string;
}

export type QuestionTranslations = {
  [language: string]: {
    [questionIndex: number]: QuestionTranslation;
  };
};

// Importar todos os chunks de traduções
import { pentateucoDificilTranslations } from './translations/pentateuco-dificil';
import { pentateucoExpertTranslations } from './translations/pentateuco-expert';
import { outrasCategoriasTranslations } from './translations/outras-categorias';

// Mapeamento de categorias e dificuldades
export const categoryTranslations = {
  en: {
    'Pentateuco': 'Pentateuch',
    'Históricos': 'Historical',
    'Poéticos': 'Poetic',
    'Proféticos': 'Prophetic',
    'Evangelhos': 'Gospels',
    'Cartas': 'Letters'
  },
  es: {
    'Pentateuco': 'Pentateuco',
    'Históricos': 'Históricos',
    'Poéticos': 'Poéticos',
    'Proféticos': 'Proféticos',
    'Evangelhos': 'Evangelios',
    'Cartas': 'Cartas'
  }
};

export const difficultyTranslations = {
  en: {
    'Fácil': 'Easy',
    'Médio': 'Medium',
    'Difícil': 'Hard',
    'Expert': 'Expert'
  },
  es: {
    'Fácil': 'Fácil',
    'Médio': 'Medio',
    'Difícil': 'Difícil',
    'Expert': 'Experto'
  }
};

// ============================================================================
// TRADUÇÕES BASE (0-99) - PENTATEUCO FÁCIL E MÉDIO
// ============================================================================

const baseTranslationsEN = {
  // PENTATEUCO - FÁCIL (0-49)
  0: { question: "Who built the ark?", options: ["Moses", "Noah", "Abraham", "David"], verse: "Genesis 6:14 - Make yourself an ark of gopher wood" },
  1: { question: "What is the first book of the Bible?", options: ["Exodus", "Leviticus", "Genesis", "Matthew"], verse: "Genesis 1:1 - In the beginning God created the heavens and the earth" },
  2: { question: "Who received the Ten Commandments?", options: ["Abraham", "Moses", "David", "Elijah"], verse: "Exodus 20:1 - And God spoke all these words" },
  3: { question: "In how many days did God create the world?", options: ["5", "6", "7", "8"], verse: "Genesis 1:31 - God saw all that he had made, and it was very good" },
  4: { question: "Who was the first man created by God?", options: ["Noah", "Adam", "Abel", "Cain"], verse: "Genesis 2:7 - Then the Lord God formed a man from the dust of the ground" },
  5: { question: "Who was the first woman created?", options: ["Sarah", "Rebecca", "Eve", "Mary"], verse: "Genesis 3:20 - Adam named his wife Eve" },
  6: { question: "What did God rest from on the seventh day?", options: ["Creation", "Wars", "Judgments", "Plagues"], verse: "Genesis 2:2 - By the seventh day God had finished the work he had been doing" },
  7: { question: "Who had the coat of many colors?", options: ["Joseph", "Benjamin", "Judah", "Reuben"], verse: "Genesis 37:3 - Now Israel loved Joseph more than any of his other sons" },
  8: { question: "How many sons did Jacob have?", options: ["10", "11", "12", "13"], verse: "Genesis 35:22 - Jacob had twelve sons" },
  9: { question: "Where did Moses receive the Ten Commandments?", options: ["Mount Sinai", "Mount Carmel", "Mount of Olives", "Mount Zion"], verse: "Exodus 19:20 - The Lord descended to the top of Mount Sinai" },
  10: { question: "What did God use to part the Red Sea?", options: ["A sword", "A strong wind", "A staff", "Thunder"], verse: "Exodus 14:21 - The Lord drove the sea back with a strong east wind" },
  11: { question: "Who was sold as a slave in Egypt?", options: ["Benjamin", "Joseph", "Simeon", "Levi"], verse: "Genesis 37:28 - They sold Joseph to the Ishmaelites for twenty shekels of silver" },
  12: { question: "Which animal spoke to Balaam?", options: ["A camel", "A donkey", "A horse", "A sheep"], verse: "Numbers 22:28 - Then the Lord opened the donkey's mouth" },
  13: { question: "How old was Moses when he died?", options: ["100", "110", "120", "130"], verse: "Deuteronomy 34:7 - Moses was a hundred and twenty years old" },
  14: { question: "Who was Moses' brother?", options: ["Joshua", "Aaron", "Caleb", "Hur"], verse: "Exodus 4:14 - Aaron the Levite is your brother" },
  15: { question: "What type of tree was in the Garden of Eden?", options: ["Tree of life", "Tree of death", "Tree of wisdom", "Tree of peace"], verse: "Genesis 2:9 - And the tree of life in the middle of the garden" },
  16: { question: "Who deceived Esau for the birthright?", options: ["Isaac", "Joseph", "Jacob", "Laban"], verse: "Genesis 27:36 - Isn't he rightly named Jacob?" },
  17: { question: "How many plagues did God send to Egypt?", options: ["7", "10", "12", "15"], verse: "Exodus 7-12 - The ten plagues of Egypt" },
  18: { question: "What did the people eat in the desert?", options: ["Bread", "Manna", "Meat", "Fruits"], verse: "Exodus 16:31 - The house of Israel called it Manna" },
  19: { question: "Who was Abraham's father?", options: ["Terah", "Nahor", "Haran", "Lot"], verse: "Genesis 11:27 - This is the account of Terah: Terah became the father of Abram" },
  20: { question: "What was Abraham's wife's name?", options: ["Rebecca", "Sarah", "Rachel", "Leah"], verse: "Genesis 17:15 - God said to Abraham: As for Sarai your wife" },
  21: { question: "Who wrestled with the angel?", options: ["Isaac", "Jacob", "Joseph", "Esau"], verse: "Genesis 32:24 - Jacob was left alone, and a man wrestled with him" },
  22: { question: "How many sons of Adam and Eve are mentioned?", options: ["2", "3", "4", "5"], verse: "Genesis 4:25 - Adam knew his wife again, and she bore a son" },
  23: { question: "Who killed Abel?", options: ["Adam", "Seth", "Cain", "Enoch"], verse: "Genesis 4:8 - While they were in the field, Cain attacked his brother Abel" },
  24: { question: "How many tablets did Moses receive?", options: ["1", "2", "3", "4"], verse: "Exodus 31:18 - He gave Moses two tablets of the testimony" },
  25: { question: "What was Abel's profession?", options: ["Farmer", "Shepherd", "Fisherman", "Carpenter"], verse: "Genesis 4:2 - Abel was a keeper of sheep" },
  26: { question: "What was Cain's profession?", options: ["Shepherd", "Tiller of the ground", "Fisherman", "Builder"], verse: "Genesis 4:2 - Cain was a tiller of the ground" },
  27: { question: "How old was Noah when he entered the ark?", options: ["500", "550", "600", "650"], verse: "Genesis 7:6 - Noah was six hundred years old" },
  28: { question: "How many days did it rain during the flood?", options: ["30", "40", "50", "60"], verse: "Genesis 7:12 - And rain fell on the earth forty days and forty nights" },
  29: { question: "What did the dove bring to Noah?", options: ["An olive branch", "A leaf", "A flower", "A fruit"], verse: "Genesis 8:11 - The dove came to him in the evening with a freshly plucked olive leaf" },
  30: { question: "What was the sign of God's covenant with Noah?", options: ["A star", "A rainbow", "A cloud", "Thunder"], verse: "Genesis 9:13 - I have set my rainbow in the clouds" },
  31: { question: "What was Abraham willing to sacrifice?", options: ["A lamb", "His son Isaac", "A sheep", "His servant"], verse: "Genesis 22:2 - Take your son, your only son Isaac" },
  32: { question: "Who was Abraham's servant?", options: ["Elijah", "Elisha", "Eliezer", "Eleazar"], verse: "Genesis 15:2 - The steward of my house is Eliezer of Damascus" },
  33: { question: "What did Jacob give to Joseph besides other things?", options: ["A staff", "A colorful tunic", "A sword", "A ring"], verse: "Genesis 37:3 - He made him a robe of many colors" },
  34: { question: "Who interpreted Pharaoh's dreams?", options: ["Daniel", "Joseph", "Moses", "Samuel"], verse: "Genesis 41:15 - Pharaoh said to Joseph: I had a dream" },
  35: { question: "Where was Moses found?", options: ["In the desert", "In a basket in the river", "In a cave", "In a tent"], verse: "Exodus 2:3 - She took a papyrus basket and coated it with tar and pitch" },
  36: { question: "Who was Moses' sister?", options: ["Deborah", "Rachel", "Miriam", "Ruth"], verse: "Exodus 15:20 - Then Miriam the prophetess, Aaron's sister" },
  37: { question: "What did God show Moses in the burning bush?", options: ["An angel", "His glory", "His presence", "A miracle"], verse: "Exodus 3:2 - The angel of the Lord appeared to him in flames of fire" },
  38: { question: "What was the first plague of Egypt?", options: ["Frogs", "Flies", "Water into blood", "Lice"], verse: "Exodus 7:20 - All the water turned into blood" },
  39: { question: "What was the last plague of Egypt?", options: ["Darkness", "Death of the firstborn", "Locusts", "Hail"], verse: "Exodus 11:5 - Every firstborn in Egypt will die" },
  40: { question: "What did the Israelites pass through?", options: ["Jordan River", "Red Sea", "Dead Sea", "Nile River"], verse: "Exodus 14:22 - The Israelites went through the sea on dry ground" },
  41: { question: "How many commandments did God give?", options: ["5", "7", "10", "12"], verse: "Exodus 20:1-17 - The Ten Commandments" },
  42: { question: "What did the people make while Moses was on the mountain?", options: ["They prayed", "They fasted", "They made a golden calf", "They slept"], verse: "Exodus 32:4 - He took what they handed him and made it into a calf" },
  43: { question: "Who was Moses' successor?", options: ["Caleb", "Aaron", "Joshua", "Eleazar"], verse: "Deuteronomy 31:7 - Moses summoned Joshua" },
  44: { question: "How many spies were sent to Canaan?", options: ["10", "12", "15", "20"], verse: "Numbers 13:2 - Send men to spy out the land of Canaan" },
  45: { question: "How many spies brought a good report?", options: ["1", "2", "3", "4"], verse: "Numbers 14:6 - Joshua son of Nun and Caleb son of Jephunneh" },
  46: { question: "How many years did Israel wander in the desert?", options: ["20", "30", "40", "50"], verse: "Numbers 14:33 - Your children will be shepherds here for forty years" },
  47: { question: "Who was Isaac's wife?", options: ["Sarah", "Rebecca", "Rachel", "Leah"], verse: "Genesis 24:67 - Isaac brought her into the tent and took Rebecca" },
  48: { question: "Who were Isaac's twin sons?", options: ["Cain and Abel", "Jacob and Esau", "Joseph and Benjamin", "Ephraim and Manasseh"], verse: "Genesis 25:25-26 - The first came out red, all his body like a hairy cloak" },
  49: { question: "For what did Esau sell his birthright?", options: ["Bread and water", "Bread and stew", "Meat and wine", "Fruits and honey"], verse: "Genesis 25:34 - Jacob gave Esau bread and lentil stew" },
  // PENTATEUCO - MÉDIO (50-99)
  50: { question: "How many sons did Jacob have with Leah?", options: ["4", "5", "6", "7"], verse: "Genesis 29-30 - The sons of Leah" },
  51: { question: "What is the name of the mountain where Abraham almost sacrificed Isaac?", options: ["Mount Sinai", "Mount Moriah", "Mount Nebo", "Mount Carmel"], verse: "Genesis 22:2 - Go to the region of Moriah" },
  52: { question: "How old was Sarah when she had Isaac?", options: ["80", "85", "90", "95"], verse: "Genesis 17:17 - Will Sarah bear a child at the age of ninety?" },
  53: { question: "Who was Ishmael's mother?", options: ["Sarah", "Hagar", "Keturah", "Bathsheba"], verse: "Genesis 16:15 - Hagar bore Abram a son" },
  54: { question: "How old was Abraham when Isaac was born?", options: ["90", "95", "100", "105"], verse: "Genesis 21:5 - Abraham was a hundred years old" },
  55: { question: "What city did God destroy along with Sodom?", options: ["Jericho", "Gomorrah", "Ai", "Bethel"], verse: "Genesis 19:24 - Then the Lord rained down burning sulfur on Sodom and Gomorrah" },
  56: { question: "Who was turned into a pillar of salt?", options: ["Lot's wife", "Abraham's wife", "Lot's daughter", "Sarah"], verse: "Genesis 19:26 - Lot's wife looked back, and she became a pillar of salt" },
  57: { question: "How many wives did Jacob have?", options: ["1", "2", "3", "4"], verse: "Genesis 29-30 - Leah, Rachel, Bilhah and Zilpah" },
  58: { question: "How many years did Jacob work to have Rachel?", options: ["7", "10", "14", "20"], verse: "Genesis 29:20 - Jacob served seven years for Rachel" },
  59: { question: "What new name did God give to Jacob?", options: ["Abraham", "Israel", "Joseph", "Judah"], verse: "Genesis 32:28 - Your name will no longer be Jacob, but Israel" },
  60: { question: "How many sons did Joseph have?", options: ["1", "2", "3", "4"], verse: "Genesis 41:50-52 - Manasseh and Ephraim" },
  61: { question: "Who was the mother of Joseph's sons?", options: ["Asenath", "Rebecca", "Zilpah", "Bilhah"], verse: "Genesis 41:45 - He gave him Asenath as his wife" },
  62: { question: "How many of Joseph's brothers went to Egypt the first time?", options: ["9", "10", "11", "12"], verse: "Genesis 42:3 - Ten of Joseph's brothers went down" },
  63: { question: "Which brother was kept as a guarantee in Egypt?", options: ["Reuben", "Simeon", "Levi", "Judah"], verse: "Genesis 42:24 - He had Simeon taken from them and bound before their eyes" },
  64: { question: "How old was Joseph when he was sold?", options: ["15", "17", "19", "21"], verse: "Genesis 37:2 - Joseph, being seventeen years old" },
  65: { question: "How many years did the famine last in Egypt?", options: ["3", "5", "7", "10"], verse: "Genesis 41:29-30 - Seven years of great abundance... followed by seven years of famine" },
  66: { question: "How old was Joseph when he became governor?", options: ["25", "28", "30", "35"], verse: "Genesis 41:46 - Joseph was thirty years old" },
  67: { question: "Where was Joseph buried?", options: ["Egypt", "Canaan", "Shechem", "Bethel"], verse: "Joshua 24:32 - Joseph's bones... they buried at Shechem" },
  68: { question: "Who adopted Moses?", options: ["Pharaoh's daughter", "Pharaoh's wife", "A princess", "A maid"], verse: "Exodus 2:10 - When the child grew older, she brought him to Pharaoh's daughter" },
  69: { question: "Where did Moses flee after killing an Egyptian?", options: ["Canaan", "Midian", "Edom", "Moab"], verse: "Exodus 2:15 - Moses fled from Pharaoh and went to live in Midian" },
  70: { question: "Who was Moses' father-in-law?", options: ["Jethro", "Aaron", "Hur", "Caleb"], verse: "Exodus 3:1 - Moses was tending the flock of Jethro his father-in-law" },
  71: { question: "What was the name of Moses' wife?", options: ["Miriam", "Zipporah", "Deborah", "Hannah"], verse: "Exodus 2:21 - He gave Zipporah his daughter to Moses" },
  72: { question: "How many sons did Moses have?", options: ["1", "2", "3", "4"], verse: "Exodus 18:3-4 - Gershom and Eliezer" },
  73: { question: "How old was Moses when he spoke to Pharaoh?", options: ["40", "60", "80", "100"], verse: "Exodus 7:7 - Moses was eighty years old" },
  74: { question: "Who helped Moses keep his hands raised in battle?", options: ["Aaron and Joshua", "Aaron and Hur", "Joshua and Caleb", "Aaron and Caleb"], verse: "Exodus 17:12 - Aaron and Hur held his hands up" },
  75: { question: "Against whom did Israel fight in Rephidim?", options: ["Egyptians", "Amalekites", "Philistines", "Canaanites"], verse: "Exodus 17:8 - The Amalekites came and attacked the Israelites at Rephidim" },
  76: { question: "How many stone pillars did Moses erect?", options: ["10", "11", "12", "13"], verse: "Exodus 24:4 - He set up twelve stone pillars" },
  77: { question: "How many days did Moses stay on Mount Sinai?", options: ["30", "40", "50", "60"], verse: "Exodus 24:18 - Moses was on the mountain forty days and forty nights" },
  78: { question: "Who made the golden calf?", options: ["The people", "Aaron", "Moses", "Hur"], verse: "Exodus 32:4 - He took what they handed him and made it with a tool" },
  79: { question: "Which tribe was chosen to serve in the tabernacle?", options: ["Judah", "Levi", "Benjamin", "Ephraim"], verse: "Numbers 3:12 - I have taken the Levites" },
  80: { question: "How old were the Levites when they served in the tabernacle?", options: ["20 to 50", "25 to 50", "30 to 50", "25 to 60"], verse: "Numbers 8:24 - From twenty-five years old" },
  81: { question: "Who was bitten by serpents in the desert?", options: ["Only the leaders", "All the people", "Only the elders", "Only the young"], verse: "Numbers 21:6 - The Lord sent venomous snakes among them" },
  82: { question: "What did Moses lift up to heal the people from the serpents?", options: ["A cross", "A bronze serpent", "A golden serpent", "A staff"], verse: "Numbers 21:9 - Moses made a bronze snake" },
  83: { question: "How many daughters did Lot have?", options: ["1", "2", "3", "4"], verse: "Genesis 19:15 - Take your wife and your two daughters" },
  84: { question: "Who was Lot's father?", options: ["Abraham", "Terah", "Haran", "Nahor"], verse: "Genesis 11:27 - Haran became the father of Lot" },
  85: { question: "What city did Lot choose to live in?", options: ["Bethel", "Sodom", "Gomorrah", "Zoar"], verse: "Genesis 13:12 - Lot lived among the cities of the plain and pitched his tents near Sodom" },
  86: { question: "Who was Abraham's grandson through Keturah?", options: ["Midian", "Ishmael", "Isaac", "Esau"], verse: "Genesis 25:2 - She bore him... Midian" },
  87: { question: "How many camels did Abraham's servant take to find a wife for Isaac?", options: ["5", "7", "10", "12"], verse: "Genesis 24:10 - He took ten camels" },
  88: { question: "Where was Rebecca when she met Abraham's servant?", options: ["At the well", "In the tent", "In the field", "At the market"], verse: "Genesis 24:11 - He had the camels kneel down near the well" },
  89: { question: "Who was Rebecca's brother?", options: ["Abraham", "Isaac", "Laban", "Esau"], verse: "Genesis 24:29 - Now Rebekah had a brother named Laban" },
  90: { question: "How many years was Rebecca barren?", options: ["10", "15", "20", "25"], verse: "Genesis 25:20-26 - Calculated by Isaac's age" },
  91: { question: "Which son did Rebecca love more?", options: ["Esau", "Jacob", "Both equally", "Neither"], verse: "Genesis 25:28 - But Rebekah loved Jacob" },
  92: { question: "Where did Rebecca send Jacob to flee?", options: ["Egypt", "Canaan", "Haran", "Edom"], verse: "Genesis 27:43 - Flee at once to my brother Laban in Haran" },
  93: { question: "What did Jacob see on the ladder in his dream?", options: ["People", "Angels", "Animals", "Prophets"], verse: "Genesis 28:12 - The angels of God were ascending and descending on it" },
  94: { question: "How many years did Jacob work for his wives?", options: ["7", "14", "20", "21"], verse: "Genesis 29:20-30 - Seven for Rachel, but received Leah; then seven more" },
  95: { question: "Who was Leah's maidservant?", options: ["Bilhah", "Zilpah", "Hagar", "Keturah"], verse: "Genesis 29:24 - Laban gave his servant Zilpah to Leah" },
  96: { question: "Who was Rachel's maidservant?", options: ["Bilhah", "Zilpah", "Hagar", "Keturah"], verse: "Genesis 29:29 - Laban gave his servant Bilhah to his daughter Rachel" },
  97: { question: "Who was Rachel's first son?", options: ["Reuben", "Joseph", "Benjamin", "Dan"], verse: "Genesis 30:24 - She named him Joseph" },
  98: { question: "Where did Rachel die?", options: ["Egypt", "Haran", "On the way to Bethlehem", "Canaan"], verse: "Genesis 35:19 - Rachel died and was buried on the way to Ephrath (that is, Bethlehem)" },
  99: { question: "What problem did Leah have?", options: ["She was lame", "She had weak eyes", "She was deaf", "She was mute"], verse: "Genesis 29:17 - Leah had weak eyes" }
};

const baseTranslationsES = {
  // PENTATEUCO - FÁCIL (0-49)
  0: { question: "¿Quién construyó el arca?", options: ["Moisés", "Noé", "Abraham", "David"], verse: "Génesis 6:14 - Hazte un arca de madera de gofer" },
  1: { question: "¿Cuál es el primer libro de la Biblia?", options: ["Éxodo", "Levítico", "Génesis", "Mateo"], verse: "Génesis 1:1 - En el principio creó Dios los cielos y la tierra" },
  2: { question: "¿Quién recibió los Diez Mandamientos?", options: ["Abraham", "Moisés", "David", "Elías"], verse: "Éxodo 20:1 - Y habló Dios todas estas palabras" },
  3: { question: "¿En cuántos días creó Dios el mundo?", options: ["5", "6", "7", "8"], verse: "Génesis 1:31 - Y vio Dios todo lo que había hecho, y era bueno en gran manera" },
  4: { question: "¿Quién fue el primer hombre creado por Dios?", options: ["Noé", "Adán", "Abel", "Caín"], verse: "Génesis 2:7 - Entonces Jehová Dios formó al hombre del polvo de la tierra" },
  5: { question: "¿Quién fue la primera mujer creada?", options: ["Sara", "Rebeca", "Eva", "María"], verse: "Génesis 3:20 - Y llamó Adán el nombre de su mujer, Eva" },
  6: { question: "¿De qué descansó Dios en el séptimo día?", options: ["De la creación", "De las guerras", "De los juicios", "De las plagas"], verse: "Génesis 2:2 - Y acabó Dios en el día séptimo la obra que hizo" },
  7: { question: "¿Quién tuvo la túnica de muchos colores?", options: ["José", "Benjamín", "Judá", "Rubén"], verse: "Génesis 37:3 - Y amaba Israel a José más que a todos sus hijos" },
  8: { question: "¿Cuántos hijos tuvo Jacob?", options: ["10", "11", "12", "13"], verse: "Génesis 35:22 - Y fueron los hijos de Jacob doce" },
  9: { question: "¿Dónde recibió Moisés los Diez Mandamientos?", options: ["Monte Sinaí", "Monte Carmelo", "Monte de los Olivos", "Monte Sion"], verse: "Éxodo 19:20 - Y descendió Jehová sobre el monte Sinaí" },
  10: { question: "¿Qué usó Dios para separar el Mar Rojo?", options: ["Una espada", "Un viento fuerte", "Una vara", "Truenos"], verse: "Éxodo 14:21 - Jehová hizo que el mar se retirase con un recio viento oriental" },
  11: { question: "¿Quién fue vendido como esclavo en Egipto?", options: ["Benjamín", "José", "Simeón", "Leví"], verse: "Génesis 37:28 - Y vendieron a José a los ismaelitas por veinte piezas de plata" },
  12: { question: "¿Qué animal habló con Balaam?", options: ["Un camello", "Una asna", "Un caballo", "Una oveja"], verse: "Números 22:28 - Entonces Jehová abrió la boca de la asna" },
  13: { question: "¿Cuántos años tenía Moisés cuando murió?", options: ["100", "110", "120", "130"], verse: "Deuteronomio 34:7 - Era Moisés de edad de ciento veinte años" },
  14: { question: "¿Quién fue el hermano de Moisés?", options: ["Josué", "Aarón", "Caleb", "Hur"], verse: "Éxodo 4:14 - Aarón el levita es tu hermano" },
  15: { question: "¿Qué tipo de árbol había en el Jardín del Edén?", options: ["Árbol de la vida", "Árbol de la muerte", "Árbol de la sabiduría", "Árbol de la paz"], verse: "Génesis 2:9 - Y el árbol de la vida en medio del huerto" },
  16: { question: "¿Quién engañó a Esaú por la primogenitura?", options: ["Isaac", "José", "Jacob", "Labán"], verse: "Génesis 27:36 - ¿No tiene razón su nombre Jacob?" },
  17: { question: "¿Cuántas plagas envió Dios a Egipto?", options: ["7", "10", "12", "15"], verse: "Éxodo 7-12 - Las diez plagas de Egipto" },
  18: { question: "¿Qué comió el pueblo en el desierto?", options: ["Pan", "Maná", "Carne", "Frutas"], verse: "Éxodo 16:31 - Y la casa de Israel lo llamó Maná" },
  19: { question: "¿Quién fue el padre de Abraham?", options: ["Taré", "Nacor", "Harán", "Lot"], verse: "Génesis 11:27 - Estas son las generaciones de Taré: Taré engendró a Abram" },
  20: { question: "¿Cómo se llamaba la esposa de Abraham?", options: ["Rebeca", "Sara", "Raquel", "Lea"], verse: "Génesis 17:15 - Y dijo Dios a Abraham: A Sarai tu mujer" },
  21: { question: "¿Quién luchó con el ángel?", options: ["Isaac", "Jacob", "José", "Esaú"], verse: "Génesis 32:24 - Jacob quedó solo; y luchó con él un varón" },
  22: { question: "¿Cuántos hijos de Adán y Eva son mencionados?", options: ["2", "3", "4", "5"], verse: "Génesis 4:25 - Y conoció de nuevo Adán a su mujer, y ella dio a luz un hijo" },
  23: { question: "¿Quién mató a Abel?", options: ["Adán", "Set", "Caín", "Enoc"], verse: "Génesis 4:8 - Y estando en el campo, Caín se levantó contra su hermano Abel" },
  24: { question: "¿Cuántas tablas recibió Moisés?", options: ["1", "2", "3", "4"], verse: "Éxodo 31:18 - Y dio a Moisés dos tablas del testimonio" },
  25: { question: "¿Cuál era la profesión de Abel?", options: ["Agricultor", "Pastor de ovejas", "Pescador", "Carpintero"], verse: "Génesis 4:2 - Y Abel fue pastor de ovejas" },
  26: { question: "¿Cuál era la profesión de Caín?", options: ["Pastor", "Labrador de la tierra", "Pescador", "Constructor"], verse: "Génesis 4:2 - Y Caín fue labrador de la tierra" },
  27: { question: "¿Cuántos años tenía Noé cuando entró en el arca?", options: ["500", "550", "600", "650"], verse: "Génesis 7:6 - Era Noé de seiscientos años" },
  28: { question: "¿Cuántos días llovió durante el diluvio?", options: ["30", "40", "50", "60"], verse: "Génesis 7:12 - Y hubo lluvia sobre la tierra cuarenta días y cuarenta noches" },
  29: { question: "¿Qué trajo la paloma a Noé?", options: ["Una rama de olivo", "Una hoja", "Una flor", "Un fruto"], verse: "Génesis 8:11 - La paloma volvió a él a la tarde con una hoja de olivo" },
  30: { question: "¿Cuál fue la señal del pacto de Dios con Noé?", options: ["Una estrella", "Un arco iris", "Una nube", "Un trueno"], verse: "Génesis 9:13 - Mi arco he puesto en las nubes" },
  31: { question: "¿Qué estaba dispuesto a sacrificar Abraham?", options: ["Un cordero", "Su hijo Isaac", "Una oveja", "Su siervo"], verse: "Génesis 22:2 - Toma ahora tu hijo, tu único hijo Isaac" },
  32: { question: "¿Quién era el siervo de Abraham?", options: ["Elías", "Eliseo", "Eliezer", "Eleazar"], verse: "Génesis 15:2 - El mayordomo de mi casa es Eliezer de Damasco" },
  33: { question: "¿Qué le dio Jacob a José además de otras cosas?", options: ["Un cayado", "Una túnica colorida", "Una espada", "Un anillo"], verse: "Génesis 37:3 - E hizo para él una túnica de diversos colores" },
  34: { question: "¿Quién interpretó los sueños del Faraón?", options: ["Daniel", "José", "Moisés", "Samuel"], verse: "Génesis 41:15 - Y dijo Faraón a José: Yo he tenido un sueño" },
  35: { question: "¿Dónde fue encontrado Moisés?", options: ["En el desierto", "En una canasta en el río", "En una cueva", "En una tienda"], verse: "Éxodo 2:3 - Tomó una arquilla de juncos y la calafateó con asfalto y brea" },
  36: { question: "¿Quién fue la hermana de Moisés?", options: ["Débora", "Raquel", "María", "Rut"], verse: "Éxodo 15:20 - Entonces María la profetisa, hermana de Aarón" },
  37: { question: "¿Qué mostró Dios a Moisés en la zarza ardiente?", options: ["Un ángel", "Su gloria", "Su presencia", "Un milagro"], verse: "Éxodo 3:2 - Y se le apareció el ángel de Jehová en una llama de fuego" },
  38: { question: "¿Cuál fue la primera plaga de Egipto?", options: ["Ranas", "Moscas", "Agua en sangre", "Piojos"], verse: "Éxodo 7:20 - Y todas las aguas del río se convirtieron en sangre" },
  39: { question: "¿Cuál fue la última plaga de Egipto?", options: ["Oscuridad", "Muerte de los primogénitos", "Langostas", "Granizo"], verse: "Éxodo 11:5 - Y morirá todo primogénito en tierra de Egipto" },
  40: { question: "¿Por dónde pasaron los israelitas?", options: ["Río Jordán", "Mar Rojo", "Mar Muerto", "Río Nilo"], verse: "Éxodo 14:22 - Los hijos de Israel entraron por en medio del mar en seco" },
  41: { question: "¿Cuántos mandamientos dio Dios?", options: ["5", "7", "10", "12"], verse: "Éxodo 20:1-17 - Los Diez Mandamientos" },
  42: { question: "¿Qué hizo el pueblo mientras Moisés estaba en el monte?", options: ["Oraron", "Ayunaron", "Hicieron un becerro de oro", "Durmieron"], verse: "Éxodo 32:4 - Y él los tomó de las manos de ellos y formó un becerro de fundición" },
  43: { question: "¿Quién fue el sucesor de Moisés?", options: ["Caleb", "Aarón", "Josué", "Eleazar"], verse: "Deuteronomio 31:7 - Y llamó Moisés a Josué" },
  44: { question: "¿Cuántos espías fueron enviados a Canaán?", options: ["10", "12", "15", "20"], verse: "Números 13:2 - Envía hombres que reconozcan la tierra de Canaán" },
  45: { question: "¿Cuántos espías trajeron buen informe?", options: ["1", "2", "3", "4"], verse: "Números 14:6 - Y Josué hijo de Nun y Caleb hijo de Jefone" },
  46: { question: "¿Cuántos años anduvo Israel en el desierto?", options: ["20", "30", "40", "50"], verse: "Números 14:33 - Y vuestros hijos andarán pastoreando en el desierto cuarenta años" },
  47: { question: "¿Quién era la esposa de Isaac?", options: ["Sara", "Rebeca", "Raquel", "Lea"], verse: "Génesis 24:67 - E Isaac la trajo a la tienda, y tomó a Rebeca" },
  48: { question: "¿Quiénes eran los hijos gemelos de Isaac?", options: ["Caín y Abel", "Jacob y Esaú", "José y Benjamín", "Efraín y Manasés"], verse: "Génesis 25:25-26 - Y salió el primero rubio, y era todo velludo como una pelliza" },
  49: { question: "¿Por qué vendió Esaú su primogenitura?", options: ["Pan y agua", "Pan y guisado", "Carne y vino", "Frutas y miel"], verse: "Génesis 25:34 - Entonces Jacob dio a Esaú pan y del guisado de las lentejas" },
  // PENTATEUCO - MÉDIO (50-99)
  50: { question: "¿Cuántos hijos tuvo Jacob con Lea?", options: ["4", "5", "6", "7"], verse: "Génesis 29-30 - Los hijos de Lea" },
  51: { question: "¿Cuál es el nombre del monte donde Abraham casi sacrificó a Isaac?", options: ["Monte Sinaí", "Monte Moriah", "Monte Nebo", "Monte Carmelo"], verse: "Génesis 22:2 - Y vete a tierra de Moriah" },
  52: { question: "¿Cuántos años tenía Sara cuando tuvo a Isaac?", options: ["80", "85", "90", "95"], verse: "Génesis 17:17 - ¿Dará a luz Sara, siendo de noventa años?" },
  53: { question: "¿Quién fue la madre de Ismael?", options: ["Sara", "Agar", "Cetura", "Betsabé"], verse: "Génesis 16:15 - Y Agar dio a luz un hijo a Abram" },
  54: { question: "¿Cuántos años tenía Abraham cuando nació Isaac?", options: ["90", "95", "100", "105"], verse: "Génesis 21:5 - Y era Abraham de cien años" },
  55: { question: "¿Qué ciudad destruyó Dios junto con Sodoma?", options: ["Jericó", "Gomorra", "Hai", "Betel"], verse: "Génesis 19:24 - Entonces Jehová hizo llover azufre y fuego sobre Sodoma y Gomorra" },
  56: { question: "¿Quién fue convertida en estatua de sal?", options: ["La esposa de Lot", "La esposa de Abraham", "La hija de Lot", "Sara"], verse: "Génesis 19:26 - La mujer de Lot miró atrás, y se volvió estatua de sal" },
  57: { question: "¿Cuántas esposas tuvo Jacob?", options: ["1", "2", "3", "4"], verse: "Génesis 29-30 - Lea, Raquel, Bilha y Zilpa" },
  58: { question: "¿Por cuántos años trabajó Jacob para tener a Raquel?", options: ["7", "10", "14", "20"], verse: "Génesis 29:20 - Así sirvió Jacob por Raquel siete años" },
  59: { question: "¿Qué nuevo nombre le dio Dios a Jacob?", options: ["Abraham", "Israel", "José", "Judá"], verse: "Génesis 32:28 - No se dirá más tu nombre Jacob, sino Israel" },
  60: { question: "¿Cuántos hijos tuvo José?", options: ["1", "2", "3", "4"], verse: "Génesis 41:50-52 - Manasés y Efraín" },
  61: { question: "¿Quién fue la madre de los hijos de José?", options: ["Asenat", "Rebeca", "Zilpa", "Bilha"], verse: "Génesis 41:45 - Y le dio por mujer a Asenat" },
  62: { question: "¿Cuántos hermanos de José fueron a Egipto la primera vez?", options: ["9", "10", "11", "12"], verse: "Génesis 42:3 - Entonces descendieron diez hermanos de José" },
  63: { question: "¿Qué hermano quedó preso en Egipto como garantía?", options: ["Rubén", "Simeón", "Leví", "Judá"], verse: "Génesis 42:24 - Y tomó a Simeón de entre ellos, y le aprisionó a vista de ellos" },
  64: { question: "¿Cuántos años tenía José cuando fue vendido?", options: ["15", "17", "19", "21"], verse: "Génesis 37:2 - Siendo José de diecisiete años" },
  65: { question: "¿Cuántos años duró el hambre en Egipto?", options: ["3", "5", "7", "10"], verse: "Génesis 41:29-30 - He aquí vienen siete años de gran abundancia... y vendrán siete años de hambre" },
  66: { question: "¿Cuántos años tenía José cuando se convirtió en gobernador?", options: ["25", "28", "30", "35"], verse: "Génesis 41:46 - Era José de edad de treinta años" },
  67: { question: "¿Dónde fue enterrado José?", options: ["Egipto", "Canaán", "Siquem", "Betel"], verse: "Josué 24:32 - Los huesos de José... los enterraron en Siquem" },
  68: { question: "¿Quién adoptó a Moisés?", options: ["La hija del Faraón", "La esposa del Faraón", "Una princesa", "Una sierva"], verse: "Éxodo 2:10 - Y cuando el niño creció, ella lo trajo a la hija del Faraón" },
  69: { question: "¿A dónde huyó Moisés después de matar a un egipcio?", options: ["Canaán", "Madián", "Edom", "Moab"], verse: "Éxodo 2:15 - Y Moisés huyó de delante del Faraón, y habitó en tierra de Madián" },
  70: { question: "¿Quién era el suegro de Moisés?", options: ["Jetro", "Aarón", "Hur", "Caleb"], verse: "Éxodo 3:1 - Y apacentaba Moisés las ovejas de Jetro su suegro" },
  71: { question: "¿Cuál era el nombre de la esposa de Moisés?", options: ["María", "Séfora", "Débora", "Ana"], verse: "Éxodo 2:21 - Y dio su hija Séfora a Moisés" },
  72: { question: "¿Cuántos hijos tuvo Moisés?", options: ["1", "2", "3", "4"], verse: "Éxodo 18:3-4 - Gersón y Eliezer" },
  73: { question: "¿Cuál era la edad de Moisés cuando habló con el Faraón?", options: ["40", "60", "80", "100"], verse: "Éxodo 7:7 - Y Moisés era de edad de ochenta años" },
  74: { question: "¿Quién ayudó a Moisés a mantener las manos en alto en la batalla?", options: ["Aarón y Josué", "Aarón y Hur", "Josué y Caleb", "Aarón y Caleb"], verse: "Éxodo 17:12 - Aarón y Hur sostenían sus manos" },
  75: { question: "¿Contra quién luchó Israel en Refidim?", options: ["Egipcios", "Amalecitas", "Filisteos", "Cananeos"], verse: "Éxodo 17:8 - Entonces vino Amalec y peleó contra Israel en Refidim" },
  76: { question: "¿Cuántas columnas de piedra erigió Moisés?", options: ["10", "11", "12", "13"], verse: "Éxodo 24:4 - Y levantó doce columnas" },
  77: { question: "¿Cuántos días estuvo Moisés en el Monte Sinaí?", options: ["30", "40", "50", "60"], verse: "Éxodo 24:18 - Y estuvo Moisés en el monte cuarenta días y cuarenta noches" },
  78: { question: "¿Quién hizo el becerro de oro?", options: ["El pueblo", "Aarón", "Moisés", "Hur"], verse: "Éxodo 32:4 - Y él los tomó de las manos de ellos, y lo formó con buril" },
  79: { question: "¿Qué tribu fue escogida para servir en el tabernáculo?", options: ["Judá", "Leví", "Benjamín", "Efraín"], verse: "Números 3:12 - He aquí, yo he tomado a los levitas" },
  80: { question: "¿A qué edad servían los levitas en el tabernáculo?", options: ["20 a 50", "25 a 50", "30 a 50", "25 a 60"], verse: "Números 8:24 - De veinticinco años arriba" },
  81: { question: "¿Quién fue mordido por las serpientes en el desierto?", options: ["Solo los líderes", "Todo el pueblo", "Solo los ancianos", "Solo los jóvenes"], verse: "Números 21:6 - Entonces Jehová envió entre el pueblo serpientes ardientes" },
  82: { question: "¿Qué levantó Moisés para sanar al pueblo de las serpientes?", options: ["Una cruz", "Una serpiente de bronce", "Una serpiente de oro", "Un cayado"], verse: "Números 21:9 - Y Moisés hizo una serpiente de bronce" },
  83: { question: "¿Cuántas hijas tuvo Lot?", options: ["1", "2", "3", "4"], verse: "Génesis 19:15 - Toma tu mujer y tus dos hijas" },
  84: { question: "¿Quién era el padre de Lot?", options: ["Abraham", "Taré", "Harán", "Nacor"], verse: "Génesis 11:27 - Harán engendró a Lot" },
  85: { question: "¿Qué ciudad escogió Lot para vivir?", options: ["Betel", "Sodoma", "Gomorra", "Zoar"], verse: "Génesis 13:12 - Y Lot habitó en las ciudades de la llanura, y plantó sus tiendas hasta Sodoma" },
  86: { question: "¿Quién era el nieto de Abraham a través de Cetura?", options: ["Madián", "Ismael", "Isaac", "Esaú"], verse: "Génesis 25:2 - Y ella le dio a luz... Madián" },
  87: { question: "¿Cuántos camellos llevó el siervo de Abraham para buscar esposa para Isaac?", options: ["5", "7", "10", "12"], verse: "Génesis 24:10 - Tomó diez camellos" },
  88: { question: "¿Dónde estaba Rebeca cuando encontró al siervo de Abraham?", options: ["En el pozo", "En la tienda", "En el campo", "En el mercado"], verse: "Génesis 24:11 - E hizo arrodillar los camellos fuera de la ciudad, junto a un pozo de agua" },
  89: { question: "¿Quién era el hermano de Rebeca?", options: ["Abraham", "Isaac", "Labán", "Esaú"], verse: "Génesis 24:29 - Y Rebeca tenía un hermano que se llamaba Labán" },
  90: { question: "¿Cuántos años fue Rebeca estéril?", options: ["10", "15", "20", "25"], verse: "Génesis 25:20-26 - Calculado por la edad de Isaac" },
  91: { question: "¿A qué hijo amaba más Rebeca?", options: ["Esaú", "Jacob", "Ambos por igual", "Ninguno"], verse: "Génesis 25:28 - Mas Rebeca amaba a Jacob" },
  92: { question: "¿A dónde mandó Rebeca a Jacob a huir?", options: ["Egipto", "Canaán", "Harán", "Edom"], verse: "Génesis 27:43 - Levántate y huye a casa de Labán mi hermano en Harán" },
  93: { question: "¿Qué vio Jacob en la escalera en su sueño?", options: ["Personas", "Ángeles", "Animales", "Profetas"], verse: "Génesis 28:12 - He aquí ángeles de Dios que subían y descendían por ella" },
  94: { question: "¿Cuántos años trabajó Jacob por sus esposas?", options: ["7", "14", "20", "21"], verse: "Génesis 29:20-30 - Siete por Raquel, pero recibió a Lea; luego siete más" },
  95: { question: "¿Quién era la sierva de Lea?", options: ["Bilha", "Zilpa", "Agar", "Cetura"], verse: "Génesis 29:24 - Y Labán dio su sierva Zilpa a Lea" },
  96: { question: "¿Quién era la sierva de Raquel?", options: ["Bilha", "Zilpa", "Agar", "Cetura"], verse: "Génesis 29:29 - Y Labán dio a Raquel su hija su sierva Bilha" },
  97: { question: "¿Quién fue el primer hijo de Raquel?", options: ["Rubén", "José", "Benjamín", "Dan"], verse: "Génesis 30:24 - Y llamó su nombre José" },
  98: { question: "¿Dónde murió Raquel?", options: ["Egipto", "Harán", "En el camino a Belén", "Canaán"], verse: "Génesis 35:19 - Y murió Raquel, y fue sepultada en el camino de Efrata, que es Belén" },
  99: { question: "¿Qué problema tenía Lea?", options: ["Era coja", "Tenía ojos tiernos", "Era sorda", "Era muda"], verse: "Génesis 29:17 - Lea tenía ojos tiernos" }
};

// Combinar todas as traduções de todos os chunks
const combinedTranslationsEN = {
  ...baseTranslationsEN, // 0-99
  ...pentateucoDificilTranslations.en, // 100-149
  ...pentateucoExpertTranslations.en, // 150-199
  ...outrasCategoriasTranslations.en // 200-261
};

const combinedTranslationsES = {
  ...baseTranslationsES, // 0-99
  ...pentateucoDificilTranslations.es, // 100-149
  ...pentateucoExpertTranslations.es, // 150-199
  ...outrasCategoriasTranslations.es // 200-261
};

// Exportar traduções completas (todas as 262 perguntas em 3 idiomas)
export const questionTranslations: QuestionTranslations = {
  en: combinedTranslationsEN,
  es: combinedTranslationsES
};
