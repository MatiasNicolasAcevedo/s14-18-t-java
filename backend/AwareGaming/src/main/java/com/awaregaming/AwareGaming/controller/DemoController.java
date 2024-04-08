package com.awaregaming.AwareGaming.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demo")
@RequiredArgsConstructor
public class DemoController {

    @PostMapping("/postDemo")
    public String welcome(){
        return "Welcome to the protected endpoint";
    }

}
