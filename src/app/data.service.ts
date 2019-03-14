import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import { ListArticle, DetailArticle, Profile, Comments, User, DataUser, UserLogin, UpdateUser, BodyComment, CreateArticle } from './data.modle';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://conduit.productionready.io/api';
  URL_Article = `${this.url}/articles`;
  URL_Tag = `${this.url}/tags`;
  URL_Profile = `${this.url}/profiles/`;
  listArticle: ListArticle;
  tags: string[];
  profile: Profile;
  detailArticle: {article: DetailArticle};
  comments: Comments;
  dataUser: DataUser;
  boo = true;
  constructor(private httpClient: HttpClient) { }

  getArticle(tag: string, off: string) {
    return this.httpClient.get(this.URL_Article, {params: {
      limit: '10',
      offset: off,
      tag: tag
    }});
  }
  getTag() {
    return this.httpClient.get(this.URL_Tag);
  }
  getProfile(userName: string) {
    return this.httpClient.get(this.URL_Profile + userName);
  }
  getArticleByProfile(userName: string) {
    return this.httpClient.get(this.URL_Article, {params: {
      limit: '10',
      offset: '0',
      author: userName
    }});
  }
  getArticleByFeed(off: string) {
    return this.httpClient.get(`${this.URL_Article}/feed`, {params: {
      limit: '10',
      offset: off
    }});
  }
  getOneArticle(slug: string) {
    return this.httpClient.get(this.URL_Article + `/${slug}`);
  }
  getFavoriteArticle(userName: string, off: string) {
    return this.httpClient.get(this.URL_Article, {params: {
      limit: '10',
      offset: off,
      favorited: userName
    }});
  }
  getComment(slug: string) {
    return this.httpClient.get(`${this.URL_Article}/${slug}/comments`);
  }
  postComment(body: BodyComment, slug: string) {
    return this.httpClient.post(`${this.URL_Article}/${slug}/comments`, body);
  }
  postUser(user: User) {
    return this.httpClient.post(`${this.url}/users`, user);
  }
  postUserToLogin(user: UserLogin) {
    return this.httpClient.post(`${this.url}/users/login`, user);
  }
  putUpdateUser(user: UpdateUser) {
    return this.httpClient.put(`${this.url}/user`, user);
  }
  postFollow(userName: string) {
    return this.httpClient.post(this.URL_Profile + userName + '/follow', '');
  }
  deleteFollow(userName: string) {
    return this.httpClient.delete(this.URL_Profile + userName + '/follow');
  }
  deleteComment(id: string, slug: string) {
    return this.httpClient.delete(`${this.URL_Article}/${slug}/comments/${id}`);
  }
  postFavArticle(slug: string) {
    return this.httpClient.post(`${this.URL_Article}/${slug}/favorite/`, '');
  }
  deleteFavArticle(slug: string) {
    return this.httpClient.delete(`${this.URL_Article}/${slug}/favorite/`);
  }
  deleteArticle(slug: string) {
    return this.httpClient.delete(`${this.URL_Article}/${slug}`);
  }
  postArticle(article: CreateArticle) {
    return this.httpClient.post(this.URL_Article, article);
  }
  putArticle(slug: string, art: {article: {title: any; description: any; body: any}}) {
    return this.httpClient.put(`${this.URL_Article}/${slug}`, art);
  }
}
