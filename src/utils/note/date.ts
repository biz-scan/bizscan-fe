export function formatDateDot(dateTime: string) {
    const dateOnly = dateTime.split('T')[0].split(' ')[0];
    return dateOnly.replaceAll('-', '.');
  }
  