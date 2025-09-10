'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhoneTracker } from '@/components/PhoneTracker';
import { HistoryList } from '@/components/HistoryList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('tracker');

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-3 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <span className="text-green-800 dark:text-green-200 font-semibold">
            Simulador de Rastreamento WhatsApp
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Rastreador de<br />
          <span className="text-green-600 dark:text-green-400">Números WhatsApp</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Demonstração educacional de interface para rastreamento de números do WhatsApp. 
          Todos os dados são completamente fictícios e gerados para fins de aprendizado.
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 dark:text-blue-400 text-2xl">🔍</span>
            </div>
            <h3 className="font-semibold mb-2">Busca Inteligente</h3>
            <p className="text-sm text-muted-foreground">
              Simulação realística de processo de rastreamento com múltiplas etapas
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 dark:text-green-400 text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Dados Detalhados</h3>
            <p className="text-sm text-muted-foreground">
              Informações completas sobre localização, atividade e configurações
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 dark:text-purple-400 text-2xl">📱</span>
            </div>
            <h3 className="font-semibold mb-2">Mobile First</h3>
            <p className="text-sm text-muted-foreground">
              Interface otimizada para dispositivos móveis com design responsivo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Application */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tracker">Rastreamento</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tracker" className="mt-6">
          <PhoneTracker />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <HistoryList />
        </TabsContent>
      </Tabs>

      {/* Educational Information */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            📚 Sobre este Simulador
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-300">
            Informações importantes sobre o funcionamento da aplicação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-800 dark:text-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">🎯 Propósito Educacional</h4>
              <ul className="text-sm space-y-1">
                <li>• Demonstra conceitos de UX/UI</li>
                <li>• Simula processos de busca complexos</li>
                <li>• Mostra boas práticas de interface</li>
                <li>• Ensina sobre privacidade digital</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">⚠️ Limitações e Avisos</h4>
              <ul className="text-sm space-y-1">
                <li>• Dados completamente fictícios</li>
                <li>• Não realiza rastreamento real</li>
                <li>• Não coleta informações pessoais</li>
                <li>• Apenas para fins educacionais</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-white/50 dark:bg-black/20 rounded-lg border border-blue-300 dark:border-blue-700">
            <p className="text-sm">
              <strong>Tecnologias utilizadas:</strong> Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, 
              Recharts para gráficos, e LocalStorage para persistência local dos dados.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}