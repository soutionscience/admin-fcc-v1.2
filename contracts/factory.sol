pragma solidity ^0.5.0;

import "./leagues.sol";

contract LeagueFactory {
   League []  public  deployedLeagues;


  function deployLeague() public{
        League newLeague = new League(msg.sender);
        deployedLeagues.push(newLeague);
        
    }
    function GetAllLeagues() public view returns (League [] memory){
        return deployedLeagues;
    }
    function deleteAllLeagues() public {
         delete deployedLeagues;
         assert(deployedLeagues.length == 0);
    }
       
  constructor() public {
  }
}