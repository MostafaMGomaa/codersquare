export * from './posts';
export * from './auth/signup';

export const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'https://www.example.com/';
