export type DeepPartialMock<T> = {
  [P in keyof T]?: T[P] extends (...args: any[]) => any
    ? jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>
    : DeepPartialMock<T[P]>;
};

export const mockedPartial = <T>(): DeepPartialMock<T> =>
  ({}) as DeepPartialMock<T>;
