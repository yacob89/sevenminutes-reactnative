export const secondsToMinutes = (value: number) => {
  let hours = pad(floor(value / 3600));
  var minutes = pad(floor(value / 60));
  if (value < 0) {
    minutes = '-' + minutes;
    hours = '-' + hours;
  }
  var remainingSeconds = Math.floor(parseInt(pad(value % 60)));

  if (value > 0) {
    value--;
  } else {
    value--;
  }

  let hourString = parseInt(hours) <= 0 ? '' : hours + ':';
  let minuteString = minutes + ':';
  let secondString = remainingSeconds.toString().padStart(2, '0');
  return hourString + minuteString + secondString;
};

const floor = (x: number) => {
  return x | 0;
};

const pad = (n: number) => {
  if (n < 0) {
    n = -n;
  }
  if (n < 10) {
    return '0' + n.toString();
  }
  return n.toString();
};
