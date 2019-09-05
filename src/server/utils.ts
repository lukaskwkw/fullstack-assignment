export enum ErrorList {
  CUSTOMER_NOT_FOUND = "CUSTOMER_NOT_FOUND",
  EMAIL_ALREADY_TAKEN = "EMAIL_ALREADY_TAKEN"
}

export const createUuid = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const avatarLetters = (firstName, lastName) =>
  firstName && firstName[0].concat((lastName && lastName[0]) || "");
