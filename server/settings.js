module.exports = {
  port: process.env.APP_PORT,
  adminEmail: process.env.APP_ADMIN_EMAIL,
  secret: process.env.APP_SECRET,
  db: {
    dbName: process.env.APP_DB_NAME,
    dbUsername: process.env.APP_DB_USERNAME,
    dbPassword: process.env.APP_DB_PASSWORD,
    dbHost: process.env.APP_DB_HOST,
  },
};
