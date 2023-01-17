const authorizeMiddleware = (req, res) => {
    if (req.header.token == null) {
        res.status(403).send({
            success: false,
            message: "Login required!"
        })
    }

}

const authRole = (role) => {
    return (req, res, next) => {
        if (req.body.role !== role) {
            res.status(401).send({
                success: false,
                message: "Invalid role"
            })
        }
        next();
    }
}

module.exports = {
    authorizeMiddleware,
    authRole
}