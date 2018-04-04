# erc20-js

Easy Javascript library to interact with Ethereum ERC20 tokens.

## Install
```
npm install erc20-js
```

## Usage
```js
const erc20 = require('erc20-js');

const tokenInst = new erc20.ERC20(tokenContractAddress);

tokenInst.name().then(function(name) {
  ...
});


erc20.OmiseGo.totalSupply().then(function(supply) {
  ...
});
```

## TODO
  - [ ] Add unit tests