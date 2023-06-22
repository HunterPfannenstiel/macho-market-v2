export const addTimeToDate = (
  timeScale: "Minutes" | "Days",
  value: number,
  addDate = new Date()
) => {
  switch (timeScale) {
    case "Minutes":
      return new Date(addDate.getTime() + value * 60000);
    case "Days":
      const date = new Date();
      date.setDate(addDate.getDate() + value);
      return date;
  }
};
