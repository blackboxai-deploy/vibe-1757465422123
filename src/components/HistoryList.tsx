'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrackingHistory } from '@/types/tracking';

export function HistoryList() {
  const [history, setHistory] = useState<TrackingHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('tracking-history');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      // Convert date strings back to Date objects
      const historyWithDates = parsed.map((item: any) => ({
        ...item,
        searchDate: new Date(item.searchDate)
      }));
      setHistory(historyWithDates);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('tracking-history');
    setHistory([]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pesquisas</CardTitle>
          <CardDescription>Nenhuma pesquisa realizada ainda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-4xl mb-4">🔍</div>
            <p>Faça sua primeira pesquisa para ver o histórico aqui</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Histórico de Pesquisas</CardTitle>
          <CardDescription>
            {history.length} pesquisa{history.length !== 1 ? 's' : ''} realizada{history.length !== 1 ? 's' : ''}
          </CardDescription>
        </div>
        <Button onClick={clearHistory} variant="outline" size="sm">
          Limpar Histórico
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((item) => (
            <div 
              key={item.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-medium text-lg">
                    {item.phoneNumber}
                  </span>
                  <Badge variant={item.success ? 'default' : 'destructive'}>
                    {item.success ? 'Sucesso' : 'Falhou'}
                  </Badge>
                </div>
                
                {item.success && item.data && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${item.data.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        <span>{item.data.isOnline ? 'Online' : 'Offline'}</span>
                      </span>
                      <span>📍 {item.data.approximateLocation.city}</span>
                      <span>
                        {item.data.accountInfo.isBusinessAccount ? '🏢 Comercial' : '👤 Pessoal'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-right text-sm text-muted-foreground">
                <div>{formatDate(item.searchDate)}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded text-xs text-muted-foreground">
          <p>
            📝 <strong>Nota:</strong> O histórico é salvo localmente no seu navegador e contém apenas 
            dados fictícios gerados para demonstração. As informações são automaticamente removidas 
            quando você limpa os dados do navegador.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}