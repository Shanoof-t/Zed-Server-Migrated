declare namespace Express {
    interface Request {
        user: User
        file?: Express.Multer.File
    }
}
