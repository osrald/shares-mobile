const YEAR_ENTRY_MIN = 1975;

class Years {
  getYears() {
    let arrYears = [];
    for (let year = new Date().getFullYear(); year >= YEAR_ENTRY_MIN; year--) {
      arrYears.push({ key: year + "", value: year + "" });
    }

    return arrYears;
  }
}

export default new Years();
