import {toastOptions} from '../constants'

import { toast as rtoast } from "react-toastify";

export const toast = (arg) => {
  let { type, msg } = arg;
    if (type == "error") {
      rtoast.error(msg, toastOptions);
    } else if (type == "success") {
      rtoast.success(msg, toastOptions);
    }
}