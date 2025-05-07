export const PrismaClient = jest.fn().mockImplementation(() => ({
    capitulo: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  }));
  