// this is wrapeer class take function as parameter and handle try and catch error
module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
