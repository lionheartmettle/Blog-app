import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Profile, ListArticle, DetailArticle } from '../data.modle';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private actRout: ActivatedRoute, private dataService: DataService, private router: Router) {
    dataService.boo = true;
  }

  ngOnInit() {
    this.actRout.paramMap.subscribe((params: ParamMap) => {
      this.dataService.getProfile(params.get('profile')).subscribe((pro: Profile) => {
        this.dataService.profile = pro;
      }, (err) => {
        this.router.navigateByUrl('**');
      });
      if (this.dataService.boo) {
        this.dataService.getArticleByProfile(params.get('profile')).subscribe((atrs: ListArticle) => {
          this.dataService.listArticle = atrs;
        });
      }
    });
  }
  changeMy() {
    this.dataService.boo = true;
    this.actRout.paramMap.subscribe((params: ParamMap) => {
      this.dataService.getProfile(params.get('profile')).subscribe((pro: Profile) => {
        this.dataService.profile = pro;
      });
      this.dataService.getArticleByProfile(params.get('profile')).subscribe((atrs: ListArticle) => {
        this.dataService.listArticle = atrs;
      });
    });
  }
  changeFav() {
    this.dataService.boo = false;
  }
  follow() {
    if (this.dataService.dataUser) {
      this.dataService.postFollow(this.dataService.profile.profile.username).subscribe((pro: Profile) => {
        this.dataService.profile = pro;
      });
    } else {
      this.router.navigateByUrl('/signin');
    }
  }
  unfollow() {
    this.dataService.deleteFollow(this.dataService.profile.profile.username).subscribe((pro: Profile) => {
      this.dataService.profile = pro;
    });
  }
  changeFavCount(d: DetailArticle) {
    if (d.favorited) {
      d.favorited = false;
      d.favoritesCount -= 1;
      this.dataService.deleteFavArticle(d.slug).subscribe();
    } else {
      d.favorited = true;
      d.favoritesCount += 1;
      this.dataService.postFavArticle(d.slug).subscribe((res) => console.log(res));
    }
  }
}
