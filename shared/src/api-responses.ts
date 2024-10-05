export interface SingupResponse {
  data: {
    token: string;
  };
}

export interface LoginResponse extends SingupResponse {}
