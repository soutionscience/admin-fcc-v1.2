pragma solidity ^0.5.0;

contract Competitions{
    address public manager;
    address[] public players;
    uint public maxPlayers;
    uint public prizeMoney;
    string  public name;
    address[] public winners;
    mapping(address=> bool) competitor;
    bool public complete;
     modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    constructor (uint maximumPlayers,
    string memory compeName, uint prize, address creator) public payable {
        manager = creator;
        maxPlayers = maximumPlayers;
        prizeMoney = prize;
        name = compeName;
        complete = false;
    }
    function joinCompetition()public{
        require(!competitor[msg.sender]);
        require(!complete);
        competitor[msg.sender] = true;
        players.push(msg.sender);
    }
    function awardWinner(address payable winner) public restricted{
        require (competitor[winner]);
        
        //winner.transfer(address(this).balance);
        complete = true;
        
    }
    
}