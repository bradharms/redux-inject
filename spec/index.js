var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var thunk = require('redux-thunk');

var inject = require('../lib');

describe('Redux Inject middleware factory', function() {
  it('is a function', function() {
    expect(inject).toEqual(jasmine.any(Function));
  });

  describe('when used to create a Redux middleware', function() {
    var store;
    var value;

    beforeEach(function() {
      store = applyMiddleware(
        inject({ value: 'Hello!' })
      )(createStore)(
        function(state, initialState) {
          return initialState.value;
        },

        null
      );
    });

    it('passes on non-function actions', function() {
      store.dispatch({ type: 'SET', value: 'Hey!' });
      expect(store.getState()).toEqual('Hey!');
    });

    it('uses a callback to inject values into actions', function() {
      store.dispatch(function(data) {
        return { type: 'SET', value: data.value };
      });

      expect(store.getState()).toEqual('Hello!');
    });

    it('can be used in conjunction with Redux Thunk', function() {
      store = applyMiddleware(
        inject({ value: 'Hello!' }),
        thunk
      )(createStore)(
        function(state, data) { return data.value; },

        null
      );
      store.dispatch(
        function(data) {
          return function(dispatch) {
            dispatch({ type: 'SET', value: data.value });
          };
        }
      );
      expect(store.getState()).toEqual('Hello!');
    });
  });
});
