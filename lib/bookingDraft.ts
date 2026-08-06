export type BookingDraft = {
    serviceType?: string;
    hourlyRate?: number; // ⭐ nouveau : prix/h réel choisi sur booking-service-type
    frequency?: string;
    frequencyNote?: string; // ⭐ nouveau : note libre quand frequency = "Flexibel"
    hours?: number;
    price?: number; // ⭐ nouveau : prix calculé sur booking-hours
    extras?: string[];
    date?: string;
    time?: string;
    recipientName?: string;
    recipientPhone?: string;
    hasPets?: boolean;
    petsDetails?: string;
    cleanerId?: number;
    address?: string;
    paymentMethod?: string; // ⭐ 
  };
  
  const KEY = 'bookingDraft';
  
  export function getDraft(): BookingDraft {
    if (typeof window === 'undefined') return {};
    try {
      return JSON.parse(sessionStorage.getItem(KEY) || '{}');
    } catch {
      return {};
    }
  }
  
  export function updateDraft(patch: Partial<BookingDraft>) {
    const current = getDraft();
    const updated = { ...current, ...patch };
    sessionStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  }
  
  export function clearDraft() {
    sessionStorage.removeItem(KEY);
  }