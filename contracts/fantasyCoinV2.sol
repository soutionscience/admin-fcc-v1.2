pragma solidity ^0.5.0;
import './fantasyCoinV1.sol';

contract fantasyCoinV2 is fantasyCoinV1{

//allowances
//index-1 =owner account index-2 = spender account
mapping(address =>mapping(address =>uint256)) allowances;

constructor(uint256 initSupply) fantasyCoinV1(initSupply) public{
    //we have invoked the contructor for v1, so no need
}
//how amany tokens can spender spend from owners account
function allowance(address _owner, address _spender) public view returns(uint remaining){
    return allowances[_owner][_spender];
}
 event Approval(address _indexed_owner, address _indexed_spender, uint256 _value);

function approve(address _spender, uint256 _value ) public returns(bool success){
    if (_value <=0) return false;

    allowances[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
}
event Transfer(address _from, address _to, uint256 _value);
function transferFrom(address _from, address _to, uint256 _value)public returns (bool success){
if (_value <= 0) return false;
//check if sender is allowed to spend value from _from account
if(allowances[_from][msg.sender]<_value) return false;

if(balances[_from] < _value) return false;

balances[_from] -= _value;
balances[_to] += _value;

allowances[_from][msg.sender] -= _value;

emit Transfer(_from, _to, _value);

return true;
}



}