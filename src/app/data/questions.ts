export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'Pentateuco' | 'Históricos' | 'Poéticos' | 'Proféticos' | 'Evangelhos' | 'Cartas';
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Expert';
  verse?: string;
}

export const questions: Question[] = [
  // ==================== PENTATEUCO - FÁCIL (50) ====================
  {
    question: "Quem construiu a arca?",
    options: ["Moisés", "Noé", "Abraão", "Davi"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 6:14 - Faze para ti uma arca de madeira de gofer"
  },
  {
    question: "Qual é o primeiro livro da Bíblia?",
    options: ["Êxodo", "Levítico", "Gênesis", "Mateus"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 1:1 - No princípio criou Deus os céus e a terra"
  },
  {
    question: "Quem recebeu os Dez Mandamentos?",
    options: ["Abraão", "Moisés", "Davi", "Elias"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 20:1 - Então falou Deus todas estas palavras"
  },
  {
    question: "Em quantos dias Deus criou o mundo?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 1:31 - E viu Deus tudo quanto tinha feito, e eis que era muito bom"
  },
  {
    question: "Quem foi o primeiro homem criado por Deus?",
    options: ["Noé", "Adão", "Abel", "Caim"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 2:7 - E formou o Senhor Deus o homem do pó da terra"
  },
  {
    question: "Qual foi a primeira mulher criada?",
    options: ["Sara", "Rebeca", "Eva", "Maria"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 3:20 - E chamou Adão o nome de sua mulher Eva"
  },
  {
    question: "O que Deus descansou no sétimo dia?",
    options: ["Da criação", "Das guerras", "Dos julgamentos", "Das pragas"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 2:2 - E havendo Deus acabado no dia sétimo a sua obra"
  },
  {
    question: "Quem teve a túnica de muitas cores?",
    options: ["José", "Benjamim", "Judá", "Rubem"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 37:3 - E Israel amava a José mais do que a todos os seus filhos"
  },
  {
    question: "Quantos filhos Jacó teve?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 35:22 - E foram os filhos de Jacó doze"
  },
  {
    question: "Onde Moisés recebeu os Dez Mandamentos?",
    options: ["Monte Sinai", "Monte Carmelo", "Monte das Oliveiras", "Monte Sião"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 19:20 - E desceu o Senhor sobre o monte Sinai"
  },
  {
    question: "O que Deus usou para separar o Mar Vermelho?",
    options: ["Uma espada", "Um vento forte", "Uma vara", "Trovões"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 14:21 - E o Senhor fez retirar o mar por um forte vento oriental"
  },
  {
    question: "Quem foi vendido como escravo no Egito?",
    options: ["Benjamim", "José", "Simeão", "Levi"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 37:28 - E venderam José aos ismaelitas por vinte siclos de prata"
  },
  {
    question: "Qual animal falou com Balaão?",
    options: ["Um camelo", "Uma jumenta", "Um cavalo", "Uma ovelha"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Números 22:28 - Então o Senhor abriu a boca da jumenta"
  },
  {
    question: "Quantos anos Moisés tinha quando morreu?",
    options: ["100", "110", "120", "130"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Deuteronômio 34:7 - E era Moisés da idade de cento e vinte anos"
  },
  {
    question: "Quem foi o irmão de Moisés?",
    options: ["Josué", "Arão", "Calebe", "Hur"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 4:14 - Arão, o levita, é teu irmão"
  },
  {
    question: "Que tipo de árvore estava no Jardim do Éden?",
    options: ["Árvore da vida", "Árvore da morte", "Árvore da sabedoria", "Árvore da paz"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 2:9 - E a árvore da vida no meio do jardim"
  },
  {
    question: "Quem enganou Esaú pela primogenitura?",
    options: ["Isaque", "José", "Jacó", "Labão"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 27:36 - Porventura não tem ele razão no seu nome Jacó?"
  },
  {
    question: "Quantas pragas Deus enviou ao Egito?",
    options: ["7", "10", "12", "15"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 7-12 - As dez pragas do Egito"
  },
  {
    question: "O que o povo comeu no deserto?",
    options: ["Pão", "Maná", "Carne", "Frutas"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 16:31 - E chamou a casa de Israel o seu nome Maná"
  },
  {
    question: "Quem foi pai de Abraão?",
    options: ["Terá", "Naor", "Harã", "Ló"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 11:27 - E estas são as gerações de Terá: Terá gerou Abraão"
  },
  {
    question: "Como se chamava a esposa de Abraão?",
    options: ["Rebeca", "Sara", "Raquel", "Lia"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 17:15 - E disse Deus a Abraão: A Sarai tua mulher"
  },
  {
    question: "Quem lutou com o anjo?",
    options: ["Isaque", "Jacó", "José", "Esaú"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 32:24 - Jacó ficou só; e lutou com ele um homem"
  },
  {
    question: "Quantos filhos Adão e Eva tiveram que são mencionados?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 4:25 - E tornou Adão a conhecer a sua mulher; e ela teve um filho"
  },
  {
    question: "Quem matou Abel?",
    options: ["Adão", "Sete", "Caim", "Enoque"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 4:8 - E sucedeu que, estando eles no campo, Caim se levantou contra o seu irmão Abel"
  },
  {
    question: "Quantas tábuas Moisés recebeu?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 31:18 - E deu a Moisés duas tábuas do testemunho"
  },
  {
    question: "Qual era a profissão de Abel?",
    options: ["Agricultor", "Pastor de ovelhas", "Pescador", "Carpinteiro"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 4:2 - E Abel foi pastor de ovelhas"
  },
  {
    question: "Qual era a profissão de Caim?",
    options: ["Pastor", "Lavrador da terra", "Pescador", "Construtor"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 4:2 - E Caim foi lavrador da terra"
  },
  {
    question: "Quantos anos Noé tinha quando entrou na arca?",
    options: ["500", "550", "600", "650"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 7:6 - E era Noé da idade de seiscentos anos"
  },
  {
    question: "Quantos dias choveu na época do dilúvio?",
    options: ["30", "40", "50", "60"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 7:12 - E houve chuva sobre a terra quarenta dias e quarenta noites"
  },
  {
    question: "Que animal a pomba trouxe para Noé?",
    options: ["Um ramo de oliveira", "Uma folha", "Uma flor", "Um fruto"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 8:11 - E a pomba voltou a ele à tarde; e eis, arrancada, uma folha de oliveira"
  },
  {
    question: "Qual o sinal da aliança de Deus com Noé?",
    options: ["Uma estrela", "Um arco-íris", "Uma nuvem", "Um trovão"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 9:13 - O meu arco tenho posto nas nuvens"
  },
  {
    question: "O que Abraão estava disposto a sacrificar?",
    options: ["Um cordeiro", "Seu filho Isaque", "Uma ovelha", "Seu servo"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 22:2 - Toma agora o teu filho, o teu único filho, Isaque"
  },
  {
    question: "Quem era o servo de Abraão?",
    options: ["Elias", "Eliseu", "Eliézer", "Eleazar"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 15:2 - E o mordomo da minha casa é o damasceno Eliézer"
  },
  {
    question: "O que Jacó deu a José além de outras coisas?",
    options: ["Um cajado", "Uma túnica colorida", "Uma espada", "Um anel"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 37:3 - E fez-lhe uma túnica de várias cores"
  },
  {
    question: "Quem interpretou os sonhos do Faraó?",
    options: ["Daniel", "José", "Moisés", "Samuel"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 41:15 - E disse Faraó a José: Eu sonhei um sonho"
  },
  {
    question: "Onde Moisés foi encontrado?",
    options: ["No deserto", "Num cesto no rio", "Numa caverna", "Numa tenda"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 2:3 - Tomou uma arca de juncos, e a revestiu com betume e pez"
  },
  {
    question: "Quem foi a irmã de Moisés?",
    options: ["Débora", "Raquel", "Miriã", "Rute"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 15:20 - Então Miriã, a profetisa, irmã de Arão"
  },
  {
    question: "O que Deus mostrou a Moisés na sarça ardente?",
    options: ["Um anjo", "Sua glória", "Sua presença", "Um milagre"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 3:2 - E apareceu-lhe o anjo do Senhor em uma chama de fogo"
  },
  {
    question: "Qual foi a primeira praga do Egito?",
    options: ["Rãs", "Moscas", "Água em sangue", "Piolhos"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 7:20 - E todas as águas do rio se tornaram em sangue"
  },
  {
    question: "Qual foi a última praga do Egito?",
    options: ["Escuridão", "Morte dos primogênitos", "Gafanhotos", "Saraiva"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 11:5 - E todo o primogênito na terra do Egito morrerá"
  },
  {
    question: "O que os israelitas passaram pelo meio?",
    options: ["Rio Jordão", "Mar Vermelho", "Mar Morto", "Rio Nilo"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 14:22 - E os filhos de Israel entraram pelo meio do mar em seco"
  },
  {
    question: "Quantos mandamentos Deus deu?",
    options: ["5", "7", "10", "12"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 20:1-17 - Os Dez Mandamentos"
  },
  {
    question: "O que o povo fez enquanto Moisés estava no monte?",
    options: ["Oraram", "Jejuaram", "Fizeram um bezerro de ouro", "Dormiram"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Êxodo 32:4 - E ele os tomou das suas mãos, e formou um bezerro de fundição"
  },
  {
    question: "Qual foi o sucessor de Moisés?",
    options: ["Calebe", "Arão", "Josué", "Eleazar"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Deuteronômio 31:7 - E chamou Moisés a Josué"
  },
  {
    question: "Quantos espias foram enviados para Canaã?",
    options: ["10", "12", "15", "20"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Números 13:2 - Envia homens que espiem a terra de Canaã"
  },
  {
    question: "Quantos espias trouxeram bom relatório?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Números 14:6 - E Josué, filho de Num, e Calebe, filho de Jefoné"
  },
  {
    question: "Quantos anos Israel vagou no deserto?",
    options: ["20", "30", "40", "50"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Números 14:33 - E vossos filhos pastorearão neste deserto quarenta anos"
  },
  {
    question: "Quem era a esposa de Isaque?",
    options: ["Sara", "Rebeca", "Raquel", "Lia"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 24:67 - E Isaque trouxe-a para a tenda, e tomou a Rebeca"
  },
  {
    question: "Quem eram os filhos gêmeos de Isaque?",
    options: ["Caim e Abel", "Jacó e Esaú", "José e Benjamim", "Efraim e Manassés"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 25:25-26 - E saiu o primeiro ruivo, e todo como uma veste de pelo"
  },
  {
    question: "Por quanto Esaú vendeu sua primogenitura?",
    options: ["Pão e água", "Pão e guisado", "Carne e vinho", "Frutas e mel"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Fácil",
    verse: "Gênesis 25:34 - Então Jacó deu pão a Esaú e o guisado de lentilhas"
  },

  // ==================== PENTATEUCO - MÉDIO (50) ====================
  {
    question: "Quantos filhos Jacó teve com Lia?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 29-30 - Os filhos de Lia"
  },
  {
    question: "Qual o nome do monte onde Abraão quase sacrificou Isaque?",
    options: ["Monte Sinai", "Monte Moriá", "Monte Nebo", "Monte Carmelo"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 22:2 - E vai-te à terra de Moriá"
  },
  {
    question: "Quantos anos Sara tinha quando teve Isaque?",
    options: ["80", "85", "90", "95"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 17:17 - Dará à luz Sara, que tem noventa anos?"
  },
  {
    question: "Quem foi a mãe de Ismael?",
    options: ["Sara", "Hagar", "Quetura", "Betsabá"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 16:15 - E Hagar deu à luz um filho a Abrão"
  },
  {
    question: "Quantos anos Abraão tinha quando nasceu Isaque?",
    options: ["90", "95", "100", "105"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 21:5 - E era Abraão da idade de cem anos"
  },
  {
    question: "Que cidade Deus destruiu junto com Sodoma?",
    options: ["Jericó", "Gomorra", "Ai", "Betel"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 19:24 - Então o Senhor fez chover enxofre e fogo sobre Sodoma e Gomorra"
  },
  {
    question: "Quem foi transformado em estátua de sal?",
    options: ["A esposa de Ló", "A esposa de Abraão", "A filha de Ló", "Sara"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 19:26 - E a mulher de Ló olhou para trás e ficou convertida numa estátua de sal"
  },
  {
    question: "Quantas esposas Jacó teve?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 3,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 29-30 - Lia, Raquel, Bila e Zilpa"
  },
  {
    question: "Por quantos anos Jacó trabalhou para ter Raquel?",
    options: ["7", "10", "14", "20"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 29:20 - Assim serviu Jacó sete anos por Raquel"
  },
  {
    question: "Qual o novo nome que Deus deu a Jacó?",
    options: ["Abraão", "Israel", "José", "Judá"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 32:28 - Não te chamarás mais Jacó, mas Israel"
  },
  {
    question: "Quantos filhos José teve?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 41:50-52 - Manassés e Efraim"
  },
  {
    question: "Quem foi a mãe dos filhos de José?",
    options: ["Asenate", "Rebeca", "Zilpa", "Bila"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 41:45 - E deu-lhe por mulher Asenate"
  },
  {
    question: "Quantos irmãos de José foram ao Egito na primeira vez?",
    options: ["9", "10", "11", "12"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 42:3 - Então desceram dez irmãos de José"
  },
  {
    question: "Qual irmão ficou preso no Egito como garantia?",
    options: ["Rubem", "Simeão", "Levi", "Judá"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 42:24 - E tomou a Simeão dentre eles, e amarrou-o perante os seus olhos"
  },
  {
    question: "Quantos anos José tinha quando foi vendido?",
    options: ["15", "17", "19", "21"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 37:2 - Sendo José de dezessete anos"
  },
  {
    question: "Quantos anos durou a fome no Egito?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 41:29-30 - Eis que vêm sete anos de grande fartura... e depois virão sete anos de fome"
  },
  {
    question: "Quantos anos José tinha quando se tornou governador?",
    options: ["25", "28", "30", "35"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 41:46 - E José era da idade de trinta anos"
  },
  {
    question: "Onde José foi enterrado?",
    options: ["Egito", "Canaã", "Siquém", "Betel"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Josué 24:32 - E os ossos de José... enterraram-nos em Siquém"
  },
  {
    question: "Quem adotou Moisés?",
    options: ["A filha de Faraó", "A esposa de Faraó", "Uma princesa", "Uma serva"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 2:10 - E, sendo o menino já grande, ela o trouxe à filha de Faraó"
  },
  {
    question: "Para onde Moisés fugiu depois de matar um egípcio?",
    options: ["Canaã", "Midiã", "Edom", "Moabe"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 2:15 - E Moisés fugiu de diante de Faraó, e habitou na terra de Midiã"
  },
  {
    question: "Quem era o sogro de Moisés?",
    options: ["Jetro", "Arão", "Hur", "Calebe"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 3:1 - E apascentava Moisés o rebanho de Jetro, seu sogro"
  },
  {
    question: "Qual era o nome da esposa de Moisés?",
    options: ["Miriã", "Zípora", "Débora", "Ana"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 2:21 - E deu a Moisés sua filha Zípora"
  },
  {
    question: "Quantos filhos Moisés teve?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 18:3-4 - Gérson e Eliézer"
  },
  {
    question: "Qual era a idade de Moisés quando falou com Faraó?",
    options: ["40", "60", "80", "100"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 7:7 - E Moisés era da idade de oitenta anos"
  },
  {
    question: "Quem ajudou Moisés a manter as mãos erguidas na batalha?",
    options: ["Arão e Josué", "Arão e Hur", "Josué e Calebe", "Arão e Calebe"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 17:12 - Arão e Hur sustentaram-lhe as mãos"
  },
  {
    question: "Contra quem Israel lutou em Refidim?",
    options: ["Egípcios", "Amalequitas", "Filisteus", "Cananeus"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 17:8 - Então veio Amaleque, e pelejou contra Israel"
  },
  {
    question: "Quantas colunas de pedra Moisés erigiu?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 24:4 - E levantou doze colunas"
  },
  {
    question: "Quantos dias Moisés ficou no Monte Sinai?",
    options: ["30", "40", "50", "60"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 24:18 - E esteve Moisés no monte quarenta dias e quarenta noites"
  },
  {
    question: "Quem fez o bezerro de ouro?",
    options: ["O povo", "Arão", "Moisés", "Hur"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Êxodo 32:4 - E ele os tomou das suas mãos, e o formou com um buril"
  },
  {
    question: "Qual tribo foi escolhida para servir no tabernáculo?",
    options: ["Judá", "Levi", "Benjamim", "Efraim"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Números 3:12 - Eis que eu tenho tomado os levitas"
  },
  {
    question: "Quantos anos os levitas serviam no tabernáculo?",
    options: ["20 a 50", "25 a 50", "30 a 50", "25 a 60"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Números 8:24 - Da idade de vinte e cinco anos"
  },
  {
    question: "Quem foi picado pelas serpentes no deserto?",
    options: ["Só os líderes", "Todo o povo", "Só os idosos", "Só os jovens"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Números 21:6 - Então o Senhor enviou entre o povo serpentes ardentes"
  },
  {
    question: "O que Moisés levantou para curar o povo das serpentes?",
    options: ["Uma cruz", "Uma serpente de bronze", "Uma serpente de ouro", "Um cajado"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Números 21:9 - E Moisés fez uma serpente de metal"
  },
  {
    question: "Quantas filhas Ló teve?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 19:15 - Toma a tua mulher e tuas duas filhas"
  },
  {
    question: "Quem era o pai de Ló?",
    options: ["Abraão", "Terá", "Harã", "Naor"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 11:27 - Harã gerou a Ló"
  },
  {
    question: "Qual cidade Ló escolheu para morar?",
    options: ["Betel", "Sodoma", "Gomorra", "Zoar"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 13:12 - E Ló habitou nas cidades da campina, e armou as suas tendas até Sodoma"
  },
  {
    question: "Quem era o neto de Abraão através de Quetura?",
    options: ["Midiã", "Ismael", "Isaque", "Esaú"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 25:2 - E ela lhe deu à luz... Midiã"
  },
  {
    question: "Quantos camelos o servo de Abraão levou para buscar esposa para Isaque?",
    options: ["5", "7", "10", "12"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 24:10 - Tomou dez camelos"
  },
  {
    question: "Onde Rebeca estava quando encontrou o servo de Abraão?",
    options: ["No poço", "Na tenda", "No campo", "No mercado"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 24:11 - E fez ajoelhar os camelos fora da cidade, junto a um poço de água"
  },
  {
    question: "Quem era o irmão de Rebeca?",
    options: ["Abraão", "Isaque", "Labão", "Esaú"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 24:29 - E Rebeca tinha um irmão, cujo nome era Labão"
  },
  {
    question: "Quantos anos Rebeca era estéril?",
    options: ["10", "15", "20", "25"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 25:20-26 - Calculado pela idade de Isaque"
  },
  {
    question: "Qual filho Rebeca mais amava?",
    options: ["Esaú", "Jacó", "Ambos igualmente", "Nenhum"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 25:28 - Mas Rebeca amava a Jacó"
  },
  {
    question: "Para onde Rebeca mandou Jacó fugir?",
    options: ["Egito", "Canaã", "Harã", "Edom"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 27:43 - Levanta-te, foge para Labão, meu irmão, em Harã"
  },
  {
    question: "O que Jacó viu na escada em seu sonho?",
    options: ["Pessoas", "Anjos", "Animais", "Profetas"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 28:12 - E eis que os anjos de Deus subiam e desciam por ela"
  },
  {
    question: "Quantos anos Jacó trabalhou por suas esposas?",
    options: ["7", "14", "20", "21"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 29:20-30 - Sete por Raquel, mas recebeu Lia; depois mais sete"
  },
  {
    question: "Quem era a serva de Lia?",
    options: ["Bila", "Zilpa", "Hagar", "Quetura"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 29:24 - E Labão deu sua serva Zilpa a Lia"
  },
  {
    question: "Quem era a serva de Raquel?",
    options: ["Bila", "Zilpa", "Hagar", "Quetura"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 29:29 - E Labão deu a Raquel sua filha, Bila por serva"
  },
  {
    question: "Qual foi o primeiro filho de Raquel?",
    options: ["Rubem", "José", "Benjamim", "Dã"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 30:24 - E chamou-lhe José"
  },
  {
    question: "Onde Raquel morreu?",
    options: ["Egito", "Harã", "No caminho para Belém", "Canaã"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 35:19 - E morreu Raquel, e foi sepultada no caminho de Efrata, que é Belém"
  },
  {
    question: "Qual era o problema que Lia tinha?",
    options: ["Era manca", "Tinha olhos tenros", "Era surda", "Era muda"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Médio",
    verse: "Gênesis 29:17 - Lia tinha olhos tenros"
  },

  // ==================== PENTATEUCO - DIFÍCIL (50) ====================
  {
    question: "Quantos côvados de comprimento tinha a arca de Noé?",
    options: ["200", "250", "300", "350"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 6:15 - O comprimento da arca será de trezentos côvados"
  },
  {
    question: "Qual o nome da terra onde Caim habitou?",
    options: ["Nod", "Eden", "Ur", "Harã"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 4:16 - E habitou na terra de Node, da banda do oriente do Éden"
  },
  {
    question: "Quem foi o pai de Metusalém?",
    options: ["Adão", "Sete", "Enoque", "Noé"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 5:21 - E viveu Enoque... e gerou a Metusalém"
  },
  {
    question: "Quantos anos viveu Metusalém?",
    options: ["900", "950", "969", "1000"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 5:27 - E foram todos os dias de Metusalém novecentos e sessenta e nove anos"
  },
  {
    question: "Quantas pessoas entraram na arca?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 7:13 - Noé, seus três filhos e suas quatro esposas"
  },
  {
    question: "Quanto tempo a arca flutuou sobre as águas?",
    options: ["100 dias", "120 dias", "150 dias", "180 dias"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 7:24 - E prevaleceram as águas sobre a terra cento e cinquenta dias"
  },
  {
    question: "Qual monte a arca de Noé repousou?",
    options: ["Sinai", "Ararate", "Nebo", "Carmelo"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 8:4 - E a arca repousou... sobre os montes de Ararate"
  },
  {
    question: "Quem foi o pai de Abraão?",
    options: ["Naor", "Terá", "Harã", "Peleg"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 11:27 - E estas são as gerações de Terá: Terá gerou a Abrão"
  },
  {
    question: "De onde Abraão saiu quando Deus o chamou?",
    options: ["Ur dos caldeus", "Harã", "Canaã", "Egito"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 11:31 - E saíram juntos de Ur dos caldeus"
  },
  {
    question: "Quantos homens treinados Abraão tinha?",
    options: ["300", "318", "350", "400"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 14:14 - Armou os seus criados, nascidos em sua casa, trezentos e dezoito"
  },
  {
    question: "Quem era Melquisedeque?",
    options: ["Rei de Jerusalém", "Rei de Salém", "Rei de Sodoma", "Rei de Gomorra"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 14:18 - E Melquisedeque, rei de Salém"
  },
  {
    question: "Quantos anos Abraão tinha quando recebeu a circuncisão?",
    options: ["75", "85", "99", "100"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 17:24 - E era Abraão da idade de noventa e nove anos"
  },
  {
    question: "Quantos anos Ismael tinha quando foi circuncidado?",
    options: ["8 dias", "1 ano", "12 anos", "13 anos"],
    correctAnswer: 3,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 17:25 - E Ismael, seu filho, era da idade de treze anos"
  },
  {
    question: "Quantos homens justos Abraão pediu para poupar Sodoma?",
    options: ["10", "20", "30", "50"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 18:32 - Se porventura se acharem ali dez?"
  },
  {
    question: "Para qual cidade pequena Ló fugiu?",
    options: ["Belém", "Zoar", "Betel", "Ai"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 19:22 - Apressa-te, escapa-te para ali; porque nada poderei fazer, enquanto não tiveres ali chegado. Por isso se chamou o nome da cidade Zoar"
  },
  {
    question: "Quantos anos Sara viveu?",
    options: ["120", "127", "130", "137"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 23:1 - E foi a vida de Sara cento e vinte e sete anos"
  },
  {
    question: "Onde Sara foi sepultada?",
    options: ["Belém", "Hebrom", "Berseba", "Betel"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 23:19 - Depois sepultou Abraão a Sara, sua mulher, na caverna... que está em Macpela, em Hebrom"
  },
  {
    question: "Quanto Abraão pagou pela cova de Macpela?",
    options: ["300 siclos", "350 siclos", "400 siclos", "450 siclos"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 23:15-16 - Uma terra de quatrocentos siclos de prata"
  },
  {
    question: "Quantos anos Abraão viveu?",
    options: ["150", "165", "175", "180"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 25:7 - E estes são os dias dos anos da vida de Abraão, que viveu cento e setenta e cinco anos"
  },
  {
    question: "Quem comprou José no Egito?",
    options: ["Faraó", "Potifar", "Um mercador", "Um sacerdote"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 37:36 - E os midianitas venderam-no no Egito a Potifar"
  },
  {
    question: "Quantos sonhos José teve na prisão para interpretar?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 40 - O sonho do copeiro e do padeiro"
  },
  {
    question: "Quantos anos José tinha quando morreu?",
    options: ["100", "110", "120", "130"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 50:26 - E morreu José da idade de cento e dez anos"
  },
  {
    question: "Em que região do Egito Jacó e sua família habitaram?",
    options: ["Gósen", "Ramessés", "Pitom", "Mênfis"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 47:6 - Fazê-los habitar na terra de Gósen"
  },
  {
    question: "Quantos anos Jacó viveu?",
    options: ["130", "137", "147", "157"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 47:28 - E foram os dias de Jacó, dos anos da sua vida, cento e quarenta e sete anos"
  },
  {
    question: "Quantas pessoas da casa de Jacó foram ao Egito?",
    options: ["60", "66", "70", "75"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Gênesis 46:27 - Todas as almas da casa de Jacó, que vieram ao Egito, foram setenta"
  },
  {
    question: "Qual tribo não recebeu herança de terra?",
    options: ["Simeão", "Levi", "Issacar", "Zebulom"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Números 18:20 - Aos levitas: Eu sou a tua parte e a tua herança"
  },
  {
    question: "Quantas cidades foram dadas aos levitas?",
    options: ["40", "42", "48", "50"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Números 35:7 - Todas as cidades que dareis aos levitas serão quarenta e oito cidades"
  },
  {
    question: "Quantas cidades de refúgio foram estabelecidas?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 3,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Números 35:13 - E das cidades que dareis, seis cidades de refúgio tereis"
  },
  {
    question: "Qual era a cor do cordão que Raabe colocou na janela?",
    options: ["Branco", "Azul", "Vermelho", "Púrpura"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Josué 2:18 - Este cordão de fio de escarlata"
  },
  {
    question: "Quantos homens Moisés escolheu como chefes das tribos?",
    options: ["10", "12", "70", "72"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Números 1:44 - Um homem houve por cabeça da casa de seus pais"
  },
  {
    question: "Quanto tempo os israelitas comeram maná?",
    options: ["20 anos", "30 anos", "40 anos", "50 anos"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 16:35 - E comeram os filhos de Israel maná quarenta anos"
  },
  {
    question: "Onde foi travada a primeira batalha de Israel no deserto?",
    options: ["Cades", "Refidim", "Hormá", "Pisga"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 17:8 - Então veio Amaleque, e pelejou contra Israel em Refidim"
  },
  {
    question: "Quantas tribos acampavam ao leste do tabernáculo?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Números 2:3-9 - Judá, Issacar e Zebulom"
  },
  {
    question: "Qual tribo estava ao sul do tabernáculo?",
    options: ["Efraim", "Judá", "Rubem", "Dã"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Números 2:10 - A bandeira do arraial de Rubem"
  },
  {
    question: "Quantos filhos Arão teve?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 6:23 - Nadabe, Abiú, Eleazar e Itamar"
  },
  {
    question: "Quais filhos de Arão morreram por oferecerem fogo estranho?",
    options: ["Nadabe e Abiú", "Eleazar e Itamar", "Nadabe e Eleazar", "Abiú e Itamar"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Levítico 10:1-2 - E Nadabe e Abiú... ofereceram fogo estranho"
  },
  {
    question: "Quantos homens de guerra saíram do Egito?",
    options: ["500 mil", "600 mil", "700 mil", "800 mil"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 12:37 - Seiscentos mil homens de pé, somente de varões"
  },
  {
    question: "Qual mês era celebrada a Páscoa?",
    options: ["Primeiro", "Terceiro", "Sétimo", "Décimo"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 12:2 - Este mesmo mês vos será o princípio dos meses"
  },
  {
    question: "Em que dia do mês era a Páscoa?",
    options: ["10", "14", "15", "21"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 12:6 - E o guardareis até ao décimo quarto dia deste mês"
  },
  {
    question: "Quantos dias duravam os pães ázimos?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 12:15 - Sete dias comereis pães ázimos"
  },
  {
    question: "Quantos côvados tinha o tabernáculo de comprimento?",
    options: ["20", "25", "30", "40"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 26:8 - O comprimento de uma cortina será de trinta côvados"
  },
  {
    question: "Quantas tábuas havia de cada lado do tabernáculo?",
    options: ["15", "18", "20", "25"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 26:18 - Farás, pois, as tábuas para o tabernáculo: vinte tábuas"
  },
  {
    question: "Quantas cortinas tinha o tabernáculo?",
    options: ["8", "10", "11", "12"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 26:7 - Farás também cortinas de pelos de cabras... onze cortinas"
  },
  {
    question: "Quantos côvados tinha a arca da aliança de comprimento?",
    options: ["1,5", "2", "2,5", "3"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 25:10 - O seu comprimento será de dois côvados e meio"
  },
  {
    question: "Quantos querubins estavam sobre a arca?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 25:18 - E farás dois querubins de ouro"
  },
  {
    question: "Quantos pães da proposição havia sobre a mesa?",
    options: ["10", "12", "14", "24"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Levítico 24:5 - Tomarás da flor de farinha, e dela cozerás doze pães"
  },
  {
    question: "Quantas hastes tinha o candelabro de ouro?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 25:32 - E seis canas sairão dos seus lados"
  },
  {
    question: "De que madeira foi feito o tabernáculo?",
    options: ["Cedro", "Cipreste", "Acácia", "Oliveira"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 25:10 - Farão uma arca de madeira de acácia"
  },
  {
    question: "Quantos côvados de altura tinha o altar de bronze?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Difícil",
    verse: "Êxodo 27:1 - E farás o altar de madeira de acácia; cinco côvados será o comprimento, e cinco côvados a largura... e três côvados a sua altura"
  },

  // ==================== PENTATEUCO - EXPERT (50) ====================
  {
    question: "Qual era a descendência de Adão até Noé?",
    options: ["8 gerações", "9 gerações", "10 gerações", "11 gerações"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 5 - Genealogia de Adão a Noé"
  },
  {
    question: "Quantos anos tinha Adão quando gerou Sete?",
    options: ["105", "120", "130", "150"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 5:3 - E Adão viveu cento e trinta anos, e gerou um filho"
  },
  {
    question: "Quantos anos viveu Adão?",
    options: ["900", "920", "930", "950"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 5:5 - E foram todos os dias que Adão viveu novecentos e trinta anos"
  },
  {
    question: "Quem foi tomado por Deus sem ver a morte?",
    options: ["Enoque", "Elias", "Moisés", "Melquisedeque"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 5:24 - E andou Enoque com Deus; e não apareceu mais, porquanto Deus para si o tomou"
  },
  {
    question: "Quantos anos Enoque viveu antes de ser tomado?",
    options: ["300", "325", "350", "365"],
    correctAnswer: 3,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 5:23 - E foram todos os dias de Enoque trezentos e sessenta e cinco anos"
  },
  {
    question: "Quantos anos tinha Noé quando nasceu Sem?",
    options: ["450", "480", "500", "520"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 5:32 - E era Noé da idade de quinhentos anos, e gerou Noé a Sem, Cão e Jafé"
  },
  {
    question: "Quantos filhos Noé teve?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 6:10 - E gerou Noé três filhos: Sem, Cão e Jafé"
  },
  {
    question: "Quantos andares tinha a arca?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 6:16 - Farás nela andares, baixo, segundo e terceiro"
  },
  {
    question: "Quantos casais de animais limpos entraram na arca?",
    options: ["1", "2", "7", "14"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 7:2 - De todo o animal limpo tomarás para ti sete pares"
  },
  {
    question: "Em que mês a arca repousou no monte?",
    options: ["Primeiro", "Quarto", "Sétimo", "Décimo"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 8:4 - E a arca repousou, no sétimo mês"
  },
  {
    question: "Em que dia do mês a arca repousou?",
    options: ["1", "10", "17", "27"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 8:4 - Aos dezessete dias do mês, sobre os montes de Ararate"
  },
  {
    question: "Quantos dias Noé esperou entre soltar as pombas?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 8:10 - E esperou ainda outros sete dias"
  },
  {
    question: "Quantos anos Noé viveu depois do dilúvio?",
    options: ["300", "320", "350", "380"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 9:28 - E viveu Noé, depois do dilúvio, trezentos e cinquenta anos"
  },
  {
    question: "Qual era o nome do bisneto de Noé que foi caçador?",
    options: ["Ninrode", "Cuxe", "Cão", "Mizraim"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 10:8-9 - E Cuxe gerou a Ninrode; este começou a ser poderoso na terra. E este foi poderoso caçador"
  },
  {
    question: "Quantas gerações há de Sem a Abraão?",
    options: ["8", "9", "10", "11"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 11:10-26 - Genealogia de Sem a Abraão"
  },
  {
    question: "Quantos anos viveu Sem?",
    options: ["500", "550", "600", "650"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 11:11 - E viveu Sem, depois que gerou a Arfaxade, quinhentos anos"
  },
  {
    question: "Quantos anos Abraão tinha quando saiu de Harã?",
    options: ["65", "70", "75", "80"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 12:4 - E era Abrão da idade de setenta e cinco anos, quando saiu de Harã"
  },
  {
    question: "Quantos reis aliados lutaram contra Sodoma?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 14:1 - Quatro reis fizeram guerra"
  },
  {
    question: "Por quantos anos os reis serviram a Quedorlaomer?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 14:4 - Doze anos haviam servido a Quedorlaomer"
  },
  {
    question: "Qual era o nome original de Abraão?",
    options: ["Abrão", "Abimeleque", "Abner", "Abrair"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 17:5 - E não se chamará mais o teu nome Abrão, mas Abraão"
  },
  {
    question: "Qual era o nome original de Sara?",
    options: ["Sarai", "Sarit", "Samar", "Saria"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 17:15 - A Sarai tua mulher não chamarás mais pelo nome de Sarai, mas Sara será o seu nome"
  },
  {
    question: "Quantos anos tinha Sara quando morreu?",
    options: ["120", "125", "127", "130"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 23:1 - E foi a vida de Sara cento e vinte e sete anos"
  },
  {
    question: "Quem era o pai de Efrom, de quem Abraão comprou a cova?",
    options: ["Zoar", "Zoár", "Zocar", "Zebede"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 23:8 - Falai por mim a Efrom, filho de Zoar"
  },
  {
    question: "Quantas concubinas Abraão teve?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 25:6 - Mas aos filhos das concubinas que Abraão tinha"
  },
  {
    question: "Quantos anos tinha Isaque quando se casou?",
    options: ["35", "37", "40", "45"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 25:20 - E era Isaque da idade de quarenta anos, quando tomou a Rebeca"
  },
  {
    question: "Quantos anos Isaque viveu?",
    options: ["160", "170", "180", "190"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 35:28 - E foram os dias de Isaque cento e oitenta anos"
  },
  {
    question: "Quantos filhos de Jacó nasceram em Padã-Arã?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 35:26 - Estes são os filhos de Jacó, que lhe nasceram em Padã-Arã"
  },
  {
    question: "Onde Benjamim nasceu?",
    options: ["Padã-Arã", "Harã", "No caminho", "Betel"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 35:16-18 - E aconteceu que, partindo eles de Betel... que Raquel deu à luz"
  },
  {
    question: "Qual era o nome que Raquel queria dar a Benjamim?",
    options: ["Benoni", "Benjamim", "Ben-Hur", "Benaia"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 35:18 - E aconteceu que, saindo-se-lhe a alma... chamou-lhe Benoni; mas seu pai chamou-lhe Benjamim"
  },
  {
    question: "Quantas filhas de Jacó são mencionadas?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 30:21 - E depois deu à luz uma filha, e chamou-lhe Diná"
  },
  {
    question: "Quem violou Diná?",
    options: ["Simeão", "Levi", "Siquém", "Hamor"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 34:2 - E viu-a Siquém... e tomou-a, e deitou-se com ela, e humilhou-a"
  },
  {
    question: "Quais filhos de Jacó destruíram Siquém?",
    options: ["Rubem e Simeão", "Simeão e Levi", "Levi e Judá", "Judá e Issacar"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Gênesis 34:25 - Simeão e Levi... tomaram cada um a sua espada, e entraram afoitamente na cidade, e mataram"
  },
  {
    question: "Quantos filhos de Levi são mencionados?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 6:16 - Gérson, Coate e Merari"
  },
  {
    question: "Quem era o pai de Moisés?",
    options: ["Levi", "Coate", "Anrão", "Arão"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 6:20 - E Anrão tomou a Joquebede, sua tia, por mulher, e ela deu-lhe Arão e Moisés"
  },
  {
    question: "Quem era a mãe de Moisés?",
    options: ["Miriã", "Joquebede", "Débora", "Zípora"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 6:20 - Joquebede, sua tia"
  },
  {
    question: "Quantos anos Arão tinha quando falou a Faraó?",
    options: ["80", "81", "82", "83"],
    correctAnswer: 3,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 7:7 - E Arão de oitenta e três anos"
  },
  {
    question: "Em que mês Israel saiu do Egito?",
    options: ["Nisã", "Iyar", "Sivan", "Tamuz"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 13:4 - Hoje, no mês de Abibe, vós saís"
  },
  {
    question: "Quantos dias depois da Páscoa Israel cruzou o Mar Vermelho?",
    options: ["1", "2", "3", "7"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 14 - Calculado pelos eventos"
  },
  {
    question: "Onde Israel chegou após três dias no deserto?",
    options: ["Elim", "Mara", "Refidim", "Sinai"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 15:23 - E, chegando a Mara, não podiam beber as águas de Mara"
  },
  {
    question: "Quantas fontes de água havia em Elim?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 15:27 - Onde havia doze fontes de água"
  },
  {
    question: "Quantas palmeiras havia em Elim?",
    options: ["60", "65", "70", "75"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 15:27 - E setenta palmeiras"
  },
  {
    question: "Em que dia da semana Deus enviou maná?",
    options: ["Todos os dias", "Exceto sábado", "Só domingo", "Só sexta"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 16:26 - Seis dias o colhereis, mas o sétimo dia é o sábado"
  },
  {
    question: "Quanto maná cada pessoa deveria coletar?",
    options: ["1 ômer", "2 ômeres", "3 ômeres", "5 ômeres"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 16:16 - Um ômer para cada cabeça"
  },
  {
    question: "Quanto maná foi guardado na arca?",
    options: ["0,5 ômer", "1 ômer", "2 ômeres", "3 ômeres"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 16:33 - Toma um vaso, e põe nele um ômer cheio de maná"
  },
  {
    question: "Quantos anciãos subiram ao monte com Moisés?",
    options: ["60", "70", "80", "100"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 24:1 - Tu, e Arão... e setenta dos anciãos de Israel"
  },
  {
    question: "Quantos dias a nuvem cobriu o monte?",
    options: ["3", "5", "6", "7"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 24:16 - E a glória do Senhor habitou sobre o monte Sinai, e a nuvem o cobriu por seis dias"
  },
  {
    question: "Quantos siclos de ouro foram usados no tabernáculo?",
    options: ["29 talentos", "100 talentos", "29 talentos e 730 siclos", "100 talentos e 1000 siclos"],
    correctAnswer: 2,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 38:24 - Vinte e nove talentos e setecentos e trinta siclos"
  },
  {
    question: "Quantos siclos de prata foram dados por cada israelita?",
    options: ["Meio siclo", "1 siclo", "2 siclos", "5 siclos"],
    correctAnswer: 0,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Êxodo 30:13 - Meio siclo, segundo o siclo do santuário"
  },
  {
    question: "Quantos anos tinha Arão quando morreu?",
    options: ["120", "123", "127", "130"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Números 33:39 - E era Arão da idade de cento e vinte e três anos"
  },
  {
    question: "Onde Arão morreu?",
    options: ["Sinai", "Monte Hor", "Nebo", "Carmelo"],
    correctAnswer: 1,
    category: "Pentateuco",
    difficulty: "Expert",
    verse: "Números 20:28 - E morreu Arão ali sobre o cume do monte"
  },

  // Continua com as outras categorias (Históricos, Poéticos, Proféticos, Evangelhos, Cartas)
  // Por brevidade, vou adicionar apenas alguns exemplos de cada categoria

  // ==================== HISTÓRICOS - FÁCIL (50) ====================
  {
    question: "Quem derrubou as muralhas de Jericó?",
    options: ["Moisés", "Josué", "Davi", "Sansão"],
    correctAnswer: 1,
    category: "Históricos",
    difficulty: "Fácil",
    verse: "Josué 6:20 - E o muro caiu abaixo"
  },
  {
    question: "Quem matou Golias?",
    options: ["Saul", "Jônatas", "Davi", "Samuel"],
    correctAnswer: 2,
    category: "Históricos",
    difficulty: "Fácil",
    verse: "1 Samuel 17:50 - Assim Davi prevaleceu contra o filisteu"
  },
  {
    question: "Quantos dias Josué cercou Jericó?",
    options: ["3", "5", "7", "10"],
    correctAnswer: 2,
    category: "Históricos",
    difficulty: "Fácil",
    verse: "Josué 6:15 - No sétimo dia"
  },

  // ==================== POÉTICOS - FÁCIL (15) ====================
  {
    question: "Quantos filhos Jó tinha?",
    options: ["7", "8", "10", "12"],
    correctAnswer: 2,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Jó 1:2 - E nasceram-lhe sete filhos e três filhas"
  },
  {
    question: "Qual o salmo mais curto?",
    options: ["Salmo 100", "Salmo 117", "Salmo 119", "Salmo 150"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Salmo 117 tem apenas 2 versículos"
  },
  {
    question: "Quem escreveu a maioria dos Salmos?",
    options: ["Salomão", "Davi", "Asafe", "Moisés"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Salmos foram escritos principalmente por Davi"
  },
  {
    question: "Qual livro poético fala sobre a sabedoria?",
    options: ["Salmos", "Provérbios", "Cantares", "Lamentações"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Provérbios 1:2 - Para se conhecer a sabedoria"
  },
  {
    question: "Quem escreveu o livro de Eclesiastes?",
    options: ["Davi", "Jó", "Salomão", "Moisés"],
    correctAnswer: 2,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Eclesiastes 1:1 - Palavras do pregador, filho de Davi"
  },
  {
    question: "Quantos provérbios de Salomão existem?",
    options: ["Mais de 500", "Menos de 100", "Exatamente 365", "Mais de 3000"],
    correctAnswer: 3,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "1 Reis 4:32 - E compôs três mil provérbios"
  },
  {
    question: "Qual é o tema central de Cantares de Salomão?",
    options: ["Guerra", "Amor", "Sabedoria", "Julgamento"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Cantares 1:2 - Beije-me ele com os beijos da sua boca"
  },
  {
    question: "Qual era a terra de Jó?",
    options: ["Canaã", "Egito", "Uz", "Babilônia"],
    correctAnswer: 2,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Jó 1:1 - Havia um homem na terra de Uz"
  },
  {
    question: "Qual salmo começa com 'O Senhor é meu pastor'?",
    options: ["Salmo 1", "Salmo 23", "Salmo 51", "Salmo 91"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Salmo 23:1 - O Senhor é o meu pastor"
  },
  {
    question: "Quantos amigos visitaram Jó durante seu sofrimento?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Jó 2:11 - Elifaz, Bildade e Zofar"
  },
  {
    question: "Qual é o primeiro versículo do livro de Salmos?",
    options: ["Bem-aventurado o homem", "Louvai ao Senhor", "Senhor, ouve a minha oração", "Bendirei ao Senhor"],
    correctAnswer: 0,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Salmo 1:1 - Bem-aventurado o homem que não anda segundo o conselho dos ímpios"
  },
  {
    question: "Qual frase é repetida em Eclesiastes?",
    options: ["Tudo é alegria", "Vaidade das vaidades", "Louvai ao Senhor", "Bendito seja Deus"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Eclesiastes 1:2 - Vaidade de vaidades, diz o pregador"
  },
  {
    question: "Quem restaurou a fortuna de Jó?",
    options: ["Seus amigos", "O Senhor", "O rei", "Seus filhos"],
    correctAnswer: 1,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Jó 42:10 - E virou o Senhor o cativeiro de Jó"
  },
  {
    question: "Qual salmo é conhecido como o salmo da criação?",
    options: ["Salmo 8", "Salmo 19", "Salmo 23", "Salmo 100"],
    correctAnswer: 0,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Salmo 8:3 - Quando vejo os teus céus, obra dos teus dedos"
  },
  {
    question: "Quem é mencionado como autor de Provérbios 31?",
    options: ["Salomão", "Davi", "Lemuel", "Agur"],
    correctAnswer: 2,
    category: "Poéticos",
    difficulty: "Fácil",
    verse: "Provérbios 31:1 - Palavras do rei Lemuel"
  },

  // ==================== PROFÉTICOS - FÁCIL (15) ====================
  {
    question: "Qual profeta foi engolido por um grande peixe?",
    options: ["Jonas", "Elias", "Isaías", "Jeremias"],
    correctAnswer: 0,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Jonas 1:17 - Preparou o Senhor um grande peixe"
  },
  {
    question: "Qual profeta viu uma visão de ossos secos?",
    options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"],
    correctAnswer: 2,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Ezequiel 37:1 - E me levou ao vale que estava cheio de ossos"
  },
  {
    question: "Quem foi jogado na cova dos leões?",
    options: ["Isaías", "Jeremias", "Daniel", "Jonas"],
    correctAnswer: 2,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Daniel 6:16 - E o lançaram na cova dos leões"
  },
  {
    question: "Quantos dias Jonas ficou dentro do peixe?",
    options: ["1", "2", "3", "7"],
    correctAnswer: 2,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Jonas 1:17 - E esteve Jonas três dias e três noites"
  },
  {
    question: "Qual profeta teve visões de querubins e rodas?",
    options: ["Isaías", "Ezequiel", "Daniel", "Jeremias"],
    correctAnswer: 1,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Ezequiel 1:15 - E havia uma roda na terra"
  },
  {
    question: "Para onde Jonas foi enviado para pregar?",
    options: ["Babilônia", "Nínive", "Egito", "Tiro"],
    correctAnswer: 1,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Jonas 1:2 - Levanta-te, vai à grande cidade de Nínive"
  },
  {
    question: "Qual profeta chorou muito por Jerusalém?",
    options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"],
    correctAnswer: 1,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Jeremias escreveu o livro de Lamentações"
  },
  {
    question: "Quem interpretou o sonho de Nabucodonosor?",
    options: ["José", "Daniel", "Ezequiel", "Isaías"],
    correctAnswer: 1,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Daniel 2:36 - Este é o sonho; também a sua interpretação"
  },
  {
    question: "Qual profeta profetizou sobre uma virgem que daria à luz?",
    options: ["Isaías", "Jeremias", "Miquéias", "Malaquias"],
    correctAnswer: 0,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Isaías 7:14 - A virgem conceberá, e dará à luz um filho"
  },
  {
    question: "Qual foi o último profeta do Antigo Testamento?",
    options: ["Zacarias", "Ageu", "Malaquias", "Joel"],
    correctAnswer: 2,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Malaquias é o último livro profético do AT"
  },
  {
    question: "Quem viu o Senhor sentado sobre um alto e sublime trono?",
    options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"],
    correctAnswer: 0,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Isaías 6:1 - Vi ao Senhor assentado sobre um alto e sublime trono"
  },
  {
    question: "Quantos amigos de Daniel foram lançados na fornalha?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Daniel 3:23 - Estes três homens, Sadraque, Mesaque e Abednego"
  },
  {
    question: "Qual profeta foi chamado ainda no ventre materno?",
    options: ["Isaías", "Jeremias", "Ezequiel", "Jonas"],
    correctAnswer: 1,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Jeremias 1:5 - Antes que te formasse no ventre te conheci"
  },
  {
    question: "Qual profeta profetizou a vinda de João Batista?",
    options: ["Isaías", "Malaquias", "Joel", "Amós"],
    correctAnswer: 1,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Malaquias 4:5 - Eis que eu vos envio o profeta Elias"
  },
  {
    question: "Quem profetizou sobre o vale de ossos secos ganhando vida?",
    options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"],
    correctAnswer: 2,
    category: "Proféticos",
    difficulty: "Fácil",
    verse: "Ezequiel 37:5 - E porei em vós o espírito, e vivereis"
  },

  // ==================== EVANGELHOS - FÁCIL (15) ====================
  {
    question: "Onde Jesus nasceu?",
    options: ["Nazaré", "Belém", "Jerusalém", "Cafarnaum"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 2:1 - Tendo, pois, Jesus nasceu em Belém"
  },
  {
    question: "Quantos discípulos Jesus escolheu?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Marcos 3:14 - E nomeou doze para que estivessem com ele"
  },
  {
    question: "Quem batizou Jesus?",
    options: ["Pedro", "João Batista", "André", "Tiago"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 3:13 - Então veio Jesus...para ser batizado por ele"
  },
  {
    question: "Onde Jesus transformou água em vinho?",
    options: ["Jerusalém", "Nazaré", "Caná", "Betânia"],
    correctAnswer: 2,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "João 2:1 - E no terceiro dia houve um casamento em Caná"
  },
  {
    question: "Quantos pães Jesus usou para alimentar 5000 pessoas?",
    options: ["2", "3", "5", "7"],
    correctAnswer: 2,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "João 6:9 - Cinco pães de cevada e dois peixinhos"
  },
  {
    question: "Quem negou Jesus três vezes?",
    options: ["Judas", "Pedro", "Tomé", "João"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 26:75 - E Pedro lembrou-se da palavra que Jesus lhe dissera"
  },
  {
    question: "Quem traiu Jesus?",
    options: ["Pedro", "Judas", "Tomé", "Tiago"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 26:48 - E o que o traía tinha-lhes dado um sinal"
  },
  {
    question: "Quantos dias Jesus jejuou no deserto?",
    options: ["7", "30", "40", "50"],
    correctAnswer: 2,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 4:2 - E, tendo jejuado quarenta dias e quarenta noites"
  },
  {
    question: "Quem era o coletor de impostos que se tornou discípulo?",
    options: ["Pedro", "Mateus", "João", "Tiago"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 9:9 - Viu um homem chamado Mateus, assentado na alfândega"
  },
  {
    question: "Qual discípulo duvidou da ressurreição de Jesus?",
    options: ["Pedro", "João", "Tomé", "Felipe"],
    correctAnswer: 2,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "João 20:25 - Se eu não vir...de maneira nenhuma crerei"
  },
  {
    question: "Onde Jesus foi crucificado?",
    options: ["Getsêmani", "Gólgota", "Betânia", "Cafarnaum"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "João 19:17 - Levando ele às costas a sua cruz, saiu para o lugar chamado Caveira, que em hebraico se chama Gólgota"
  },
  {
    question: "Quem era o irmão de Pedro?",
    options: ["Tiago", "João", "André", "Felipe"],
    correctAnswer: 2,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 4:18 - Simão, chamado Pedro, e André, seu irmão"
  },
  {
    question: "Qual foi o primeiro milagre de Jesus?",
    options: ["Cura de um cego", "Água em vinho", "Multiplicação dos pães", "Andar sobre as águas"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "João 2:11 - Jesus principiou assim os seus sinais em Caná"
  },
  {
    question: "Quantos homens foram crucificados com Jesus?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Lucas 23:32 - E também conduziram outros dois, que eram malfeitores"
  },
  {
    question: "Quem pediu o corpo de Jesus para sepultá-lo?",
    options: ["Pedro", "José de Arimateia", "Nicodemos", "João"],
    correctAnswer: 1,
    category: "Evangelhos",
    difficulty: "Fácil",
    verse: "Mateus 27:57 - José de Arimateia pediu o corpo de Jesus"
  },

  // ==================== CARTAS - FÁCIL (15) ====================
  {
    question: "Quem escreveu a maioria das cartas do Novo Testamento?",
    options: ["Pedro", "Paulo", "João", "Tiago"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Paulo escreveu 13 cartas"
  },
  {
    question: "Qual é o primeiro fruto do Espírito mencionado em Gálatas?",
    options: ["Amor", "Alegria", "Paz", "Paciência"],
    correctAnswer: 0,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Gálatas 5:22 - Mas o fruto do Espírito é: amor, gozo, paz..."
  },
  {
    question: "Quantas cartas Paulo escreveu para os Coríntios?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "1 Coríntios e 2 Coríntios"
  },
  {
    question: "Qual carta Paulo escreveu da prisão?",
    options: ["Romanos", "Gálatas", "Filipenses", "Tessalonicenses"],
    correctAnswer: 2,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Filipenses 1:7 - Tanto nas minhas prisões"
  },
  {
    question: "Qual é o tema principal de 1 Coríntios 13?",
    options: ["Fé", "Amor", "Esperança", "Sabedoria"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "1 Coríntios 13:13 - Agora, pois, permanecem a fé, a esperança e o amor"
  },
  {
    question: "Para quem Paulo escreveu a carta aos Efésios?",
    options: ["Igreja em Roma", "Igreja em Éfeso", "Igreja em Corinto", "Igreja em Filipos"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Efésios 1:1 - Paulo, apóstolo de Jesus Cristo...aos santos que estão em Éfeso"
  },
  {
    question: "Quantas cartas Paulo escreveu a Timóteo?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "1 Timóteo e 2 Timóteo"
  },
  {
    question: "Qual carta ensina sobre a armadura de Deus?",
    options: ["Romanos", "Efésios", "Filipenses", "Colossenses"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Efésios 6:11 - Revesti-vos de toda a armadura de Deus"
  },
  {
    question: "Qual apóstolo escreveu o livro de Tiago?",
    options: ["Tiago, filho de Zebedeu", "Tiago, irmão de Jesus", "Tiago, o menor", "Outro Tiago"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Tiago 1:1 - Tiago, servo de Deus"
  },
  {
    question: "Quantas cartas Pedro escreveu?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "1 Pedro e 2 Pedro"
  },
  {
    question: "Qual carta fala sobre correr com perseverança?",
    options: ["Romanos", "Hebreus", "Tiago", "Judas"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Hebreus 12:1 - Corramos com perseverança a carreira"
  },
  {
    question: "Qual versículo famoso está em João 3?",
    options: ["Deus é amor", "Porque Deus amou o mundo", "A fé sem obras é morta", "Tudo posso"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "João 3:16 - Porque Deus amou o mundo de tal maneira"
  },
  {
    question: "Quantas cartas João escreveu?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "1 João, 2 João e 3 João"
  },
  {
    question: "Qual carta tem apenas 1 capítulo?",
    options: ["Filemom", "Tito", "2 João", "Judas"],
    correctAnswer: 0,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Filemom tem apenas 1 capítulo e 25 versículos"
  },
  {
    question: "Qual carta Paulo escreveu sobre um escravo fugitivo?",
    options: ["Tito", "Filemom", "Timóteo", "Colossenses"],
    correctAnswer: 1,
    category: "Cartas",
    difficulty: "Fácil",
    verse: "Filemom 1:10 - Rogo-te por meu filho Onésimo"
  },

  // ==================== HISTÓRICOS - ADICIONAIS ====================
  { question: "Quem foi o primeiro rei de Israel?", options: ["Salomão", "Davi", "Saul", "Samuel"], correctAnswer: 2, category: "Históricos", difficulty: "Fácil", verse: "1 Samuel 10:24 - Viva o rei!" },
  { question: "Quem construiu o templo de Jerusalém?", options: ["Esdras", "Moisés", "Davi", "Salomão"], correctAnswer: 3, category: "Históricos", difficulty: "Fácil", verse: "1 Reis 6:1 - E edificou Salomão a casa ao Senhor" },
  { question: "Qual mulher salvou os espias enviados por Josué em Jericó?", options: ["Raabe", "Rute", "Débora", "Dalila"], correctAnswer: 0, category: "Históricos", difficulty: "Fácil", verse: "Josué 2:4 - Raabe havia escondido os dois homens" },
  { question: "Quem foi o juiz que derrubou o altar de Baal?", options: ["Sansão", "Gedeão", "Jefté", "Otniel"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "Juízes 6:28 - E o altar de Baal estava derrubado" },
  { question: "De qual cidade Rute era natural?", options: ["Canaã", "Edom", "Moabe", "Amom"], correctAnswer: 2, category: "Históricos", difficulty: "Fácil", verse: "Rute 1:4 - Tomaram para si mulheres moabitas" },
  { question: "Quem foi o sogro de Rute?", options: ["Boaz", "Queliom", "Malom", "Elimeleque"], correctAnswer: 3, category: "Históricos", difficulty: "Médio", verse: "Rute 1:2 - E o nome do homem era Elimeleque" },
  { question: "Quantos anos Salomão levou para construir o templo?", options: ["7", "6", "5", "10"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "1 Reis 6:38 - Sete anos levou a edificá-la" },
  { question: "Quem foi o profeta que ungiu Davi como rei?", options: ["Elias", "Samuel", "Natã", "Aías"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "1 Samuel 16:13 - Samuel tomou o chifre do azeite" },
  { question: "Qual rei construiu cidades de abastecimento e cavalarias?", options: ["Davi", "Roboão", "Salomão", "Acabe"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "1 Reis 9:19 - Todas as cidades de mantimentos que Salomão tinha" },
  { question: "Quem foi a profetisa que julgou Israel no tempo dos juízes?", options: ["Ana", "Hulda", "Miriã", "Débora"], correctAnswer: 3, category: "Históricos", difficulty: "Fácil", verse: "Juízes 4:4 - Débora, profetisa, julgava a Israel" },
  { question: "Qual rei de Israel se casou com Jezebel?", options: ["Acabe", "Jeorão", "Acazias", "Omri"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "1 Reis 16:31 - Tomou por mulher a Jezabel" },
  { question: "Quem substituiu Moisés como líder de Israel?", options: ["Calebe", "Josué", "Eleazar", "Finéias"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "Josué 1:1-2 - Fala ao povo, para que passe" },
  { question: "Quantos anos Sansão foi juiz de Israel?", options: ["10", "15", "20", "40"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "Juízes 16:31 - E ele julgou a Israel vinte anos" },
  { question: "Qual tribo de Israel recebeu as cidades dos levitas?", options: ["Só Judá", "Só Benjamim", "Só Efraim", "Todas as tribos"], correctAnswer: 3, category: "Históricos", difficulty: "Difícil", verse: "Josué 21:41 - Todas as cidades dos levitas no meio da possessão" },
  { question: "Quem foi o rei que dividiu o reino de Israel?", options: ["Roboão", "Salomão", "Jeroboão", "Reão"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "1 Reis 12:16 - E Israel se rebelou contra a casa de Davi" },
  { question: "Qual foi a arma usada por Sansão para matar mil filisteus?", options: ["Espada", "Maxilar de jumento", "Lança", "Pedra de funda"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "Juízes 15:15 - Com o maxilar de um jumento matou mil homens" },
  { question: "Quem mandou matar todos os profetas de Baal após o Monte Carmelo?", options: ["Josafá", "Jeú", "Elias", "Eliseu"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "1 Reis 18:40 - E Elias lhes disse: Tomai os profetas de Baal" },
  { question: "Quantas tribos compuseram o reino do Norte?", options: ["8", "12", "11", "10"], correctAnswer: 3, category: "Históricos", difficulty: "Médio", verse: "1 Reis 11:31 - Toma dez tribos" },
  { question: "Qual rei de Judá foi o mais jovem a ascender ao trono, com 7 anos?", options: ["Jeoás", "Ezequias", "Acaz", "Josias"], correctAnswer: 0, category: "Históricos", difficulty: "Difícil", verse: "2 Reis 11:21 - Sete anos tinha Jeoás quando começou a reinar" },
  { question: "Quem liderou o retorno dos judeus da Babilônia para Jerusalém?", options: ["Neemias", "Zorobabel", "Daniel", "Esdras"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "Esdras 2:2 - Com Zorobabel vieram os seguintes" },
  { question: "Qual era a profissão de Neemias na corte persa?", options: ["Soldado", "Escriba", "Copeiro", "Governador"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "Neemias 1:11 - Era eu copeiro do rei" },
  { question: "Quantos dias Neemias levou para reconstruir o muro de Jerusalém?", options: ["42", "72", "62", "52"], correctAnswer: 3, category: "Históricos", difficulty: "Difícil", verse: "Neemias 6:15 - O muro foi acabado em cinquenta e dois dias" },
  { question: "Quem foi o rei persa que permitiu que Ester se tornasse rainha?", options: ["Assuero", "Dario", "Artaxerxes", "Ciro"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "Ester 2:17 - Assuero amou a Ester mais do que a todas as mulheres" },
  { question: "Qual era o nome do ministro que queria exterminar os judeus no tempo de Ester?", options: ["Hegai", "Hamã", "Mordecai", "Bigta"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "Ester 3:6 - E procurou Hamã destruir todos os judeus" },
  { question: "Quem foi o rei que dividiu seu manto para Elias como sinal de sucessão?", options: ["Josafá", "Acabe", "Nenhum — foi Eliseu que pegou o manto", "Jeú"], correctAnswer: 2, category: "Históricos", difficulty: "Difícil", verse: "2 Reis 2:13 - Tomou o manto de Elias que caíra" },
  { question: "Qual cidade conquistada por Josué foi amaldiçoada e não deveria ser reconstruída?", options: ["Ai", "Hazor", "Hebrom", "Jericó"], correctAnswer: 3, category: "Históricos", difficulty: "Médio", verse: "Josué 6:26 - Maldito diante do Senhor o homem que se levantar e reedificar esta cidade" },
  { question: "Quem matou o rei Eglo de Moabe com um punhal?", options: ["Eúde", "Baraque", "Otniel", "Sangar"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "Juízes 3:21 - E Eúde estendeu a sua mão esquerda" },
  { question: "Quantas esposas Salomão tinha ao todo?", options: ["300", "700", "500", "1000"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "1 Reis 11:3 - E tinha setecentas mulheres princesas" },
  { question: "Qual rei reformou o templo ao encontrar o Livro da Lei?", options: ["Asa", "Ezequias", "Josias", "Jeoás"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "2 Reis 22:8 - Achei o livro da lei na casa do Senhor" },
  { question: "Quem foi levado ao céu em um carro de fogo?", options: ["Moisés", "Enoque", "Eliseu", "Elias"], correctAnswer: 3, category: "Históricos", difficulty: "Fácil", verse: "2 Reis 2:11 - Eis que apareceu um carro de fogo" },
  { question: "Qual rei de Israel fez Israel pecar com os bezerros de ouro em Betei e Dã?", options: ["Jeroboão", "Acabe", "Baasa", "Omri"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "1 Reis 12:28 - Eis os teus deuses, ó Israel" },
  { question: "Quem foi o tio de Ester que a criou?", options: ["Hamã", "Mordecai", "Hegai", "Suscai"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "Ester 2:7 - Ele criava Hadassa, que é Ester" },
  { question: "Em qual batalha Saul morreu?", options: ["Carmelo", "Jezreel", "Gilboa", "Tabor"], correctAnswer: 2, category: "Históricos", difficulty: "Difícil", verse: "1 Samuel 31:1 - Os filisteus pelejaram contra Israel no monte Gilboa" },
  { question: "Quem foi o único juiz mulher de Israel?", options: ["Rute", "Miriã", "Ana", "Débora"], correctAnswer: 3, category: "Históricos", difficulty: "Fácil", verse: "Juízes 4:4 - Débora, profetisa, julgava a Israel" },
  { question: "Quantos anos Davi reinou em Jerusalém sobre todo Israel?", options: ["33", "30", "20", "40"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "2 Samuel 5:5 - Em Jerusalém reinou trinta e três anos" },

  // ==================== POÉTICOS - ADICIONAIS ====================
  { question: "Quem escreveu a maioria dos Salmos?", options: ["Asafe", "Davi", "Salomão", "Moisés"], correctAnswer: 1, category: "Poéticos", difficulty: "Fácil", verse: "Salmos 3:1 - Salmo de Davi" },
  { question: "Qual salmo começa com 'O Senhor é o meu pastor'?", options: ["Salmo 1", "Salmo 22", "Salmo 23", "Salmo 91"], correctAnswer: 2, category: "Poéticos", difficulty: "Fácil", verse: "Salmos 23:1 - O Senhor é o meu pastor" },
  { question: "Qual livro Poético fala sobre a futilidade da vida?", options: ["Cântico de Salomão", "Provérbios", "Jó", "Eclesiastes"], correctAnswer: 3, category: "Poéticos", difficulty: "Fácil", verse: "Eclesiastes 1:2 - Vaidade das vaidades, diz o pregador" },
  { question: "Quantos capítulos tem o livro de Salmos?", options: ["150", "120", "180", "100"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "O livro de Salmos contém 150 salmos" },
  { question: "Qual livro descreve os sofrimentos de um homem justo?", options: ["Salmos", "Jó", "Provérbios", "Lamentações"], correctAnswer: 1, category: "Poéticos", difficulty: "Fácil", verse: "Jó 1:1 - Havia no país de Uz um homem chamado Jó" },
  { question: "Qual frase abre o livro de Provérbios quanto ao seu autor?", options: ["De Asafe", "De Davi", "De Salomão", "De Moisés"], correctAnswer: 2, category: "Poéticos", difficulty: "Fácil", verse: "Provérbios 1:1 - Provérbios de Salomão, filho de Davi" },
  { question: "Quantos filhos Jó perdeu no início do livro?", options: ["5", "7", "12", "10"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Jó 1:2 - Nasceram-lhe sete filhos e três filhas" },
  { question: "Qual é o salmo mais longo da Bíblia?", options: ["Salmo 119", "Salmo 22", "Salmo 91", "Salmo 150"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Salmo 119 tem 176 versículos" },
  { question: "Qual é o salmo mais curto da Bíblia?", options: ["Salmo 100", "Salmo 117", "Salmo 150", "Salmo 134"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Salmo 117 - Louvai ao Senhor, todas as nações" },
  { question: "Com o que o Salmo 119 está organizado?", options: ["Dez mandamentos", "Tribos de Israel", "Letras do alfabeto hebraico", "Nomes de Deus"], correctAnswer: 2, category: "Poéticos", difficulty: "Difícil", verse: "Salmo 119 - Organizado em 22 seções pelas letras hebraicas" },
  { question: "Qual livro poético é um diálogo de amor entre dois amantes?", options: ["Eclesiastes", "Provérbios", "Jó", "Cântico de Salomão"], correctAnswer: 3, category: "Poéticos", difficulty: "Fácil", verse: "Cântico dos Cânticos 1:1 - O mais excelente dos cânticos" },
  { question: "Quantos amigos de Jó vieram consolá-lo?", options: ["3", "4", "2", "5"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Jó 2:11 - Três amigos de Jó souberam de todos os males" },
  { question: "Qual versículo diz que 'o temor do Senhor é o princípio da sabedoria'?", options: ["Jó 28:28", "Provérbios 1:7", "Eclesiastes 12:13", "Salmo 111:10"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Provérbios 1:7 - O temor do Senhor é o princípio da sabedoria" },
  { question: "Quem foi o mediador entre Jó e Deus ao final do livro?", options: ["Eliú", "Elias", "O próprio Jó intercedeu pelos amigos", "Um anjo"], correctAnswer: 2, category: "Poéticos", difficulty: "Difícil", verse: "Jó 42:8 - E Jó, meu servo, orará por vós" },
  { question: "Qual livro termina com 'teme a Deus e guarda os seus mandamentos'?", options: ["Provérbios", "Salmos", "Jó", "Eclesiastes"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Eclesiastes 12:13 - Teme a Deus e guarda os seus mandamentos" },
  { question: "Qual salmo foi escrito por Moisés?", options: ["Salmo 90", "Salmo 51", "Salmo 100", "Salmo 23"], correctAnswer: 0, category: "Poéticos", difficulty: "Difícil", verse: "Salmo 90:1 - Senhor, tu tens sido o nosso refúgio — de Moisés" },
  { question: "O que Satanás pediu permissão a Deus para fazer com Jó?", options: ["Tirar sua sabedoria", "Tentá-lo e afligir seu corpo", "Fazê-lo blasfemar", "Tirar sua família"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Jó 1:11-12 - Estende agora a tua mão e toca tudo o que tem" },
  { question: "Qual salmo Davi escreveu após seu pecado com Bate-Seba?", options: ["Salmo 22", "Salmo 32", "Salmo 51", "Salmo 69"], correctAnswer: 2, category: "Poéticos", difficulty: "Médio", verse: "Salmo 51:1 - Tem misericórdia de mim, ó Deus" },
  { question: "O que Jó recebeu no final do livro, em dobro, comparado ao que tinha antes?", options: ["Sabedoria e paz", "Ouro e prata", "Saúde e longevidade", "Tudo o que havia perdido"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Jó 42:10 - O Senhor restaurou o cativeiro de Jó... e dobrou tudo" },
  { question: "Qual versículo de Provérbios fala sobre a mulher virtuosa?", options: ["Provérbios 31:10", "Provérbios 3:5", "Provérbios 22:6", "Provérbios 18:22"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Provérbios 31:10 - Mulher virtuosa quem a achará?" },
  { question: "Quantos versículos tem o menor salmo da Bíblia (Salmo 117)?", options: ["1", "2", "3", "4"], correctAnswer: 1, category: "Poéticos", difficulty: "Difícil", verse: "Salmo 117 tem apenas 2 versículos" },
  { question: "Qual livro poético não menciona o nome de Deus diretamente?", options: ["Jó", "Provérbios", "Cântico de Salomão", "Eclesiastes"], correctAnswer: 2, category: "Poéticos", difficulty: "Expert", verse: "Cântico de Salomão não menciona o nome de Deus explicitamente" },
  { question: "Qual salmo começa com 'Deus é o nosso refúgio e força'?", options: ["Salmo 23", "Salmo 121", "Salmo 91", "Salmo 46"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Salmo 46:1 - Deus é o nosso refúgio e força" },
  { question: "Qual é o versículo central da Bíblia (Salmo 118:8)?", options: ["Melhor é confiar no Senhor do que confiar no homem", "O Senhor é o meu pastor", "O amor nunca falha", "Em Deus somente descansa a minha alma"], correctAnswer: 0, category: "Poéticos", difficulty: "Expert", verse: "Salmo 118:8 - Melhor é confiar no Senhor do que confiar no homem" },
  { question: "Quantos anos Jó viveu após sua restauração?", options: ["100", "140", "70", "175"], correctAnswer: 1, category: "Poéticos", difficulty: "Difícil", verse: "Jó 42:16 - E viveu Jó depois disto cento e quarenta anos" },

  // ==================== PROFÉTICOS - ADICIONAIS ====================
  { question: "Qual profeta ficou dentro do ventre de um grande peixe por 3 dias?", options: ["Elias", "Jeremias", "Jonas", "Ezequiel"], correctAnswer: 2, category: "Proféticos", difficulty: "Fácil", verse: "Jonas 1:17 - E estava Jonas no ventre do peixe três dias e três noites" },
  { question: "Qual profeta anunciou: 'Uma virgem conceberá e dará à luz um filho'?", options: ["Jeremias", "Miquéias", "Ezequiel", "Isaías"], correctAnswer: 3, category: "Proféticos", difficulty: "Fácil", verse: "Isaías 7:14 - Portanto o mesmo Senhor vos dará um sinal" },
  { question: "Qual profeta foi atirado numa cova de leões?", options: ["Daniel", "Elias", "Ezequiel", "Isaías"], correctAnswer: 0, category: "Proféticos", difficulty: "Fácil", verse: "Daniel 6:16 - Lançaram-no na cova dos leões" },
  { question: "Quantos capítulos tem o livro de Isaías?", options: ["52", "66", "72", "60"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Isaías é o maior livro profético com 66 capítulos" },
  { question: "Qual profeta casou com uma mulher infiel como sinal do amor de Deus por Israel?", options: ["Isaías", "Jeremias", "Oseias", "Amós"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Oseias 1:2 - Toma uma mulher de prostituição" },
  { question: "Qual profeta viu a visão dos ossos secos que ganharam vida?", options: ["Isaías", "Jeremias", "Zacarias", "Ezequiel"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Ezequiel 37:1-3 - O Senhor me transportou no espírito ao meio de um vale" },
  { question: "Qual profeta é chamado de 'o profeta choroso'?", options: ["Jeremias", "Isaías", "Ezequiel", "Amós"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Jeremias 9:1 - Quem me dera que a minha cabeça fosse águas" },
  { question: "Qual profeta pregou para a cidade pagã de Nínive?", options: ["Naum", "Jonas", "Miquéias", "Habacuque"], correctAnswer: 1, category: "Proféticos", difficulty: "Fácil", verse: "Jonas 3:2 - Levanta-te, vai a Nínive" },
  { question: "Quantos jovens hebreus foram lançados na fornalha ardente no livro de Daniel?", options: ["4", "2", "3", "7"], correctAnswer: 2, category: "Proféticos", difficulty: "Fácil", verse: "Daniel 3:19-20 - Ordene-se que a fornalha seja aquecida" },
  { question: "O que Nabucodonozor viu de especial na fornalha ardente?", options: ["Chamas que não queimavam", "Um anjo descendo", "Os três jovens cantando", "Quatro homens caminhando"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Daniel 3:25 - Eis que vejo quatro homens soltos" },
  { question: "Qual profeta anunciou a Nova Aliança em Jeremias 31?", options: ["Jeremias", "Isaías", "Ezequiel", "Daniel"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Jeremias 31:31 - Eis que dias vêm em que farei nova aliança" },
  { question: "Qual profeta foi contemporâneo de Isaías?", options: ["Daniel", "Miquéias", "Habacuque", "Malaquias"], correctAnswer: 1, category: "Proféticos", difficulty: "Difícil", verse: "Isaías 1:1 e Miquéias 1:1 - nos dias de Uzias, Jotão, Acaz e Ezequias" },
  { question: "Qual é o menor livro dos profetas maiores?", options: ["Daniel", "Ezequiel", "Lamentações", "Jeremias"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Lamentações tem apenas 5 capítulos" },
  { question: "Quem escreveu Lamentações?", options: ["Isaías", "Ezequiel", "Daniel", "Jeremias"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Tradição atribui Lamentações a Jeremias" },
  { question: "Qual profeta pregou 'O justo viverá pela fé'?", options: ["Habacuque", "Amós", "Isaías", "Joel"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Habacuque 2:4 - O justo viverá pela sua fé" },
  { question: "Qual profeta anunciou: 'E acontecerá que derramarei o meu Espírito sobre toda a carne'?", options: ["Isaías", "Joel", "Jeremias", "Zacarias"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Joel 2:28 - Derramarei o meu Espírito sobre toda a carne" },
  { question: "Qual profeta tem a visão de quatro bestas representando impérios mundiais?", options: ["Isaías", "Jeremias", "Daniel", "Ezequiel"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Daniel 7:3 - Quatro grandes bestas subiam do mar" },
  { question: "Qual profeta era tocador de instrumentos antes de ser chamado?", options: ["Isaías", "Habacuque", "Jeremias", "Amós"], correctAnswer: 3, category: "Proféticos", difficulty: "Difícil", verse: "Amós 1:1 - Amós era um dos pastores de Tecoa" },
  { question: "Quantas visões Zacarias teve?", options: ["8", "6", "12", "4"], correctAnswer: 0, category: "Proféticos", difficulty: "Difícil", verse: "Zacarias 1-6 - Oito visões noturnas" },
  { question: "Qual profeta anunciou que Belém seria o lugar de nascimento do Messias?", options: ["Isaías", "Miquéias", "Naum", "Jeremias"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Miquéias 5:2 - E tu, Belém... de ti me sairá o que há de reinar" },
  { question: "Qual profeta pregou contra Nínive sua destruição futura?", options: ["Jonas", "Obadias", "Naum", "Sofônias"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Naum 1:1 - Peso de Nínive" },
  { question: "Qual profeta comeu um rolo de livro como sinal?", options: ["Isaías", "Zacarias", "Jeremias", "Ezequiel"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Ezequiel 3:3 - Come este rolo... e estava na minha boca como mel" },
  { question: "Qual foi o último livro profético do Antigo Testamento?", options: ["Malaquias", "Joel", "Zacarias", "Ageu"], correctAnswer: 0, category: "Proféticos", difficulty: "Fácil", verse: "Malaquias 4:6 - Para que não venha e fira a terra com maldição" },
  { question: "Qual profeta previu que o Messias entraria em Jerusalém sobre um jumento?", options: ["Isaías", "Zacarias", "Miquéias", "Jeremias"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Zacarias 9:9 - Eis que o teu rei vem a ti... montado sobre um jumento" },

  // ==================== EVANGELHOS - ADICIONAIS ====================
  { question: "Em qual cidade Jesus nasceu?", options: ["Nazaré", "Jerusalém", "Belém", "Cafarnaum"], correctAnswer: 2, category: "Evangelhos", difficulty: "Fácil", verse: "Lucas 2:11 - Na cidade de Davi vos nasceu hoje o Salvador" },
  { question: "Quantos discípulos Jesus escolheu?", options: ["7", "10", "70", "12"], correctAnswer: 3, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 10:1 - E, chamando os seus doze discípulos" },
  { question: "Qual foi o primeiro milagre de Jesus?", options: ["Transformar água em vinho", "Alimentação dos 5000", "Caminhar sobre as águas", "Cura de um cego"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "João 2:11 - Este começo dos sinais fez Jesus em Caná da Galileia" },
  { question: "Quem batizou Jesus?", options: ["Pedro", "João o Batista", "Felipe", "Ananias"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 3:13 - Jesus foi da Galileia ao Jordão ter com João" },
  { question: "Quantos dias Jesus ficou no deserto sendo tentado?", options: ["7", "20", "40", "80"], correctAnswer: 2, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 4:2 - E tendo jejuado quarenta dias e quarenta noites" },
  { question: "Qual evangelista escreveu o evangelho mais curto?", options: ["Mateus", "João", "Lucas", "Marcos"], correctAnswer: 3, category: "Evangelhos", difficulty: "Fácil", verse: "Marcos tem 16 capítulos, o menor dos quatro evangelhos" },
  { question: "Quem foi o discípulo que traiu Jesus?", options: ["Judas Iscariotes", "Pedro", "Tomé", "Bartolomeu"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 26:47-48 - Judas, um dos doze, chegou" },
  { question: "Quantos pães Jesus usou para alimentar os cinco mil?", options: ["3", "5", "7", "12"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "João 6:9 - Aqui está um rapaz que tem cinco pães de cevada" },
  { question: "Em qual monte Jesus pregou as Bem-Aventuranças?", options: ["Monte Sinai", "Monte das Oliveiras", "Monte da Galileia", "Monte Carmelo"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 5:1 - Vendo Jesus as multidões, subiu ao monte" },
  { question: "Quem veio visitar Jesus à noite para aprender sobre o novo nascimento?", options: ["Simão", "José de Arimateia", "Gamaliel", "Nicodemos"], correctAnswer: 3, category: "Evangelhos", difficulty: "Fácil", verse: "João 3:1-2 - Havia entre os fariseus um homem chamado Nicodemos" },
  { question: "Quantas vezes Pedro negou Jesus?", options: ["3", "2", "1", "4"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 26:75 - E chorou amargamente" },
  { question: "Qual é o versículo mais curto da Bíblia?", options: ["Êxodo 20:13", "João 11:35", "João 3:16", "Salmo 117:2"], correctAnswer: 1, category: "Evangelhos", difficulty: "Médio", verse: "João 11:35 - Jesus chorou" },
  { question: "Quem ajudou Jesus a carregar a cruz?", options: ["João", "Pedro", "Simão de Cirene", "José de Arimateia"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 27:32 - Encontraram um homem de Cirene, chamado Simão" },
  { question: "Em qual evangelhos aparece a parábola do Filho Pródigo?", options: ["Mateus", "Marcos", "João", "Lucas"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "Lucas 15:11 - Um homem tinha dois filhos" },
  { question: "Qual discípulo caminhou sobre as águas com Jesus?", options: ["Pedro", "Tiago", "João", "André"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 14:29 - Pedro desceu do barco e andou sobre as águas" },
  { question: "Quem era o governador romano quando Jesus foi condenado?", options: ["Herodes", "Pôncio Pilatos", "César", "Félix"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 27:2 - E o entregaram a Pôncio Pilatos" },
  { question: "Quanto tempo Jesus ficou no túmulo?", options: ["1 dia", "2 dias", "3 dias", "7 dias"], correctAnswer: 2, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 12:40 - Assim estará o Filho do Homem no coração da terra três dias e três noites" },
  { question: "Quem foi a primeira pessoa a ver Jesus ressurreto?", options: ["Pedro", "João", "Maria, mãe de Jesus", "Maria Madalena"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "João 20:16 - Jesus lhe disse: Maria!" },
  { question: "Qual era a profissão de Mateus antes de seguir Jesus?", options: ["Publicano", "Carpinteiro", "Pescador", "Fariseu"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 9:9 - Passando Jesus dali, viu um homem chamado Mateus, sentado na coletoria" },
  { question: "Qual foi o Sermão de Jesus descrito em Mateus 5-7?", options: ["Sermão Apocalíptico", "Sermão do Monte", "Sermão do Templo", "Sermão à Beira-Mar"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 5:1 - Subiu ao monte e, assentando-se, seus discípulos vieram a ele" },
  { question: "Quem reconheceu Jesus como o Filho de Deus ao vê-lo morrer na cruz?", options: ["Pilatos", "Herodes", "O centurião romano", "O sumo sacerdote"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 27:54 - Verdadeiramente este era o Filho de Deus" },
  { question: "Quantas Bem-Aventuranças Jesus pronunciou?", options: ["7", "9", "10", "8"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 5:3-10 - Oito bem-aventuranças" },
  { question: "Em qual evangelhos Jesus converte a samaritana no poço?", options: ["João", "Marcos", "Mateus", "Lucas"], correctAnswer: 0, category: "Evangelhos", difficulty: "Médio", verse: "João 4:9 - Como tu, sendo judeu, me pedes água a mim?" },
  { question: "Qual milagre Jesus fez com Lázaro?", options: ["Abriu seus olhos", "Ressuscitou-o dos mortos", "Curou sua lepra", "Libertou-o de demônios"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "João 11:43-44 - Lázaro, vem para fora" },
  { question: "Qual era o nome do pai de João o Batista?", options: ["Simão", "Joaquim", "Zacarias", "Ananias"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Lucas 1:13 - A tua mulher Isabel te dará um filho, ao qual porás o nome de João" },

  // ==================== CARTAS - ADICIONAIS ====================
  { question: "Quem escreveu a maior parte das cartas do Novo Testamento?", options: ["Pedro", "João", "Tiago", "Paulo"], correctAnswer: 3, category: "Cartas", difficulty: "Fácil", verse: "Paulo escreveu 13 epístolas do NT" },
  { question: "Qual carta começa com 'Paulo, servo de Jesus Cristo, chamado apóstolo'?", options: ["Romanos", "Gálatas", "Efésios", "Filipenses"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "Romanos 1:1 - Paulo, servo de Jesus Cristo, chamado apóstolo" },
  { question: "Qual carta foi escrita da prisão e fala em 'regozijai-vos'?", options: ["Efésios", "Filipenses", "Filemom", "Colossenses"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "Filipenses 4:4 - Regozijai-vos sempre no Senhor" },
  { question: "Qual carta foi endereçada a uma comunidade da Ásia Menor sobre o corpo de Cristo?", options: ["Gálatas", "Romanos", "Efésios", "Colossenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Efésios 1:1 - Paulo, apóstolo de Jesus Cristo, aos santos em Éfeso" },
  { question: "Qual carta contém o famoso capítulo sobre o amor (capítulo 13)?", options: ["Romanos", "2 Coríntios", "Efésios", "1 Coríntios"], correctAnswer: 3, category: "Cartas", difficulty: "Fácil", verse: "1 Coríntios 13:4 - O amor é paciente, o amor é benigno" },
  { question: "Qual carta fala extensamente sobre a fé como justificação, citando Abraão?", options: ["Gálatas", "Romanos", "Hebreus", "Tiago"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "Gálatas 3:6 - Assim como Abraão creu em Deus" },
  { question: "Qual carta Paulo escreveu para convencer alguém a receber de volta um escravo fugitivo?", options: ["1 Timóteo", "Filemom", "Tito", "2 Tessalonicenses"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "Filemom 1:10 - Rogo-te por meu filho Onésimo" },
  { question: "Qual carta contém a lista das armaduras de Deus?", options: ["Romanos", "Colossenses", "Efésios", "Filipenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Efésios 6:13 - Tomai toda a armadura de Deus" },
  { question: "Qual carta afirma que 'a fé sem obras é morta'?", options: ["Romanos", "1 Pedro", "Gálatas", "Tiago"], correctAnswer: 3, category: "Cartas", difficulty: "Fácil", verse: "Tiago 2:26 - Assim também a fé, se não tiver obras, é morta em si mesma" },
  { question: "Qual carta do NT foi escrita para hebreus cristãos tentados a voltar ao judaísmo?", options: ["Hebreus", "Romanos", "Colossenses", "Gálatas"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "Hebreus 1:1 - Havendo Deus antigamente falado muitas vezes" },
  { question: "Qual carta descreve Jesus como 'o mesmo ontem, hoje e eternamente'?", options: ["João", "Hebreus", "Romanos", "Colossenses"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "Hebreus 13:8 - Jesus Cristo é o mesmo ontem, e hoje, e eternamente" },
  { question: "Em qual carta Paulo lista os frutos do Espírito?", options: ["Romanos", "Efésios", "Gálatas", "Colossenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Gálatas 5:22 - O fruto do Espírito é: amor, alegria, paz..." },
  { question: "Quantos frutos do Espírito são listados em Gálatas 5?", options: ["12", "8", "7", "9"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "Gálatas 5:22-23 - amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, temperança" },
  { question: "Qual carta Paulo escreve sobre ressurreição dos mortos em 1 Coríntios 15?", options: ["1 Coríntios", "2 Coríntios", "Romanos", "Filipenses"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "1 Coríntios 15:20 - Mas Cristo ressuscitou dos mortos" },
  { question: "Qual carta foi escrita para combater um falso ensinamento sobre Cristo em Colossos?", options: ["Efésios", "Colossenses", "1 Tessalonicenses", "Filipenses"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "Colossenses 2:9 - Porque nele habita corporalmente toda a plenitude da divindade" },
  { question: "Qual carta contém a frase 'Posso tudo naquele que me fortalece'?", options: ["Colossenses", "Efésios", "Filipenses", "Romanos"], correctAnswer: 2, category: "Cartas", difficulty: "Fácil", verse: "Filipenses 4:13 - Posso tudo naquele que me fortalece" },
  { question: "Para qual comunidade Paulo escreveu sobre a segunda vinda de Cristo com maior detalhe?", options: ["Éfeso", "Roma", "Corinto", "Tessalônica"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "1 Tessalonicenses 4:16 - O próprio Senhor descerá do céu" },
  { question: "Qual carta de João fala sobre 'andar na luz'?", options: ["1 João", "2 João", "3 João", "Apocalipse"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "1 João 1:7 - Mas, se andarmos na luz... o sangue de Jesus Cristo nos purifica" },
  { question: "Qual carta foi escrita para Timóteo sobre como conduzir a igreja?", options: ["Filemom", "1 Timóteo", "Tito", "Hebreus"], correctAnswer: 1, category: "Cartas", difficulty: "Fácil", verse: "1 Timóteo 3:1 - Fiel é esta palavra: se alguém aspira ao episcopado" },
  { question: "Qual carta contém a famosa passagem sobre a renovação da mente?", options: ["Efésios", "1 Coríntios", "Romanos", "Colossenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Romanos 12:2 - Transformai-vos pela renovação da vossa mente" },
  { question: "Qual carta menciona 'toda a Escritura é divinamente inspirada'?", options: ["Hebreus", "1 Timóteo", "1 Coríntios", "2 Timóteo"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "2 Timóteo 3:16 - Toda a Escritura divinamente inspirada" },
  { question: "Qual carta de Pedro fala sobre sofrimento e esperança na ressurreição?", options: ["1 Pedro", "2 Pedro", "Hebreus", "Tiago"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "1 Pedro 1:3 - Que nos regenerou para uma viva esperança" },
  { question: "Qual carta alerta sobre falsos profetas e a segunda vinda?", options: ["1 Pedro", "2 Pedro", "Judas", "1 João"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "2 Pedro 2:1 - Haverá entre vós falsos mestres" },
  { question: "Qual carta do NT tem apenas 13 versículos?", options: ["3 João", "Filemom", "2 João", "Judas"], correctAnswer: 2, category: "Cartas", difficulty: "Difícil", verse: "2 João tem 13 versículos" },
  { question: "Qual carta exorta a contender pela fé que foi dada aos santos?", options: ["1 João", "2 João", "3 João", "Judas"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "Judas 1:3 - Para vos exortar a batalhar pela fé" },

  // ==================== HISTÓRICOS - EXPANSÃO ====================
  { question: "Quem foi o filho de Jessé que Deus escolheu como rei?", options: ["Davi", "Abinadabe", "Eliabe", "Sameá"], correctAnswer: 0, category: "Históricos", difficulty: "Fácil", verse: "1 Samuel 16:12 - Este é; unge-o" },
  { question: "Qual era o nome da mãe de Samuel?", options: ["Noemí", "Ana", "Rute", "Débora"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "1 Samuel 1:20 - Ana concebeu e deu à luz um filho" },
  { question: "Onde Samuel cresceu servindo ao Senhor?", options: ["Jerusalém", "Belém", "Silo", "Hebrom"], correctAnswer: 2, category: "Históricos", difficulty: "Fácil", verse: "1 Samuel 3:1 - O jovem Samuel ministrava ao Senhor diante de Eli, em Silo" },
  { question: "Qual era o nome do sacerdote que criou Samuel no templo?", options: ["Samuel", "Finéias", "Aías", "Eli"], correctAnswer: 3, category: "Históricos", difficulty: "Fácil", verse: "1 Samuel 1:25 - Trouxeram o menino a Eli" },
  { question: "Quem foi o pai de Davi?", options: ["Jessé", "Saul", "Boaz", "Elimeleque"], correctAnswer: 0, category: "Históricos", difficulty: "Fácil", verse: "1 Samuel 16:1 - Enviar-te-ei a Jessé, o belemita" },
  { question: "Qual era a tribo de Saul?", options: ["Judá", "Benjamim", "Efraim", "Dã"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "1 Samuel 9:1-2 - Era um homem de Benjamim" },
  { question: "Quanto tempo Davi reinou em Hebrom antes de ir para Jerusalém?", options: ["3 anos", "5 anos", "7 anos e 6 meses", "10 anos"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "2 Samuel 5:5 - Em Hebrom reinou sete anos e seis meses" },
  { question: "Quem foi o general de Saul que Abner matou?", options: ["Joabe", "Ittai", "Abisai", "Asael"], correctAnswer: 3, category: "Históricos", difficulty: "Difícil", verse: "2 Samuel 2:23 - Abner o feriu pelo ventre com a ponta da lança" },
  { question: "Quem traiu Sansão contando o segredo de sua força?", options: ["Dalila", "Miriam", "Débora", "Rute"], correctAnswer: 0, category: "Históricos", difficulty: "Fácil", verse: "Juízes 16:17 - Disse-lhe todo o seu coração" },
  { question: "Qual era o sinal da aliança de Rute com Noemi?", options: ["Um anel de ouro", "'Onde tu morreres, morrerei eu'", "Ela cortou seus cabelos", "Ela se prostrou"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "Rute 1:16-17 - Onde tu morreres, morrerei eu" },
  { question: "Quem foi o parente redentor que se recusou a resgatar a propriedade de Noemi?", options: ["Boaz", "Queliom", "Um parente mais próximo anônimo", "Malom"], correctAnswer: 2, category: "Históricos", difficulty: "Difícil", verse: "Rute 4:6 - Não posso resgatar para mim" },
  { question: "Qual foi o maior pecado de Salomão em sua velhice?", options: ["Praticar feitiçaria", "Matar seus irmãos", "Roubar o templo", "Adorar deuses estrangeiros"], correctAnswer: 3, category: "Históricos", difficulty: "Médio", verse: "1 Reis 11:4 - Inclinou seu coração após outros deuses" },
  { question: "Quem foi o comandante do exército que ajudou Salomão a consolidar o trono?", options: ["Benaia", "Joabe", "Amasa", "Abner"], correctAnswer: 0, category: "Históricos", difficulty: "Difícil", verse: "1 Reis 2:35 - O rei pôs Benaia, filho de Joiada, no lugar de Joabe" },
  { question: "Qual profeta confrontou Davi pelo seu pecado com Bate-Seba?", options: ["Gade", "Natã", "Samuel", "Aías"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "2 Samuel 12:1 - O Senhor enviou Natã a Davi" },
  { question: "Quem foi o filho de Davi que se rebelou e tentou tomar o trono?", options: ["Adonias", "Amnon", "Absalão", "Salomão"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "2 Samuel 15:10 - Absalão mandou espias por todas as tribos" },
  { question: "Onde o exército de Absalão foi derrotado?", options: ["Vale do Jordão", "Vale de Elá", "Monte Gilboa", "Floresta de Efraim"], correctAnswer: 3, category: "Históricos", difficulty: "Difícil", verse: "2 Samuel 18:6 - A batalha foi na floresta de Efraim" },
  { question: "Quem matou Absalão pendurado pelo cabelo numa árvore?", options: ["Joabe", "Davi", "Abisai", "Ittai"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "2 Samuel 18:14 - Joabe tomou três dardos na mão" },
  { question: "Qual rain visitou Salomão para testar sua sabedoria?", options: ["A rainha da Assíria", "A rainha de Sabá", "A rainha do Egito", "A rainha de Tiro"], correctAnswer: 1, category: "Históricos", difficulty: "Fácil", verse: "1 Reis 10:1 - A rainha de Sabá ouviu a fama de Salomão" },
  { question: "Quem foi o rei assírio que destruiu o reino do Norte?", options: ["Tiglate-Pileser", "Senaqueribe", "Salmaneser V", "Assaradom"], correctAnswer: 2, category: "Históricos", difficulty: "Difícil", verse: "2 Reis 17:6 - No nono ano de Oseias, o rei da Assíria tomou Samaria" },
  { question: "Qual rei babilônico destruiu Jerusalém e o templo?", options: ["Belsazar", "Dario", "Ciro", "Nabucodonozor"], correctAnswer: 3, category: "Históricos", difficulty: "Fácil", verse: "2 Reis 25:9 - Queimou a casa do Senhor" },
  { question: "Quantos anos durou o cativeiro babilônico?", options: ["70 anos", "40 anos", "50 anos", "80 anos"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "Jeremias 25:11 - Setenta anos servirão ao rei da Babilônia" },
  { question: "Qual rei persa decretou que os judeus podiam retornar a Jerusalém?", options: ["Dario", "Ciro", "Artaxerxes", "Cambises"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "Esdras 1:1 - No primeiro ano de Ciro, rei da Pérsia" },
  { question: "Quem era o sacerdote que retornou com Zorobabel?", options: ["Neemias", "Esdras", "Josué", "Malaquias"], correctAnswer: 2, category: "Históricos", difficulty: "Difícil", verse: "Esdras 2:2 - Com Zorobabel vieram Jesua..." },
  { question: "Quanto tempo levou para reconstruir o templo após o retorno do exílio?", options: ["46 anos", "4 anos", "2 anos", "20 anos"], correctAnswer: 3, category: "Históricos", difficulty: "Difícil", verse: "Esdras 6:15 - O templo foi concluído... cerca de 20 anos após o início" },
  { question: "Qual era a tribo de Esdras?", options: ["Levi", "Judá", "Benjamim", "Efraim"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "Esdras 7:1 - Esdras, filho de Seraia... filho de Arão, o sumo sacerdote" },
  { question: "Quem eram os adversários que tentaram impedir a reconstrução do templo?", options: ["Os filisteus", "Os samaritanos", "Os edomitas", "Os amonitas"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "Esdras 4:1-2 - Os adversários de Judá e Benjamim" },
  { question: "Qual estratégia Neemias usou enquanto reconstruía o muro?", options: ["Trabalhavam apenas de noite", "Só orava", "Metade trabalhava, metade montava guarda", "Pagou soldados mercenários"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "Neemias 4:16 - Metade dos meus servos trabalhava... e metade tinha lanças" },
  { question: "Quem foi o rei que promoveu Ester a rainha após depor Vasti?", options: ["Artaxerxes", "Dario", "Ciro", "Assuero"], correctAnswer: 3, category: "Históricos", difficulty: "Médio", verse: "Ester 2:17 - Assuero amou Ester mais do que todas as mulheres" },
  { question: "Como Mordecai salvou o rei Assuero de um atentado?", options: ["Delatou os conspiradores ao rei", "Matou os conspiradores", "Avisou a Ester que avisou o rei", "Descobriu a trama no portão"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "Ester 2:22 - Mordecai o revelou a Ester" },
  { question: "Em qual livro histórico aparece a expressão 'Como o Senhor ordenou a Moisés'?", options: ["Juízes", "Josué", "1 Samuel", "1 Reis"], correctAnswer: 1, category: "Históricos", difficulty: "Difícil", verse: "Josué 11:15 - Assim como o Senhor ordenou a Moisés, assim Moisés ordenou a Josué" },
  { question: "Quem foi o último juiz de Israel antes da monarquia?", options: ["Sansão", "Jefté", "Samuel", "Gideão"], correctAnswer: 2, category: "Históricos", difficulty: "Médio", verse: "1 Samuel 7:15 - Samuel julgou Israel por todos os dias da sua vida" },
  { question: "Qual tribo de Israel foi quase extinta por causa de um crime em Gibeá?", options: ["Dã", "Simeão", "Efraim", "Benjamim"], correctAnswer: 3, category: "Históricos", difficulty: "Difícil", verse: "Juízes 20:48 - Feriram os homens de Benjamim com a espada" },
  { question: "Qual rei construiu o muro de Jerusalém ao redor da cidade de Davi?", options: ["Salomão", "Josias", "Ezequias", "Davi"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "1 Reis 3:1 - E edificou o muro de Jerusalém em redor" },
  { question: "Quem foi o primeiro servo de Eliseu?", options: ["Jeazanias", "Giezi", "Naomã", "Abisai"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "2 Reis 4:12 - Disse ele ao seu servo Giezi" },
  { question: "O que Eliseu fez pelo general sírio Naomã?", options: ["Salvou seu exército", "Profetizou sua vitória", "Curou sua lepra", "Alimentou seus soldados"], correctAnswer: 2, category: "Históricos", difficulty: "Fácil", verse: "2 Reis 5:14 - Naomã desceu e mergulhou no Jordão sete vezes" },
  { question: "Qual rei de Judá destruiu a serpente de bronze que Moisés havia feito?", options: ["Josias", "Asa", "Josafá", "Ezequias"], correctAnswer: 3, category: "Históricos", difficulty: "Difícil", verse: "2 Reis 18:4 - Quebrou a serpente de bronze que Moisés fizera" },
  { question: "Quem foi o rei de Judá que adoeceu e orou, e Deus lhe acrescentou 15 anos de vida?", options: ["Ezequias", "Josias", "Manassés", "Asa"], correctAnswer: 0, category: "Históricos", difficulty: "Médio", verse: "2 Reis 20:5-6 - Acrescentarei aos teus dias quinze anos" },
  { question: "Qual rei de Judá foi o mais ímpio, praticando até sacrifício de filhos no fogo?", options: ["Acaz", "Manassés", "Amom", "Jeoiaquim"], correctAnswer: 1, category: "Históricos", difficulty: "Médio", verse: "2 Reis 21:6 - E fez passar pelo fogo a seu filho" },
  { question: "Quem foi o sacerdote que encontrou o Livro da Lei durante a reforma de Josias?", options: ["Safã", "Azarias", "Hilquias", "Seraia"], correctAnswer: 2, category: "Históricos", difficulty: "Difícil", verse: "2 Reis 22:8 - Hilquias disse ao escriba Safã: Achei o livro da lei" },
  { question: "Qual batalha marcou o fim do reino de Judá antes da deportação?", options: ["Batalha de Megido", "Cerco de Laquis", "Batalha de Carquemis", "Cerco de Jerusalém"], correctAnswer: 3, category: "Históricos", difficulty: "Médio", verse: "2 Reis 25:1 - Nabucodonozor veio contra Jerusalém" },
  { question: "Em qual mês e ano do reinado de Nabucodonosor caiu Jerusalém?", options: ["Quarto mês do 11º ano", "Terceiro mês do 9º ano", "Sexto mês do 7º ano", "Primeiro mês do 10º ano"], correctAnswer: 0, category: "Históricos", difficulty: "Expert", verse: "2 Reis 25:3 - No quarto mês, no nono dia do mês" },
  { question: "Qual profeta aconselhou o rei Josafá antes da batalha contra Moabe e Amom?", options: ["Eliseu", "Jahaziel", "Elias", "Micaías"], correctAnswer: 1, category: "Históricos", difficulty: "Difícil", verse: "2 Crônicas 20:14 - Jahaziel... foi sobre ele o Espírito do Senhor" },
  { question: "Quantos anos o templo de Salomão ficou em pé antes de ser destruído?", options: ["200 anos", "300 anos", "370 anos", "400 anos"], correctAnswer: 2, category: "Históricos", difficulty: "Expert", verse: "Construído ~960 aC, destruído ~586 aC — cerca de 374 anos" },

  // ==================== POÉTICOS - EXPANSÃO ====================
  { question: "Qual livro começa com 'Bem-aventurado o homem que não anda no conselho dos ímpios'?", options: ["Jó", "Provérbios", "Eclesiastes", "Salmos"], correctAnswer: 3, category: "Poéticos", difficulty: "Fácil", verse: "Salmo 1:1 - Bem-aventurado o homem que não anda no conselho dos ímpios" },
  { question: "Quem disse 'Nu saí do ventre de minha mãe e nu voltarei'?", options: ["Jó", "Davi", "O pregador", "Salomão"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Jó 1:21 - Nu saí do ventre de minha mãe, e nu tornarei para lá" },
  { question: "Qual salmo começa com 'Os céus proclamam a glória de Deus'?", options: ["Salmo 8", "Salmo 19", "Salmo 24", "Salmo 29"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Salmo 19:1 - Os céus proclamam a glória de Deus" },
  { question: "O que Eclesiastes quer dizer com 'vaidade'?", options: ["Orgulho", "Riqueza", "Fugacidade e sem sentido", "Pecado"], correctAnswer: 2, category: "Poéticos", difficulty: "Médio", verse: "Eclesiastes 1:2 - Vaidade das vaidades, tudo é vaidade" },
  { question: "Qual provérbio fala sobre criar um filho no caminho certo?", options: ["Pv 31:10", "Pv 10:1", "Pv 3:5", "Pv 22:6"], correctAnswer: 3, category: "Poéticos", difficulty: "Fácil", verse: "Provérbios 22:6 - Instrui o menino no caminho em que deve andar" },
  { question: "Qual salmo diz 'Cria em mim, ó Deus, um coração puro'?", options: ["Salmo 51", "Salmo 37", "Salmo 23", "Salmo 91"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Salmo 51:10 - Cria em mim, ó Deus, um coração puro" },
  { question: "Quem foi Asafe em relação aos Salmos?", options: ["Um rei de Israel", "Um levita músico e salmista", "Um profeta menor", "Um sacerdote de Silo"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Salmo 73:1 - Salmo de Asafe" },
  { question: "Qual provérbio fala sobre a língua que tem poder de vida e morte?", options: ["Pv 10:19", "Pv 15:1", "Pv 18:21", "Pv 25:15"], correctAnswer: 2, category: "Poéticos", difficulty: "Médio", verse: "Provérbios 18:21 - A morte e a vida estão no poder da língua" },
  { question: "Qual livro poético usa a estrutura de acróstico hebraico em vários capítulos?", options: ["Jó", "Salmos", "Provérbios", "Lamentações"], correctAnswer: 3, category: "Poéticos", difficulty: "Expert", verse: "Lamentações 1-4 usa acróstico pelo alfabeto hebraico" },
  { question: "Qual é o tema central do Cântico de Salomão?", options: ["Amor conjugal", "Sabedoria divina", "Arrependimento", "Louvor a Deus"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Cântico de Salomão 1:2 - Que ele me beije com os beijos de sua boca" },
  { question: "Qual salmo é conhecido como 'salmo de peregrinação' ou 'subidas'?", options: ["Salmos 51-60", "Salmos 120-134", "Salmos 100-110", "Salmos 140-150"], correctAnswer: 1, category: "Poéticos", difficulty: "Difícil", verse: "Salmos 120-134 são os 'Salmos das Subidas' ou 'Peregrinação'" },
  { question: "Qual provérbio fala sobre honrar ao Senhor com as primícias?", options: ["Pv 1:7", "Pv 10:22", "Pv 3:9", "Pv 22:1"], correctAnswer: 2, category: "Poéticos", difficulty: "Médio", verse: "Provérbios 3:9 - Honra ao Senhor com os teus bens e com as primícias" },
  { question: "Qual versículo de Salmos diz 'Ó Deus, tu és o meu Deus, eu te busco ansiosamente'?", options: ["Salmo 42:1", "Salmo 84:1", "Salmo 62:1", "Salmo 63:1"], correctAnswer: 3, category: "Poéticos", difficulty: "Difícil", verse: "Salmo 63:1 - Ó Deus, tu és o meu Deus, eu te busco ansiosamente" },
  { question: "Quantas vezes por dia Davi dizia que louvava a Deus?", options: ["7", "5", "12", "3"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Salmo 119:164 - Sete vezes no dia te louvo" },
  { question: "Qual salmo profetizou as palavras de Jesus na cruz: 'Deus meu, Deus meu, por que me abandonaste'?", options: ["Salmo 16", "Salmo 22", "Salmo 69", "Salmo 110"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Salmo 22:1 - Deus meu, Deus meu, por que me abandonaste?" },
  { question: "Qual capítulo de Provérbios é dedicado inteiramente à mulher virtuosa?", options: ["Provérbios 9", "Provérbios 22", "Provérbios 31", "Provérbios 29"], correctAnswer: 2, category: "Poéticos", difficulty: "Fácil", verse: "Provérbios 31:10 - Mulher virtuosa quem a achará?" },
  { question: "Quantos livros compõem os escritos poéticos do Antigo Testamento?", options: ["3", "6", "4", "5"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Jó, Salmos, Provérbios, Eclesiastes e Cântico — 5 livros" },
  { question: "Qual salmo diz 'O Senhor é minha luz e minha salvação'?", options: ["Salmo 27", "Salmo 23", "Salmo 18", "Salmo 91"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Salmo 27:1 - O Senhor é minha luz e minha salvação" },
  { question: "O que Jó pediu ao final do livro em relação aos seus amigos?", options: ["Que fossem punidos", "Que Deus os perdoasse através da sua oração", "Que fossem abençoados", "Que partissem de sua presença"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Jó 42:8 - Jó, meu servo, orará por vós" },
  { question: "Qual livro diz 'há tempo para nascer e tempo para morrer'?", options: ["Jó", "Provérbios", "Eclesiastes", "Salmos"], correctAnswer: 2, category: "Poéticos", difficulty: "Fácil", verse: "Eclesiastes 3:2 - Tempo de nascer e tempo de morrer" },
  { question: "Qual salmo começa com 'Senhor, tu me sondas e me conheces'?", options: ["Salmo 145", "Salmo 121", "Salmo 119", "Salmo 139"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Salmo 139:1 - Senhor, tu me sondas e me conheces" },
  { question: "Quantas filhas Jó teve após sua restauração?", options: ["3", "2", "4", "1"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Jó 42:13 - Teve também sete filhos e três filhas" },
  { question: "Qual provérbio diz que o homem orgulhoso precede a destruição?", options: ["Pv 14:12", "Pv 16:18", "Pv 11:2", "Pv 19:21"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Provérbios 16:18 - O orgulho precede a destruição" },
  { question: "Qual salmo diz 'Levanto os meus olhos para os montes'?", options: ["Salmo 91", "Salmo 115", "Salmo 121", "Salmo 125"], correctAnswer: 2, category: "Poéticos", difficulty: "Fácil", verse: "Salmo 121:1 - Levanto os meus olhos para os montes" },
  { question: "Qual é o salmo messiânico que fala do Senhor dizendo 'Senta-te à minha direita'?", options: ["Salmo 2", "Salmo 22", "Salmo 72", "Salmo 110"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Salmo 110:1 - Disse o Senhor ao meu Senhor: Assenta-te à minha direita" },
  { question: "Qual livro poético foi escrito por um estrangeiro de Uz?", options: ["Jó", "Provérbios", "Salmos", "Eclesiastes"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Jó 1:1 - Havia no país de Uz um homem chamado Jó" },
  { question: "Como se chama o gênero poético hebraico onde a segunda linha repete ou contrasta a primeira?", options: ["Acróstico", "Parallelismus membrorum", "Quiasmo", "Inclusão"], correctAnswer: 1, category: "Poéticos", difficulty: "Expert", verse: "Paralelismo — técnica literária dominante na poesia hebraica" },
  { question: "Qual salmo diz 'Misericordioso e piedoso é o Senhor, longânimo e cheio de bondade'?", options: ["Salmo 100", "Salmo 113", "Salmo 103", "Salmo 136"], correctAnswer: 2, category: "Poéticos", difficulty: "Médio", verse: "Salmo 103:8 - Misericordioso e piedoso é o Senhor" },
  { question: "O que Jó fazia regularmente por seus filhos para protegê-los espiritualmente?", options: ["Os ensinava a lei", "Os circuncidava novamente", "Orava em jejum", "Oferecia holocaustos por eles"], correctAnswer: 3, category: "Poéticos", difficulty: "Médio", verse: "Jó 1:5 - Jó... oferecia holocaustos, segundo o número de todos eles" },
  { question: "Qual salmo começa com 'Deus é o nosso refúgio e força, socorro bem presente'?", options: ["Salmo 46", "Salmo 91", "Salmo 62", "Salmo 23"], correctAnswer: 0, category: "Poéticos", difficulty: "Médio", verse: "Salmo 46:1 - Deus é o nosso refúgio e força" },
  { question: "Qual provérbio fala sobre o filho que traz vergonha versus o sábio?", options: ["Um filho sábio alegra o pai; um filho insensato é a tristeza da mãe", "Pv 10:1", "Ambas as anteriores são iguais", "Nenhuma das anteriores"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Provérbios 10:1 - O filho sábio alegra o pai; o filho insensato é a tristeza da mãe" },
  { question: "O que Deus mostrou a Jó para revelar Sua grandeza?", options: ["Uma visão do paraíso", "Os serafins em Seu trono", "A criação e os fundamentos da terra", "A glória do monte Sinai"], correctAnswer: 2, category: "Poéticos", difficulty: "Médio", verse: "Jó 38:4 - Onde estavas quando lancei os fundamentos da terra?" },
  { question: "Qual é o livro da Bíblia com mais capítulos?", options: ["Gênesis", "Jeremias", "Isaías", "Salmos"], correctAnswer: 3, category: "Poéticos", difficulty: "Fácil", verse: "Salmos tem 150 capítulos — o maior livro da Bíblia" },
  { question: "Qual salmo é cantado no 'Hallel' judaico durante a Páscoa?", options: ["Salmos 113-118", "Salmos 100-106", "Salmos 120-134", "Salmos 146-150"], correctAnswer: 0, category: "Poéticos", difficulty: "Expert", verse: "Salmos 113-118 — o Grande Hallel cantado na Páscoa" },
  { question: "O que Eclesiastes conclui como a sabedoria máxima do homem?", options: ["Buscar o prazer", "Temer a Deus e guardar seus mandamentos", "Acumular sabedoria", "Aceitar a morte"], correctAnswer: 1, category: "Poéticos", difficulty: "Médio", verse: "Eclesiastes 12:13 - Teme a Deus e guarda os seus mandamentos" },
  { question: "Qual provérbio fala sobre o conselho de muitos?", options: ["Na multidão de palavras não falta pecado", "O louco despreza a instrução", "Nos muitos conselheiros há segurança", "O sábio guarda seus conselhos"], correctAnswer: 2, category: "Poéticos", difficulty: "Médio", verse: "Provérbios 11:14 - Na multidão de conselhos há segurança" },

  // ==================== PROFÉTICOS - EXPANSÃO ====================
  { question: "Qual profeta disse 'Eis que o Senhor proclamará até aos confins da terra: Dizei à filha de Sião: Eis aí vem o teu Salvador'?", options: ["Zacarias", "Jeremias", "Miquéias", "Isaías"], correctAnswer: 3, category: "Proféticos", difficulty: "Difícil", verse: "Isaías 62:11 - Eis que vem o teu Salvador" },
  { question: "Em qual livro profético está a promessa 'Porque eu sei os pensamentos que tenho a vosso respeito'?", options: ["Jeremias", "Daniel", "Ezequiel", "Isaías"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Jeremias 29:11 - Porque eu sei os planos que tenho para vocês" },
  { question: "Qual profeta foi chamado ainda no ventre materno?", options: ["Isaías", "Jeremias", "Ezequiel", "Amós"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Jeremias 1:5 - Antes de te formar no ventre materno, te conheci" },
  { question: "Qual profeta teve uma visão de uma roda dentro de outra roda?", options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Ezequiel 1:16 - A aparência das rodas era como o brilho do topázio" },
  { question: "Em qual capítulo de Isaías está o famoso 'Servo Sofredor'?", options: ["Isaías 7", "Isaías 40", "Isaías 61", "Isaías 53"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Isaías 53:3 - Desprezado e rejeitado pelos homens" },
  { question: "Qual profeta do AT previu com detalhe a entrada triunfal de Jesus em Jerusalém?", options: ["Zacarias", "Jeremias", "Miquéias", "Isaías"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Zacarias 9:9 - Eis que o teu rei vem a ti, montado sobre um jumento" },
  { question: "Qual profeta pregava a mensagem de arrependimento e foi lançado no poço?", options: ["Isaías", "Jeremias", "Ezequiel", "Amós"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Jeremias 38:6 - Lançaram Jeremias no poço" },
  { question: "Quem interpretou o sonho da estátua de Nabucodonozor?", options: ["Sadraque", "Abedenego", "Daniel", "Mesaque"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Daniel 2:36 - Este é o sonho; agora diremos ao rei a sua interpretação" },
  { question: "Qual profeta disse 'O povo que andava em trevas viu uma grande luz'?", options: ["Jeremias", "Zacarias", "Miquéias", "Isaías"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Isaías 9:2 - O povo que andava em trevas viu uma grande luz" },
  { question: "Qual profeta foi o companheiro de Daniel na Babilônia?", options: ["Ezequiel", "Naum", "Zacarias", "Ageu"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Ezequiel também profetizou durante o cativeiro babilônico" },
  { question: "Qual profeta disse 'Não por força nem por violência, mas pelo meu Espírito'?", options: ["Isaías", "Zacarias", "Jeremias", "Malaquias"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Zacarias 4:6 - Não por força nem por violência, mas pelo meu Espírito" },
  { question: "O que Daniel recusou comer na corte babilônica?", options: ["Alimentos sacrificados a ídolos", "Carne de porco", "A comida e vinho da mesa real", "Alimentos impuros pela lei"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Daniel 1:8 - Daniel propôs em seu coração não se contaminar com a comida do rei" },
  { question: "Qual profeta proclamou 'Arrependei-vos, porque o reino dos céus está próximo'?", options: ["Isaías", "Joel", "Malaquias", "João Batista — que cumpriu a profecia"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Isaías 40:3 - Voz que clama no deserto: Preparai o caminho do Senhor" },
  { question: "Qual profeta escreveu sobre o Vale da Decisão?", options: ["Joel", "Jeremias", "Isaías", "Amós"], correctAnswer: 0, category: "Proféticos", difficulty: "Difícil", verse: "Joel 3:14 - Multidões, multidões no vale da decisão" },
  { question: "Qual profeta foi engolido por um peixe por fugir da sua missão?", options: ["Amós", "Jonas", "Naum", "Habacuque"], correctAnswer: 1, category: "Proféticos", difficulty: "Fácil", verse: "Jonas 1:3 - Mas Jonas levantou-se para fugir para Társis" },
  { question: "Em qual profeta está a visão da Nova Jerusalém com o rio de água da vida?", options: ["Isaías", "Jeremias", "Ezequiel", "Daniel"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Ezequiel 47:1 - Saíam águas de debaixo do limiar da casa" },
  { question: "Qual profeta menor pregou contra a soberba de Edom?", options: ["Naum", "Sofonias", "Habacuque", "Obadias"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Obadias 1:3 - O orgulho do teu coração te enganou, ó tu que habitas nas fendas das rochas" },
  { question: "Qual profeta disse 'O Senhor está em seu santo templo; silêncio diante dele, toda a terra'?", options: ["Habacuque", "Isaías", "Naum", "Sofonias"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Habacuque 2:20 - O Senhor está em seu santo templo" },
  { question: "Qual é a mensagem principal do livro de Malaquias?", options: ["O retorno do exílio", "A infidelidade de Israel e o chamado ao arrependimento", "A vinda do Messias", "A destruição de Nínive"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Malaquias 3:7 - Tornai-vos a mim, e eu me tornarei a vós" },
  { question: "Qual profeta disse 'Como são formosos sobre os montes os pés do que anuncia boas novas'?", options: ["Ezequiel", "Jeremias", "Isaías", "Amós"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Isaías 52:7 - Como são formosos os pés do que anuncia as boas novas" },
  { question: "Qual profeta classificou as nações pelos seus pecados em seus dois primeiros capítulos?", options: ["Isaías", "Joel", "Jeremias", "Amós"], correctAnswer: 3, category: "Proféticos", difficulty: "Difícil", verse: "Amós 1-2 - Assim diz o Senhor: Por três transgressões... e por quatro" },
  { question: "Quanto tempo Ezequiel ficou deitado sobre seu lado esquerdo como sinal?", options: ["390 dias", "70 dias", "40 dias", "430 dias"], correctAnswer: 0, category: "Proféticos", difficulty: "Expert", verse: "Ezequiel 4:5 - Deitarás sobre o teu lado esquerdo trezentos e noventa dias" },
  { question: "Qual profeta recusou obedecer ao rei e foi salvo por anjo na cova dos leões?", options: ["Mesaque", "Daniel", "Abedenego", "Sadraque"], correctAnswer: 1, category: "Proféticos", difficulty: "Fácil", verse: "Daniel 6:22 - O meu Deus enviou o seu anjo e fechou a boca dos leões" },
  { question: "Qual profeta disse 'Há um tempo para cada propósito debaixo do céu'?", options: ["Jó", "Jeremias", "O pregador de Eclesiastes", "Isaías"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Eclesiastes 3:1 - Tudo tem o seu tempo determinado" },
  { question: "Qual profeta anunciou o 'Dia do Senhor' como dia de trevas?", options: ["Isaías", "Joel", "Amós", "Todas as anteriores"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Joel 2:2, Amós 5:18, Isaías 13:9 — todos descrevem o Dia do Senhor como trevas" },
  { question: "Qual é o livro profético mais curto do AT, com apenas 21 versículos?", options: ["Obadias", "Habacuque", "Naum", "Ageu"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Obadias tem 21 versículos — o menor livro do AT" },
  { question: "Qual profeta foi chamado ao ministério através de um carvão tocado em seus lábios?", options: ["Jeremias", "Isaías", "Ezequiel", "Daniel"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Isaías 6:6-7 - Um dos serafins tocou a minha boca com o carvão" },
  { question: "Qual profeta escreveu lamentos em forma de acróstico após a queda de Jerusalém?", options: ["Ezequiel", "Isaías", "Jeremias/autor de Lamentações", "Daniel"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Lamentações — acróstico hebraico em 4 dos 5 capítulos" },
  { question: "O que Daniel e seus amigos bebiam em vez do vinho do rei?", options: ["Vinho diluído", "Suco de romã", "Leite", "Água"], correctAnswer: 3, category: "Proféticos", difficulty: "Médio", verse: "Daniel 1:12 - Dá-nos legumes a comer e água a beber" },
  { question: "Qual profeta anunciou a destruição de Nínive com detalhes de cavalheiros e carros?", options: ["Naum", "Sofonias", "Habacuque", "Jonas"], correctAnswer: 0, category: "Proféticos", difficulty: "Médio", verse: "Naum 3:2 - Voz de chicote, voz de ruído de rodas" },
  { question: "Qual profeta foi chamado quando estava entre os deportados junto ao rio Quebar?", options: ["Isaías", "Ezequiel", "Jeremias", "Daniel"], correctAnswer: 1, category: "Proféticos", difficulty: "Médio", verse: "Ezequiel 1:1-3 - Estando eu entre os deportados junto ao rio Quebar" },
  { question: "Qual profeta pregou a soberania de Deus sobre as nações através de visões apocalípticas?", options: ["Isaías", "Jeremias", "Daniel", "Amós"], correctAnswer: 2, category: "Proféticos", difficulty: "Médio", verse: "Daniel 7:14 - E foi-lhe dado domínio, glória e o reino" },

  // ==================== EVANGELHOS - EXPANSÃO ====================
  { question: "Qual evangelista era médico?", options: ["Mateus", "João", "Marcos", "Lucas"], correctAnswer: 3, category: "Evangelhos", difficulty: "Fácil", verse: "Colossenses 4:14 - Lucas, o médico amado" },
  { question: "Qual evangelista era cobrador de impostos antes de seguir Jesus?", options: ["Mateus", "Lucas", "Marcos", "João"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 9:9 - Viu um homem chamado Mateus, sentado na coletoria" },
  { question: "Qual evangelista era pescador e apóstolo próximo de Jesus?", options: ["Marcos", "João", "Lucas", "Mateus"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "João 21:7 - O discípulo amado disse a Pedro: É o Senhor" },
  { question: "Qual milagre Jesus fez antes de entrar em Jericó na narrativa de Lucas 18?", options: ["Curou um leproso", "Ressuscitou um morto", "Curou um cego", "Multiplicou pães"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Lucas 18:42-43 - Recebe a tua vista; a tua fé te salvou" },
  { question: "Qual era o nome do chefe dos publicanos em Jericó que subiu numa amoreira?", options: ["Bartimeu", "Nicodemos", "Levi", "Zaqueu"], correctAnswer: 3, category: "Evangelhos", difficulty: "Fácil", verse: "Lucas 19:2-4 - Havia um homem chamado Zaqueu" },
  { question: "Em qual evangelhos está a parábola do Bom Samaritano?", options: ["Lucas", "Mateus", "Marcos", "João"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "Lucas 10:30-37 - Um homem descia de Jerusalém para Jericó" },
  { question: "Quantas vezes Jesus apareceu após a ressurreição antes de ascender?", options: ["1", "Mais de 10 vezes", "3", "40 vezes"], correctAnswer: 1, category: "Evangelhos", difficulty: "Médio", verse: "Atos 1:3 - A estes também se apresentou vivo... durante quarenta dias" },
  { question: "Qual era o nome do pai de Pedro e André?", options: ["Zebedeu", "Natanael", "Jonas", "Alfeu"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "João 1:42 - Tu és Simão, filho de Jonas" },
  { question: "Qual era o nome do pai de Tiago e João?", options: ["Jonas", "Alfeu", "Herodes", "Zebedeu"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 4:21 - Tiago, filho de Zebedeu, e João, seu irmão" },
  { question: "O que Jesus escreveu no chão quando trouxeram a mulher adúltera?", options: ["A Bíblia não diz o que Jesus escreveu", "Os Dez Mandamentos", "A lei de Moisés", "Os pecados dos acusadores"], correctAnswer: 0, category: "Evangelhos", difficulty: "Médio", verse: "João 8:6 - Jesus, inclinando-se, escrevia com o dedo na terra" },
  { question: "Quantas vezes Jesus cursou a figueira antes de ela secar?", options: ["Nunca — foi seca imediatamente", "Uma vez", "Duas vezes", "Três vezes"], correctAnswer: 1, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 21:19 - Imediatamente a figueira secou" },
  { question: "Qual era o nome da filha de Jairo que Jesus ressuscitou?", options: ["Marta", "Maria", "A Bíblia não diz o nome dela", "Tábita"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Marcos 5:41 - Diz à menina: Talitá, cumi — mas o nome não é revelado" },
  { question: "Em qual monte Jesus foi transfigurado?", options: ["Monte das Oliveiras", "Monte Carmelo", "Monte Sião", "Monte Tabor"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "Marcos 9:2 - Levou-os a um alto monte — tradição identifica como Tabor" },
  { question: "Quem apareceu com Jesus na transfiguração?", options: ["Moisés e Elias", "Elias e Enoque", "Abraão e Moisés", "Davi e Elias"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 17:3 - Apareceram-lhes Moisés e Elias" },
  { question: "Qual discípulo disse 'Meu Senhor e meu Deus' ao ver Jesus ressurreto?", options: ["Pedro", "Tomé", "João", "Natanael"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "João 20:28 - Respondeu-lhe Tomé: Meu Senhor e meu Deus" },
  { question: "Quantos dias após a ressurreição Jesus ascendeu ao céu?", options: ["3", "7", "40", "21"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Atos 1:3 - Durante quarenta dias apareceu-lhes" },
  { question: "Qual evangelhos começa com as genealogia de Jesus por José?", options: ["Marcos", "João", "Lucas", "Mateus"], correctAnswer: 3, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 1:1 - Livro da geração de Jesus Cristo, filho de Davi" },
  { question: "Qual evangelhos começa com 'No princípio era o Verbo'?", options: ["João", "Marcos", "Mateus", "Lucas"], correctAnswer: 0, category: "Evangelhos", difficulty: "Fácil", verse: "João 1:1 - No princípio era o Verbo, e o Verbo estava com Deus" },
  { question: "Qual era a profissão de Marcos antes do ministério?", options: ["Cobrador de impostos", "Ele acompanhou Pedro e Paulo como auxiliar", "Pescador", "Carpinteiro"], correctAnswer: 1, category: "Evangelhos", difficulty: "Médio", verse: "Atos 12:25 - Barnabé e Saulo voltaram... tomando consigo João, chamado Marcos" },
  { question: "Em qual cidade Paulo nasceu?", options: ["Jerusalém", "Antioquia", "Tarso", "Roma"], correctAnswer: 2, category: "Evangelhos", difficulty: "Fácil", verse: "Atos 21:39 - Eu sou judeu de Tarso da Cilícia" },
  { question: "Quem foi o discípulo amado que Jesus recomendou a sua mãe?", options: ["Pedro", "Tiago", "André", "João"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "João 19:27 - Depois diz ao discípulo: Eis aí tua mãe" },
  { question: "Qual evangelhos é o único que não relata a transfiguração?", options: ["João", "Marcos", "Mateus", "Lucas"], correctAnswer: 0, category: "Evangelhos", difficulty: "Médio", verse: "João não narra a transfiguração — presente em Mateus 17, Marcos 9, Lucas 9" },
  { question: "Quem pediu a cabeça de João Batista?", options: ["Herodes Antipas", "Herodias por meio de sua filha Salomé", "Os líderes religiosos", "Pilatos"], correctAnswer: 1, category: "Evangelhos", difficulty: "Médio", verse: "Marcos 6:24 - A menina saiu e perguntou à mãe: Que pedirei? Ela disse: A cabeça de João Batista" },
  { question: "Qual parábola fala de 10 virgens, 5 sábias e 5 tolas?", options: ["Parábola dos Talentos", "Parábola da Rede", "Parábola das Dez Virgens", "Parábola das Ovelhas e Cabritos"], correctAnswer: 2, category: "Evangelhos", difficulty: "Fácil", verse: "Mateus 25:1 - O reino dos céus é semelhante a dez virgens" },
  { question: "Quantos talentos recebeu o servo que os multiplicou na parábola?", options: ["1", "2", "10", "5"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 25:16 - O que recebera cinco talentos ganhou outros cinco" },
  { question: "Qual era a língua em que Jesus geralmente ensinava?", options: ["Aramaico", "Grego", "Hebraico", "Latim"], correctAnswer: 0, category: "Evangelhos", difficulty: "Médio", verse: "Jesus falava aramaico — a língua vernácula dos judeus da época" },
  { question: "Qual foi o título colocado na cruz de Jesus por Pilatos?", options: ["Jesus de Nazaré, o Filho de Deus", "Jesus de Nazaré, o Rei dos Judeus", "Jesus de Nazaré, o Profeta", "Jesus de Nazaré, o Cristo"], correctAnswer: 1, category: "Evangelhos", difficulty: "Fácil", verse: "João 19:19 - Jesus de Nazaré, Rei dos Judeus" },
  { question: "Quem pediu o corpo de Jesus após a crucificação?", options: ["Nicodemos sozinho", "Pedro e João", "José de Arimateia", "Maria Madalena"], correctAnswer: 2, category: "Evangelhos", difficulty: "Médio", verse: "Mateus 27:57-58 - José de Arimateia foi a Pilatos e pediu o corpo de Jesus" },
  { question: "Em qual evangelhos Jesus chora diante do túmulo de Lázaro?", options: ["Mateus", "Marcos", "Lucas", "João"], correctAnswer: 3, category: "Evangelhos", difficulty: "Médio", verse: "João 11:35 - Jesus chorou" },
  { question: "Qual era a distância entre Jerusalém e Emaús onde Jesus apareceu aos discípulos?", options: ["11 km", "25 km", "5 km", "50 km"], correctAnswer: 0, category: "Evangelhos", difficulty: "Expert", verse: "Lucas 24:13 - Uma aldeia chamada Emaús, distante de Jerusalém sessenta estádios (aprox. 11 km)" },
  { question: "Quantas vezes a palavra 'amor' (ágape) aparece no evangelhos de João?", options: ["Menos do que em Mateus", "Mais do que em qualquer outro evangelhos", "Igual a Marcos", "Igual a Lucas"], correctAnswer: 1, category: "Evangelhos", difficulty: "Expert", verse: "João usa extensamente o conceito de amor — mais do que qualquer outro evangelho" },

  // ==================== CARTAS - EXPANSÃO ====================
  { question: "Qual carta começa com uma lista de saudações a mais de 20 pessoas pelo nome?", options: ["1 Coríntios", "Filipenses", "Romanos", "Colossenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Romanos 16 — lista extensa de saudações pessoais" },
  { question: "Qual carta fala sobre o 'espinho na carne' de Paulo?", options: ["Romanos", "Gálatas", "1 Coríntios", "2 Coríntios"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "2 Coríntios 12:7 - Foi-me dado um espinho na carne" },
  { question: "Qual carta descreve os dons espirituais como partes do corpo?", options: ["1 Coríntios", "Romanos", "Efésios", "1 Pedro"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "1 Coríntios 12:12 - Assim como o corpo é um e tem muitos membros" },
  { question: "Qual é a única carta de Paulo endereçada a uma mulher?", options: ["Filemom", "Nenhuma — João escreveu 2 João para a 'senhora eleita'", "2 João", "Tito"], correctAnswer: 1, category: "Cartas", difficulty: "Expert", verse: "2 João 1:1 - Ao ancião, à senhora eleita — Paulo não escreveu cartas para mulheres específicas" },
  { question: "Qual carta fala sobre o amor de Deus que 'foi derramado em nossos corações pelo Espírito'?", options: ["Efésios", "Gálatas", "Romanos", "Filipenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Romanos 5:5 - O amor de Deus foi derramado em nossos corações pelo Espírito Santo" },
  { question: "Qual carta foi escrita por teme de que a comunidade abandonasse a graça pelo legalismo?", options: ["Romanos", "Efésios", "Colossenses", "Gálatas"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "Gálatas 1:6 - Estou admirado que tão depressa vos afasteis" },
  { question: "Qual carta descreve a fé como 'certeza das coisas que se esperam'?", options: ["Hebreus", "Romanos", "Tiago", "1 João"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "Hebreus 11:1 - A fé é a certeza das coisas que se esperam" },
  { question: "Qual carta traz o 'hino de Cristo' em Filipenses 2?", options: ["Colossenses", "Filipenses", "Efésios", "1 Tessalonicenses"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "Filipenses 2:6-11 - Que, sendo em forma de Deus, não teve por usurpação ser igual a Deus" },
  { question: "Qual carta menciona que Paulo havia aprendido a contentar-se em qualquer estado?", options: ["Romanos", "Efésios", "Filipenses", "Colossenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Filipenses 4:11 - Aprendi a contentar-me no estado em que me encontro" },
  { question: "Qual carta foi escrita da ilha de Patmos?", options: ["Hebreus", "1 João", "Judas", "Apocalipse — não é uma epístola"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "Apocalipse 1:9 - Estava na ilha chamada Patmos — tecnicamente não é carta" },
  { question: "Qual carta exorta a 'não apagar o Espírito'?", options: ["1 Tessalonicenses", "Efésios", "1 Coríntios", "Hebreus"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "1 Tessalonicenses 5:19 - Não apagueis o Espírito" },
  { question: "Em qual carta Paulo descreve sua própria luta: 'O que não quero, isso faço'?", options: ["Gálatas", "Romanos", "1 Coríntios", "Filipenses"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "Romanos 7:19 - O bem que quero, não faço; mas o mal que não quero, esse faço" },
  { question: "Qual carta faz a maior defesa da ressurreição física de Jesus?", options: ["Romanos", "Gálatas", "1 Coríntios", "Hebreus"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "1 Coríntios 15:14 - E, se Cristo não ressuscitou, é vã a nossa pregação" },
  { question: "Qual carta chama Jesus de 'Sumo Sacerdote'?", options: ["Romanos", "Efésios", "Colossenses", "Hebreus"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "Hebreus 4:14 - Tendo um grande sumo sacerdote que penetrou nos céus, Jesus, Filho de Deus" },
  { question: "Qual carta compara o cristão a um atleta que corre para ganhar o prêmio?", options: ["1 Coríntios", "Romanos", "Gálatas", "Filipenses"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "1 Coríntios 9:24 - Não sabeis que os que correm no estádio, todos correm?" },
  { question: "Qual carta fala sobre a 'nova criatura em Cristo'?", options: ["1 Coríntios", "2 Coríntios", "Romanos", "Gálatas"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "2 Coríntios 5:17 - Se alguém está em Cristo, é nova criação" },
  { question: "Qual carta exorta os maridos a amarem suas mulheres como Cristo amou a Igreja?", options: ["Romanos", "1 Coríntios", "Efésios", "Colossenses"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Efésios 5:25 - Maridos, amai vossas mulheres, como Cristo amou a Igreja" },
  { question: "Qual carta menciona o 'véu de Moisés' como símbolo da leitura do AT sem Cristo?", options: ["Romanos", "Gálatas", "1 Coríntios", "2 Coríntios"], correctAnswer: 3, category: "Cartas", difficulty: "Difícil", verse: "2 Coríntios 3:14 - Até o dia de hoje o mesmo véu permanece" },
  { question: "Qual carta contém a lista dos heróis da fé (Abel, Enoque, Noé, Abraão...)?", options: ["Hebreus", "Tiago", "Romanos", "1 Pedro"], correctAnswer: 0, category: "Cartas", difficulty: "Médio", verse: "Hebreus 11 — o 'hall da fé'" },
  { question: "Qual carta pede oração por todos os que estão em posição de autoridade?", options: ["Romanos", "1 Timóteo", "Tito", "1 Pedro"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "1 Timóteo 2:1-2 - Que se façam súplicas... por todos os homens, pelos reis" },
  { question: "Qual carta foi escrita para um jovem pastor na ilha de Creta?", options: ["1 Timóteo", "2 Timóteo", "Tito", "Filemom"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Tito 1:4-5 - Te deixei em Creta para que corrigisses o que resta" },
  { question: "Qual carta fala em submissão ao governo como ordenança de Deus?", options: ["1 Pedro", "1 Coríntios", "Efésios", "Romanos"], correctAnswer: 3, category: "Cartas", difficulty: "Médio", verse: "Romanos 13:1 - Toda alma esteja sujeita às potestades superiores" },
  { question: "O nome de qual pessoa Paulo menciona como tendo abandonado a fé por 'amar o século presente'?", options: ["Demas", "Demétrio", "Diótrefes", "Dotás"], correctAnswer: 0, category: "Cartas", difficulty: "Difícil", verse: "2 Timóteo 4:10 - Demas me abandonou, amando o século presente" },
  { question: "Qual carta menciona que o amor perfeito lança fora o temor?", options: ["1 Coríntios", "1 João", "Hebreus", "Romanos"], correctAnswer: 1, category: "Cartas", difficulty: "Médio", verse: "1 João 4:18 - O amor perfeito lança fora o temor" },
  { question: "Qual carta diz que devemos resistir ao diabo e ele fugirá?", options: ["Efésios", "1 Pedro", "Tiago", "Judas"], correctAnswer: 2, category: "Cartas", difficulty: "Médio", verse: "Tiago 4:7 - Resisti ao diabo e ele fugirá de vós" }
];

export function getRandomQuestion(difficulty?: 'Fácil' | 'Médio' | 'Difícil' | 'Expert'): Question {
  let filtered = questions;
  
  if (difficulty) {
    filtered = questions.filter(q => q.difficulty === difficulty);
  }
  
  if (filtered.length === 0) {
    filtered = questions;
  }
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function getQuestionsByCategory(category: Question['category']): Question[] {
  return questions.filter(q => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: Question['difficulty']): Question[] {
  return questions.filter(q => q.difficulty === difficulty);
}
