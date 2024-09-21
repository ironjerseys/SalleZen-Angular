import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recommendation } from './recommendation.model';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  //readonly API_URL = 'https://sallezenbackendjava.azurewebsites.net';
  readonly API_URL = 'https://sallezencsharp-c9fcathdf7dcd2cz.germanywestcentral-01.azurewebsites.net/api';

  readonly ENDPOINT_RECOMMENDATION = '/Recommendation';

  constructor(private httpClient: HttpClient) {}

  getRecommendations(): Observable<Recommendation[]> {
    return this.httpClient.get<Recommendation[]>(
      this.API_URL + this.ENDPOINT_RECOMMENDATION
    );
  }

  // Méthode pour envoyer un POST
  addRecommendation(recommendation: Recommendation): Observable<Recommendation> {
    // Envoie de la recommandation avec les en-têtes nécessaires
    return this.httpClient.post<Recommendation>(
      this.API_URL + this.ENDPOINT_RECOMMENDATION,
      recommendation,
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'  // Spécifie que nous acceptons la réponse en texte
        }
      }
    );
  }


  updateRecommendation(
    recommendation: Recommendation
  ): Observable<Recommendation> {
    return this.httpClient.put<Recommendation>(
      this.API_URL + this.ENDPOINT_RECOMMENDATION + '/' + recommendation.id,
      recommendation
    );
  }

  deleteRecommendation(id: string): Observable<any> {
    return this.httpClient.delete(
      this.API_URL + this.ENDPOINT_RECOMMENDATION + '/' + id
    );
  }
}
