# Redux Inject (Archived)

> **NOTE:** This project is archived. No further updates will be made.

Redux middleware generator that allows dependencies to be injected into action creators.

## Installation

```bash
npm install redux-inject
```

## Example Usage (ES6/ES7)
```javascript
import { applyMiddleware, createStore } from 'redux';
import inject from 'redux-inject';

import dep1 from '.../dep1';
import dep2 from '.../dep2';

const createStoreWithMiddleware = applyMiddleware(
  inject({dep1, dep2}); // Note that inject() is a 'curried' function
)(createStore);
```

After being applied, all action creators will be able to return a
"dependency wrapper" function which will be supplied
dependencies by name. The wrapper's return value will be passed to the
next middleware via `next()`. Therefore, the signature of an action creator
for such a function would look like this:

```javascript
const createFooAction = (payload) => ({dep1, dep2}) => {
  // ...use dep1...
  // ...use dep2...
  return { type: FOO, ...payload };
}
```

## Rational

This middleware was created to resolve a problem I faced while trying to
write isomorphic model access code. My action creators needed to be used on
both the client and the server, but they needed to access model data in
different ways depending on which end they were currently running on. I
decided the best way to do this was to provide the model access code via
dependency injection, and the best way I could think to do it was using a
Redux middleware.

## Use with Redux-Thunk

> **NOTE:** Redux-Thunk now includes the [withExtraArgument()](https://github.com/gaearon/redux-thunk#injecting-a-custom-argument) function, a feature that was intendded to solve the same problem as this library. If you were intending to use redux-inject and redux-thunk together, you may want to consider trying that first.

Though not required, this module was intended to be used in conjunction with [redux-thunk](https://github.com/gaearon/redux-thunk). When the two
are used together, you must be careful to ensure that the action creators
nest their functions in the correct order. This order will be the
same order in which the middlewares are applied, as in this example:

```javascript
/**
 * @file configureStore.js
 */
import inject from 'redux-inject';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
 inject({dep1, dep2}),
 thunk
)(createStore);
```

```javascript
/**
 * @file actions.js
 */

// RIGHT:
const createFooAction = (payload) => (deps) => (dispatch) => {
 return dispatch
}

// WRONG: dispatch will receive the deps, and the deps will receive the
//        dispatch function.
const createFooAction = (payload) => (dispatch) => (deps) => { ... }
```

## Final Notes

This is the first module I've ever contributed to the JavaScript/Node ecosystems. If I've made a mistake or if you see any room for improvement, please don't hesitate to let me know.
