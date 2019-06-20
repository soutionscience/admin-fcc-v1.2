pragma solidity ^0.5.0;

contract fantasyCoinV1{
    string public constant name ="FANTASY COIN";
    string public constant symbol ="FFC";

    uint8 public constant decimals =1;

    uint public totalSupply;
    address private owner;
    mapping(address=> uint) balances;

     //restrictor
    modifier restricted(){
        require(msg.sender == owner);
        _;
    }
   

    constructor(uint initSupply)public{
        totalSupply = initSupply;
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
}
    event Transfer(address _from, address _to, uint256 _value);

    function transfer(address _to, uint256 _value) public returns(bool success){
      if(_value>0 && balances[msg.sender] < _value){
       return false;
      }
      balances[msg.sender] -= _value;
      balances[_to] += _value;
     
     emit Transfer(msg.sender, _to, _value);
     return true;

    }

    function balanceOf(address _someone) public view returns(uint256 balance){
        return balances[_someone];
    }

}