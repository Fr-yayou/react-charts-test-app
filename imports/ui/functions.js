export default HelperFunctions = {
  validatePrice(price) {
    console.log('validate Price');
    if(price < 0) {
      throw new Error("Price can't be negative")
    }
  },
  getFileExtension(fName) {
    return fName.slice((Math.max(0, fName.lastIndexOf(".")) || Infinity) + 1);
  }

}
