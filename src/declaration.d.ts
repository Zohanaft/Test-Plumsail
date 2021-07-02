declare module '*.module.scss';
declare module 'material-icons-react';
declare namespace global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
    }
  }
}
