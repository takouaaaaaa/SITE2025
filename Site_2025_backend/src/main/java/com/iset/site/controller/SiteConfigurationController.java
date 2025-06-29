package com.iset.site.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iset.site.entity.SiteConfiguration;
import com.iset.site.service.SiteConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/config")
// The only change is adding `allowCredentials = "true"` to fix the CORS error.
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class SiteConfigurationController {

    private final SiteConfigurationService configService;
    private final ObjectMapper objectMapper;

    @Autowired
    public SiteConfigurationController(SiteConfigurationService configService, ObjectMapper objectMapper) {
        this.configService = configService;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<SiteConfiguration> getConfig() {
        SiteConfiguration config = configService.getConfig();
        return config != null ? ResponseEntity.ok(config) : ResponseEntity.notFound().build();
    }

    @PutMapping
    public ResponseEntity<SiteConfiguration> updateConfig(
            @RequestPart("config") String configJson,
            @RequestPart(value = "logo", required = false) MultipartFile logoFile) {
        try {
            SiteConfiguration config = objectMapper.readValue(configJson, SiteConfiguration.class);
            SiteConfiguration updated = configService.updateConfig(config, logoFile);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}