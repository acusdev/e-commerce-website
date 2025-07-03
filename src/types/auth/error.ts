export interface AuthError {
  code?: string | undefined;
  message?: string | undefined;
  status: number;
  statusText: string;
}
