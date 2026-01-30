module.exports = {
  apps: [
    {
      name: "sanatan",
      script: "npm",
      args: "start",
      cwd: "/var/www/sanatan",

      env: {
        NODE_ENV: "production",
        PORT: 3000
      },

      max_memory_restart: "300M",
      restart_delay: 5000,
      autorestart: true,
      watch: false
    }
  ]
};
