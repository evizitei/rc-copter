var expect = require("expect.js");

describe("Array", function(){
  describe("#indexOf", function(){
    it("returns -1 for items not in the array", function(){
      expect([1,2,3].indexOf(5)).to.equal(-1);
    });
  });
});
