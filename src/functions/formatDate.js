const configDate = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

export const formatDate = (date) => {
  const dateFoprmatted = new Date(date);
  return dateFoprmatted.toLocaleDateString('es-ES', configDate);
}