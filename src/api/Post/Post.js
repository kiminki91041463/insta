import { prisma } from "../../../generated/prisma-client"

export default {
    Post: {
        files: ({ id }) => {
            return prisma.post({ id }).files()
        },
        comments: ({ id }) => {
            return prisma.post({ id }).comments()
        },
        user: ({ id }) => {
            return prisma.post({ id }).user()
        },
        isLiked: (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            })
        },
        likeCount: (parent) => {
            return prisma.likesConnection({
                where: { post: { id: parent.id } }
            }).aggregate().count();
        },
        commentCount: (parent) => {
            return prisma.commentsConnection({
                where: { post: { id: parent.id } }
            }).aggregate().count();
        }
    }
}