export type Path = `/${string}`;

export interface Routes {
  [key: string]: Path | Routes;
}
