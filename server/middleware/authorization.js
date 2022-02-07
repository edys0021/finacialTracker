const authorization = async (req, res, next) => {
    try {
       const { role } = req.user
       if(role !== "admin") {
        res.status(403).json({ message: "access denied you don't have permission to access" })
       }
       next()
    } catch (err) {
        res.status(500).json({ message: "Invalid server error"})
    }
}

module.exports = authorization