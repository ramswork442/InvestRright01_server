const allowRoles = (...roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: Access denied" });
      }
      next();
    };
  };
  
  module.exports = { allowRoles };
  