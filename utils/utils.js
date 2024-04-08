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

  function hslStringToHex(hslString) {
    // hslString: "262.1 83.3% 57.8%" in string format
    // return: hex value #8884d8
    // Split the HSL string into its components
    const [hue, saturation, lightness] = hslString.split(" ");

    // Extract the numeric values and remove the '%' sign
    const h = parseFloat(hue);
    const s = parseFloat(saturation.replace("%", "")) / 100;
    const l = parseFloat(lightness.replace("%", "")) / 100;

    // Convert HSL to RGB
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hueToRgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h / 360 + 1 / 3);
      g = hueToRgb(p, q, h / 360);
      b = hueToRgb(p, q, h / 360 - 1 / 3);
    }

    // Convert RGB to hexadecimal
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

    return hex;
  }

module.exports = {
  formatDate,
  formatTime,
  getFormattedDate,
  getCurrentWeek,
  getCurrent12Weeks,
  hslStringToHex
};
