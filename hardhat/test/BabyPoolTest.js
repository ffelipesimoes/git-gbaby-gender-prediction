const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("BabyPool", function () {

  before(async () => {
    const [owner, acc1, acc2, acc3, acc5, acc6, acc7, acc8, acc9, acc10] = await ethers.getSigners();
    const BabyPool = await ethers.getContractFactory("BabyPool");
    const oracle = owner.address
    const babyPool = await BabyPool.deploy(oracle);
    await babyPool.deployed()

  })

  describe("", function () {
    it("", async function () {

    });
  })

  

});
