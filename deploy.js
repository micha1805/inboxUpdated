const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const {abi, evm} = require('./compile')
require('dotenv').config()


// I did put my 12 words inside an env variable :
const mnemonics = process.env.MNEMONICS
// same for my infura endpoint :
const infuraEndpoint = process.env.INFURA_ENDPOINT

const provider = new HDWalletProvider(mnemonics, infuraEndpoint)

const web3 = new Web3(provider)

// as we need to use async/await :
const deploy = async () => {
	let accounts
	try{
		accounts = await web3.eth.getAccounts()

	}catch(e){
		console.log(e)
	}

	console.log('Attempting to deploy from account: ', accounts[2])

	let contractObject
	try{

		contractObject = await new web3.eth.Contract(abi)
		.deploy({data: evm.bytecode.object, arguments: ['Hello!']})
		.send({gas : '1000000', from: accounts[2]})

	}catch(e){
		console.log(e)
	}

	console.log("Contract deployed to ", contractObject.options.address)
	// to prevent hanging deployment :
	provider.engine.stop()

}

deploy()
