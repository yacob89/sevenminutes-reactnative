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

export const secondsToMinutesFloat = (val: number):string => {
  const minutes = Math.floor(val / 60);
  const seconds = (Math.floor(parseInt(pad(val % 60)))) / 60;
  const formatSeconds = seconds.toFixed(2).toString().split('.')[1]
  return `${minutes}.${formatSeconds}`
}
