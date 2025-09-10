import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WhatsApp Tracker - Simulador de Rastreamento',
  description: 'Simulador educacional de rastreamento de números do WhatsApp com interface moderna',
  keywords: 'whatsapp, rastreamento, simulador, educacional, número, telefone',
  authors: [{ name: 'WhatsApp Tracker' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">WT</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-foreground">WhatsApp Tracker</h1>
                      <p className="text-xs text-muted-foreground">Simulador Educacional</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-right">
                    <p>⚠️ Apenas para fins educacionais</p>
                    <p>Dados simulados e fictícios</p>
                  </div>
                </div>
              </div>
            </header>
            
            <main className="container mx-auto px-4 py-6">
              {children}
            </main>
            
            <footer className="border-t border-border/40 bg-muted/50 mt-12">
              <div className="container mx-auto px-4 py-6">
                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">
                    <strong>AVISO IMPORTANTE:</strong> Este é um simulador educacional que gera dados fictícios.
                  </p>
                  <p className="mb-2">
                    Não realiza rastreamento real e não coleta dados de usuários reais do WhatsApp.
                  </p>
                  <p>
                    Todos os resultados são simulados para demonstrar conceitos de interface e UX.
                  </p>
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <p>© 2024 WhatsApp Tracker Simulator - Desenvolvido para fins educacionais</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}