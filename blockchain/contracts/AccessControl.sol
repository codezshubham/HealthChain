// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AccessControl {
    address public owner;

    mapping(address => bool) public doctors;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyDoctor() {
        require(doctors[msg.sender], "Not authorized doctor");
        _;
    }

    // Add doctor
    function addDoctor(address _doctor) external onlyOwner {
        doctors[_doctor] = true;
    }

    // Remove doctor
    function removeDoctor(address _doctor) external onlyOwner {
        doctors[_doctor] = false;
    }

    function isDoctor(address _addr) external view returns (bool) {
        return doctors[_addr];
    }
}