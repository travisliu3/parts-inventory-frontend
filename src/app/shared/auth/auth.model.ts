export interface User {
  firstname: String;
  lastname: String;
  email: String;
  password: String;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}
