package com.scaiconsulting.scaichat.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class intialRestcontroller {

    @GetMapping("/")
    public String confirmFunctionalityOfTheApp () {
        return "The Application is running correctly, time on server is : " + LocalDateTime.now() ;
    }

    @GetMapping("/home")
    public String redirectToTheHome () {
        return "yeah you've been redirected to home successfully ";
    }

}
