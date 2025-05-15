
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const { rol } = req.user;

    if (!allowedRoles.includes(rol)) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    next();
  };
};

export default authorizeRoles;