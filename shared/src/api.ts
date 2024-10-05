export interface SignupResponse {
  data: {
    token: string;
  };
}

export interface LoginResponse extends SignupResponse {}
