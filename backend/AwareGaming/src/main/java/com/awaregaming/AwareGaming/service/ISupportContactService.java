package com.awaregaming.AwareGaming.service;


import com.awaregaming.AwareGaming.dto.SupportContactRequestDto;
import com.awaregaming.AwareGaming.dto.SupportContactResponseDto;
import org.springframework.http.ResponseEntity;

public interface ISupportContactService {

    ResponseEntity<String> sendMessageToSupport(SupportContactRequestDto supportContactRequestDto);

}
