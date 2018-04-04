const ERC20Abi = require('./erc20abi.js');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/AleR2gOtOIW9CsbTN6QV'));

/*
    adapted from http://eddmann.com/posts/promisifying-error-first-asynchronous-callbacks-in-javascript/
*/
const promisify = (func, ...args) =>
    new Promise((resolve, reject) =>
        func(...args, (err, value) =>
            (err ? reject(err) : resolve(value))
        )
    );

/**
 * Wrapper class to easily use ERC20 token contracts using web3.
 */
class ERC20Wrapper {

    /**
     * Constructor
     *
     * @param {string} tokenContractAddress Token contract address
     */
    constructor(tokenContractAddress) {
        this.init = new Promise((resolve) => {
            const tokenInst = web3.eth.contract(ERC20Abi).at(tokenContractAddress);
            // console.log("this._tokenInst = " + tokenInst);
            resolve(tokenInst);
        });
    }

    /**
     * Returns the total token supply.
     *
     * @return {uint256} Total supply of tokens
     */
    totalSupply() {
        return this.init.then(tokenInst => {
            return promisify(tokenInst['totalSupply'].call)
                .then(u256 => u256.toString(10));
        });
    }

    /**
     * Returns the account balance of another account with address "accountAddress".
     *
     * @return {uint256} Token account balance
     */
    balanceOf(accountAddress) {
        return this.init.then(tokenInst => {
            return promisify(tokenInst['balanceOf'].call, accountAddress)
                .then(u256 => u256.toString(10));
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['allowance'].call, walletAddress, spendingAddress)
                .then(u256 => u256.toString(10));
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['transfer'].call, toAccountAddress, value);
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['approve'].call, spendingAddress, maxAmount);
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['transferFrom'].call, fromAccountAddress, toAccountAddress, value);
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['name'].call);
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['decimals'].call)
                .then(u256 => u256.toString(10));
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['version'].call);
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
        return this.init.then(tokenInst => {
            return promisify(tokenInst['symbol'].call);
        });
    }
}

module.exports = {
    ERC20: ERC20Wrapper,
    OmiseGo: new ERC20Wrapper('0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'),
    Aragon: new ERC20Wrapper('0x960b236A07cf122663c4303350609A66A7B288C0'),
    Gnosis: new ERC20Wrapper('0x6810e776880c02933d47db1b9fc05908e5386b96'),
    Status: new ERC20Wrapper('0x744d70fdbe2ba4cf95131626614a1763df805b9e')
};
