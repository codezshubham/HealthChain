// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AccessControl.sol";

contract MedicalRecord is AccessControl {

    struct Record {
        string patientId;
        string ipfsHash;
        uint256 timestamp;
        address doctor;
    }

    // patientId => records
    mapping(string => Record[]) private records;

    // EVENTS (important for frontend + indexing)
    event RecordAdded(
        string patientId,
        string ipfsHash,
        address doctor,
        uint256 timestamp
    );

    // ADD RECORD (Doctor only)
    function addRecord(
        string memory _patientId,
        string memory _ipfsHash
    ) external {

        Record memory newRecord = Record({
            patientId: _patientId,
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            doctor: msg.sender
        });

        records[_patientId].push(newRecord);

        emit RecordAdded(
            _patientId,
            _ipfsHash,
            msg.sender,
            block.timestamp
        );
    }

    // GET RECORD COUNT
    function getRecordCount(string memory _patientId)
        external
        view
        returns (uint256)
    {
        return records[_patientId].length;
    }

    // GET RECORD BY INDEX
    function getRecord(
        string memory _patientId,
        uint256 index
    ) external view returns (
        string memory,
        string memory,
        uint256,
        address
    ) {
        require(index < records[_patientId].length, "Invalid index");

        Record memory r = records[_patientId][index];

        return (
            r.patientId,
            r.ipfsHash,
            r.timestamp,
            r.doctor
        );
    }

    // GET ALL RECORDS (⚠️ use carefully: gas heavy if large)
    function getAllRecords(string memory _patientId)
        external
        view
        returns (Record[] memory)
    {
        return records[_patientId];
    }
}