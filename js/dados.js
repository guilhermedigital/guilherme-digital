/* =====================================================================
   DADOS DO SITE — CT TEAM MAROMBA
   ---------------------------------------------------------------------
   ESTE É O ARQUIVO QUE VOCÊ MAIS VAI EDITAR.
   Aqui ficam contatos, horários, convênios, professores, modalidades,
   textos. Você NÃO precisa mexer no HTML nem no CSS para
   atualizar essas informações.

   REGRAS RÁPIDAS DE EDIÇÃO
   - Textos ficam entre aspas:  "assim"
   - Cada item de uma lista é separado por vírgula.
   - Cada item fica entre chaves { ... }.
   - Salvou o arquivo? Atualize a página no navegador (F5) para ver.
   ===================================================================== */


/* ---------------------------------------------------------------------
   1) CONTATOS OFICIAIS
   Se um dia o WhatsApp mudar, altere SÓ aqui: o site inteiro se atualiza.
   --------------------------------------------------------------------- */
const SITE = {
  nome: "CT Team Maromba",
  fundacao: "2016",

  whatsapp: {
    numero: "5511954281994",          // só números, com 55 + DDD
    exibicao: "+55 11 95428-1994",    // como aparece escrito no site
    mensagemPadrao: "Olá! Vim pelo site da CT Team Maromba e gostaria de mais informações."
  },

  instagram: {
    usuario: "ctteammaromba",
    url: "https://www.instagram.com/ctteammaromba/"
  },

  endereco: {
    linha1: "Rua José Virillo, 410",
    linha2: "Bairro Santa Fé",
    linha3: "Itupeva — São Paulo, Brasil",
    // Link oficial para abrir no Google Maps:
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Rua%20Jos%C3%A9%20Virillo%2C%20410%2C%20Santa%20F%C3%A9%2C%20Itupeva%2C%20SP%2C%20Brasil",
    // Mapa incorporado: usa o ENDEREÇO (não coordenadas inventadas).
    mapsEmbed: "https://www.google.com/maps?q=Rua%20Jos%C3%A9%20Virillo%2C%20410%2C%20Santa%20F%C3%A9%2C%20Itupeva%2C%20SP%2C%20Brasil&output=embed"
  }
};


/* ---------------------------------------------------------------------
   2) HORÁRIOS DE FUNCIONAMENTO
   - "dia"    : nome que aparece no site
   - "idx"    : número do dia (0=domingo, 1=segunda ... 6=sábado). Serve
                para destacar o "dia de hoje". Não precisa mudar.
   - "faixas" : lista de horários. Deixe [] se ainda não confirmado.
   - "aviso"  : observação em destaque (use "" para não mostrar nada).
   - "fechado": coloque  fechado: true  nos dias em que a academia não abre
                (aparece "FECHADO" no site). Se o dia abrir, apague essa parte
                e preencha as "faixas".
   --------------------------------------------------------------------- */
const HORARIOS = [
  { dia: "Segunda-feira", idx: 1, faixas: ["06h às 12h", "13h30 às 22h"], aviso: "" },
  { dia: "Terça-feira",   idx: 2, faixas: ["06h às 12h", "13h30 às 22h"], aviso: "" },
  { dia: "Quarta-feira",  idx: 3, faixas: ["06h às 12h", "13h30 às 22h"], aviso: "" },
  { dia: "Quinta-feira",  idx: 4, faixas: ["06h às 12h", "13h30 às 22h"], aviso: "" },
  { dia: "Sexta-feira",   idx: 5, faixas: ["06h às 12h", "13h30 às 21h"], aviso: "" },
  { dia: "Sábado",        idx: 6, faixas: ["08h às 12h"], aviso: "" },
  { dia: "Domingo",       idx: 0, faixas: [], fechado: true, aviso: "" }
];


/* ---------------------------------------------------------------------
   3) CONVÊNIOS ACEITOS
   Para adicionar o logotipo oficial depois: coloque o arquivo em
   assets/images/convenios/ e preencha "logo", por exemplo:
       logo: "assets/images/convenios/wellhub.png"
   Sem logo, o site mostra o nome em texto estilizado.
   --------------------------------------------------------------------- */
const CONVENIOS = [
  { nome: "Wellhub",   plano: "Plano Basic+", logo: "" },
  { nome: "TotalPass", plano: "Plano TP1",    logo: "" }
];


/* ---------------------------------------------------------------------
   4) SOBRE A ACADEMIA
   Enquanto "texto" estiver vazio (""), o site mostra um aviso de
   "conteúdo em breve". Quando você tiver o texto oficial, escreva-o
   entre as aspas — o aviso some sozinho.
   Para quebrar em parágrafos, use dois itens na lista "paragrafos".
   --------------------------------------------------------------------- */
const SOBRE = {
  introducao: "",

  /* Cada bloco é um cartão. Campos opcionais:
     - destaque  : frase em vermelho logo abaixo do título
     - paragrafos: textos do cartão (lista vazia = aparece "Conteúdo em breve")
     - pontos    : lista de destaques com ícone (icone: "variedade", "foco" ou "evolucao")
     - largura   : "total" faz o cartão ocupar a linha inteira
     - tipo      : "chamada" = cartão de mensagem motivadora */
  blocos: [
    // História oficial. Parágrafos como { destaque: "..." } aparecem em destaque (citação em vermelho).
    {
      tipo: "historia",
      titulo: "Nossa história — CT Team Maromba",
      ano: "2016",
      rotuloAno: "Ano de fundação",
      fundadores: ["André Gavioli", "Suzana Molena"],
      paragrafos: [
        "Em 2016, André Gavioli e Suzana Molena decidiram unir a paixão pela profissão e o desejo de empreender para fundar a C.T Team Maromba.",
        "Com formação profissional e uma visão clara de como gostariam de trabalhar, planejaram cada detalhe do espaço para oferecer treinamentos técnicos, eficientes e diferenciados, sempre com foco em resultados.",
        "O início foi marcado por muito trabalho e dedicação. Com a estrutura organizada, a C.T Team Maromba abriu suas portas para receber os primeiros alunos. No começo, o movimento era formado principalmente por conhecidos, moradores da região e indicações.",
        "A orientação profissional e personalizada sempre foi um dos grandes diferenciais da academia. O acompanhamento próximo dos alunos, a execução correta dos exercícios e a busca por uma evolução segura passaram a fazer parte da essência do trabalho.",
        "Os treinamentos foram pensados para atender diferentes objetivos, desde pessoas que estavam começando do zero até aquelas que buscavam desempenho de alto rendimento.",
        { destaque: "Um espaço dedicado à disciplina, à saúde e ao desenvolvimento físico." },
        "Com o passar do tempo, os resultados dos alunos e a energia dos treinamentos fizeram a C.T Team Maromba conquistar seu espaço e expandir suas turmas. A dedicação e a liderança de Suzana Molena contribuíram para transformar a academia em uma referência regional para quem busca treinar com seriedade e profissionalismo.",
        "Desde 2016, a proposta de André Gavioli e Suzana Molena permanece a mesma: promover superação, força e saúde por meio de uma Educação Física de qualidade.",
        { destaque: "A C.T Team Maromba continua evoluindo, mantendo a mesma garra, dedicação e profissionalismo desde o primeiro dia." }
      ]
    },

    {
      titulo: "Filosofia de treinamento",
      destaque: "Disciplina. Constância. Evolução.",
      largura: "total",
      disposicao: "dividida",
      paragrafos: [
        "Acreditamos que cada treino é uma oportunidade de evoluir. Valorizamos a disciplina, a dedicação e a consistência como pilares para quem busca superar limites e alcançar seus objetivos.",
        "Nosso propósito é incentivar cada aluno a dar o seu melhor, respeitando sua jornada e construindo resultados treino após treino."
      ]
    },

    {
      titulo: "Diferenciais",
      destaque: "Mais do que treinar, evoluir.",
      largura: "total",
      paragrafos: [
        "Queremos que cada aluno encontre na CT Team Maromba um ambiente para desenvolver sua força, superar desafios e construir hábitos mais saudáveis."
      ],
      pontos: [
        { icone: "variedade", titulo: "Variedade de modalidades", texto: "Diferentes possibilidades de treinamento para quem busca movimento, força e condicionamento." },
        { icone: "foco",      titulo: "Foco nos objetivos",       texto: "Cada treino representa uma oportunidade de avançar e trabalhar em direção aos próprios objetivos." },
        { icone: "evolucao",  titulo: "Evolução constante",       texto: "Incentivo à disciplina, à consistência e à dedicação dentro e fora da academia." }
      ]
    }
  ],

  // Fotos reais da academia para esta seção (opcional). Exemplo:
  // { arquivo: "assets/images/nome-da-foto.jpg", alt: "Descrição da foto" }
  fotos: []
};


/* ---------------------------------------------------------------------
   5) NOSSA ESSÊNCIA
   Seção institucional (substitui a antiga seção de equipe).
   Cada item de "paragrafos" vira um parágrafo. O botão abre o WhatsApp
   oficial configurado em SITE (não precisa colocar número aqui).
   --------------------------------------------------------------------- */
const ESSENCIA = {
  titulo: "Mais que uma academia. Um compromisso com sua evolução.",
  paragrafos: [
    "Acreditamos que cada treino é uma oportunidade de evoluir, fortalecer a mente e superar desafios. Nosso propósito é incentivar a disciplina, a dedicação e a constância para que cada aluno avance em direção aos seus objetivos.",
    "Seja para começar uma nova jornada ou continuar evoluindo, o importante é dar o primeiro passo."
  ],
  botao: "VENHA CONHECER A CT TEAM MAROMBA"
};


/* ---------------------------------------------------------------------
   6) MODALIDADES E TREINAMENTOS
   Três blocos: Musculação, Aulas fitness e Grupo de corrida.
   Cada bloco tem uma lista "itens" (os cards). Para ADICIONAR uma aula,
   copie uma linha de "itens" e ajuste. Para REMOVER, apague a linha.

   Campos de cada item:
     nome      : nome da atividade
     descricao : texto curto (pode ficar "")
     icone     : "musculacao", "jump", "militar", "step", "agachamento",
                 "circuito" ou "corrida"  (usado quando não há foto)
     imagem    : (opcional) caminho de uma foto, ex.:
                 "assets/images/modalidades/jump.jpg". Com foto, ela
                 substitui o ícone. Use fotos de proporção 4:3.
     alt       : (opcional) texto alternativo da foto

   Campos de cada bloco:
     grupo, introducao, estilo ("destaque" = banner grande, "grade" = cards
     lado a lado, "corrida" = banner especial), itens.

   ATENÇÃO: as descrições das aulas fitness são GERAIS (definem o que é a
   atividade). Confirme com a academia e ajuste se necessário.
   Não há horários nem professores publicados aqui de propósito.
   --------------------------------------------------------------------- */
const MODALIDADES = [
  {
    grupo: "Musculação",
    estilo: "destaque",
    introducao: "Uma das principais atividades oferecidas pela CT Team Maromba.",
    itens: [
      {
        nome: "Musculação",
        descricao: "Treinamento de força e desenvolvimento físico, com orientação profissional e acompanhamento dos objetivos e da evolução de cada aluno.",
        icone: "musculacao",
        // Imagem extraída do vídeo oficial da academia
        imagem: "assets/images/modalidades/musculacao.jpg",
        alt: "Halteres, anilhas e kettlebell em imagem do vídeo oficial da CT Team Maromba"
      }
    ]
  },
  {
    grupo: "Aulas fitness",
    estilo: "grade",
    introducao: "A academia oferece as seguintes aulas.",
    itens: [
      { nome: "Jump",              icone: "jump",        descricao: "Aula com saltos e exercícios realizados em mini cama elástica." },
      { nome: "Treinamento militar", icone: "militar",   descricao: "Aula inspirada em treinamentos militares, com exercícios de condicionamento e resistência." },
      { nome: "Step",              icone: "step",        descricao: "Aula com sequências de movimentos sobre uma plataforma de step." },
      { nome: "Agachamento",       icone: "agachamento", descricao: "Aula com foco no agachamento e no fortalecimento das pernas." },
      { nome: "Circuito funcional", icone: "circuito",   descricao: "Sequência de exercícios funcionais em estações, trabalhando o corpo todo." }
    ]
  },
  {
    grupo: "Grupo de corrida",
    estilo: "corrida",
    introducao: "Grupo coletivo",
    itens: [
      {
        nome: "Grupo de corrida",
        descricao: "Atividade coletiva voltada à corrida, resistência e condicionamento físico, incentivando a prática esportiva, a evolução individual e o espírito de equipe.",
        icone: "corrida"
      }
    ]
  }
];


/* ---------------------------------------------------------------------
   7) SUZANA MOLENA — SEÇÃO EXCLUSIVA
   Tudo que aparece na seção da Suzana vem daqui. Só informações que ela
   forneceu. Para esconder a seção inteira, use ativo: false.

   COMO ADICIONAR MAIS FOTOS DELA
   1. Coloque o arquivo em assets/images/suzana/
   2. Copie uma linha de "fotos" abaixo, cole no fim da lista e ajuste.
      (largura/altura em pixels da foto são opcionais, mas evitam "pulos"
      na página enquanto a imagem carrega.)
   --------------------------------------------------------------------- */
const SUZANA = {
  ativo: true,

  nome: "Suzana Molena",
  titulos: ["Atleta de fisiculturismo", "Preparadora de atletas", "Profissional de Educação Física"],

  // Foto principal de destaque (aparece inteira, sem cortes)
  fotoPrincipal: {
    arquivo: "assets/images/suzana/suzana-palco.jpg",
    alt: "Suzana Molena posando no palco de uma competição de fisiculturismo, sorrindo, com biquíni azul de pedrarias",
    legenda: "Suzana Molena no palco",
    largura: 960, altura: 1600
  },

  // Números em destaque
  indicadores: [
    { numero: "28", rotulo: "anos de experiência com musculação" },
    { numero: "2",  rotulo: "anos de experiência em competições" },
    { numero: "2",  rotulo: "categorias em que compete: Figure e Women’s Physique" }
  ],

  // Ficha rápida
  fatos: [
    { rotulo: "Início na musculação",           valor: "Aos 18 anos" },
    { rotulo: "Competições",                    valor: "Favela Classic e Muscle Contest" },
    { rotulo: "Categorias em que compete",      valor: "Figure e Women’s Physique" },
    { rotulo: "Categorias que prepara",         valor: "Todas as categorias do fisiculturismo" }
  ],

  // Resultados confirmados. Não acrescentar nada que ela não informou.
  conquistas: [
    { destaque: "TOP 4", rotulo: "Women’s Physique" },
    { destaque: "TOP 5", rotulo: "Figure" },
    { destaque: "TOP 2", rotulo: "Figure e Women’s Physique" }
  ],

  trajetoria: [
    "Aos 18 anos, eu era aquela garota que muitos consideravam frágil demais para entrar na área de pesos livres. Naquela época, a musculação feminina ainda carregava o preconceito de que levantar pesos deixaria as mulheres masculinizadas. Mas eu não queria saber de mitos: queria descobrir do que meu corpo era capaz.",
    "Comecei treinando em uma academia de bairro, onde cada treino representava um novo desafio. O que começou como uma busca por autoestima se transformou em uma paixão que me acompanha há 28 anos.",
    "Com o passar do tempo, minha paixão pela musculação se tornou disciplina e conhecimento. Me formei em Educação Física e aprofundei meus estudos em biomecânica, periodização de treinamento e nutrição esportiva. Aprendi que o fisiculturismo vai muito além da estética: é uma construção diária que exige dedicação, paciência e força mental.",
    "Aos 45 anos, decidi dar um novo passo na minha trajetória e subir aos palcos do fisiculturismo, competindo nas categorias Figure e Women’s Physique.",
    "Foram 16 semanas de preparação intensa, marcadas por disciplina, planejamento, treinos e dedicação. No dia da competição, sob as luzes do palco, senti que todo o esforço havia valido a pena.",
    "Mais do que conquistar colocações, descobri que nunca é tarde para desafiar os próprios limites e realizar novos sonhos.",
    "Hoje, além de continuar minha trajetória como atleta, compartilho minha experiência e conhecimento na preparação de outros competidores, ajudando cada um a buscar sua melhor versão."
  ],

  preparacao: {
    paragrafos: [
      "A preparação para uma competição de fisiculturismo é um processo que exige disciplina, planejamento e acompanhamento contínuo.",
      "O trabalho envolve uma gestão cuidadosa das variáveis fisiológicas, nutricionais e comportamentais, com o objetivo de preservar ao máximo a massa muscular enquanto ocorre a redução do percentual de gordura corporal.",
      "Cada etapa é planejada para desenvolver as características exigidas no palco, como densidade muscular, tônus, separação e volume, respeitando as particularidades e os objetivos de cada atleta."
    ],
    atributos: ["Densidade muscular", "Tônus", "Separação", "Volume"],
    destaque: "Preparação para todas as categorias do fisiculturismo."
  },

  visao: [
    "Hoje, como personal trainer, oriento meus alunos a compreenderem que a musculação é muito mais do que levantar pesos em busca de estética. Ela é uma das ferramentas mais completas e eficientes para promover a saúde física e mental.",
    "Quando praticada regularmente e com orientação adequada, a musculação proporciona benefícios importantes ao organismo, contribuindo para a prevenção de doenças, a melhora da qualidade de vida, o fortalecimento do corpo e a promoção da longevidade.",
    "Acredito que cada pessoa tem seu próprio objetivo, e meu papel é orientar, acompanhar e ajudar cada aluno a alcançar sua melhor versão, respeitando sua individualidade e seus limites."
  ],

  // Fotos da atleta (clique para ampliar). Fotos originais, sem alterações.
  fotos: [
    {
      arquivo: "assets/images/suzana/suzana-palco.jpg",
      alt: "Suzana Molena em pose no palco de uma competição, de lado, sorrindo, com biquíni azul de pedrarias",
      legenda: "Pose no palco",
      largura: 960, altura: 1600
    },
    {
      arquivo: "assets/images/suzana/suzana-competicao.jpg",
      alt: "Suzana Molena em pose de bíceps, segurando um troféu, com biquíni vermelho de pedrarias diante do painel do evento",
      legenda: "Competição, com troféu",
      largura: 1200, altura: 1600
    }
  ]
};
