import { Component, OnInit } from '@angular/core';
import { RecommendationService } from './recommendation.service';
import { Recommendation } from './recommendation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'RecommendationListFrontend';
  showForm = false;

  // Ajoutez une propriété pour stocker toutes les recommandations
  allRecommendations: Recommendation[] = [];
  recommendations: Recommendation[] = [];

  // Suppression des propriétés inutilisées pour les différentes catégories
  newRecommendation: Recommendation = {
    id: '',
    category: '',
    name: '',
    description: '',
    date: new Date(),
    author: '',
  };

  // Ajoutez une propriété pour la catégorie sélectionnée
  selectedCategory: string = '';

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadRecommendations(): void {
    this.recommendationService.getRecommendations().subscribe((data) => {
      this.allRecommendations = data; // Stocke toutes les recommandations
      this.recommendations = [...this.allRecommendations]; // Par défaut, affiche toutes les recommandations
    });
  }

  addRecommendation(): void {
    this.recommendationService
      .addRecommendation(this.newRecommendation)
      .subscribe(() => {
        this.loadRecommendations();
        this.resetForm();
      });
  }

  updateRecommendation(recommendation: Recommendation): void {
    this.recommendationService
      .updateRecommendation(recommendation)
      .subscribe(() => {
        this.loadRecommendations();
      });
  }

  deleteRecommendation(id: string): void {
    this.recommendationService.deleteRecommendation(id).subscribe(() => {
      this.loadRecommendations();
    });
  }

  resetForm(): void {
    this.newRecommendation = {
      id: '',
      category: '',
      name: '',
      description: '',
      date: new Date(),
      author: '',
    };
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    if (category === '') {
      this.recommendations = [...this.allRecommendations];
    } else {
      this.recommendations = this.allRecommendations.filter(
        (r) => r.category === category
      );
    }
  }
}
