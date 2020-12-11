package com.scaiconsulting.scaichat.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Controller
public class TestController {
    @GetMapping("/")
    public String confirmFunctionalityOfTheApp () {
        return "The Application is running correctly, time on server is : " + LocalDateTime.now() ;
    }

}
