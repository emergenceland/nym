// Select query for the route GET /users/{userId}/posts

import { Prisma } from '@prisma/client';

export const userPostsSelect = {
  id: true,
  title: true,
  body: true,
  timestamp: true,
  userId: true,
  upvotes: {
    select: {
      id: true,
      address: true,
      timestamp: true,
    },
  },
  _count: {
    select: {
      descendants: true,
    },
  },
} satisfies Prisma.PostSelect;

type userPostPayload = Prisma.PostGetPayload<{ select: typeof userPostsSelect }>;

export type IUserPost = Omit<userPostPayload, '_count'> & { replyCount: number };
