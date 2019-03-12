import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../data.service';
import { DetailArticle, Comments, Profile } from '../data.modle';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  commentForm: FormGroup;
  constructor(private artRoute: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.commentForm = new FormGroup({
      body: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.artRoute.paramMap.subscribe((params: ParamMap) => {
      this.dataService.getOneArticle(params.get('slug')).subscribe((detail: {article: DetailArticle}) => {
        this.dataService.detailArticle = detail;
        this.dataService.getProfile(this.dataService.detailArticle.article.author.username).subscribe((pro: Profile) => {
          this.dataService.profile = pro;
        });
      });
      this.dataService.getComment(params.get('slug')).subscribe((comments: Comments) => {
        this.dataService.comments = comments;
        console.log(comments);
      });
    });
  }
  onSubmit() {
    this.artRoute.paramMap.subscribe((params: ParamMap) => {
      this.dataService.postComment({comment: this.commentForm.value}, params.get('slug')).subscribe(() => {
        this.dataService.getComment(params.get('slug')).subscribe((comments: Comments) => {
          this.dataService.comments = comments;
          this.commentForm.get('body').setValue('');
        });
      });
    });
  }
  deleteComment(id) {
    this.artRoute.paramMap.subscribe((params: ParamMap) => {
      this.dataService.deleteComment(id, params.get('slug')).subscribe(() => {
        this.dataService.getComment(params.get('slug')).subscribe((comments: Comments) => {
          this.dataService.comments = comments;
        });
      });
    });
  }
  follow() {
    if (this.dataService.dataUser) {
      this.dataService.postFollow(this.dataService.detailArticle.article.author.username).subscribe((pro: Profile) => {
        this.dataService.profile = pro;
      });
    } else {
      this.router.navigateByUrl('/signin');
    }
  }
  unfollow() {
    this.dataService.deleteFollow(this.dataService.detailArticle.article.author.username).subscribe((pro: Profile) => {
      this.dataService.profile = pro;
    });
  }
  unFavorite(article: DetailArticle) {
    article.favorited = false;
    article.favoritesCount -= 1;
    this.artRoute.paramMap.subscribe((params: ParamMap) => {
      this.dataService.deleteFavArticle(params.get('slug')).subscribe((res) => console.log(res));
    });
  }
  favorite(article: DetailArticle) {
    article.favorited = true;
    article.favoritesCount += 1;
    this.artRoute.paramMap.subscribe((params: ParamMap) => {
      this.dataService.postFavArticle(params.get('slug')).subscribe((res) => console.log(res));
    });
  }
  deleteArticle() {
    this.artRoute.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('slug'));
      this.dataService.deleteArticle(params.get('slug')).subscribe(() => this.router.navigateByUrl('/'));
    });
  }
}
