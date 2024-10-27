export interface UpdateMePayload {
  jwt: string;
  about?: string;
}

export interface UpdateMeResponse {
  message: string;
}
