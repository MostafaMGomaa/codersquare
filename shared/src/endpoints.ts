export type EndpontConfigs = {
  url: string;
  method: 'get' | 'post' | 'PATCH' | 'delete';
  auth?: boolean;
};

export enum EndpointsUrl {
  /** Auth */
  signup = 'auth/signup',
  login = 'auth/login',

  /** Posts */
  listPosts = 'posts/feed',
  getUsersPosts = 'posts/',
  getOnePost = 'posts/:id',
  createPost = 'posts/',
  updatePost = 'posts/:id',
  deletePost = 'posts/:id',

  /** Comments */
  createComments = 'comments/:postId',
  listPostComments = 'comments/:id',
  deleteComment = 'comments/:id',

  /** Comments Like */
  createCommentLike = 'comments/:commentId/like',
  dislikeComment = 'comments/:commentId/like',

  /** Posts Like */
  createLike = 'likes/:postId',
  deleteLike = 'likes/:postId',

  /** Users */
  getMe = 'users/me',
  getUser = 'users/:id',
  updateMe = 'users/me',

  /** Notification */
  getUserNotification = 'notifications/',
  updateNotifications = 'notifications/',
}

export enum Endpoints {
  /** Auth */
  login = 'login',
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

  /** Comments Like */
  createCommentLike = 'createCommentLike',
  dislikeComment = 'dislikeComment',

  /** Likes */
  createLike = 'createLike',
  deleteLike = 'deleteLike',

  /** User */
  getMe = 'getMe',
  getUser = 'getUser',
  updateMe = 'updateMe',

  /** Notification */
  getUserNotification = 'getUserNotification',
  updateNotifications = 'updateNotifications',
}

export const ENDPOINTS_CONFIGS = {
  [Endpoints.login]: {
    method: 'post',
    url: EndpointsUrl.login,
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
  [Endpoints.listPostComments]: {
    method: 'get',
    url: EndpointsUrl.listPostComments,
    auth: true,
  },
  [Endpoints.deleteComment]: {
    method: 'delete',
    url: EndpointsUrl.deleteComment,
    auth: true,
  },

  /** Post Likes */
  [Endpoints.createLike]: {
    method: 'post',
    url: EndpointsUrl.createLike,
    auth: true,
  },
  [Endpoints.deleteLike]: {
    method: 'delete',
    url: EndpointsUrl.deleteLike,
    auth: true,
  },

  /** Comments Like */
  [Endpoints.createCommentLike]: {
    method: 'post',
    url: EndpointsUrl.createCommentLike,
    auth: true,
  },
  [Endpoints.dislikeComment]: {
    method: 'delete',
    url: EndpointsUrl.dislikeComment,
    auth: true,
  },
  /** User */
  [Endpoints.getMe]: {
    method: 'get',
    url: EndpointsUrl.getMe,
    auth: true,
  },
  [Endpoints.getUser]: {
    method: 'get',
    url: EndpointsUrl.getUser,
    auth: true,
  },
  [Endpoints.updateMe]: {
    method: 'PATCH',
    url: EndpointsUrl.updateMe,
    auth: true,
  },

  /** Notification */
  [Endpoints.getUserNotification]: {
    method: 'get',
    url: EndpointsUrl.getUserNotification,
    auth: true,
  },
  [Endpoints.updateNotifications]: {
    method: 'PATCH',
    url: EndpointsUrl.updateNotifications,
    auth: true,
  },
};
