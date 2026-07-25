export function minutesToTimeParts(
  totalMinutes: number
) {
  const normalizedMinutes =
    ((totalMinutes % 1440) + 1440) %
    1440;

  const hours24 = Math.floor(
    normalizedMinutes / 60
  );

  const minutes =
    normalizedMinutes % 60;

  const period =
    hours24 >= 12 ? "PM" : "AM";

  const hours12 =
    hours24 % 12 || 12;

  return {
    time: `${hours12}:${String(
      minutes
    ).padStart(2, "0")}`,

    period,
  };
}

export function minutesToTime(
  minutes: number
) {
  const parts =
    minutesToTimeParts(minutes);

  return `${parts.time} ${parts.period}`;
}

export function minutesToInputValue(
  totalMinutes: number
) {
  const normalizedMinutes =
    ((totalMinutes % 1440) + 1440) %
    1440;

  const hours = Math.floor(
    normalizedMinutes / 60
  );

  const minutes =
    normalizedMinutes % 60;

  return `${String(hours).padStart(
    2,
    "0"
  )}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

export function timeInputToMinutes(
  value: string
) {
  const [hoursValue, minutesValue] =
    value.split(":");

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

export function timeToMinutes(
  time: string
) {
  const [value, period] =
    time.trim().split(/\s+/);

  const [hoursValue, minutesValue] =
    value.split(":");

  let hours = Number(hoursValue);
  const minutes =
    Number(minutesValue);

  if (
    !Number.isInteger(hours) ||
    !Number.isInteger(minutes)
  ) {
    return null;
  }

  if (
    period === "PM" &&
    hours !== 12
  ) {
    hours += 12;
  }

  if (
    period === "AM" &&
    hours === 12
  ) {
    hours = 0;
  }

  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null;
  }

  return hours * 60 + minutes;
}

export function getCurrentMinutes(
  date = new Date()
) {
  return (
    date.getHours() * 60 +
    date.getMinutes()
  );
}

/**
 * Generates a local date key.
 *
 * Do not use toISOString() here because
 * it converts the date to UTC.
 */
export function getTodayKey(
  date = new Date()
) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}