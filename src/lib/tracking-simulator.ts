import { TrackingData, TrackingResponse } from '@/types/tracking';

const BRAZILIAN_CITIES = [
  { city: 'São Paulo', state: 'SP', lat: -23.5505, lng: -46.6333 },
  { city: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lng: -43.1729 },
  { city: 'Brasília', state: 'DF', lat: -15.8267, lng: -47.9218 },
  { city: 'Salvador', state: 'BA', lat: -12.9714, lng: -38.5014 },
  { city: 'Fortaleza', state: 'CE', lat: -3.7319, lng: -38.5267 },
  { city: 'Belo Horizonte', state: 'MG', lat: -19.9191, lng: -43.9386 },
  { city: 'Manaus', state: 'AM', lat: -3.1190, lng: -60.0217 },
  { city: 'Curitiba', state: 'PR', lat: -25.4244, lng: -49.2654 },
  { city: 'Recife', state: 'PE', lat: -8.0476, lng: -34.8770 },
  { city: 'Goiânia', state: 'GO', lat: -16.6869, lng: -49.2648 }
];

const PROGRESS_STEPS = [
  { message: 'Conectando aos servidores...', duration: 1000 },
  { message: 'Validando número de telefone...', duration: 1500 },
  { message: 'Coletando dados públicos...', duration: 2000 },
  { message: 'Analisando padrões de atividade...', duration: 1800 },
  { message: 'Processando localização...', duration: 1200 },
  { message: 'Finalizando análise...', duration: 800 }
];

export function generateMockTrackingData(phoneNumber: string): TrackingData {
  // Use phone number to seed random data for consistency
  const seed = phoneNumber.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (max: number) => Math.floor((seed * 9301 + 49297) % 233280 / 233280 * max);
  
  const location = BRAZILIAN_CITIES[random(BRAZILIAN_CITIES.length)];
  const isOnline = random(10) < 3; // 30% chance of being online
  const lastSeenHours = random(48) + 1; // 1-48 hours ago
  
  const weeklyActivity = [
    { day: 'Segunda', hours: random(8) + 2 },
    { day: 'Terça', hours: random(8) + 2 },
    { day: 'Quarta', hours: random(8) + 2 },
    { day: 'Quinta', hours: random(8) + 2 },
    { day: 'Sexta', hours: random(10) + 3 },
    { day: 'Sábado', hours: random(12) + 4 },
    { day: 'Domingo', hours: random(10) + 3 }
  ];

  return {
    phoneNumber,
    isOnline,
    lastSeen: new Date(Date.now() - lastSeenHours * 60 * 60 * 1000),
    approximateLocation: {
      city: location.city,
      state: location.state,
      country: 'Brasil',
      coordinates: {
        lat: location.lat + (random(200) - 100) / 1000, // Add some noise
        lng: location.lng + (random(200) - 100) / 1000
      }
    },
    accountInfo: {
      hasProfilePicture: random(10) > 2, // 80% have profile picture
      hasStatus: random(10) > 4, // 60% have status
      registrationDate: new Date(2018 + random(6), random(12), random(28) + 1),
      isBusinessAccount: random(10) < 1 // 10% business accounts
    },
    activityPattern: {
      mostActiveHour: random(12) + 8, // Between 8-20h
      averageOnlineTime: `${random(8) + 2}h${random(6)}0min`,
      weeklyActivity
    },
    privacySettings: {
      lastSeenVisibility: ['everyone', 'contacts', 'nobody'][random(3)] as any,
      profilePictureVisibility: ['everyone', 'contacts', 'nobody'][random(3)] as any,
      statusVisibility: ['everyone', 'contacts', 'nobody'][random(3)] as any
    }
  };
}

export async function simulateTrackingSearch(
  phoneNumber: string,
  onProgress?: (step: number, message: string, percentage: number) => void
): Promise<TrackingResponse> {
  const startTime = Date.now();
  
  // Simulate search steps with realistic delays
  for (let i = 0; i < PROGRESS_STEPS.length; i++) {
    const step = PROGRESS_STEPS[i];
    const percentage = Math.round(((i + 1) / PROGRESS_STEPS.length) * 100);
    
    onProgress?.(i + 1, step.message, percentage);
    
    await new Promise(resolve => setTimeout(resolve, step.duration));
  }
  
  // Simulate occasional failures (5% chance)
  const shouldFail = Math.random() < 0.05;
  
  if (shouldFail) {
    return {
      success: false,
      error: 'Não foi possível rastrear este número. Tente novamente.',
      processingTime: Date.now() - startTime
    };
  }
  
  const data = generateMockTrackingData(phoneNumber);
  
  return {
    success: true,
    data,
    processingTime: Date.now() - startTime
  };
}

export function formatPhoneNumber(phone: string, countryCode: string = '+55'): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (countryCode === '+55' && cleaned.length >= 10) {
    // Brazilian format
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }
  
  return phone;
}

export function validatePhoneNumber(phone: string, countryCode: string = '+55'): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  if (countryCode === '+55') {
    // Brazilian phone validation
    return cleaned.length >= 10 && cleaned.length <= 11;
  }
  
  // Basic international validation
  return cleaned.length >= 8 && cleaned.length <= 15;
}