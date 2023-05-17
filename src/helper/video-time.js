export const TimeVideo = (hours, minuts, seconds) => {
  let hour;
  let minut;
  let second;
  if (hours == 0) {
    hour = `0${hours}`;
  } else if (hours.toString().length == 1) {
    hour = `0${hours}`;
  } else {
    hour = `${hours}`;
  }

  if (minuts == 0) {
    minut = "00";
  } else if (minuts.toString().length == 1) {
    minut = `0${minuts}`;
  } else {
    minut = `${minuts}`;
  }

  if (seconds == 0) {
    second = "00";
  } else if (seconds.toString().length == 1) {
    second = `0${seconds}`;
  } else {
    second = `${seconds}`;
  }

  return `${hour}${hour.length ? ":" : ""}${minut}:${second}`;
};
