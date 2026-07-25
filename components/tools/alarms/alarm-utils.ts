const TOTAL_MINUTES = 24 * 60;
const MINUTES_PER_DAY = 24 * 60;

export function getMinutesUntilAlarm(
  alarmMinutes: number,
  now = new Date()
) {
  const currentMinutes =
    now.getHours() * 60 +
    now.getMinutes();

  const secondsIntoMinute =
    now.getSeconds();

  let remainingSeconds =
    (alarmMinutes - currentMinutes) * 60 -
    secondsIntoMinute;

  // The alarm time has already passed today,
  // so the next occurrence is tomorrow.
  if (remainingSeconds < 0) {
    remainingSeconds +=
      MINUTES_PER_DAY * 60;
  }

  return remainingSeconds;
}

export function formatTimeUntilAlarm(
  alarmMinutes: number,
  now = new Date()
) {
  const remainingSeconds =
    getMinutesUntilAlarm(
      alarmMinutes,
      now
    );

  if (remainingSeconds === 0) {
    return "Now";
  }

  if (remainingSeconds < 60) {
    return "In less than a minute";
  }

  const totalMinutes = Math.ceil(
    remainingSeconds / 60
  );

  const hours = Math.floor(
    totalMinutes / 60
  );

  const minutes =
    totalMinutes % 60;

  if (hours === 0) {
    return `In ${minutes} min`;
  }

  if (minutes === 0) {
    return `In ${hours} ${
      hours === 1 ? "hour" : "hours"
    }`;
  }

  return `In ${hours} hr ${minutes} min`;
}

export function minutesToTimeParts(minutes: number) {
  const normalized =
    ((minutes % TOTAL_MINUTES) + TOTAL_MINUTES) % TOTAL_MINUTES;

  const hours24 = Math.floor(normalized / 60);
  const mins = normalized % 60;

  const meridiem = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  return {
    hour: String(hours12).padStart(2, "0"),
    minute: String(mins).padStart(2, "0"),
    meridiem,
  };
}

export function minutesToTime(minutes: number) {
  const { hour, minute, meridiem } =
    minutesToTimeParts(minutes);

  return `${hour}:${minute} ${meridiem}`;
}

export function minutesToInputTime(minutes: number) {
  const normalized =
    ((minutes % TOTAL_MINUTES) + TOTAL_MINUTES) % TOTAL_MINUTES;

  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;

  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}`;
}

export function inputTimeToMinutes(value: string) {
  const [hoursValue, minutesValue] = value.split(":");

  const hours = Number(hoursValue);
  const minutes = Number(minutesValue);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

export function getCurrentMinutes(date = new Date()) {
  return date.getHours() * 60 + date.getMinutes();
}

export function getTodayKey(date = new Date()) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}