import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = { title: 'politiZ', description: 'Engajamento cidadão jovem' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className="dark">
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
