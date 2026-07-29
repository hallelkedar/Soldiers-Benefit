export const errorThrowing = (msg, status) => {
    const error = new Error(msg)
    error.statusCode = status
    throw error
}