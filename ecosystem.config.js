module.exports = {
  apps: [
    {
      name: "sanatan",

      // Run the actual Next.js binary
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 3000",

      cwd: "/var/www/sanatan",

      env: {
        NODE_ENV: "production",
        PORT: 3000
      },

      // 🔒 Crash protection
      autorestart: true,
      max_restarts: 5,
      min_uptime: "30s",
      restart_delay: 5000,

      // 🧠 Resource safety
      max_memory_restart: "400M",

      watch: false
    }
  ]
};
