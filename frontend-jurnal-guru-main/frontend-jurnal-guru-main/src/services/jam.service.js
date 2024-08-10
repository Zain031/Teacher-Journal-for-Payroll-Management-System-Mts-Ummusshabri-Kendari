function incrementTimeSlot(timeSlot, incrementMinutes = 0) {
    // Split the time slot into start and end times
    const [startTimeStr, endTimeStr] = timeSlot.split('-');
    
    // Helper function to parse time string to a Date object
    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0); // Set hours, minutes, and reset seconds and milliseconds
        return date;
    };
    
    // Helper function to format Date object to time string
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Parse the end time, increment it, and format it back to string
    const endTime = parseTime(endTimeStr);
    endTime.setMinutes(endTime.getMinutes() + incrementMinutes);
    const newEndTimeStr = formatTime(endTime);

    return `${startTimeStr}-${newEndTimeStr}`;
}

export default incrementTimeSlot;