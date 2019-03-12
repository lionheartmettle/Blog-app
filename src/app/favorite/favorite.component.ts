import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ListArticle, Profile, DetailArticle } from '../data.modle';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(private dataService: DataService, private actRout: ActivatedRoute, private router: Router) {
    dataService.boo = false;
  }

  ngOnInit() {
    // this.actRout.parent.params.subscribe(res => console.log(res));
    const pos = this.router.url.lastIndexOf('favorite') - 1;
    const username = this.router.url.substring(6, pos);
    console.log(username);
    this.dataService.getFavoriteArticle(username).subscribe((res: ListArticle) => {
      this.dataService.listArticle = res;
    });
  }
  changeMy() {
    this.dataService.boo = true;
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
