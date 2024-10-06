export type EndpontConfigs = {
  url: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  auth?: boolean;
};

export enum EndpointsUrl {
  /** Auth */
  signup = 'auth/signup',
  signin = 'auth/login',

  /** Posts */
  listPosts = 'posts/feed',
  getUsersPosts = 'posts/',
  getOnePost = 'posts/:id',
  createPost = 'posts/',
  updatePost = 'posts/:id',
  deletePost = 'posts/:id',

  /** Comments */
  createComments = 'commnets/:postId',
  getPostComments = 'comments/:id',
  deleteComment = 'comments/:id',

  /** Likes */
  createLike = 'likes/:postId',
}

export enum Endpoints {
  /** Auth */
  signin = 'signin',
  signup = 'signup',

  /** Posts */
  listPosts = 'listPosts',
  getOnePost = 'getPost',
  createPost = 'createPost',
  deletePost = 'deletePost',

  /** Comments */
  listPostComments = 'listPostComments',
  createComment = 'createComment',
  deleteComment = 'deleteComment',

  /** Likes */
  createLike = 'createLike',
}

export const ENDPOINTS_CINFIGS = {
  [Endpoints.signin]: {
    method: 'post',
    url: EndpointsUrl.signin,
    sensitive: true,
  },
  [Endpoints.signup]: {
    method: 'post',
    url: EndpointsUrl.signup,
    sensitive: true,
  },

  [Endpoints.listPosts]: { method: 'get', url: EndpointsUrl.listPosts },
  [Endpoints.getOnePost]: { method: 'get', url: EndpointsUrl.getOnePost },
  [Endpoints.createPost]: {
    method: 'post',
    url: EndpointsUrl.createPost,
    auth: true,
  },
  [Endpoints.deletePost]: {
    method: 'delete',
    url: EndpointsUrl.deletePost,
    auth: true,
  },

  /** Comments */
  [Endpoints.createComment]: {
    method: 'post',
    url: EndpointsUrl.createComments,
    auth: true,
  },
  [Endpoints.deleteComment]: {
    method: 'delete',
    url: EndpointsUrl.deleteComment,
    auth: true,
  },

  /** Likes */
  [Endpoints.createLike]: {
    method: 'post',
    url: EndpointsUrl.createLike,
    auth: true,
  },
};