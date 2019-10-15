import { makeExecutableSchema } from "graphql-tools"
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"
import path from "path"

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"))
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"))       //해당경로에는 resolver js들만 있어야함

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
})

export default schema