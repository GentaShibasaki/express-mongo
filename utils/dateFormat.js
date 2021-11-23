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
  getDateMethods.forEach((method) =>
    method < 10
      ? (formattedDate += "0" + method + "-")
      : (formattedDate += method + "-")
  );
  return formattedDate;
};

module.exports = dateFormat;
