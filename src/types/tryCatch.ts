import { Result, Success, Failure } from './Result'

export function tryCatch<T, E extends Error>(
  func: () => T,
  onCatch: (e: unknown) => E
): Result<T, E> {
  try {
    const value = func();
    return new Success<T>(value);
  } catch (err) {
    return new Failure<E>(onCatch(err));
  }
}

