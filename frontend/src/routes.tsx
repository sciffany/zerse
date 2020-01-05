const passwordBase = "/password"

const routes = {
  welcome: "/",
  password: {
    home: passwordBase,
    positionAssign: `${passwordBase}/position-assign`
  }
}

export default routes
