package com.iset.site.service;

import com.iset.site.entity.Speaker;
import com.iset.site.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpeakerService {

    private final SpeakerRepository speakerRepository;

    @Autowired
    public SpeakerService(SpeakerRepository speakerRepository) {
        this.speakerRepository = speakerRepository;
    }

    // CREATE
    public Speaker addSpeaker(Speaker speaker) {
        return speakerRepository.save(speaker);
    }

    // READ (all)
    public List<Speaker> getAllSpeakers() {
        return speakerRepository.findAll();
    }

    // UPDATE
    public Speaker updateSpeaker(Long id, Speaker speakerDetails) {
        Optional<Speaker> optionalSpeaker = speakerRepository.findById(id);
        if (optionalSpeaker.isPresent()) {
            Speaker speaker = optionalSpeaker.get();
            speaker.setName(speakerDetails.getName());
            speaker.setTitle(speakerDetails.getTitle());
            speaker.setExpertise(speakerDetails.getExpertise());
            return speakerRepository.save(speaker);
        } else {
            return null;
        }
    }

    // DELETE
    public void deleteSpeaker(Long id) {
        speakerRepository.deleteById(id);
    }
}
