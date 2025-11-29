import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verticalpay.com.br"),
  title: {
    default: "VerticalPay - Soluções em Pagamentos e Máquinas de Cartão",
    template: "%s | VerticalPay",
  },
  description:
    "Transforme seu negócio com a VerticalPay. As melhores taxas, máquinas de cartão modernas e portal de gestão completo para você vender mais.",
  keywords: [
    "máquina de cartão",
    "pagamentos",
    "verticalpay",
    "taxas baixas",
    "portal de gestão",
    "vender mais",
    "soluções financeiras",
    "maquininha",
  ],
  authors: [{ name: "VerticalPay" }],
  creator: "VerticalPay",
  publisher: "VerticalPay",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VerticalPay - Soluções em Pagamentos e Máquinas de Cartão",
    description:
      "Transforme seu negócio com a VerticalPay. As melhores taxas, máquinas de cartão modernas e portal de gestão completo para você vender mais.",
    url: "https://verticalpay.com.br",
    siteName: "VerticalPay",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png", // Assuming you might add this later or it maps to a default
        width: 1200,
        height: 630,
        alt: "VerticalPay - Soluções em Pagamentos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VerticalPay - Soluções em Pagamentos e Máquinas de Cartão",
    description:
      "Transforme seu negócio com a VerticalPay. As melhores taxas, máquinas de cartão modernas e portal de gestão completo para você vender mais.",
    images: ["/twitter-image.png"], // Assuming you might add this later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
