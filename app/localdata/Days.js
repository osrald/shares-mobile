class Days {
  getDays() {
    const NUMBER_FORMAT_SIZE = 2;
    let arrDays = [];
    for (let day = 1; day <= 31; day++) {
      let strDay = day + "";
      if (strDay.length < NUMBER_FORMAT_SIZE) {
        arrDays.push({ key: strDay, value: "0" + strDay });
      } else {
        arrDays.push({ key: strDay, value: strDay });
      }
    }

    return arrDays;
  }
}

export default new Days();
