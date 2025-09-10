'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrackingData, TrackingStatus, SearchProgress } from '@/types/tracking';
import { formatPhoneNumber, validatePhoneNumber, simulateTrackingSearch } from '@/lib/tracking-simulator';
import { TrackingResults } from './TrackingResults';
import { toast } from 'sonner';

export function PhoneTracker() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+55');
  const [status, setStatus] = useState<TrackingStatus>('idle');
  const [progress, setProgress] = useState<SearchProgress>({ step: 0, totalSteps: 6, message: '', percentage: 0 });
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState<string>('');

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value, countryCode);
    setPhoneNumber(formatted);
    setError('');
  };

  const handleTrack = async () => {
    if (!validatePhoneNumber(phoneNumber, countryCode)) {
      setError('Número de telefone inválido. Verifique o formato.');
      toast.error('Número inválido');
      return;
    }

    setStatus('searching');
    setError('');
    setTrackingData(null);
    
    try {
      const result = await simulateTrackingSearch(
        phoneNumber,
        (step, message, percentage) => {
          setProgress({ step, totalSteps: 6, message, percentage });
        }
      );

      if (result.success && result.data) {
        setTrackingData(result.data);
        setStatus('completed');
        toast.success(`Rastreamento concluído em ${(result.processingTime / 1000).toFixed(1)}s`);
        
        // Save to history
        const history = JSON.parse(localStorage.getItem('tracking-history') || '[]');
        const newEntry = {
          id: Date.now().toString(),
          phoneNumber,
          searchDate: new Date(),
          success: true,
          data: result.data
        };
        history.unshift(newEntry);
        localStorage.setItem('tracking-history', JSON.stringify(history.slice(0, 10))); // Keep last 10
      } else {
        setError(result.error || 'Erro desconhecido');
        setStatus('error');
        toast.error('Falha no rastreamento');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      setStatus('error');
      toast.error('Erro de conexão');
    }
  };

  const handleNewSearch = () => {
    setStatus('idle');
    setPhoneNumber('');
    setTrackingData(null);
    setError('');
    setProgress({ step: 0, totalSteps: 6, message: '', percentage: 0 });
  };

  if (status === 'completed' && trackingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Resultados do Rastreamento</h2>
          <Button onClick={handleNewSearch} variant="outline">
            Nova Pesquisa
          </Button>
        </div>
        <TrackingResults data={trackingData} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600 dark:text-green-400">
            Rastreador de WhatsApp
          </CardTitle>
          <CardDescription>
            Insira o número de telefone para iniciar a simulação de rastreamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger id="country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+55">🇧🇷 Brasil (+55)</SelectItem>
                  <SelectItem value="+1">🇺🇸 EUA (+1)</SelectItem>
                  <SelectItem value="+44">🇬🇧 Reino Unido (+44)</SelectItem>
                  <SelectItem value="+34">🇪🇸 Espanha (+34)</SelectItem>
                  <SelectItem value="+33">🇫🇷 França (+33)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="phone">Número de Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                disabled={status === 'searching'}
                className={error ? 'border-red-500' : ''}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleTrack} 
            disabled={!phoneNumber || status === 'searching'}
            className="w-full"
            size="lg"
          >
            {status === 'searching' ? 'Rastreando...' : 'Iniciar Rastreamento'}
          </Button>
        </CardContent>
      </Card>

      {status === 'searching' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Processando...</CardTitle>
            <CardDescription>
              Etapa {progress.step} de {progress.totalSteps}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{progress.message}</span>
                <span>{progress.percentage}%</span>
              </div>
              <Progress value={progress.percentage} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div className={`p-3 rounded-lg border ${progress.step >= 1 ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-muted'}`}>
                <div className="font-medium">Conectando</div>
                <div className="text-xs text-muted-foreground mt-1">Servidores WhatsApp</div>
              </div>
              <div className={`p-3 rounded-lg border ${progress.step >= 3 ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-muted'}`}>
                <div className="font-medium">Coletando</div>
                <div className="text-xs text-muted-foreground mt-1">Dados Públicos</div>
              </div>
              <div className={`p-3 rounded-lg border ${progress.step >= 5 ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-muted'}`}>
                <div className="font-medium">Analisando</div>
                <div className="text-xs text-muted-foreground mt-1">Padrões de Uso</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600 dark:text-yellow-400 mt-1">⚠️</div>
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">
                Importante - Simulador Educacional
              </h4>
              <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
                <li>• Esta é uma demonstração com dados completamente fictícios</li>
                <li>• Não realiza rastreamento real de usuários do WhatsApp</li>
                <li>• Criado apenas para fins educacionais e demonstração de UX</li>
                <li>• Respeite a privacidade e não use ferramentas reais para rastreamento</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}