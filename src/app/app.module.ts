import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MarkdownModule } from "ngx-markdown";
import { NgxPaginationModule } from "ngx-pagination";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ProfileComponent } from "./profile/profile.component";
import { SettingComponent } from "./setting/setting.component";
import { CeArticleComponent } from "./ce-article/ce-article.component";
import { ArticleComponent } from "./article/article.component";

import { TokenInterceptorService } from "./tokenInterceptor";
import { FavoriteComponent } from "./favorite/favorite.component";
import { EditorComponent } from "./editor/editor.component";
import { MarkdownPipe } from "./article/markdown.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    SettingComponent,
    CeArticleComponent,
    ArticleComponent,
    FavoriteComponent,
    EditorComponent,
    MarkdownPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
