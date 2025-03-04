export abstract class Mapper<T, U> {
  abstract mapFrom(source: T): U;
  // abstract mapTo(destination: T): U;
}
