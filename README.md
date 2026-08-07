# Lar Cidade de Deus — site institucional

## O que foi reorganizado

O projeto era um único arquivo `index.html` com ~2700 linhas, contendo
CSS e JavaScript embutidos. Foram aplicadas as seguintes boas práticas:

### 1. Separação de responsabilidades
- `index.html` → apenas estrutura/conteúdo.
- `css/style.css` → todo o estilo, antes dentro de uma tag `<style>`.
- `js/script.js` → todo o comportamento, antes dentro de uma tag `<script>`.

### 2. JavaScript sem `onclick` inline
Havia 29 atributos `onclick="..."` espalhados pelo HTML. Isso mistura
estrutura com comportamento e dificulta manutenção/testes. Agora:
- Os botões de navegação usam `data-page="id"` e um único listener
  delegado (`document.querySelectorAll('[data-page]')`) troca de página.
- A galeria usa `data-lightbox-index="N"` em vez de `onclick="openLightbox(N)"`.
- Todo o script é uma IIFE em modo estrito (`'use strict'`), evitando
  poluir o `window` com funções globais.

### 3. Acessibilidade
- Elementos que disparam ações via JavaScript (nav, botões "Saiba mais",
  links do rodapé) passaram de `<a href="#" onclick="...">` para
  `<button type="button">`, que é semanticamente correto e focável por
  teclado (um link sem `href` real não deveria simular clique).
- O botão do menu mobile ganhou `aria-expanded` e `aria-controls`,
  sincronizados via JavaScript.

### 4. Correção de bugs
- **HTML inválido**: havia um `<img>` dentro de um `<svg>` no logo do
  cabeçalho (`<svg class="cross-icon"><img ...></svg>`), o que não é
  permitido — foi trocado por um `<img class="cross-icon">` simples.
- **Lightbox quebrado**: o array `galleryImages` do JavaScript apontava
  para arquivos que não existem no projeto (`foto-quarto.jpg`,
  `foto-refeitorio.jpg` etc.). Foi corrigido para usar as mesmas 5 fotos
  realmente exibidas na galeria (`estrutura/*.jpg`).
- **Pasta com nome errado**: `estrututa/` foi renomeada para `estrutura/`
  (era um erro de digitação usado em todo o CSS/HTML).

### 5. Nomes de arquivo e segurança
- Arquivos com espaços/acentos no nome (ex.: `Design sem nome.png`,
  `campanha de doação.png`, `LAR...png`) foram renomeados para nomes
  em *kebab-case* sem espaços/acentos (`campanha-padrinhos.png`,
  `campanha-doacao.png`, `logo-lar.png`), evitando problemas de
  URL-encoding e de portabilidade entre sistemas.
- Todos os links `target="_blank"` receberam `rel="noopener noreferrer"`,
  prevenindo que a página aberta tenha acesso a `window.opener`.

### 6. CSS
- A variável `--gold`/`--gold-light` foi renomeada para
  `--primary`/`--primary-light`, já que a paleta do site é verde, não
  dourada — o nome antigo confundia a intenção da variável.
- Seletores que citavam apenas `a` (ex.: `.nav-links a`, `footer a`)
  foram estendidos para também cobrir `button`, já que esses elementos
  passaram de link para botão.

## Estrutura final

```
lcddeus/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── estrutura/        (fotos das instalações)
├── noticias/         (imagens de notícias)
├── pix/              (QR code de doação)
├── logo-lar.png
└── CNAME
```

## O que não foi alterado
- Todo o conteúdo textual (textos institucionais, dados de contato,
  CNPJ, endereço) permanece exatamente igual.
- O visual/estilo permanece o mesmo — as mudanças foram estruturais e
  de organização de código, não de design.
