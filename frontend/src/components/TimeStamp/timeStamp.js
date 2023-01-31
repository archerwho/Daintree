function TimeStamp() {
  const date = new Date();
  const currentDate = `${String(date.getDate()).padStart(2, 0)}/${String(
    date.getMonth() + 1
  ).padStart(2, 0)}/${date.getFullYear()}`;
  return currentDate;
}

export default TimeStamp;
