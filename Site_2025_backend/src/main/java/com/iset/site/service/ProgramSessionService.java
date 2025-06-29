package com.iset.site.service;

import com.iset.site.entity.ProgramSession;
import com.iset.site.repository.ProgramSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramSessionService {

    private final ProgramSessionRepository programSessionRepository;

    @Autowired
    public ProgramSessionService(ProgramSessionRepository programSessionRepository) {
        this.programSessionRepository = programSessionRepository;
    }

    public ProgramSession createSession(ProgramSession session) {
        return programSessionRepository.save(session);
    }

    public List<ProgramSession> getAllSessions() {
        return programSessionRepository.findAll();
    }


    public ProgramSession updateSession(Long id, ProgramSession sessionDetails) {
        ProgramSession session = programSessionRepository.findById(id).orElse(null);
        if (session != null) {
            session.setDate(sessionDetails.getDate());
            session.setStartTime(sessionDetails.getStartTime());
            session.setEndTime(sessionDetails.getEndTime());
            session.setTitle(sessionDetails.getTitle());
            session.setDescription(sessionDetails.getDescription());
            return programSessionRepository.save(session);
        }
        return null;
    }

    public void deleteSession(Long id) {
        programSessionRepository.deleteById(id);
    }
}
