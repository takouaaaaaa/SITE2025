package com.iset.site.controller;

import com.iset.site.entity.ProgramSession;
import com.iset.site.service.ProgramSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
// THIS IS THE CRITICAL LINE THAT FIXES THE PROBLEM
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class ProgramSessionController {

    private final ProgramSessionService sessionService;

    @Autowired
    public ProgramSessionController(ProgramSessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProgramSession> createSession(@RequestBody ProgramSession session) {
        return ResponseEntity.ok(sessionService.createSession(session));
    }

    @GetMapping("/getAll")
    public List<ProgramSession> getAllSessions() {
        return sessionService.getAllSessions();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProgramSession> updateSession(@PathVariable Long id, @RequestBody ProgramSession sessionDetails) {
        ProgramSession updated = sessionService.updateSession(id, sessionDetails);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Long id) {
        sessionService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }
}