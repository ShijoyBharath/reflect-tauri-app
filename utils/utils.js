function formatDate(date) {
  // date: new Date()
  // return: "2024-04-18" String
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(seconds) {
  // seconds: seconds in integer value
  // return: "1Hr 23Min"
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}Hr ${minutes}Min`;
}


function getFormattedDate() {
    // return: "Sunday, April 07, 2024 at 08:32 AM" String for today
    const options = {
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const today = new Date();
    return today.toLocaleString("en-US", options);
  }


const getCurrentWeek = (startWeekDate) => {
    // startWeekDate: "2024-04-05" Start date of the current 12 week year
    // return: ["2024-04-05", "2024-04-11"] Start and End dates of the current week in this 12 week year
    const today = new Date();
    for (
      var d = new Date(startWeekDate);
      d <= today;
      d.setDate(d.getDate() + 7)
    ) {
      var temp_date = new Date(d);
      var week_start = new Date(d);
      var week_end = new Date(temp_date.setDate(temp_date.getDate() + 6));

      if (today >= week_start && today <= week_end) {
        return [formatDate(week_start), formatDate(week_end)];
      }
    }
  };



  const getCurrent12Weeks = (startDate) => {
    // startDate: "2024-04-04" Start/Install date of the application. Needed to calculate the current 12 week year from the starting point.
    // return: ["2024-04-05", "2024-06-13"] Start and End dates of the current 12 week year
    const today = new Date();
    for (var d = new Date(startDate); d <= today; d.setDate(d.getDate() + 84)) {
      var temp_date = new Date(d);
      var week_start = new Date(d);
      var week_end = new Date(temp_date.setDate(temp_date.getDate() + 83));

      if (today >= week_start && today <= week_end) {
        return [formatDate(week_start), formatDate(week_end)];
      }
    }
  };

module.exports = {
  formatDate,
  formatTime,
  getFormattedDate,
  getCurrentWeek,
  getCurrent12Weeks
};
