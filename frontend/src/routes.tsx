const passwordBase = "/password"

const routes = {
  welcome: "/",
  password: {
    home: passwordBase,
    positionAssign: `${passwordBase}/position-assign`,
    playGame: `${passwordBase}/play-game`,
  },
}

export default routes
