import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request)
            const { id, caption, location, action } = args;
            const { user } = request
            const post = await prisma.$exists.post({ id, user: { id: user.id } })   //token을 보유한 놈이 post주인이 맞는지 체크
            if (post) {
                if (action === "EDIT") {
                    return prisma.updatePost({
                        data: {
                            caption, location
                        }, where: {
                            id
                        }
                    })
                } else if (action === "DELETE") {
                    return prisma.deletePost({ id })
                }

            } else {
                throw Error("you can't do that");
            }

        }
    }
}