const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// console.log(JSON.parse(solc.compile(JSON.stringify(input))));


// The output is structured differently than in old Solidity version, hence the change :
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;
