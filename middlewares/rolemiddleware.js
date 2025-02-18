const verifyRole = ([...allowedRoles]) => {
  return (req, res, next) => {
    // console.log("role...",req.user.userrole)
    if (!allowedRoles.includes(req.user.userrole)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }
    next();
  };
};

module.exports = { verifyRole };
