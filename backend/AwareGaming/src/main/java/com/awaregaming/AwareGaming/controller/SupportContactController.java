package com.awaregaming.AwareGaming.controller;

import com.awaregaming.AwareGaming.dto.SupportContactRequestDto;
import com.awaregaming.AwareGaming.service.ISupportContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/api/support")
public class SupportContactController {

    @Autowired
    ISupportContactService supportContactService;

    @PostMapping
    public ResponseEntity<String> sendMessageToSupport(@ModelAttribute SupportContactRequestDto supportContactResponseDto){
        return supportContactService.sendMessageToSupport(supportContactResponseDto);
    }
}
