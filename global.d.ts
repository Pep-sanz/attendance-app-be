declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL?: string;
  }

  interface Process {
    env: ProcessEnv;
    exit(code?: number): never;
  }
}

declare var process: NodeJS.Process;
