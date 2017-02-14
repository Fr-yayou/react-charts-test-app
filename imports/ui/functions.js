export default HelperFunctions = {
  validatePrice(price) {
    console.log('validate Price');
    if(price < 0) {
      throw new Error("Price can't be negative")
    }
  }
}
