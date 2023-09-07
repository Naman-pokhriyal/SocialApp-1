// Check Authentication checks the authentication of a request.
const checkSession = (req, res, next) => {
  const session = req.session;

  if (!session.userInfo) res.status(200).json({ message: "Expired" });
  else next();
};

const destroySession = (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(300).json({ message: "LogOut Failed", err });
    else res.status(200).json({ message: "LogOut Successful" });
  });
};

module.exports = { checkSession, destroySession };
