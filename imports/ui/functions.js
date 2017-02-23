export default HelperFunctions = {
  validatePrice(price) {
    console.log('validate Price');
    if(price < 0) {
      throw new Error("Price can't be negative")
    }
  },
  getFileExtension(fName) {
    return fName.slice((Math.max(0, fName.lastIndexOf(".")) || Infinity) + 1);
  },
  startsWith(str,str2)
  {
      if(str2 == '' || !str2)
        return true;

      return(str.indexOf(str2) == 0);
  },
  dateGreaterThan(date1,date2) {
    if(!date2 || !date1)
      return true;

    let actualDate1 = new Date(date1).getTime();
    let actualDate2 = new Date(date2).getTime();
    return actualDate1 - actualDate2 >= 0 ? true : false;
  },
  comparePrice(price1,price2) {
    if(!price1 || !price2)
      return true;

    return price1 - price2 >= 0 ? true: false;
  }

}
