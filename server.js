import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import env from "dotenv"
import fs from "fs"
import { Server } from "socket.io";
import http from "http";
// import db from "./db/db.js"
env.config();

const port = process.env.PORT || 4000
const app = express()
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["https://sales.clinow.app","https://erp.clinow.app"],
    method: ["GET", "POST"],
    credentials: true,
  },
});
//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: ['https://sales.clinow.app','https://erp.clinow.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

//Routes
const routeFiles = fs.readdirSync('./routes');
const routes = Array.from(routeFiles);
routes.forEach(async route => {
  const routeModule = await import(`./routes/${route}`);
  app.use('/api', routeModule.default);
});



server.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
