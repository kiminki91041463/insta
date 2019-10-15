import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        posts: ({ id }) => { return prisma.user({ id }).posts() },
        following: ({ id }) => { return prisma.user({ id }).following() },
        followers: ({ id }) => { return prisma.user({ id }).followers() },
        likes: ({ id }) => { return prisma.user({ id }).likes() },
        comments: ({ id }) => { return prisma.user({ id }).comments() },
        rooms: ({ id }) => { return prisma.user({ id }).rooms() },
        postsCount: ({ id }) => {
            return prisma
                .postsConnection({ where: { user: { id } } })
                .aggregate()
                .count()
        },
        followingCount: ({ id }) => {
            return prisma
                .usersConnection({ where: { followers_some: { id } } })
                .aggregate()
                .count()
        },
        followersCount: ({ id }) => {
            return prisma
                .usersConnection({ where: { following_none: { id } } })
                .aggregate()
                .count()
        },
        fullName: parent => `${parent.firstName} ${parent.lastName}`,
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id
                        },
                        {
                            following_some: {
                                id: parentId
                            }
                        }
                    ]
                });
            } catch {
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};