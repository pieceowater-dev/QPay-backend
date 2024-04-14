interface DbConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface IConfig {
  secret: string;
  port: number;
  db: DbConfiguration;
}
