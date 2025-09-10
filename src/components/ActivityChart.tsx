'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrackingData } from '@/types/tracking';

interface ActivityChartProps {
  weeklyData: TrackingData['activityPattern']['weeklyActivity'];
}

export function ActivityChart({ weeklyData }: ActivityChartProps) {
  const maxHours = Math.max(...weeklyData.map(d => d.hours));
  
  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground text-center">
        Horas online por dia da semana
      </div>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="day" 
              fontSize={12}
              tick={{ fill: 'currentColor' }}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tick={{ fill: 'currentColor' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`${value}h`, 'Tempo Online']}
            />
            <Bar 
              dataKey="hours" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
              className="fill-green-500"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Activity summary */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 bg-muted rounded">
          <div className="font-semibold">{Math.round(weeklyData.reduce((acc, d) => acc + d.hours, 0) / 7)}h</div>
          <div className="text-muted-foreground">Média Diária</div>
        </div>
        <div className="text-center p-2 bg-muted rounded">
          <div className="font-semibold">{maxHours}h</div>
          <div className="text-muted-foreground">Pico</div>
        </div>
        <div className="text-center p-2 bg-muted rounded">
          <div className="font-semibold">{weeklyData.reduce((acc, d) => acc + d.hours, 0)}h</div>
          <div className="text-muted-foreground">Total Semanal</div>
        </div>
      </div>
      
      {/* Activity interpretation */}
      <div className="text-xs text-muted-foreground">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 dark:text-blue-400">💡</span>
            <div>
              <strong className="text-blue-800 dark:text-blue-200">Análise do Padrão:</strong>
              <br />
              {maxHours >= 8 
                ? "Usuário muito ativo no WhatsApp, com uso intenso durante a semana."
                : maxHours >= 5
                ? "Usuário moderadamente ativo, com uso regular do aplicativo."
                : "Usuário com baixa atividade, uso ocasional do WhatsApp."
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}