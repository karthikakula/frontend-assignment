import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'pegboard',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/PegboardContainer').default;
      const reducerPegboard = require('./modules/pegboard').default;
      const reducerPegs = require('./modules/pegs').default;

      console.log(reducerPegs);
      console.log(reducerPegboard);

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'pegboard', reducer: reducerPegboard });
      injectReducer(store, { key: 'pegs', reducer: reducerPegs });

      /*  Return getComponent   */
      cb(null, Counter)

    /* Webpack named bundle   */
    }, 'pegboard')
  }
})
