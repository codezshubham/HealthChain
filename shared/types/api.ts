export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AuthResponse {
  user: any;
  token: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
}