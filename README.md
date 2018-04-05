# erc20-token-library
Easy Javascript library to interact with Ethereum ERC20 tokens

## Install
```
meteor npm install --save erc20-js
```

## Usage
```
const erc20 = require('erc20-js');

var tokenInst = new erc20.ERC20(tokenContractAddress);

tokenInst.name().then(function(name) {
    ...
});
```

## TODO
  - [ ] Add unit tests
  - [ ] Add dependencies (web3.js)