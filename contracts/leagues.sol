pragma solidity ^0.5.0;

import "./Competition.sol";
contract League {

Competitions [] public deployedCompetitions;

address public manager;
    //restrictor
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
   
  
   constructor(address creator ) public{
        manager = creator;
        
    }
    //create Competition
   
    //deploy competitions
    function deployCompetition( uint maximumPlayers,
    string memory compeName)public payable{
        //Competitions compe = new Competitions(maximumPlayers,  compeName, msg.value, msg.sender);
       Competitions compe = (new Competitions).value(address(this).balance)(maximumPlayers,  compeName, msg.value, msg.sender);
        deployedCompetitions.push(compe);
        
    }
    function getCompetitions()public view returns(Competitions[] memory){
        return deployedCompetitions;
    }
 
    function getCompetitionCount() public view returns(uint){
        return  deployedCompetitions.length;
    }
    function getAllCompetitions() public view returns(Competitions [] memory){
        return  deployedCompetitions;
    }
        
    
}
