import { DeepPartial, ObjectLiteral } from 'typeorm';

type RepoMock<T> = {
  find: jest.Mock<Promise<T[]>, []>;
  findOne: jest.Mock<Promise<T | undefined>, []>;
  save: jest.Mock<Promise<T>, [T]>;
  remove: jest.Mock<Promise<T>, [T]>;
  create: jest.Mock<DeepPartial<T>, [DeepPartial<T>] | []>;
};

export const createRepositoryMock = <
  T extends ObjectLiteral = ObjectLiteral,
>(): RepoMock<T> => ({
  find: jest.fn<Promise<T[]>, []>(),
  findOne: jest.fn<Promise<T | undefined>, []>(),
  save: jest.fn<Promise<T>, [T]>(),
  remove: jest.fn<Promise<T>, [T]>(),
  create: jest.fn<DeepPartial<T>, [DeepPartial<T>]>(dto => dto),
});
