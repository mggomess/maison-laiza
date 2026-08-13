# Maison Laiza

Site institucional e catálogo digital da Maison Laiza, boutique de moda feminina com atendimento físico e online.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- CSS responsivo mobile-first
- Vinext para a hospedagem original

## Desenvolvimento

Requer Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Produção

- Vercel: configurada pelo arquivo `vercel.json`, usando `next build`.
- Sites: o comando `npm run build` mantém o fluxo Vinext/Cloudflare da hospedagem original.

## Configuração da loja

- Instagram: [@lojamaisonlaiza](https://www.instagram.com/lojamaisonlaiza/)
- WhatsApp e localização são configurados pelas variáveis listadas em `.env.example`.
- Na Vercel, cadastre essas variáveis em **Project Settings → Environment Variables**.

© Maison Laiza — Todos os direitos reservados.
