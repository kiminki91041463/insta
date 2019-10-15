export const isAuthenticated = (request) => {
    if (!request.user) {
        throw Error("you need to log in to action")
    }
    return;
}