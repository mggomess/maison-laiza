import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://maison-laiza.vercel.app"),
  title: "Maison Laiza | Moda Feminina",
  description:
    "Descubra as novidades da Maison Laiza. Moda feminina com estilo, elegância e tendências para todos os momentos.",
  openGraph: {
    title: "Maison Laiza | Moda Feminina",
    description:
      "Moda feminina com estilo, elegância e tendências para todos os momentos.",
    type: "website",
    locale: "pt_BR",
    images: ["/images/logo-maison-laiza-transparent.png"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

const phone = process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+55 87 8102-6402";
const storeAddress =
  process.env.NEXT_PUBLIC_STORE_ADDRESS ||
  "Avenida São Francisco, ao lado do 777 Sushi";
const storeCity = process.env.NEXT_PUBLIC_STORE_CITY || "Areia Branca";

const storeSchema = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Maison Laiza",
  description: "Moda feminina, loja física e atendimento online.",
  ...(phone ? { telephone: phone } : {}),
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://maison-laiza.vercel.app",
  sameAs: ["https://www.instagram.com/lojamaisonlaiza/"],
  ...(storeAddress
    ? {
        address: {
          "@type": "PostalAddress",
          streetAddress: storeAddress,
          ...(storeCity ? { addressLocality: storeCity } : {}),
          addressCountry: "BR",
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
      </body>
    </html>
  );
}
