
// Function to pad numbers with leading zeros
function pad(number, length) {
    return number.toString().padStart(length, '0');
}

export const ResetExpiryTimestamp = () => {
    const now = new Date();
    
    // Add 15 minutes to the current time
    now.setMinutes(now.getMinutes() + 15);
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1, 2); // Months are 0-indexed
    const day = pad(now.getDate(), 2);
    const hours = pad(now.getHours(), 2);
    const minutes = pad(now.getMinutes(), 2);
    const seconds = pad(now.getSeconds(), 2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
