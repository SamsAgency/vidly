

// creating the is admin middleware
module.exports = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send('Access Forbiden')
    next()
}

