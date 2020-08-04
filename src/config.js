module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/recipe-server',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
  }

  //password: 46bd4e04f8f00f6c354fb41a99210854133e5748c3f3204912bd7e23cbf5a8c3