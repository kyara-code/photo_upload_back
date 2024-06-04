export default {
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'files',
  BASE_IMG_URL: process.env.BASE_IMG_URL || "http://localhost:8000/files/",
  database: {
      host: process.env.DATABASE_HOST || "localhost",
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || "postgres",
      password: process.env.DATABASE_PASS || "admin",
      database: process.env.DATABASE_NAME || "postgres",
  },
}