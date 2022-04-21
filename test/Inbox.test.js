const assert = require ('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())// instance of Web3
const {interface, bytecode } = require('../compile')

const INITIAL_STRING = 'Hello'

let accounts
let inbox


beforeEach( async ()=>{
	// get a list of accounts
	accounts = await web3.eth.getAccounts()

	inbox = await new web3.eth.Contract(JSON.parse(interface))
	.deploy({data: bytecode, arguments: [INITIAL_STRING]})
	.send({from: accounts[0], gas: '1000000'}) // 1_000_000

})


describe('Inbox', ()=> {
	it('deploys a contract', () => {
		// check if there is an address :
		assert.ok(inbox.options.address)
	})

	it('has a default message', async () => {
		const message = await inbox.methods.message().call()
		assert.equal(message, INITIAL_STRING)
	})

	it('can change the message', async ()=>{
		const newMessage = 'turlututu'
		// // if we want to get the transaction :
		// const tx = await inbox.methods.setMessage(newMessage).send({from: accounts[0]})

		await inbox.methods.setMessage(newMessage).send({from: accounts[0]})
		const message = await inbox.methods.message().call()
		assert.equal(message, newMessage)
	})
})
