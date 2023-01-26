const Price_Medication_Function = require('./Price_Medication_Function');

test(' When use purchase Medication products from store. System will display total price.  In this unit test Quantity is 35 , unit price  is 20. Therefore, total price count is 700', () => {
  expect(Price_Medication_Function(35, 20)).toBe(700);
});