# Site oficial — CT Team Maromba (versão 7 — final) (versão 6 — final)

Site em HTML, CSS e JavaScript puro. Sem instalação, sem servidor, sem custo.

## Como ver o site no seu computador
Dê dois cliques em `index.html`. Ele abre no navegador.
(O vídeo e as fotos funcionam assim. O mapa e as fontes precisam de internet.)

## Estrutura de pastas
```
index.html              -> estrutura da página (raramente precisa mexer)
css/style.css           -> aparência (cores no começo do arquivo)
js/dados.js             -> ★ ONDE VOCÊ EDITA: contatos, horários, essência, modalidades, textos
js/script.js            -> monta o site a partir do dados.js (não precisa mexer)
assets/images/          -> logo, capa do vídeo, favicon
assets/images/suzana/   -> fotos da Suzana Molena (cópias dos originais, sem alteração)
assets/images/equipe/   -> (reservada, sem uso no momento)
assets/images/modalidades/ -> fotos das modalidades
assets/images/convenios/-> logotipos dos convênios
assets/videos/          -> hero.mp4 e hero.webm (vídeo da página inicial)
assets/originais/       -> arquivos originais enviados (logo e vídeo). NÃO são usados pelo site; são só backup
```

## O que editar e onde
| Quero mudar...                       | Onde                                   |
|--------------------------------------|----------------------------------------|
| WhatsApp, Instagram, endereço, mapa  | `js/dados.js` → `SITE`                 |
| Horários                             | `js/dados.js` → `HORARIOS`             |
| Convênios                            | `js/dados.js` → `CONVENIOS`            |
| Textos "Sobre a academia" e "Nossa história" | `js/dados.js` → `SOBRE`                |
| Texto e botão de "Nossa essência"    | `js/dados.js` → `ESSENCIA`             |
| Modalidades (3 blocos: musculação, aulas fitness, grupo de corrida) | `js/dados.js` → `MODALIDADES` (há instruções e foto opcional por item) |
| Seção da Suzana (textos, números, fotos) | `js/dados.js` → `SUZANA` |
| Adicionar foto na seção da Suzana    | coloque o arquivo em `assets/images/suzana/` e copie uma linha de `fotos` em `SUZANA` |
| Frase de destaque da página inicial  | `index.html` (procure "Força. Disciplina. Evolução.") |
| Cores do site                        | `css/style.css` (variáveis no início)  |
| Trocar o vídeo                       | Substitua `assets/videos/hero.mp4` e `hero.webm` mantendo os mesmos nomes |

Cada bloco em `dados.js` tem um modelo comentado com instruções. Para adicionar um professor, copie o modelo, preencha e cole dentro dos colchetes.

## Dados ainda pendentes
- Foto do André Gavioli (a história dos fundadores está sem fotos dele)
- Confirmar se os textos de Filosofia e Diferenciais refletem a realidade da academia
- Fotos próprias das aulas fitness e do grupo de corrida (hoje usam ícones) e confirmação das descrições das aulas
- Logotipos oficiais Wellhub e TotalPass (hoje aparecem como texto)
- Mais fotos da Suzana (outras competições e orientando alunos)

## Publicar no GitHub Pages
1. Crie uma conta em https://github.com (gratuita).
2. Clique em **New repository**. Nome sugerido: `ct-team-maromba`. Deixe **Public** e clique em **Create repository**.
3. Na página do repositório, clique em **uploading an existing file**.
4. Arraste para lá o CONTEÚDO da pasta do site (`index.html`, `css`, `js`, `assets`, `LEIA-ME.md`), não a pasta em si. `index.html` precisa ficar na raiz.
5. Clique em **Commit changes**.
6. Vá em **Settings → Pages**. Em **Source** escolha **Deploy from a branch**, branch **main**, pasta **/ (root)** e clique em **Save**.
7. Espere 1 a 3 minutos. O endereço aparecerá no topo da página: `https://SEUUSUARIO.github.io/ct-team-maromba/`.
8. Depois de publicar, abra `index.html` e troque `assets/images/og-logo.jpg` (linha `og:image`) pelo endereço completo, ex.: `https://SEUUSUARIO.github.io/ct-team-maromba/assets/images/og-logo.jpg`. Isso faz a imagem aparecer ao compartilhar o link no WhatsApp e redes sociais.

Para atualizar depois: no repositório, abra o arquivo, clique no lápis, edite e clique em **Commit changes**. Para trocar fotos, use **Add file → Upload files**.

## Sobre o vídeo
O original (2,3 MB, 1280x720, 10 s, com áudio) foi preservado em `assets/originais/`. Para o site foram geradas duas cópias sem áudio, mais leves: `hero.webm` (0,9 MB) e `hero.mp4` (1,3 MB). A capa `hero-poster.jpg` aparece enquanto o vídeo carrega ou se ele não puder tocar.
