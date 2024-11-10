export * from './posts';
export * from './auth';
export * from './sendRequest';
export * from './likes';
export * from './comments';
export * from './users';
export * from './notifications';

export const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'https://www.example.com/';
