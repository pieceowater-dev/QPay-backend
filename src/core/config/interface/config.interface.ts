interface RootUser {
  name: string;
  email: string;
  password: string;
}

export interface IConfig {
  secret: string;
  port: number;
  root: RootUser;
}
