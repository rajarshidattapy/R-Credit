// Mock data store for frontend-only implementation

class MockDataStore {
  constructor() {
    this.waitlist = [];
    this.stats = {
      tvl: '2.4 Crores',
      compliance: '100%',
      users: 1247
    };
  }

  addToWaitlist(email) {
    this.waitlist.push({
      email,
      timestamp: new Date().toISOString()
    });
    return { success: true, message: 'Successfully joined waitlist' };
  }

  getWaitlistCount() {
    return this.waitlist.length + 1247; // Base count + new signups
  }

  getStats() {
    return this.stats;
  }
}

export const mockData = new MockDataStore();