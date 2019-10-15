import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args) => {
            //isAuthenticated(request); 남의 프로필은 로그인안해도 볼수있겄제
            const { username } = args;
            return prisma.user({ username })
        }
    }
}