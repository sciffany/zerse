import produce from "immer"

const defaultState = {
  error: null
}

const generalReducer = (prev = defaultState, action: any) =>
  produce(prev, nxt => {
    switch (action.type) {
      case "SHOW_ERROR":
        nxt.error = action.payload.error
        break
    }
  })
export default generalReducer
