# Assets

Coloque aqui os arquivos de mídia do portfólio:

## Fotos
- `avatar.jpg` — Sua foto de perfil (recomendado: 400x400px)
- `foto-1.jpg` até `foto-5.jpg` — Fotos para o carrossel/marquee

## Como usar no HTML

### Avatar (hero)
Substitua no `index.html`:
```html
<div class="hero__avatar">👩‍💻</div>
```
Por:
```html
<div class="hero__avatar"><img src="assets/avatar.jpg" alt="Joyce Romone" /></div>
```

### Carrossel de fotos (marquee)
Substitua os emojis nos slides:
```html
<div class="marquee__placeholder">🤝</div>
```
Por:
```html
<img src="assets/foto-1.jpg" alt="" style="width:100%;height:100%;object-fit:cover;" />
```

### Vídeos e imagens dos cases
Os placeholders de mídia no HTML estão marcados com:
- `<!-- Inserir vídeo -->` 
- `<!-- Inserir imagem -->`

Para adicionar um vídeo do YouTube/Loom:
```html
<iframe src="URL_DO_VIDEO" style="width:100%;aspect-ratio:16/9;border:none;border-radius:14px;" allowfullscreen></iframe>
```

Para adicionar uma imagem:
```html
<img src="assets/nome-da-imagem.jpg" alt="descrição" style="width:100%;border-radius:14px;" />
```
