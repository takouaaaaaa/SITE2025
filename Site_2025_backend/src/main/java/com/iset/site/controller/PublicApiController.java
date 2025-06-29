package com.iset.site.controller;

import com.iset.site.entity.ProgramSession;
import com.iset.site.entity.Registration;
import com.iset.site.entity.SiteConfiguration;
import com.iset.site.entity.Speaker;
import com.iset.site.service.ProgramSessionService;
import com.iset.site.service.RegistrationService;
import com.iset.site.service.SiteConfigurationService;
import com.iset.site.service.SpeakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PublicApiController {

    private final SiteConfigurationService configService;
    private final SpeakerService speakerService;
    private final ProgramSessionService sessionService;
    private final RegistrationService registrationService;

    @Autowired
    public PublicApiController(
            SiteConfigurationService configService,
            SpeakerService speakerService,
            ProgramSessionService sessionService,
            RegistrationService registrationService) {
        this.configService = configService;
        this.speakerService = speakerService;
        this.sessionService = sessionService;
        this.registrationService = registrationService;
    }

    /**
     * Get all public site data in one call for the main frontend
     */
    @GetMapping("/site-data")
    public ResponseEntity<Map<String, Object>> getSiteData() {
        Map<String, Object> siteData = new HashMap<>();
        
        // Site configuration
        SiteConfiguration config = configService.getConfig();
        siteData.put("config", config);
        
        // Speakers
        List<Speaker> speakers = speakerService.getAllSpeakers();
        siteData.put("speakers", speakers);
        
        // Sessions/Schedule
        List<ProgramSession> sessions = sessionService.getAllSessions();
        siteData.put("sessions", sessions);
        
        // Registration status
        boolean registrationOpen = isRegistrationOpen(config);
        siteData.put("registrationOpen", registrationOpen);
        
        return ResponseEntity.ok(siteData);
    }

    /**
     * Get site configuration only
     */
    @GetMapping("/config")
    public ResponseEntity<SiteConfiguration> getConfig() {
        SiteConfiguration config = configService.getConfig();
        return config != null ? ResponseEntity.ok(config) : ResponseEntity.notFound().build();
    }

    /**
     * Get all speakers
     */
    @GetMapping("/speakers")
    public List<Speaker> getSpeakers() {
        return speakerService.getAllSpeakers();
    }

    /**
     * Get all sessions
     */
    @GetMapping("/sessions")
    public List<ProgramSession> getSessions() {
        return sessionService.getAllSessions();
    }

    /**
     * Create a new registration (public endpoint)
     */
    @PostMapping("/register")
    public ResponseEntity<Registration> createRegistration(@RequestBody Registration registration) {
        // Check if registration is open
        SiteConfiguration config = configService.getConfig();
        if (!isRegistrationOpen(config)) {
            return ResponseEntity.badRequest().build();
        }
        
        Registration savedRegistration = registrationService.saveRegistration(registration);
        return ResponseEntity.ok(savedRegistration);
    }

    /**
     * Check registration status
     */
    @GetMapping("/registration-status")
    public ResponseEntity<Map<String, Object>> getRegistrationStatus() {
        SiteConfiguration config = configService.getConfig();
        Map<String, Object> status = new HashMap<>();
        
        status.put("isOpen", isRegistrationOpen(config));
        status.put("startDate", config != null ? config.getRegistrationOpenDate() : null);
        status.put("endDate", config != null ? config.getRegistrationCloseDate() : null);
        
        return ResponseEntity.ok(status);
    }

    /**
     * Get registration statistics (public stats only)
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getPublicStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Count total registrations (without exposing personal data)
        List<Registration> registrations = registrationService.getAllRegistrations();
        stats.put("totalRegistrations", registrations.size());
        
        // Count speakers
        List<Speaker> speakers = speakerService.getAllSpeakers();
        stats.put("totalSpeakers", speakers.size());
        
        // Count sessions
        List<ProgramSession> sessions = sessionService.getAllSessions();
        stats.put("totalSessions", sessions.size());
        
        return ResponseEntity.ok(stats);
    }

    /**
     * Helper method to check if registration is currently open
     */
    private boolean isRegistrationOpen(SiteConfiguration config) {
        if (config == null || 
            config.getRegistrationOpenDate() == null || 
            config.getRegistrationCloseDate() == null) {
            return false;
        }
        
        LocalDate now = LocalDate.now();
        LocalDate startDate = config.getRegistrationOpenDate();
        LocalDate endDate = config.getRegistrationCloseDate();
        
        return !now.isBefore(startDate) && !now.isAfter(endDate);
    }
    
 // Add this to your PublicApiController.java for debugging
    @GetMapping("/debug-config")
    public ResponseEntity<Map<String, Object>> debugConfig() {
        Map<String, Object> debug = new HashMap<>();
        
        try {
            SiteConfiguration config = configService.getConfig();
            debug.put("configExists", config != null);
            debug.put("config", config);
            
            if (config == null) {
                debug.put("message", "No configuration found in database");
                debug.put("suggestion", "Create a default configuration first");
            }
            
        } catch (Exception e) {
            debug.put("error", e.getMessage());
            debug.put("stackTrace", e.getStackTrace());
        }
        
        return ResponseEntity.ok(debug);
    }

    // Also add this method to create a default config if none exists
    @PostMapping("/create-default-config")
    public ResponseEntity<SiteConfiguration> createDefaultConfig() {
        SiteConfiguration defaultConfig = new SiteConfiguration();
        defaultConfig.setWebsiteName("My Conference Site");
        defaultConfig.setRegistrationOpenDate(LocalDate.now());
        defaultConfig.setRegistrationCloseDate(LocalDate.now().plusDays(30));
        
        try {
            SiteConfiguration saved = configService.updateConfig(defaultConfig, null);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}