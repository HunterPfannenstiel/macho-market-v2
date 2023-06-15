import { ServerError } from "custom-objects/ServerError";

export const stringCheck = (...variables: any) => {
  variables.forEach((variable: any) => {
    if (typeof variable !== "string") {
      throw new ServerError(
        `Variable is not of type string, variable value received: ${variable}`,
        400
      );
    }
  });
};

export const optionalStringCheck = (...variables: any) => {
  variables.forEach((variable: any) => {
    variable = parseUndefinedToNull(variable);
    if (typeof variable !== "string" || !!variable) {
      throw new ServerError(
        `Variable is not a valid type, variable value received: ${variable}`,
        400
      );
    }
  });
};

export const parseUndefinedToNull = (value: any) => {
  if (value === "undefined" || value === "null") return null;
  return value;
};
