# erc20-token-library
Easy Javascript library to interact with Ethereum ERC20 tokens

Usage:
meteor npm install --save erc20-js

const erc20 = require('erc20-js');

  var tokenInst = new erc20.ERC20(tokenContractAddress);

  tokenInst.name().then(function(name) {
      ...
  });
