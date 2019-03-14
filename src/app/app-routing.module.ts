import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleComponent } from './article/article.component';
import { SettingComponent } from './setting/setting.component';
import { CeArticleComponent } from './ce-article/ce-article.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { EditorComponent } from './editor/editor.component';
import { DeactivateService } from './deactivate.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'editor', component: CeArticleComponent, canDeactivate: [DeactivateService]},
  {path: 'home/:profile', component: ProfileComponent, children: [
      {path: 'favorite', component: FavoriteComponent}
    ]
  },
  {path: 'editor/:slug', component: EditorComponent},
  {path: 'home/article/:slug', component: ArticleComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
