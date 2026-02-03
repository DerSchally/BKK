import type {
  User,
  Shelter,
  Notification,
  ShelterFilters,
  SearchResult,
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
  GermanState,
} from '@/types';
import {
  users,
  getUserByEmail,
  shelters,
  getShelterById,
  getSheltersByCity,
  getSheltersByState,
  getActiveShelters,
  getPendingApprovals,
  notifications,
  getNotificationsByRole,
  getUnreadCount,
} from '@/data';

// Simulated API delay (300-800ms)
const simulateDelay = (): Promise<void> => {
  const delay = Math.floor(Math.random() * 500) + 300;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// Helper to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

// Calculate walking time (average 5 km/h = 83.33 m/min)
const calculateWalkingTime = (distanceInMeters: number): number => {
  return Math.ceil(distanceInMeters / 83.33);
};

// ============================================
// AUTH API
// ============================================

export const authApi = {
  login: async (email: string): Promise<ApiResponse<User | null>> => {
    await simulateDelay();
    const user = getUserByEmail(email);
    if (user) {
      return { data: user, success: true };
    }
    return { data: null, success: false, message: 'Benutzer nicht gefunden' };
  },

  logout: async (): Promise<ApiResponse<null>> => {
    await simulateDelay();
    return { data: null, success: true };
  },

  getCurrentUser: async (userId: string): Promise<ApiResponse<User | null>> => {
    await simulateDelay();
    const user = users.find((u) => u.id === userId);
    return { data: user || null, success: !!user };
  },
};

// ============================================
// SHELTER API
// ============================================

export const shelterApi = {
  getAll: async (
    filters?: ShelterFilters
  ): Promise<ApiResponse<Shelter[]>> => {
    await simulateDelay();
    let result = [...shelters];

    if (filters) {
      if (filters.type?.length) {
        result = result.filter((s) => filters.type!.includes(s.type));
      }
      if (filters.status?.length) {
        result = result.filter((s) => filters.status!.includes(s.status));
      }
      if (filters.minCapacity) {
        result = result.filter((s) => s.capacity >= filters.minCapacity!);
      }
      if (filters.state?.length) {
        result = result.filter((s) => filters.state!.includes(s.address.state));
      }
      if (filters.accessibility) {
        if (filters.accessibility.wheelchair) {
          result = result.filter((s) => s.accessibility.wheelchair);
        }
        if (filters.accessibility.elevator) {
          result = result.filter((s) => s.accessibility.elevator);
        }
        if (filters.accessibility.groundLevel) {
          result = result.filter((s) => s.accessibility.groundLevel);
        }
      }
    }

    return { data: result, success: true };
  },

  getPaginated: async (
    page: number = 1,
    pageSize: number = 10,
    filters?: ShelterFilters
  ): Promise<PaginatedResponse<Shelter>> => {
    await simulateDelay();
    const allFiltered = (await shelterApi.getAll(filters)).data;
    const total = allFiltered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = allFiltered.slice(start, start + pageSize);

    return { data, total, page, pageSize, totalPages };
  },

  getById: async (id: string): Promise<ApiResponse<Shelter | null>> => {
    await simulateDelay();
    const shelter = getShelterById(id);
    return { data: shelter || null, success: !!shelter };
  },

  getByCity: async (city: string): Promise<ApiResponse<Shelter[]>> => {
    await simulateDelay();
    return { data: getSheltersByCity(city), success: true };
  },

  getByState: async (state: GermanState): Promise<ApiResponse<Shelter[]>> => {
    await simulateDelay();
    return { data: getSheltersByState(state), success: true };
  },

  getActive: async (): Promise<ApiResponse<Shelter[]>> => {
    await simulateDelay();
    return { data: getActiveShelters(), success: true };
  },

  getPendingApprovals: async (): Promise<ApiResponse<Shelter[]>> => {
    await simulateDelay();
    return { data: getPendingApprovals(), success: true };
  },

  search: async (query: string): Promise<ApiResponse<Shelter[]>> => {
    await simulateDelay();
    const normalizedQuery = query.toLowerCase();
    const results = shelters.filter(
      (s) =>
        s.name.toLowerCase().includes(normalizedQuery) ||
        s.address.city.toLowerCase().includes(normalizedQuery) ||
        s.address.street.toLowerCase().includes(normalizedQuery)
    );
    return { data: results, success: true };
  },

  findNearest: async (
    lat: number,
    lng: number,
    limit: number = 5
  ): Promise<ApiResponse<SearchResult[]>> => {
    await simulateDelay();
    const activeShelters = getActiveShelters();

    const results: SearchResult[] = activeShelters
      .map((shelter) => {
        const distance = calculateDistance(
          lat,
          lng,
          shelter.coordinates.lat,
          shelter.coordinates.lng
        );
        return {
          shelter,
          distance: Math.round(distance),
          walkingTime: calculateWalkingTime(distance),
        };
      })
      .sort((a, b) => a.distance! - b.distance!)
      .slice(0, limit);

    return { data: results, success: true };
  },

  create: async (
    shelter: Omit<Shelter, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Shelter>> => {
    await simulateDelay();
    const newShelter: Shelter = {
      ...shelter,
      id: `shelter-new-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      approvalStatus: 'pending',
    };
    // In real app, would persist to database
    return { data: newShelter, success: true, message: 'Schutzraum erfolgreich erstellt' };
  },

  update: async (
    id: string,
    updates: Partial<Shelter>
  ): Promise<ApiResponse<Shelter | null>> => {
    await simulateDelay();
    const shelter = getShelterById(id);
    if (!shelter) {
      return { data: null, success: false, message: 'Schutzraum nicht gefunden' };
    }
    const updated = { ...shelter, ...updates, updatedAt: new Date().toISOString() };
    // In real app, would persist to database
    return { data: updated, success: true, message: 'Schutzraum erfolgreich aktualisiert' };
  },

  approve: async (id: string): Promise<ApiResponse<Shelter | null>> => {
    await simulateDelay();
    const shelter = getShelterById(id);
    if (!shelter) {
      return { data: null, success: false, message: 'Schutzraum nicht gefunden' };
    }
    const approved = { ...shelter, approvalStatus: 'approved' as const, updatedAt: new Date().toISOString() };
    return { data: approved, success: true, message: 'Schutzraum erfolgreich genehmigt' };
  },

  reject: async (id: string, reason: string): Promise<ApiResponse<Shelter | null>> => {
    await simulateDelay();
    const shelter = getShelterById(id);
    if (!shelter) {
      return { data: null, success: false, message: 'Schutzraum nicht gefunden' };
    }
    const rejected = { ...shelter, approvalStatus: 'rejected' as const, updatedAt: new Date().toISOString() };
    return { data: rejected, success: true, message: `Schutzraum abgelehnt: ${reason}` };
  },
};

// ============================================
// NOTIFICATION API
// ============================================

export const notificationApi = {
  getByRole: async (role: string): Promise<ApiResponse<Notification[]>> => {
    await simulateDelay();
    return { data: getNotificationsByRole(role), success: true };
  },

  getUnreadCount: async (role: string): Promise<ApiResponse<number>> => {
    await simulateDelay();
    return { data: getUnreadCount(role), success: true };
  },

  markAsRead: async (id: string): Promise<ApiResponse<null>> => {
    await simulateDelay();
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
    return { data: null, success: true };
  },

  markAllAsRead: async (role: string): Promise<ApiResponse<null>> => {
    await simulateDelay();
    getNotificationsByRole(role).forEach((n) => {
      n.read = true;
    });
    return { data: null, success: true };
  },
};

// ============================================
// DASHBOARD API
// ============================================

export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    await simulateDelay();
    const stats: DashboardStats = {
      totalShelters: shelters.length,
      activeShelters: shelters.filter((s) => s.status === 'active').length,
      limitedShelters: shelters.filter((s) => s.status === 'limited').length,
      inactiveShelters: shelters.filter((s) => s.status === 'inactive').length,
      plannedShelters: shelters.filter((s) => s.status === 'planned').length,
      totalCapacity: shelters.reduce((sum, s) => sum + s.capacity, 0),
      pendingApprovals: getPendingApprovals().length,
      inspectionsDue: shelters.filter((s) => {
        if (!s.condition.nextInspection) return false;
        const nextInspection = new Date(s.condition.nextInspection);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return nextInspection <= thirtyDaysFromNow;
      }).length,
    };
    return { data: stats, success: true };
  },

  getStatsByState: async (
    state: GermanState
  ): Promise<ApiResponse<DashboardStats>> => {
    await simulateDelay();
    const stateShelters = getSheltersByState(state);
    const stats: DashboardStats = {
      totalShelters: stateShelters.length,
      activeShelters: stateShelters.filter((s) => s.status === 'active').length,
      limitedShelters: stateShelters.filter((s) => s.status === 'limited').length,
      inactiveShelters: stateShelters.filter((s) => s.status === 'inactive').length,
      plannedShelters: stateShelters.filter((s) => s.status === 'planned').length,
      totalCapacity: stateShelters.reduce((sum, s) => sum + s.capacity, 0),
      pendingApprovals: stateShelters.filter((s) => s.approvalStatus === 'pending').length,
      inspectionsDue: stateShelters.filter((s) => {
        if (!s.condition.nextInspection) return false;
        const nextInspection = new Date(s.condition.nextInspection);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        return nextInspection <= thirtyDaysFromNow;
      }).length,
    };
    return { data: stats, success: true };
  },
};

// ============================================
// GEO API (Mock)
// ============================================

export const geoApi = {
  // Mock geocoding - converts address to coordinates
  geocode: async (
    _address: string
  ): Promise<ApiResponse<{ lat: number; lng: number } | null>> => {
    await simulateDelay();
    // In real app, would use a geocoding service
    // For demo, return center of Germany with slight randomization
    return {
      data: {
        lat: 51.1657 + (Math.random() - 0.5) * 2,
        lng: 10.4515 + (Math.random() - 0.5) * 2,
      },
      success: true,
    };
  },

  // Mock reverse geocoding - converts coordinates to address
  reverseGeocode: async (
    lat: number,
    lng: number
  ): Promise<ApiResponse<string>> => {
    await simulateDelay();
    // In real app, would use a geocoding service
    return {
      data: `Simulierte Adresse (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      success: true,
    };
  },

  // Mock route calculation
  getRoute: async (
    fromLat: number,
    fromLng: number,
    toLat: number,
    toLng: number
  ): Promise<
    ApiResponse<{
      distance: number;
      duration: number;
      polyline: [number, number][];
    }>
  > => {
    await simulateDelay();
    const distance = calculateDistance(fromLat, fromLng, toLat, toLng);
    const duration = calculateWalkingTime(distance);

    // Simple straight-line polyline for demo
    const polyline: [number, number][] = [
      [fromLat, fromLng],
      [(fromLat + toLat) / 2, (fromLng + toLng) / 2],
      [toLat, toLng],
    ];

    return {
      data: { distance: Math.round(distance), duration, polyline },
      success: true,
    };
  },
};

// ============================================
// CRISIS API
// ============================================

export const crisisApi = {
  activate: async (
    _regions: GermanState[]
  ): Promise<ApiResponse<{ activatedAt: string }>> => {
    await simulateDelay();
    return {
      data: { activatedAt: new Date().toISOString() },
      success: true,
      message: 'Krisenmodus aktiviert',
    };
  },

  deactivate: async (): Promise<ApiResponse<null>> => {
    await simulateDelay();
    return { data: null, success: true, message: 'Krisenmodus deaktiviert' };
  },

  broadcast: async (
    _message: string,
    _regions: GermanState[]
  ): Promise<ApiResponse<{ sentAt: string }>> => {
    await simulateDelay();
    return {
      data: { sentAt: new Date().toISOString() },
      success: true,
      message: 'Broadcast gesendet',
    };
  },
};
