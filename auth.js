// Middleware to check user role and enforce authorization
const checkAuthorization = (allowedRole) => {
    return (req, res, next) => {
      // Assuming that the user object is available in the request after authentication
      const userRole = req.user.role;
  
      if (userRole === allowedRole) {
        // User has the required role, proceed to the next middleware or route handler
        next();
      } else {
        // User does not have the required role, send a forbidden response
        res.status(403).json({ error: 'Unauthorized: Insufficient privileges' });
      }
    };
  };


  module.exports = checkAuthorization