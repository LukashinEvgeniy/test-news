interface Metadata {
  [key: string]: Metadata | string | number;
}

export default class CustomError extends Error {
  //
  constructor(data: Metadata, ...params: any[]) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    // Custom debugging information
    this.data = data;
    this.date = new Date();
  }

  data: Metadata;

  date: Date;
}
