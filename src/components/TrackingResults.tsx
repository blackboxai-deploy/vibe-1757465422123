'use client';

import { TrackingData } from '@/types/tracking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LocationMap } from './LocationMap';
import { ActivityChart } from './ActivityChart';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TrackingResultsProps {
  data: TrackingData;
}

export function TrackingResults({ data }: TrackingResultsProps) {
  const formatLastSeen = (date: Date) => {
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: ptBR 
    });
  };

  const getPrivacyBadgeVariant = (visibility: string) => {
    switch (visibility) {
      case 'everyone': return 'destructive';
      case 'contacts': return 'secondary';
      case 'nobody': return 'default';
      default: return 'secondary';
    }
  };

  const getPrivacyText = (visibility: string) => {
    switch (visibility) {
      case 'everyone': return 'Público';
      case 'contacts': return 'Contatos';
      case 'nobody': return 'Ninguém';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-3 h-3 rounded-full ${data.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="font-semibold">
                    {data.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Última Visualização</p>
              <p className="font-semibold mt-1">
                {data.isOnline ? 'Agora mesmo' : formatLastSeen(data.lastSeen)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Tipo de Conta</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={data.accountInfo.isBusinessAccount ? 'default' : 'secondary'}>
                  {data.accountInfo.isBusinessAccount ? 'Comercial' : 'Pessoal'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phone Number & Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>Dados básicos do número rastreado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-muted-foreground">Número</Label>
              <p className="font-mono text-lg font-semibold">{data.phoneNumber}</p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Foto de Perfil</Label>
                <p className="text-sm">{data.accountInfo.hasProfilePicture ? '✅ Sim' : '❌ Não'}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Status/Recado</Label>
                <p className="text-sm">{data.accountInfo.hasStatus ? '✅ Sim' : '❌ Não'}</p>
              </div>
            </div>
            
            <div>
              <Label className="text-sm text-muted-foreground">Registro no WhatsApp</Label>
              <p className="text-sm">
                {data.accountInfo.registrationDate.toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Localização Aproximada</CardTitle>
            <CardDescription>Baseada no último acesso conhecido</CardDescription>
          </CardHeader>
          <CardContent>
            <LocationMap location={data.approximateLocation} />
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Cidade:</span>
                <span className="text-sm font-medium">{data.approximateLocation.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <span className="text-sm font-medium">{data.approximateLocation.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">País:</span>
                <span className="text-sm font-medium">{data.approximateLocation.country}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Padrão de Atividade</CardTitle>
          <CardDescription>Análise do comportamento de uso do WhatsApp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-muted-foreground">Horário Mais Ativo</Label>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {data.activityPattern.mostActiveHour}:00h
                </p>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">Tempo Online Médio/Dia</Label>
                <p className="text-lg font-semibold">{data.activityPattern.averageOnlineTime}</p>
              </div>
            </div>
            
            <div>
              <ActivityChart weeklyData={data.activityPattern.weeklyActivity} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Privacidade</CardTitle>
          <CardDescription>Visibilidade das informações do perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Última Visualização</p>
              <Badge variant={getPrivacyBadgeVariant(data.privacySettings.lastSeenVisibility)}>
                {getPrivacyText(data.privacySettings.lastSeenVisibility)}
              </Badge>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Foto do Perfil</p>
              <Badge variant={getPrivacyBadgeVariant(data.privacySettings.profilePictureVisibility)}>
                {getPrivacyText(data.privacySettings.profilePictureVisibility)}
              </Badge>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Status/Recado</p>
              <Badge variant={getPrivacyBadgeVariant(data.privacySettings.statusVisibility)}>
                {getPrivacyText(data.privacySettings.statusVisibility)}
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Legenda:</strong> 
              <span className="text-red-600 dark:text-red-400 mx-2">Público</span> • 
              <span className="mx-2">Contatos</span> • 
              <span className="mx-2">Ninguém</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 dark:text-blue-400 mt-1">ℹ️</div>
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                Informações sobre os dados apresentados
              </h4>
              <p className="text-blue-700 dark:text-blue-300">
                Todos os dados mostrados acima são completamente fictícios e gerados aleatoriamente 
                para fins de demonstração. Nenhuma informação real de usuários do WhatsApp foi coletada 
                ou analisada neste processo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for consistent labeling
function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <label className={className}>{children}</label>;
}