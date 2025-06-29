package com.iset.site.controller;

import com.iset.site.entity.Registration;
import com.iset.site.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin/registrations")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AdminRegistrationController {

    private final RegistrationService registrationService;
    private static final String UPLOAD_DIR = "uploads/payment-proofs/";

    @Autowired
    public AdminRegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @GetMapping
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        List<Registration> registrations = registrationService.getAllRegistrations();
        return ResponseEntity.ok(registrations);
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
        // Delete associated payment proof file if exists
        Registration registration = registrationService.getRegistrationById(id);
        if (registration != null && registration.getPaymentProofPath() != null) {
            try {
                Path filePath = Paths.get(registration.getPaymentProofPath());
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                // Log the error but don't fail the deletion
                e.printStackTrace();
            }
        }
        
        registrationService.deleteRegistration(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getRegistrationStats() {
        List<Registration> registrations = registrationService.getAllRegistrations();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRegistrations", registrations.size());
        
        // Count by participant category
        Map<String, Long> categoryCount = new HashMap<>();
        Map<String, Long> countryCount = new HashMap<>();
        double totalRevenue = 0;
        
        for (Registration reg : registrations) {
            // Category count
            String category = reg.getParticipantCategory();
            categoryCount.put(category, categoryCount.getOrDefault(category, 0L) + 1);
            
            // Country count
            String country = reg.isFromTunisia() ? "Tunisia" : "International";
            countryCount.put(country, countryCount.getOrDefault(country, 0L) + 1);
            
            // Revenue
            totalRevenue += reg.getPaymentAmount();
        }
        
        stats.put("categoryBreakdown", categoryCount);
        stats.put("countryBreakdown", countryCount);
        stats.put("totalRevenue", totalRevenue);
        stats.put("withAccommodation", 
            registrations.stream().mapToInt(r -> r.isWithAccommodation() ? 1 : 0).sum());
        stats.put("withArticle", 
            registrations.stream().mapToInt(r -> r.isWithArticle() ? 1 : 0).sum());
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/payment-proof/{id}")
    public ResponseEntity<Resource> getPaymentProof(@PathVariable Long id) {
        Registration registration = registrationService.getRegistrationById(id);
        
        if (registration == null || registration.getPaymentProofPath() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path filePath = Paths.get(registration.getPaymentProofPath());
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                        "attachment; filename=\"" + filePath.getFileName().toString() + "\"")
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Registration> updateRegistrationStatus(@PathVariable Long id,
                                                                @RequestBody Map<String, String> statusUpdate) {
        // This endpoint can be used to add status field to Registration entity later
        // For now, we'll just return the registration
        Registration registration = registrationService.getRegistrationById(id);
        return registration != null ? ResponseEntity.ok(registration) : ResponseEntity.notFound().build();
    }
}