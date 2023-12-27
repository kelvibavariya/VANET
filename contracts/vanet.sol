// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract vanet {
    struct Register {
        uint256 timestamp;
        string vehicle; //id
        string x;
        string y;
        string speed;
        string acc;
        string heading;
        //address from;
        bool isRegistered;
    }
    struct Message{
        string sender;
        string recipient;
        string _message;
        string latitude;
        string longitude;
        uint256 timestamp;
    }
    mapping(string => Register) public registeredVehicles;
    mapping(string => Message[]) public sentMessages;
    mapping(string => Message[]) public receivedMessages;
    Register[] reg;
    Message[] memos;
    address payable owner;

    constructor() payable{
        owner = payable(msg.sender);
    }

    function registerVehicle(
        string memory vehicle, 
        string memory x,
        string memory y, 
        string memory speed,
        string memory acc,
        string memory heading
        ) external payable {
        require(msg.value > 0, "No ether sent");
        require(bytes(vehicle).length > 0, "Empty vehicle ID");
        require(!registeredVehicles[vehicle].isRegistered, "Already registered");
        owner.transfer(msg.value);
        reg.push(Register(block.timestamp,vehicle,x,y,speed,acc,heading,true));
        registeredVehicles[vehicle] = Register(
            block.timestamp,
            vehicle,
            x,
            y,
            speed,
            acc,
            heading,
            true
            );
    }

    function getVehicles() external view returns (Register[] memory) {
        return reg;
    }

    function sendMessage(
        string memory sender,
        string memory recipient, 
        string memory _message, 
        string memory latitude, 
        string memory longitude
        ) external payable {
        require(msg.value > 0, "No ether sent");
        require(registeredVehicles[sender].isRegistered, "Sender not registered");
        require(registeredVehicles[recipient].isRegistered, "Recipient not registered");
        require(keccak256(abi.encodePacked(sender)) != keccak256(abi.encodePacked(recipient)), "Recipient & Sender must differ");
        //require(sender != recipient, "Sender and Recipient must be different.");
        Message memory message = Message(
            sender,
            recipient, 
            _message, 
            latitude, 
            longitude, 
            block.timestamp
            );
        memos.push(message);
        sentMessages[sender].push(message);
        receivedMessages[recipient].push(message);
    }

    function getSentMessages(string memory user) public view returns (Message[] memory) {
        require(registeredVehicles[user].isRegistered, "Vehicle not registered");
        return sentMessages[user];
    }

    function getReceivedMessages(string memory user) public view returns (Message[] memory) {
        require(registeredVehicles[user].isRegistered, "Vehicle not registered");
        return receivedMessages[user];
    }

    function getMemos() public view returns (Message[] memory) {
        return memos;
    }
}