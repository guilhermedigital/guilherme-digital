/* =====================================================================
   CT TEAM MAROMBA — SCRIPT PRINCIPAL
   Este arquivo LÊ os dados de js/dados.js e monta o site.
   Se você só quer atualizar informações, edite js/dados.js, não este.
   ===================================================================== */

"use strict";

/* ---------- Pequenas ferramentas ---------- */

// Cria um elemento HTML: criar("div", "classe", "texto")
function criar(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto) el.textContent = texto;   // textContent = seguro contra código malicioso
  return el;
}

// Gera link do WhatsApp com mensagem pronta
function linkWhatsApp(numero, mensagem) {
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
}

const ICONE_PESSOA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.800-3.600-5-8-5z"/></svg>';


// Ícones do cartão "Sobre" (desenho de linhas, herdam a cor do texto)
const ICONES = {
  variedade: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>',
  foco: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
  evolucao: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  chamada: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4h12l-2.500 4L17 12H5"/></svg>'
};


// Ícones das modalidades (usados quando não há foto). Desenho de linhas.
const ICONES_MOD = {
  musculacao:  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></svg>',
  jump:        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14V4"/><path d="M8 8l4-4 4 4"/><path d="M3 16c2 5 16 5 18 0"/></svg>',
  militar:     '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.5 6 .9-4.4 4.2 1 6L12 16.8l-5.3 2.800 1-6L3.3 9.4l6-.9z"/></svg>',
  step:        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20h5v-5h5v-5h5V5h3"/></svg>',
  agachamento: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16"/><path d="M2.500 4.500v3M21.500 4.500v3"/><path d="M12 9v10"/><path d="M8.500 15.500L12 19l3.500-3.500"/></svg>',
  circuito:    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 0 1-14 5.3"/><path d="M4 12a8 8 0 0 1 14-5.3"/><path d="M18 3v4h-4"/><path d="M6 21v-4h4"/></svg>',
  corrida:     '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="15" cy="4.500" r="1.700"/><path d="M13.500 8l-2 6"/><path d="M13.500 8l3.500 2.500 1.500-1.500"/><path d="M13.500 8l-4 1.500-.5 2"/><path d="M11.500 14l3.500 2.500.5 3.500"/><path d="M11.500 14l-3 2-1.500 3.500"/></svg>'
};

/* ---------- 1) Contatos (WhatsApp, Instagram, endereço) ---------- */
function montarContatos() {
  // Todos os links com a classe js-whatsapp
  document.querySelectorAll(".js-whatsapp").forEach(a => {
    a.href = linkWhatsApp(SITE.whatsapp.numero, SITE.whatsapp.mensagemPadrao);
  });
  document.querySelectorAll(".js-whatsapp-texto").forEach(el => el.textContent = SITE.whatsapp.exibicao);

  document.querySelectorAll(".js-instagram").forEach(a => a.href = SITE.instagram.url);
  document.querySelectorAll(".js-instagram-texto").forEach(el => el.textContent = "@" + SITE.instagram.usuario);
  document.querySelectorAll(".js-instagram-usuario").forEach(el => el.textContent = SITE.instagram.usuario);

  document.querySelectorAll(".js-endereco").forEach(el => {
    el.replaceChildren();
    [SITE.endereco.linha1, SITE.endereco.linha2, SITE.endereco.linha3].forEach((linha, i) => {
      if (i) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(linha));
    });
  });
  document.querySelectorAll(".js-maps").forEach(a => a.href = SITE.endereco.mapsLink);

  // O mapa só é carregado quando o visitante chega perto da seção (deixa o site mais leve)
  const mapa = document.getElementById("mapa");
  const carregarMapa = () => { if (!mapa.src) mapa.src = SITE.endereco.mapsEmbed; };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entradas, obs) => {
      if (entradas.some(e => e.isIntersecting)) { carregarMapa(); obs.disconnect(); }
    }, { rootMargin: "400px" }).observe(mapa);
  } else { carregarMapa(); }

  document.getElementById("ano").textContent = new Date().getFullYear();
}


/* ---------- 2) Sobre a academia ---------- */

// Cartão "Nossa história": ano em destaque + fundadores (lado) e texto (corpo)
function montarHistoria(b) {
  const card = criar("article", "card card-wide card-history reveal");

  const lado = criar("div", "history-side");
  lado.appendChild(criar("strong", "history-year metal", b.ano));
  lado.appendChild(criar("span", "history-label", b.rotuloAno));
  lado.appendChild(criar("hr", "history-line"));
  lado.appendChild(criar("p", "history-founders-title", "Fundadores"));
  const lista = criar("ul", "history-founders");
  b.fundadores.forEach(nome => {
    const li = criar("li");
    const iniciais = nome.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
    li.appendChild(criar("span", "monogram", iniciais));
    li.appendChild(criar("span", "founder-name", nome));
    lista.appendChild(li);
  });
  lado.appendChild(lista);
  card.appendChild(lado);

  const corpo = criar("div", "card-body history-body");
  corpo.appendChild(criar("h3", "", b.titulo));
  b.paragrafos.forEach(p => {
    if (typeof p === "string") corpo.appendChild(criar("p", "", p));
    else corpo.appendChild(criar("blockquote", "history-quote", p.destaque));   // frase em destaque
  });
  card.appendChild(corpo);
  return card;
}

function montarSobre() {
  const intro = document.getElementById("sobreIntro");
  if (SOBRE.introducao) intro.textContent = SOBRE.introducao; else intro.hidden = true;

  const grade = document.getElementById("sobreBlocos");
  SOBRE.blocos.forEach(bloco => {
    if (bloco.tipo === "historia") { grade.appendChild(montarHistoria(bloco)); return; }
    const temConteudo = bloco.paragrafos.length > 0 || (bloco.pontos && bloco.pontos.length > 0);
    const chamada = bloco.tipo === "chamada";
    let classe = "card reveal";
    if (!temConteudo) classe += " card-soon";
    if (bloco.largura === "total") classe += " card-wide";
    if (chamada) classe += " card-cta";
    if (bloco.disposicao === "dividida") classe += " card-split";
    const card = criar("article", classe);

    // Cartão de mensagem motivadora: ícone + título + texto
    if (chamada) {
      const icone = criar("span", "cta-icon"); icone.innerHTML = ICONES.chamada; card.appendChild(icone);
    }

    const corpo = criar("div", "card-body");
    // Cartão "dividido": título à esquerda, textos à direita (usado na Filosofia)
    const dividida = bloco.disposicao === "dividida";
    const cab = dividida ? criar("div", "split-head") : corpo;
    const txt = dividida ? criar("div", "split-text") : corpo;
    cab.appendChild(criar("h3", "", bloco.titulo));
    if (bloco.destaque) cab.appendChild(criar("p", "card-highlight", bloco.destaque));
    if (dividida) corpo.append(cab, txt);

    if (temConteudo) {
      bloco.paragrafos.forEach(p => txt.appendChild(criar("p", "", p)));
    } else {
      txt.appendChild(criar("span", "soon-badge", "Conteúdo em breve"));
      txt.appendChild(criar("p", "card-meta", "O texto oficial desta área será publicado em breve."));
    }

    // Lista de pontos com ícone (usada em "Diferenciais")
    if (bloco.pontos && bloco.pontos.length) {
      const lista = criar("ul", "points");
      bloco.pontos.forEach(pt => {
        const li = criar("li", "point");
        const ic = criar("span", "point-icon"); ic.innerHTML = ICONES[pt.icone] || ICONES.foco;
        const txt = criar("div");
        txt.appendChild(criar("h4", "", pt.titulo));
        txt.appendChild(criar("p", "", pt.texto));
        li.append(ic, txt); lista.appendChild(li);
      });
      corpo.appendChild(lista);
    }
    card.appendChild(corpo);
    grade.appendChild(card);
  });

  const fotos = document.getElementById("sobreFotos");
  SOBRE.fotos.forEach(f => {
    const img = criar("img", "reveal");
    img.src = f.arquivo; img.alt = f.alt || ""; img.loading = "lazy";
    fotos.appendChild(img);
  });
}


/* ---------- 3) Nossa essência ---------- */
function montarEssencia() {
  const alvo = document.getElementById("essenciaConteudo");
  alvo.appendChild(criar("h3", "essence-title", ESSENCIA.titulo));

  const texto = criar("div", "essence-text");
  ESSENCIA.paragrafos.forEach(p => texto.appendChild(criar("p", "", p)));
  const btn = criar("a", "btn", ESSENCIA.botao);
  btn.href = linkWhatsApp(SITE.whatsapp.numero, SITE.whatsapp.mensagemPadrao);  // WhatsApp oficial
  btn.target = "_blank"; btn.rel = "noopener";
  texto.appendChild(btn);
  alvo.appendChild(texto);
}


/* ---------- 4) Seção exclusiva: Suzana Molena (dados em js/dados.js → SUZANA) ---------- */
function montarSuzana() {
  if (!SUZANA.ativo) return;
  const secao = document.getElementById("suzana");
  const alvo = document.getElementById("suzanaConteudo");
  alvo.replaceChildren();

  // Foto clicável (abre ampliada). "lista" = fotos que a janela percorre com as setas.
  const fotoClicavel = (foto, lista, indice, classe) => {
    const b = criar("button", classe);
    b.type = "button";
    b.setAttribute("aria-label", "Ampliar foto: " + (foto.legenda || "Suzana Molena"));
    const img = criar("img");
    img.src = foto.arquivo; img.alt = foto.alt || ""; img.decoding = "async";
    if (foto.largura && foto.altura) { img.width = foto.largura; img.height = foto.altura; }
    b.appendChild(img);
    b.addEventListener("click", () => abrirJanela(indice, lista));
    return b;
  };
  const listaFotos = SUZANA.fotos.map(f => ({ tipo: "foto", arquivo: f.arquivo, legenda: f.legenda }));

  // ---- Apresentação: nome + indicadores + foto principal
  const topo = criar("div", "sz-top");
  const info = criar("div", "sz-info reveal");
  info.appendChild(criar("p", "eyebrow", "Atleta • Preparadora • Educação Física"));

  const [primeiro, ...resto] = SUZANA.nome.split(" ");
  const h2 = criar("h2", "sz-name"); h2.id = "suzana-titulo";
  h2.appendChild(criar("span", "metal", primeiro));
  if (resto.length) h2.appendChild(criar("span", "red", resto.join(" ")));
  info.appendChild(h2);

  const chips = criar("ul", "sz-titles");
  SUZANA.titulos.forEach(t => chips.appendChild(criar("li", "", t)));
  info.appendChild(chips);

  const stats = criar("ul", "sz-stats");
  SUZANA.indicadores.forEach(i => {
    const li = criar("li");
    li.appendChild(criar("strong", "", i.numero));
    li.appendChild(criar("span", "", i.rotulo));
    stats.appendChild(li);
  });
  info.appendChild(stats);

  const fatos = criar("dl", "sz-facts");
  SUZANA.fatos.forEach(f => {
    const linha = criar("div");
    linha.appendChild(criar("dt", "", f.rotulo));
    linha.appendChild(criar("dd", "", f.valor));
    fatos.appendChild(linha);
  });
  info.appendChild(fatos);
  topo.appendChild(info);

  const principal = criar("figure", "sz-main reveal");
  principal.appendChild(fotoClicavel(SUZANA.fotoPrincipal, [{ tipo: "foto", arquivo: SUZANA.fotoPrincipal.arquivo, legenda: SUZANA.fotoPrincipal.legenda }], 0, "sz-photo"));
  topo.appendChild(principal);
  alvo.appendChild(topo);

  // ---- Conquistas
  const conq = criar("div", "sz-block");
  const cabC = criar("header", "sz-block-head reveal");
  cabC.appendChild(criar("p", "eyebrow", "Resultados em competições"));
  cabC.appendChild(criar("h3", "", "Conquistas"));
  conq.appendChild(cabC);
  const listaC = criar("ul", "sz-awards");
  SUZANA.conquistas.forEach(c => {
    const li = criar("li", "reveal");
    li.appendChild(criar("strong", "metal", c.destaque));
    li.appendChild(criar("span", "", c.rotulo));
    listaC.appendChild(li);
  });
  conq.appendChild(listaC);
  alvo.appendChild(conq);

  // ---- Minha trajetória (1º parágrafo maior, em destaque)
  const traj = criar("div", "sz-block sz-story");
  const cabT = criar("header", "sz-block-head reveal");
  cabT.appendChild(criar("p", "eyebrow", "Em primeira pessoa"));
  cabT.appendChild(criar("h3", "", "Minha trajetória"));
  traj.appendChild(cabT);
  const textoT = criar("div", "sz-text reveal");
  SUZANA.trajetoria.forEach((p, i) => textoT.appendChild(criar("p", i === 0 ? "lead" : "", p)));
  traj.appendChild(textoT);
  alvo.appendChild(traj);

  // ---- Preparação de atletas
  const prep = criar("div", "sz-block sz-prep");
  const cabP = criar("header", "sz-block-head reveal");
  cabP.appendChild(criar("p", "eyebrow", "No palco e nos bastidores"));
  cabP.appendChild(criar("h3", "", "Preparação de atletas"));
  prep.appendChild(cabP);
  const corpoP = criar("div", "sz-prep-body reveal");
  const textoP = criar("div", "sz-text");
  SUZANA.preparacao.paragrafos.forEach(p => textoP.appendChild(criar("p", "", p)));
  corpoP.appendChild(textoP);
  const lateralP = criar("div", "sz-prep-side");
  const attrs = criar("ul", "sz-attrs");
  SUZANA.preparacao.atributos.forEach(a => attrs.appendChild(criar("li", "", a)));
  lateralP.appendChild(attrs);
  lateralP.appendChild(criar("p", "sz-badge", SUZANA.preparacao.destaque));
  corpoP.appendChild(lateralP);
  prep.appendChild(corpoP);
  alvo.appendChild(prep);

  // ---- Minha visão sobre a musculação
  const visao = criar("div", "sz-block sz-vision");
  const cabV = criar("header", "sz-block-head reveal");
  cabV.appendChild(criar("p", "eyebrow", "Filosofia profissional"));
  cabV.appendChild(criar("h3", "", "Minha visão sobre a musculação"));
  visao.appendChild(cabV);
  const textoV = criar("div", "sz-text reveal");
  SUZANA.visao.forEach(p => textoV.appendChild(criar("p", "", p)));
  visao.appendChild(textoV);
  alvo.appendChild(visao);

  // ---- Fotos da atleta (clique para ampliar)
  if (SUZANA.fotos.length) {
    const gal = criar("div", "sz-block");
    const cabG = criar("header", "sz-block-head reveal");
    cabG.appendChild(criar("p", "eyebrow", "Clique para ampliar"));
    cabG.appendChild(criar("h3", "", "Fotos da atleta"));
    gal.appendChild(cabG);
    const grade = criar("ul", "sz-photos");
    SUZANA.fotos.forEach((f, i) => {
      const li = criar("li", "reveal");
      li.appendChild(fotoClicavel(f, listaFotos, i, "sz-thumb"));
      if (f.legenda) li.appendChild(criar("p", "sz-cap", f.legenda));
      grade.appendChild(li);
    });
    gal.appendChild(grade);
    alvo.appendChild(gal);
  }

  secao.hidden = false;
  // Mostra o link no menu automaticamente (logo depois de "Essência")
  const li = document.createElement("li");
  const a = criar("a", "", "Suzana"); a.href = "#suzana"; li.appendChild(a);
  const itemEssencia = document.querySelector('.main-nav a[href="#essencia"]');
  if (itemEssencia) itemEssencia.parentElement.after(li);
}


/* ---------- 5) Modalidades e treinamentos (3 blocos, dados em js/dados.js → MODALIDADES) ---------- */
function montarModalidades() {
  const lista = document.getElementById("modalidadesLista");

  if (MODALIDADES.length === 0) {
    const vazio = criar("div", "empty-box reveal");
    vazio.appendChild(criar("span", "soon-badge", "Em breve"));
    vazio.appendChild(criar("p", "", "As modalidades e treinamentos disponíveis serão publicados aqui. Quer saber o que a academia oferece? Pergunte pelo WhatsApp."));
    const btn = criar("a", "btn", "Solicitar informações");
    btn.href = linkWhatsApp(SITE.whatsapp.numero, "Olá! Gostaria de saber quais modalidades e treinamentos a CT Team Maromba oferece.");
    btn.target = "_blank"; btn.rel = "noopener";
    vazio.appendChild(btn);
    lista.appendChild(vazio);
    return;
  }

  // Botão "Solicitar informações" (abre o WhatsApp oficial com mensagem pronta)
  const botaoInfo = (assunto, classe) => {
    const btn = criar("a", classe || "btn btn-small", "Solicitar informações");
    btn.href = linkWhatsApp(SITE.whatsapp.numero, "Olá! Gostaria de informações sobre " + assunto + " na CT Team Maromba.");
    btn.target = "_blank"; btn.rel = "noopener";
    return btn;
  };
  const icone = (nome, classe) => { const el = criar("span", classe || "mod-icon"); el.innerHTML = ICONES_MOD[nome] || ICONES_MOD.musculacao; return el; };
  const figura = (item, classe) => {
    const f = criar("div", classe);
    const img = criar("img"); img.src = item.imagem; img.alt = item.alt || item.nome; img.loading = "lazy"; img.decoding = "async";
    f.appendChild(img); return f;
  };

  MODALIDADES.forEach((g, i) => {
    const bloco = criar("div", "mod-group mod-" + g.estilo + " reveal");
    const numero = String(i + 1).padStart(2, "0");

    // ----- Grupo de corrida: banner especial, diferente das atividades da academia
    if (g.estilo === "corrida") {
      const item = g.itens[0];
      bloco.classList.add("mod-run");
      bloco.appendChild(icone(item.icone, "mod-icon mod-icon-xl"));
      const texto = criar("div", "mod-run-text");
      if (g.introducao) texto.appendChild(criar("span", "mod-badge", g.introducao));
      texto.appendChild(criar("h3", "", g.grupo));
      texto.appendChild(criar("p", "", item.descricao));
      bloco.appendChild(texto);
      bloco.appendChild(botaoInfo(g.grupo, "btn"));
      bloco.appendChild(criar("span", "mod-num mod-num-run", numero));
      lista.appendChild(bloco);
      return;
    }

    // ----- Cabeçalho dos blocos Musculação e Aulas fitness
    const cab = criar("header", "mod-head");
    const titulo = criar("div", "mod-title-block");
    titulo.appendChild(criar("span", "mod-num", numero));
    const bloquinho = criar("div");
    bloquinho.appendChild(criar("h3", "", g.grupo));
    if (g.introducao) bloquinho.appendChild(criar("p", "mod-intro", g.introducao));
    titulo.appendChild(bloquinho);
    cab.appendChild(titulo);
    if (g.estilo !== "destaque") cab.appendChild(botaoInfo(g.grupo));
    bloco.appendChild(cab);

    if (g.estilo === "destaque") {
      // ----- Musculação: cartão grande (foto + texto)
      const item = g.itens[0];
      const card = criar("article", "mod-feature");
      if (item.imagem) card.appendChild(figura(item, "mod-feature-img"));
      const texto = criar("div", "mod-feature-text");
      texto.appendChild(icone(item.icone));
      texto.appendChild(criar("h4", "", item.nome));
      texto.appendChild(criar("p", "", item.descricao));
      texto.appendChild(botaoInfo(item.nome));
      card.appendChild(texto);
      bloco.appendChild(card);
    } else {
      // ----- Aulas fitness: cards lado a lado (ícone ou foto, nome e descrição)
      const grade = criar("div", "mod-grid");
      g.itens.forEach(item => {
        const card = criar("article", "card mod-card");
        if (item.imagem) card.appendChild(figura(item, "card-img"));
        const corpo = criar("div", "card-body");
        if (!item.imagem) corpo.appendChild(icone(item.icone));
        corpo.appendChild(criar("h4", "", item.nome));
        if (item.descricao) corpo.appendChild(criar("p", "", item.descricao));
        card.appendChild(corpo);
        grade.appendChild(card);
      });
      bloco.appendChild(grade);
    }
    lista.appendChild(bloco);
  });
}


/* ---------- 6) Horários ---------- */
function montarHorarios() {
  const lista = document.getElementById("horariosLista");
  // Descobre o dia de hoje no fuso de São Paulo (0=domingo ... 6=sábado)
  const nomeDia = new Date().toLocaleDateString("en-US", { weekday: "short", timeZone: "America/Sao_Paulo" });
  const hoje = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[nomeDia];

  HORARIOS.forEach(h => {
    const li = criar("li", "reveal" + (h.idx === hoje ? " today" : ""));
    const dia = criar("span", "day", h.dia);
    if (h.idx === hoje) dia.appendChild(criar("span", "today-badge", "HOJE"));
    li.appendChild(dia);

    const horas = criar("span", "times");
    if (h.fechado) horas.appendChild(criar("span", "closed", "FECHADO"));
    h.faixas.forEach(f => horas.appendChild(criar("span", "time", f)));
    if (h.aviso) horas.appendChild(criar("span", "pending", h.aviso));
    li.appendChild(horas);
    lista.appendChild(li);
  });
}


function montarResumoConvenios() {
  const texto = CONVENIOS.map(c => c.nome + " " + (c.plano || "").replace("Plano ", "")).join(" · ");
  document.querySelectorAll(".js-convenios-texto").forEach(el => el.textContent = texto);
  document.querySelectorAll(".js-fundacao").forEach(el => el.textContent = SITE.fundacao);
}


/* ---------- 7) Convênios ---------- */
function montarConvenios() {
  const lista = document.getElementById("conveniosLista");
  CONVENIOS.forEach(c => {
    const li = criar("li", "partner reveal");
    if (c.logo) {
      const img = criar("img"); img.src = c.logo; img.alt = c.nome; img.loading = "lazy"; li.appendChild(img);
    } else {
      li.appendChild(criar("p", "partner-name metal", c.nome));
    }
    if (c.plano) li.appendChild(criar("span", "partner-plan", c.plano));
    lista.appendChild(li);
  });
}


/* ---------- 8) Janela para ampliar as fotos da Suzana ---------- */
let indiceAtual = 0;
let listaJanela = [];       // fotos que a janela percorre com as setas

function abrirJanela(i, lista) {
  const janela = document.getElementById("lightbox");
  if (lista) listaJanela = lista;
  indiceAtual = (i + listaJanela.length) % listaJanela.length;
  const item = listaJanela[indiceAtual];
  const fig = document.getElementById("lbConteudo");
  fig.replaceChildren();
  if (item.tipo === "video") {
    const v = criar("video"); v.src = item.arquivo; v.controls = true; v.autoplay = true; v.playsInline = true;
    fig.appendChild(v);
  } else {
    const img = criar("img"); img.src = item.arquivo; img.alt = item.legenda || ""; fig.appendChild(img);
  }
  if (item.legenda) fig.appendChild(criar("figcaption", "", item.legenda));
  const varios = listaJanela.length > 1;
  document.getElementById("lbPrev").hidden = !varios;
  document.getElementById("lbNext").hidden = !varios;
  if (!janela.open) janela.showModal();
}

function configurarJanela() {
  const janela = document.getElementById("lightbox");
  const parar = () => janela.querySelectorAll("video").forEach(v => v.pause());
  document.getElementById("lbClose").addEventListener("click", () => janela.close());
  document.getElementById("lbPrev").addEventListener("click", () => abrirJanela(indiceAtual - 1));
  document.getElementById("lbNext").addEventListener("click", () => abrirJanela(indiceAtual + 1));
  janela.addEventListener("click", e => { if (e.target === janela) janela.close(); }); // clicar fora fecha
  janela.addEventListener("close", parar);
  janela.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") abrirJanela(indiceAtual - 1);
    if (e.key === "ArrowRight") abrirJanela(indiceAtual + 1);
  });
}


/* ---------- 9) Menu (celular) e destaque da seção atual ---------- */
function configurarMenu() {
  const botao = document.getElementById("menuToggle");
  const menu = document.getElementById("menuPrincipal");
  const cabecalho = document.querySelector(".site-header");

  const fechar = () => { menu.classList.remove("open"); botao.setAttribute("aria-expanded", "false"); botao.setAttribute("aria-label", "Abrir menu"); };
  botao.addEventListener("click", () => {
    const abrir = !menu.classList.contains("open");
    menu.classList.toggle("open", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  });
  menu.addEventListener("click", e => { if (e.target.closest("a")) fechar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { fechar(); botao.focus(); } });

  const aoRolar = () => cabecalho.classList.toggle("scrolled", window.scrollY > 30);
  aoRolar(); window.addEventListener("scroll", aoRolar, { passive: true });

  // Marca no menu a seção que está na tela
  if ("IntersectionObserver" in window) {
    const links = [...menu.querySelectorAll('a[href^="#"]:not(.btn)')];
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const s = document.querySelector(l.getAttribute("href")); if (s) obs.observe(s); });
  }
}


/* ---------- 10) Vídeo do início: respeita preferências do visitante ---------- */
function configurarVideo() {
  const video = document.getElementById("heroVideo");
  const botao = document.getElementById("videoToggle");
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conexao = navigator.connection || {};
  const economizar = conexao.saveData === true;   // visitante em modo "economia de dados"

  const atualizarBotao = () => {
    const pausado = video.paused;
    botao.classList.toggle("paused", pausado);
    botao.setAttribute("aria-label", pausado ? "Reproduzir vídeo de fundo" : "Pausar vídeo de fundo");
  };

  video.muted = true;                  // nunca reproduz com som
  if (reduzir || economizar) {
    video.pause(); video.removeAttribute("autoplay");   // fica só a imagem de capa
  } else {
    const p = video.play();
    if (p && p.catch) p.catch(() => {});               // se o navegador bloquear, fica a imagem de capa
  }
  botao.addEventListener("click", () => { video.paused ? video.play().catch(() => {}) : video.pause(); });
  video.addEventListener("play", atualizarBotao);
  video.addEventListener("pause", atualizarBotao);
  atualizarBotao();

  // Pausa quando o início sai da tela (economiza bateria)
  if ("IntersectionObserver" in window && !reduzir && !economizar) {
    new IntersectionObserver(([e]) => {
      if (!e.isIntersecting && !video.paused) { video.pause(); video.dataset.auto = "1"; }
      else if (e.isIntersecting && video.dataset.auto === "1") { video.dataset.auto = ""; video.play().catch(() => {}); }
    }, { threshold: 0.05 }).observe(video);
  }
}


/* ---------- 11) Animação de entrada ao rolar ---------- */
function configurarRevelar() {
  const itens = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    itens.forEach(i => i.classList.add("visible")); return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  itens.forEach(i => obs.observe(i));
}


/* ---------- Início: monta tudo ---------- */
document.addEventListener("DOMContentLoaded", () => {
  montarContatos();
  montarSobre();
  montarEssencia();
  montarSuzana();
  montarModalidades();
  montarHorarios();
  montarResumoConvenios();
  montarConvenios();
  configurarJanela();
  configurarMenu();
  configurarVideo();
  configurarRevelar();   // por último, depois que os cartões já existem
});
