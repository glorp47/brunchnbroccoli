module.exports = {
  todayStr: function() {
    d = new Date();
    return this.dateStr(d);
  },

  nextDayStr: function(dStr) {
    d = new Date(Date.parse(dStr));
    d.setDate(d.getDate() + 1);
    return this.dateStr(d);
  },

  yearsAfterDateStr: function(num, dStr) {
    d = new Date(Date.parse(dStr));
    d.setFullYear(d.getFullYear() + num);
    return this.dateStr(d);
  },

  inclBetween: function(dateStr, min, max) {
    d1 = Date.parse(dateStr);
    dmin = Date.parse(min);
    dmax = Date.parse(max);
    // debugger;
    return (d1 >= dmin && d1 <= dmax);
  },

  compareDates: function(dStr1, dStr2) {
    d1 = Date.parse(dStr1);
    d2 = Date.parse(dStr2);
    if (d1 > d2) {
      return 1;
    } else if (d1 === d2) {
      return 0;
    } else {
      return -1;
    }
  },

  dateStr: function(d) {
    var mm = (d.getMonth() + 1).toString();
    var dd = d.getDate().toString();
    var yyyy = d.getFullYear().toString();
    return (mm[1] ? mm : "0" + mm) + "/" + (dd[1] ? dd : "0" + dd) + "/" + yyyy;
  }
};
