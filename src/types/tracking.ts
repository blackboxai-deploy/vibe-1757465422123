export interface TrackingData {
  phoneNumber: string;
  isOnline: boolean;
  lastSeen: Date;
  approximateLocation: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  accountInfo: {
    hasProfilePicture: boolean;
    hasStatus: boolean;
    registrationDate: Date;
    isBusinessAccount: boolean;
  };
  activityPattern: {
    mostActiveHour: number;
    averageOnlineTime: string;
    weeklyActivity: Array<{
      day: string;
      hours: number;
    }>;
  };
  privacySettings: {
    lastSeenVisibility: 'everyone' | 'contacts' | 'nobody';
    profilePictureVisibility: 'everyone' | 'contacts' | 'nobody';
    statusVisibility: 'everyone' | 'contacts' | 'nobody';
  };
}

export interface TrackingRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface TrackingResponse {
  success: boolean;
  data?: TrackingData;
  error?: string;
  processingTime: number;
}

export interface TrackingHistory {
  id: string;
  phoneNumber: string;
  searchDate: Date;
  success: boolean;
  data?: TrackingData;
}

export interface SearchProgress {
  step: number;
  totalSteps: number;
  message: string;
  percentage: number;
}

export type TrackingStatus = 'idle' | 'searching' | 'completed' | 'error';