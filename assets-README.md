# assets/

Coloque aqui todos os arquivos de mídia do portfólio.

## Estrutura esperada

### Fotos pessoais (marquee / sobre mim)
- `foto-1.jpg` até `foto-5.jpg` — fotos para o carrossel da home
- `sobre-foto.jpg` — foto de perfil na seção "Sobre mim"
- `interesse-1.jpg` até `interesse-5.jpg` — fotos da seção Interesses

### Cases — Influenciadores da Beleza
- `persona-1.jpg`, `persona-2.jpg`, `persona-3.jpg` — carrossel de personas

### Cases — E-Inscrição (telas do Figma)
- `tela-00a.jpg` até `tela-00e.jpg` — Meus Eventos (tela principal)
- `tela-01.jpg` até `tela-07.jpg` — Tipos de inscrição
- `tela-08.jpg` até `tela-13.jpg` — Lotes e descontos
- `tela-14.jpg` até `tela-19.jpg` — Formas de pagamento
- `tela-20.jpg` até `tela-25.jpg` — Setor
- `tela-26.jpg` até `tela-31.jpg` — Inscrições gratuitas e pagas
- `tela-32.jpg` até `tela-40.jpg` — Formulários e máscaras

## Como inserir as telas no HTML

Substitua cada slot vazio:
```html
<div class="screen-slot"><div class="screen-slot__num">01</div></div>
```
Por:
```html
<div class="screen-slot"><img src="assets/tela-01.jpg" alt="Tela 01" /></div>
```

## Formatos recomendados
- Fotos: `.jpg` (qualidade 85–90%)
- Telas/mockups: `.png` para mais nitidez
- Tamanho máximo por arquivo: 500KB
