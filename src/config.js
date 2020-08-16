module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development', 
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/recipe-server',
  API_TOKEN : process.env.API_TOKEN || null, 
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}

  //password: 9f3ed3afe28eca0bc0217820295bf736ba0cdea154caeb62f935271bdfb629a1
  