import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request)
            const { user } = request
            console.log(user)
            const following = await prisma.user({ id: user.id }).following();
            console.log(following)
            return prisma.posts({
                where: {
                    user: {
                        id_in: [...following.map(user => user.id), user.id]
                    }
                },
                orderBy: "createAt_DESC"
            });
        }
    }
}