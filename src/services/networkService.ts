type NetworkStatusCallback = (online: boolean) => void;

class NetworkService {
  private callbacks: Set<NetworkStatusCallback> = new Set();
  private online: boolean = navigator.onLine;

  constructor() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  }

  private handleNetworkChange = () => {
    this.online = navigator.onLine;
    this.notifySubscribers();
  };

  private notifySubscribers() {
    this.callbacks.forEach(callback => callback(this.online));
  }

  public subscribe(callback: NetworkStatusCallback) {
    this.callbacks.add(callback);
    // Immediately notify the subscriber of the current status
    callback(this.online);
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  public isOnline(): boolean {
    return this.online;
  }
}

// Create a singleton instance
export const networkService = new NetworkService(); 