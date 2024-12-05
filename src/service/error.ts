export enum ErrorCode {
  ActionFailed = 'ACTION_FAILED',
  HasExist = 'HAS_EXIST',
  NotFound = 'NOT_FOUND',
  TooFrequent = 'TOO_FREQUENT',
  Unknown = 'UNKNOWN',
  NoMore = 'NO_MORE',
}

export class BizError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
  ) {
    super(message);
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function transError(e: any, message: string) {
  return e instanceof BizError
    ? { message: e.message ?? message, code: e.code }
    : { message: message, code: ErrorCode.Unknown };
}
