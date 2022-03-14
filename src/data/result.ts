export type Result<T, E extends Error> = Success<T> | Failure<E>

export class Success<T> {
  constructor(readonly value: T) {}
  __type = 'success'
  isSuccess(): this is Success<T> {
    return true
  }
  isFailure(): this is Failure<Error> {
    return false
  }
}

export class Failure<E extends Error> {
  constructor(readonly value: E) {}
  __type = 'failure'
  isSuccess(): this is Success<unknown> {
    return false
  }
  isFailure(): this is Failure<E> {
    return true
  }
}
