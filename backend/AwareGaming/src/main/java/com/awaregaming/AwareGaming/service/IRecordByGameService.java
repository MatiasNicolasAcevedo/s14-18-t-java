package com.awaregaming.AwareGaming.service;

import com.awaregaming.AwareGaming.dto.RecordByGameResponseDTO;

import java.util.List;

public interface IRecordByGameService {

        public List<RecordByGameResponseDTO> getAllUserRecords(String userEmail);

}
