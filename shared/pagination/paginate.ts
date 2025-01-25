import { Prisma } from "@prisma/client";
import {
  IncludeArgs,
  ModelName,
  SelectArgs,
  WhereInput,
} from "shared/types/model-name";
import prisma from "config/prisma-client";
import { PaginatedResult } from "shared/types/types";

interface PaginationOptions {
  where?: WhereInput;
  include?: IncludeArgs;
  select?: SelectArgs;
  page: number;
  limit: number;
  orderBy?: any;
}

export const paginate = async (
  modelName: ModelName,
  options: PaginationOptions
) => {
  const { where, include, select, page, limit, orderBy } = options;

  const skip = (page - 1) * limit;

  const take = limit;

  const startIndex = skip;
  const endIndex = page * limit;

  const paginatedResults: PaginatedResult = {
    nextPage: { page: 0, limit: 0 },
    prevPage: { page: 0, limit: 0 },
    total: 0,
    totalInDb: 0,
    result: [],
  };

  if (startIndex > 0) {
    paginatedResults.prevPage = { page: page - 1, limit: take };
  }

  if (endIndex < paginatedResults.total) {
    paginatedResults.nextPage = { page: page + 1, limit: take };
  }

  // @ts-expect-error
  const totalinDb = await prisma[modelName].count({ where });

  //   @ts-expect-error
  const result = await prisma[modelName].findMany({
    where,
    orderBy,
    take,
    skip,
    include,
    select,
  });

  paginatedResults.result = result;
  paginatedResults.total = result.length;
  paginatedResults.totalInDb = totalinDb;

  return paginatedResults;
};
