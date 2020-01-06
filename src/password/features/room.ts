import Room from "src/common/features/room"
import Lounge from "common/features/lounge"

export default class PasswordRoom extends Room {
  constructor(name: string, lounge: Lounge) {
    super(name, lounge)
  }

  getRoomCapacity() {
    return 4
  }
}
