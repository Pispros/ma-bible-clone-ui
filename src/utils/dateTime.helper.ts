export const formatDate = (date: Date) : string => {
    const today = new Date();
    if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    if (
        date.getDate() === today.getDate() - 1 &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    ) {
        return `Hier`;
    }

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear().toString().substring(2, 3)}`;
}