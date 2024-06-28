import jwt from 'jsonwebtoken'

function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({error: 'Access denied'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log(req.user)
        next()
    } catch (err) {
        return res.status(401).json({error: 'Access denied'})
    }
}


export {checkAuth}