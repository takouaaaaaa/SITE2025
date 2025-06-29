package com.iset.site.controller;

import com.iset.site.entity.Speaker;
import com.iset.site.service.SpeakerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/speakers")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class SpeakerController {

    private final SpeakerService speakerService;

    @Autowired
    public SpeakerController(SpeakerService speakerService) {
        this.speakerService = speakerService;
    }

    // CREATE
    @PostMapping("/create")
    public ResponseEntity<Speaker> createSpeaker(@RequestBody Speaker speaker) {
        Speaker created = speakerService.addSpeaker(speaker);
        return ResponseEntity.ok(created);
    }

    // READ (All)
    @GetMapping("/getAll")
    public List<Speaker> getAllSpeakers() {
        return speakerService.getAllSpeakers();
    }

    // UPDATE
    @PutMapping("/update/{id}")
    public ResponseEntity<Speaker> updateSpeaker(@PathVariable Long id, @RequestBody Speaker speakerDetails) {
        Speaker updated = speakerService.updateSpeaker(id, speakerDetails);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSpeaker(@PathVariable Long id) {
        speakerService.deleteSpeaker(id);
        return ResponseEntity.noContent().build();
    }
}