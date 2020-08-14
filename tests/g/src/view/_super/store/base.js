/*
 * @Author: tim huang
 * @Date: 2018-12-25 14:59:12
 * @Last Modified by: tim huang
 * @Last Modified time: 2019-01-25 00:32:33
 */

import { message } from "components";
import { action, observable } from "mobx";

class BaseStore {
  @observable
  fieldErrors = {
    errors: {},
    tag: Math.random()
  };

  @observable
  entity = {};

  @action
  resetFieldErrors = () => {
    this.fieldErrors.errors = {};
  };

  @action
  failHandler = ({ success, fieldErrors, globalError }) => {
    if (success) {
      return;
    }
    if (globalError) {
      message.error(globalError);
    } else if (fieldErrors && fieldErrors.length) {
      const realErrors = fieldErrors.reduce((errors, { fieldName, msg }) => {
        let realFieldName;
        const fieldNameFields = fieldName
          .replace("[", ".")
          .replace("]", "")
          .split(".");
        if (fieldNameFields.length > 1) {
          realFieldName = `${fieldNameFields[0]}Real`;
          if (errors[realFieldName]) {
            if (errors[realFieldName][fieldNameFields[1]]) {
              errors[realFieldName][fieldNameFields[1]].push(msg);
            } else {
              errors[realFieldName][fieldNameFields[1]] = [msg];
            }
          } else {
            errors[realFieldName] = {};
            errors[realFieldName][fieldNameFields[1]] = [msg];
          }
        } else {
          errors[fieldName] = msg;
        }
        return errors;
      }, {});
      this.fieldErrors = {
        errors: realErrors,
        tag: Math.random()
      };
    }
  };
}

export default BaseStore;
