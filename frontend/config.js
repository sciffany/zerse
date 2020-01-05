module.exports = {
  apps: {
    name: "myapp-client",
    script: "react-scripts start",
    watch: true,
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }
}
