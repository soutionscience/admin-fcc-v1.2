pragma solidity ^0.5.0;

import './fantasyCoinV2.sol';

contract fantasyCoinV3 is fantasyCoinV2{


    constructor(uint256 initSupply) fantasyCoinV2 (initSupply) public{
     //we have invoked the contructor for v1, so no need
    }
    function increaseSupply(uint additional) public restricted returns (bool success){
        if(additional <= 0) return false;
    totalSupply += additional;
    balances[msg.sender] += additional;
     return true;

    }
     function decreaseSupply(uint decrease) public restricted returns  (bool success) {
    if(decrease <= 0) return false;
    totalSupply -= decrease;
    balances[msg.sender] -= decrease;
    return true;
  }

}