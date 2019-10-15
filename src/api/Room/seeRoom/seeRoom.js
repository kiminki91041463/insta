import { prisma } from "../../../../generated/prisma-client"
import { ROOM_FRAGMENT } from "../../../fragments"

export default {
    Query: {
        seeRoom: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request)
            const { id } = args
            const { user } = request
            const canSee = await prisma.$exists.room({
                participants_some: {
                    id: user.id
                }
            })
            if (canSee) {
                const result = await prisma.room({ id }).$fragment(ROOM_FRAGMENT)
                console.log(result)
                return result
            } else {
                throw Error("I can't see the this")
            }
        }
    }
}