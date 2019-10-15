import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        me: async (_, __, { request, isAuthenticated }) => {
            //console.log("user parent", _);    undefined
            isAuthenticated(request);
            const { user } = request
            return await prisma.user({ id: user.id })
        }
    },
}