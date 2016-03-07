export default function (dateStr) {
  const d = new Date(dateStr);
  return d.toDateString();
}
