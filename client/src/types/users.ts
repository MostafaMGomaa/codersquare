export interface UpdateMePayload {
  jwt: string;
  about?: string;
}

export interface UpdateMeResponse {
  message: string;
}

export interface GetUserByIdPayload {
  jwt: string;
  userId: string;
}
