import * as dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process
  console.log("⚠️  Couldn't find .env file  ⚠️")
}

export const config = {
  databaseURL: process.env.DB_URL,
  port: parseInt(process.env.PORT) || 3000,
  defaultPageSize: parseInt(process.env.PAGE_SIZE) || 20,
}
