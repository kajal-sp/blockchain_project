const Companies = artifacts.require("Companies");

module.exports = function(deployer) {
  deployer.deploy(Companies);
};
