export type BookingDraft = {
    serviceType?: string;
    frequency?: string;
    hours?: number;
    extras?: string[];
    date?: string;
    time?: string;
    recipientName?: string;
    recipientPhone?: string;
    hasPets?: boolean;
    petsDetails?: string;
    cleanerId?: number;
    address?: string;
    paymentMethod?: string; // ⭐ zid hedhi
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