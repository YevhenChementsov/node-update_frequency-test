export const formatDate = date => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };

  const datePart = date.toLocaleDateString('en-US', options);
  const timePart = date
    .toLocaleTimeString('en-US', { hour12: false })
    .replace(/:/g, ':');

  return `${datePart} [${timePart}]:`;
};
