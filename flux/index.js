import addQuestionStore from './stores/addQuestionStore'
import addQuestionActions from './actions/addQuestionActions'



const fluxObj = {
  addQuestionData : {
    store : addQuestionStore,
    actions : addQuestionActions
  }
};

window.flux = fluxObj;

export default flux;
