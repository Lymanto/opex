export interface HttpResult<T> {
  data: T[];
  meta: any | null;
  time: string;
  message: string;
  status: number;
}
export interface HttpResultSoeSpesificUser<T> {
  body: T;
  headers: any | null;
  message: string;
  time: string;
}
export interface HttpResultSoeAllUser<T> {
  body: T[];
  headers: any | null;
  message: string;
  time: string;
}
