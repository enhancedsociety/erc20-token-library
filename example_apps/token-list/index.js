// Usage:
//   node index.js 0xe41d2489571d322189246dafa5ebde1f4699f498

const erc20 = require('erc20-js');

let token_list = [
    erc20.OmiseGo,
    erc20.Aragon,
    erc20.Gnosis,
    erc20.Status,
]

token_list = token_list.concat(
    process.argv
        .filter(x => x.startsWith('0x'))
        .map(addr => new erc20.ERC20(addr))
)

token_list.forEach(t =>
    Promise.all([t.name(), t.symbol(), t.totalSupply()])
        .then(([n, s, b]) =>
            console.log(`Token: ${n}\n\tSymbol: ${s}\n\tSupply: ${b}\n`))
        .catch(console.error)
)