import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'

import { env } from './config/env.config'

import { appRouter } from './routes/router'

const app = express()

const viewsPath = path.join(__dirname, '..', 'src', 'views')
export const uploadsPath = path.join(__dirname, '../uploads') // Ensure correct path

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Serve Static Files (Uploaded Images)
app.use('/uploads', express.static(uploadsPath))

// Server-Side Rendering Setup
app.set('view engine', 'ejs')
app.set('views', viewsPath)

// Routes
appRouter(app)

// Server
app.listen(env.PORT, () => console.log(`Server is running on port ${env.PORT}`))