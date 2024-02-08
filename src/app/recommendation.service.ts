import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recommendation } from './recommendation.model';

@Injectable({
  providedIn: 'root',
})
export class RecommendationService {
  // A garder: adresse du l'API hebergée sur AWS mais en http
  // readonly API_URL = 'http://13.36.241.96:8080';

  // API hebergée sur Azure en https
  readonly API_URL = 'https://sallezenbackend.azurewebsites.net';

  readonly ENDPOINT_RECOMMENDATION = '/recommendation';

  constructor(private httpClient: HttpClient) {}

  getRecommendations(): Observable<Recommendation[]> {
    return this.httpClient.get<Recommendation[]>(
      this.API_URL + this.ENDPOINT_RECOMMENDATION
    );
  }

  addRecommendation(
    recommendation: Recommendation
  ): Observable<Recommendation> {
    const recommendationToSend = { ...recommendation, id: undefined };
    return this.httpClient.post<Recommendation>(
      this.API_URL + this.ENDPOINT_RECOMMENDATION,
      recommendationToSend
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
