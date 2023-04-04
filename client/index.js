const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require("readline-sync");

const serverUrl = 'http://localhost:1225';

async function main(name) {
  // TODO: how do we prove to the server we're on the nice list? 

  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n=>n===name);
  const proof = merkleTree.getProof(index);


  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name
  });

  console.log({ gift });
}

//You can either choose a name from nicelist.json or enter your name in that.
const input = readline.question("Enter a name: ");
main(input);