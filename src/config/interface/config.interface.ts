interface DbConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface RootUser {
  name: string;
  email: string;
  password: string;
}

export interface IConfig {
  secret: string;
  port: number;
  db: DbConfiguration;
  root: RootUser;
}
