import * as Yup from "yup";
import Errors from "Constants/Error";
import otherConstants from "Constants/OtherConstants";

export const editUserFormValidators = Yup.object({
  userName: Yup.string()
    .max(otherConstants.maxLength, Errors.maxLength)
    .min(otherConstants.minLength, Errors.minLength)
    .required(Errors.requiredField),
});
export const editUserFormValues = {
  userName: "",
  contact: "",
  file: "",
};
