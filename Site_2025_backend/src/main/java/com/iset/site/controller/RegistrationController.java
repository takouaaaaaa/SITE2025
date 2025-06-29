package com.iset.site.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iset.site.entity.Registration;
import com.iset.site.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) 
public class RegistrationController {

    private final RegistrationService registrationService;
    private final ObjectMapper objectMapper;
    private static final String UPLOAD_DIR = "uploads/payment-proofs/";

    @Autowired
    public RegistrationController(RegistrationService registrationService, ObjectMapper objectMapper) {
        this.registrationService = registrationService;
        this.objectMapper = objectMapper;
    }

    @PostMapping
    public ResponseEntity<Registration> createRegistration(
            @RequestPart("registration") String registrationJson,
            @RequestPart(value = "paymentProof", required = false) MultipartFile file) {
        try {
            Registration registration = objectMapper.readValue(registrationJson, Registration.class);

            if (file != null && !file.isEmpty()) {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
                String originalFileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
                String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName.replaceAll("\\s+", "_");
                Path filePath = Paths.get(UPLOAD_DIR + uniqueFileName);
                Files.write(filePath, file.getBytes());
                registration.setPaymentProofPath(filePath.toString());
            }

            Registration savedRegistration = registrationService.saveRegistration(registration);
            return ResponseEntity.ok(savedRegistration);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable Long id) {
        Registration registration = registrationService.getRegistrationById(id);
        return registration != null ? ResponseEntity.ok(registration) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Registration> updateRegistration(@PathVariable Long id,
                                                           @RequestBody Registration registrationDetails) {
        Registration updatedRegistration = registrationService.updateRegistration(id, registrationDetails);
        return updatedRegistration != null ? ResponseEntity.ok(updatedRegistration) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
        return ResponseEntity.noContent().build();
    }
}