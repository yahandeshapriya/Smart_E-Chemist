const Product_Medication_Function = require('./Product_Medication_Function');

test(' When admin purchase products from Medication store. System will display available product count.  In this unit test Product count is 450, Sell count is 20. Therefore, available count is 430', () => {
  expect(Product_Medication_Function(450, 20)).toBe(430);
});