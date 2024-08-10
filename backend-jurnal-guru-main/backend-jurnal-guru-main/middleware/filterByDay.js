const filterByDay = (req, res, next) => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const dateTranslator = {
        'Minggu':'Sunday',
        'Senin':'Monday',
        'Selasa':'Tuesday',
        'Rabu':'Wednesday',
        'Kamis':'Thursday',
        'Jumat':'Friday',
        'Sabtu':'Saturday',
        
    }
    console.log(dateStr,"FILTER BU DAY");
    console.log(new Date().toLocaleDateString())
    let hari = new Date(dateStr);
    hari = new Date().toLocaleDateString("id-ID", { weekday: 'long',timeZone: 'Asia/Jakarta' }); 
    console.log(hari);
    hari = dateTranslator[hari];
    req.user = {...req.user, hari};
    console.log(req.user);
    next();
};

export { filterByDay };