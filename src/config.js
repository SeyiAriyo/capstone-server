module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin:password-111@localhost/recipe-server',
  API_TOKEN : process.env.API_TOKEN || null,

  // JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}