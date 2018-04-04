const ERC20Abi = require('./erc20abi.js');

/**
 * Wrapper class to easily use ERC20 token contracts using web3.
 */
class ERC20Wrapper {
	/**
	 * Constructor
	 *
	 * @param {string} tokenContractAddress Token contract address
	 */
   constructor(tokenContractAddress){
        this._abi = ERC20Abi;
        this._tokenContractAddress = tokenContractAddress;

        this.init = new Promise((resolve, reject) => {
            var tokenInst = web3.eth.contract(this._abi).at(this._tokenContractAddress);
            // console.log("this._tokenInst = " + tokenInst);
            resolve({
                tokenInst: tokenInst
            });
        });
    }

  	/**
	 * Returns the total token supply.
	 *
	 * @return {uint256} Total supply of tokens
	 */
    totalSupply() {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["totalSupply"].call(function (error, total) {
                    resolve(total);
                });
            });
        });
	}

	/**
	 * Returns the account balance of another account with address "accountAddress".
	 *
	 * @return {uint256} Token account balance
	 */
    balanceOf(accountAddress) {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["balanceOf"].call(accountAddress, function (err, balance) {
                    resolve(balance);
                });
            });
        });
    }

	/**
	 * Get token allowance
	 *
	 * @param {string} walletAddress Account address of owner of tokens
	 * @param {string} spendingAddress Spending address allowed to spend tokens
	 * @return {uint256} Amount of remaining tokens allowed to spent
	 */
    allowance(walletAddress, spendingAddress) {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["allowance"].call(walletAddress, spendingAddress, function (error, allowance) {
                    resolve(allowance);
                });
            });
        });
    }

	/**
	 * Transfers the "value" amount of tokens to address "toAccountAddress".
	 *
	 * @param {string} toAccountAddress Account address to send tokens to
	 * @param {uint256} value Amount of tokens to send
	 * @return {bool} Success of transfer
	 */
    transfer(toAccountAddress, value) {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["transfer"].call(toAccountAddress, value, function (error, success) {
                    resolve(success);
                });
            });
        });
    }

	/**
	 * Allow address to withdraw from your account, up to the value amount.
	 *
	 * @param {string} spendingAddress Spending contract address
	 * @param {string} maxAmount Max amount approved for spending
	 * @return {bool} Success of approval
	 */
    approve(spendingAddress, maxAmount) {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["approve"].call(spendingAddress, maxAmount, function (error, success) {
                    resolve(success);
                    // reject(error);
                });
            });
        });
	}

	/**
	 * Transfers the "value" amount of tokens from address "fromAccountAddress" to address "toAccountAddress".
	 *
	 * @param {string} fromAccountAddress Account address from where the tokens are sent from
	 * @param {string} toAccountAddress Account address to send tokens to
	 * @param {uint256} value Amount of tokens to send
	 * @return {bool} Success of transfer
	 */
    transferFrom(fromAccountAddress, toAccountAddress, value) {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["transferFrom"].call(fromAccountAddress, toAccountAddress, value, function (error, success) {
                    resolve(success);
                });
            });
        });
    }

	/**
	 * Returns the name of the token.
     * 
     * OPTIONAL method.
	 *
	 * @return {string} Token name
	 */
    name() {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["name"].call(function (error, name) {
                    resolve(name);
                    // reject(error);
                });
            });
        });
	}

	/**
	 * Returns the number of decimals the token uses.
	 *
     * OPTIONAL method.
	 *
	 * @return {uint256} Token decimals
	 */
    decimals() {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["decimals"].call(function (error, decimals) {
                    resolve(decimals);
                });
            });
        });
    }
    
	/**
	 * Get token version
	 *
     * OPTIONAL method.
	 *
	 * @return {string} Token version
	 */
    version() {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["version"].call(function (err, version) {
                    resolve(version);
                });
            });
        });
    }
    
	/**
	 * Returns the token symbol.
	 *
     * OPTIONAL method.
	 *
	 * @return {string} Token symbol
	 */
    symbol() {
        return new Promise((resolve, reject) => {
            this.init.then(obj => {
                obj.tokenInst["symbol"].call(function (error, symbol) {
                    resolve(symbol);
                });
            });
        });
    }
}

const lib = {
    ERC20: ERC20Wrapper
}

module.exports = lib;