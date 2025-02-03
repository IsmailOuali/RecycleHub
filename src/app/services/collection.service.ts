import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private requestsKey = 'collectionRequests'; // Key for storing requests in local storage

  constructor() {}

  /**
   * Submit a new collection request.
   * @param request - The collection request object.
   */
  submitRequest(request: any) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id;

    // Fetch existing requests
    const requests = JSON.parse(localStorage.getItem(this.requestsKey) || '[]');

    // Validate business rules
    const userRequests = requests.filter((req: any) => req.userId === userId && req.status === 'pending');
    if (userRequests.length >= 3) {
      throw new Error('You can only have up to 3 pending requests at a time.');
    }

    const totalWeight = userRequests.reduce((sum: number, req: any) => sum + req.weight, 0);
    if (totalWeight + request.weight > 10000) {
      throw new Error('The total weight of your pending requests cannot exceed 10kg.');
    }

    // Add the new request
    const newRequest = { ...request, userId, id: Date.now(), status: 'pending' };
    requests.push(newRequest);
    localStorage.setItem(this.requestsKey, JSON.stringify(requests));
  }

  /**
   * Get all requests for the logged-in user.
   * @returns An array of requests for the current user.
   */
  getUserRequests(): any[] {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id;

    const requests = JSON.parse(localStorage.getItem(this.requestsKey) || '[]');
    return requests.filter((req: any) => req.userId === userId);
  }

  /**
   * Delete a request by its ID.
   * @param requestId - The ID of the request to delete.
   */
  deleteRequest(requestId: number) {
    let requests = JSON.parse(localStorage.getItem(this.requestsKey) || '[]');
    requests = requests.filter((req: any) => req.id !== requestId);
    localStorage.setItem(this.requestsKey, JSON.stringify(requests));
  }

  /**
   * Update the status of a request.
   * @param requestId - The ID of the request to update.
   * @param status - The new status (e.g., 'occupied', 'in-progress', 'validated', 'rejected').
   */
  updateRequestStatus(requestId: number, status: string) {
    let requests = JSON.parse(localStorage.getItem(this.requestsKey) || '[]');
    requests = requests.map((req: any) =>
      req.id === requestId ? { ...req, status } : req
    );
    localStorage.setItem(this.requestsKey, JSON.stringify(requests));
  }
}