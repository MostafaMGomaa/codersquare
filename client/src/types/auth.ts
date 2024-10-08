export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface JWTPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}
