module.exports = function(deps) {
  return function() {
    return function(next) {
      return function(action) {
        return next(typeof action === 'function' ? action(deps) : action);
      };
    };
  };
};
