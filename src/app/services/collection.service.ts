import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private requestsKey = 'collectionRequests';

  constructor() {}

  submitRequest(request: any) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUser.id;

    // Fetch existing requests
    const requests = JSON.parse(localStorage.getItem(this.requestsKey) || '[]');

    // Validate business rules
    const userRequests = requests.filter((req: any) => req.userId === userId && req.status === 'pending');
    if (userRequests.length >= 3) {
      throw new Error('Vous ne pouvez avoir que 3 demandes en attente simultanément.');
    }

    const totalWeight = userRequests.reduce((sum: number, req: any) => sum + req.weight, 0);
    if (totalWeight + request.weight > 10000) {
      throw new Error('Le poids total de vos demandes en attente ne peut pas dépasser 10kg.');
    }

    // Add the new request
    const newRequest = { ...request, userId, id: Date.now(), status: 'pending' };
    requests.push(newRequest);
    localStorage.setItem(this.requestsKey, JSON.stringify(requests));
  }
}