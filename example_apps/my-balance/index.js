// Usage:
//   node index.js 0xe41d2489571d322189246dafa5ebde1f4699f498

const erc20 = require('erc20-js');
const Web3 = require('web3');

let token_list = [
    erc20.OmiseGo,
    erc20.Aragon,
    erc20.Gnosis,
    erc20.Status,
    new erc20.ERC20('0xe41d2489571d322189246dafa5ebde1f4699f498'), // 0x
    new erc20.ERC20('0xe94327d07fc17907b4db788e5adf2ed424addff6'), // Augur
    new erc20.ERC20('0xa74476443119A942dE498590Fe1f2454d7D4aC0d'), // Golem
    new erc20.ERC20('0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a'), // Populous
    new erc20.ERC20('0x0d8775f648430679a709e98d2b0cb6250d2887ef'), // Basic Attention Token
    new erc20.ERC20('0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c'), // Bancor
];

addrs = process.argv
    .filter(x => x.startsWith('0x'));

addrs.forEach(addr => {
    info_promise = token_list
        .map(t =>
            Promise.all([
                t.name(),
                t.symbol(),
                t.balanceOf(addr)
                    .catch(err => {
                        console.error(t, addr, err)
                        return 0;
                    })
            ])
        );
    Promise.all(info_promise)
        .then(l => {
            console.log(`Token portfolio for ${addr}`);
            l.forEach(([name, symbol, balance]) =>
                console.log(`\t${name} (${symbol}): ${balance}`))

        })
})