import state from './state.js';
import actions from './actions.js';
import mutations from './mutauions.js';
import Store from './store.js';

export default new Store({
    actions,
    mutations,
    state
});
