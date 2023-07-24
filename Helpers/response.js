exports.response = {
    success(message, data = null){
        return {
            status: 'success',
            message,
            data: data ?? [],
        }
    },

    fail(message = 'error could not process, try again', data = []){
        return {
            status: 'error',
            message,
            data: data,
        }
    },

    notFound(message = 'Item does not exists'){
        return {
            status: '404',
            message,
            data: [],
        }
    }
}