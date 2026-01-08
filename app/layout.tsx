import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CarrinhoProvider } from "@/context/CarrinhoContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tranças Divinas - Sua Beleza Natural",
  description: "Loja especializada em tranças de cabelo de qualidade premium para mulheres negras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CarrinhoProvider>
          {children}
        </CarrinhoProvider>
      </body>
    </html>
  );
}
