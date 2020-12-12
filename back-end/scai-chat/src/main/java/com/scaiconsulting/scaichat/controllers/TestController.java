package com.scaiconsulting.scaichat.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/")
public class TestController {
    @GetMapping("")
    public String confirmFunctionalityOfTheApp () {
        return "The Application is running correctly, time on server is : " + LocalDateTime.now() ;
    }

}