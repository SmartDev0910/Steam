exports.today = () => {
  let date = new Date().toISOString().split("T")[0];
  return date; // 2023-09-19
};

exports.watchTimeAttr = () => {
  var currentHour = new Date().getHours();
  var index = Math.floor(currentHour / 3);
  return `watchTime${index * 3}${(index + 1) * 3}`;
};

exports.currentWeek = () => {
  const newDate = new Date();
  const date = new Date(newDate.getFullYear(), 0, 1);
  let weekNumber = Math.ceil(
    ((newDate - date) / 86400000 + date.getDay() + 1) / 7
  );
  return newDate.getFullYear() + "-" + weekNumber;
};

exports.weekViewAttr = () => {
  let days = [
    "sunCount",
    "monCount",
    "tueCount",
    "wedCount",
    "thuCount",
    "friCount",
    "satCount",
  ];

  let date = new Date();

  return days[date.getDay()];
};
