'use client';

import { TrackingData } from '@/types/tracking';

interface LocationMapProps {
  location: TrackingData['approximateLocation'];
}

export function LocationMap({ location }: LocationMapProps) {
  return (
    <div className="space-y-3">
      {/* Map Visualization */}
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg border overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300 dark:border-gray-600" />
            ))}
          </div>
        </div>
        
        {/* Location marker */}
        <div 
          className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{
            left: '60%',
            top: '45%'
          }}
        >
          {/* Marker pin */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-red-500" />
        </div>
        
        {/* Accuracy circle */}
        <div 
          className="absolute w-16 h-16 border-2 border-red-300 dark:border-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30"
          style={{
            left: '60%',
            top: '45%'
          }}
        />
        
        {/* Location label */}
        <div 
          className="absolute bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-md border transform -translate-x-1/2"
          style={{
            left: '60%',
            top: '25%'
          }}
        >
          📍 {location.city}
        </div>
        
        {/* Compass */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-800 rounded-full border shadow-sm flex items-center justify-center">
          <div className="text-xs font-bold text-red-500">N</div>
        </div>
        
        {/* Scale */}
        <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs border">
          ~5km de precisão
        </div>
      </div>
      
      {/* Coordinates display */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-muted p-3 rounded">
          <div className="text-muted-foreground text-xs">Latitude</div>
          <div className="font-mono font-medium">
            {location.coordinates.lat.toFixed(4)}°
          </div>
        </div>
        <div className="bg-muted p-3 rounded">
          <div className="text-muted-foreground text-xs">Longitude</div>
          <div className="font-mono font-medium">
            {location.coordinates.lng.toFixed(4)}°
          </div>
        </div>
      </div>
      
      {/* Location details */}
      <div className="text-xs text-muted-foreground p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start space-x-2">
          <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
          <div>
            <strong className="text-yellow-800 dark:text-yellow-200">Localização Aproximada:</strong>
            <br />
            Esta é uma localização simulada baseada em dados fictícios. 
            Em um cenário real, a precisão dependeria de vários fatores como torres de celular, 
            Wi-Fi e GPS.
          </div>
        </div>
      </div>
    </div>
  );
}