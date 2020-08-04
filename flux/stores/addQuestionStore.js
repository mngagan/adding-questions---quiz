/* eslint-disable dot-notation, camelcase */
"use strict";
import { createStore } from "alt-utils/lib/decorators";
import alt from "../alt";
import _ from "underscore";
import objectPath from "object-path";
import addQuestionActions from "../actions/addQuestionActions";

function getInitState() {
  return {};
}

class addQuestionStore {
  constructor() {
    this.bindActions(addQuestionActions);
    this.state = getInitState();
  }
  onUpdateState = obj => {
    this.setState(obj);
  };
}

addQuestionStore.displayName = "addQuestionStore";

export default createStore(alt)(addQuestionStore);
