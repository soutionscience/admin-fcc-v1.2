pragma solidity ^0.5.0;

import "./leagues.sol";
import "./Competition.sol";

contract LeagueFactory {
   League[] public  deployedLeagues;
//   Competitions [] public deployedCompetitions;


  function deployLeague() public{
        League newLeague = new League(msg.sender);
        deployedLeagues.push(newLeague);
       }
    function GetAllLeagues() public view returns (League[] memory){
        return deployedLeagues;
    }
    function deleteAllLeagues() public {
         delete deployedLeagues;
         assert(deployedLeagues.length == 0);
    }
       
  constructor() public {
  }
}