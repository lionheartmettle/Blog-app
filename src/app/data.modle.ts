export interface User {
  user: {
    username: string;
    email: string;
    password: string;
  };
}
export interface UserLogin {
  user: {
    email: string;
    password: string;
  };
}
export interface UpdateUser {
  user: {
    email: string;
    bio: string;
    image: string;
    username: string;
    password: string;
  };
}
export interface DataUser {
  user: {
    bio: string;
    createdAt: string;
    email: string;
    id: number;
    image: string;
    token: string;
    updatedAt: string;
    username: string;
  };
}
export interface DetailArticle {
  author: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface ListArticle {
  articles: DetailArticle[];
  articlesCount: number;
}

export interface Profile {
  profile: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
}

export interface Comments {
  comments: [
    {
      author: {
        bio: string;
        following: boolean;
        image: string;
        username: string;
      };
      body: string;
      createdAt: string;
      id: number;
      updatedAt: string;
    }
  ];
}
export interface BodyComment {
  comment: {
    body: string;
  };
}
export interface CreateArticle {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
