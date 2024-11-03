export interface SignupPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  about: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface JWTPayload {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}
