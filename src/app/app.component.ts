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

  recommendations: Recommendation[] = [];
  movies: Recommendation[] = [];
  tvShows: Recommendation[] = [];
  music: Recommendation[] = [];
  videoGames: Recommendation[] = [];
  youtubeVideos: Recommendation[] = [];
  books: Recommendation[] = [];

  newRecommendation: Recommendation = {
    id: '',
    category: '',
    name: '',
    description: '',
    date: new Date(),
    author: '',
  };

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.loadRecommendations();
  }

  toggleForm() {
    console.log('OKKKKK');
    this.showForm = !this.showForm;
  }

  loadRecommendations() {
    this.recommendationService.getRecommendations().subscribe((data) => {
      this.recommendations = data;
      this.movies = data.filter((r) => r.category === 'Movie');
      this.tvShows = data.filter((r) => r.category === 'TVshow');
      this.music = data.filter((r) => r.category === 'Music');
      this.videoGames = data.filter((r) => r.category === 'VideoGame');
      this.youtubeVideos = data.filter((r) => r.category === 'YoutubeVideo');
      this.books = data.filter((r) => r.category === 'Book');
    });
  }

  addRecommendation() {
    this.recommendationService
      .addRecommendation(this.newRecommendation)
      .subscribe(() => {
        this.loadRecommendations();
        this.resetForm();
      });
  }

  updateRecommendation(recommendation: Recommendation) {
    this.recommendationService
      .updateRecommendation(recommendation)
      .subscribe(() => {
        this.loadRecommendations();
      });
  }

  deleteRecommendation(id: string) {
    this.recommendationService.deleteRecommendation(id).subscribe(() => {
      this.loadRecommendations();
    });
  }

  resetForm() {
    this.newRecommendation = {
      id: '',
      category: '',
      name: '',
      description: '',
      date: new Date(),
      author: '',
    };
  }
}
