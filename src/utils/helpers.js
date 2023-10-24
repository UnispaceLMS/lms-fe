export const buildName = (firstName, middleName, lastName) => {
  try {
    const nameArr = [];

    if (firstName) nameArr.push(firstName);
    if (middleName) nameArr.push(middleName);
    if (lastName) nameArr.push(lastName);

    return nameArr?.join(" ");
  } catch (error) {
    console.log(error);
    return "";
  }
};
