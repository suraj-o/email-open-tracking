import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { dbConnect } from './config/database'
import { config } from 'dotenv'


import sendmail from "./api/send-mail"
import trackmail from "./api/trackmail"
import trackDetails from "./api/get-track"
import path from 'path'

const app = new Hono()

// middlewares
app.use(cors({
  origin:"*",
  allowMethods:["GET","POST"]
  })
);

 config({
    path:"./.env"
}),  


dbConnect();

app.route("/track",sendmail)
app.route("/track",trackmail)
app.route("/track",trackDetails)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = +(process.env.PORT!) || 3000;
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
