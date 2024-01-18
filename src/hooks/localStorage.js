export const getLocal = (key = "") => {
  if (key === "") {
    return "";
  } else {
    let data = JSON.parse(window.localStorage.getItem(key)) || [];
    return data;
  }
};

export const setLocal = (key = "", value) => {
  if (key === "" || value === "") {
    return false;
  } else {
    let stringifyObj = JSON.stringify(value);
    window.localStorage.setItem(key, stringifyObj);
    return true;
  }
};

export const removeLocal = (key = "") => {
  if (key === "") {
    return false;
  } else {
    window.localStorage.removeItem(key);
    return true;
  }
};
