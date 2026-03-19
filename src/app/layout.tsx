import type { Metadata } from 'next';
import './globals.css';
import { appConfig } from '@/core/config/app-config';

export const metadata: Metadata = {
  title: appConfig.name,
  description: 'Fundação do webapp modular, seguro e preparado para LGPD.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
