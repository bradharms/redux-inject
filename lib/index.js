module.exports = function(deps) {
  return function() {
    return function(next) {
      return function(action) {
        next(typeof action === 'function' ? action(deps) : action);
      };
    };
  };
};
