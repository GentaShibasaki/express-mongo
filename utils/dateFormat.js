const dateFormat = () => {
  const getDateMethods = [
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate(),
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds(),
  ];

  let formattedDate = "";
  const methodsLength = getDateMethods.length;
  getDateMethods.forEach((method, i) =>
    method < 10
      ? (formattedDate += "0" + method + "-")
      : (formattedDate += method + (methodsLength === i + 1 ? "" : "-"))
  );
  return formattedDate;
};

module.exports = dateFormat;
