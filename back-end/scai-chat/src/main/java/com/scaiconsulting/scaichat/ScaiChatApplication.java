package com.scaiconsulting.scaichat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ScaiChatApplication {

    public static void main(String[] args) {
        System.out.println("  _    _                                   \n" +
                " | |  | |                                   \n" +
                " | |__| |   __ _   _ __ ___    ____   __ _  \n" +
                " |  __  |  / _` | | '_ ` _ \\  |_  /  / _`  |\n" +
                " | |  | | | (_| | | | | | | |  / /  | (_| | \n" +
                " |_|  |_|  \\__,_| |_| |_| |_| /___|  \\__,_ |");
        SpringApplication.run(ScaiChatApplication.class, args);
    }

}
