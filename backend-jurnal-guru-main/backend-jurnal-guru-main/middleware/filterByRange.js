const filterByRange = (req, res, next) => {
    
    const currentDate = new Date().toLocaleString();
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);

    req.user = {
        ...req.user,
        startDate,
        endDate
    }
    // console.log(startDate);
    // console.log(endDate);
    // console.log(startDate<endDate);
        next();
    }

export default filterByRange;