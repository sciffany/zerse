export const ADD_SOCKET = "ADD_SOCKET"
export const CREATE_ERROR = "CREATE_ERROR"
export const DELETE_ERROR = "DELETE_ERROR"

export const addSocket = (socket: SocketIOClient.Socket) => ({
  type: ADD_SOCKET,
  payload: socket
})

export const createError = (error: string) => ({
  type: CREATE_ERROR,
  payload: error
})

export const deleteError = () => ({
  type: DELETE_ERROR
})
