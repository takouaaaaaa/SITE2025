package com.iset.site.repository;

import com.iset.site.entity.ProgramSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramSessionRepository extends JpaRepository<ProgramSession, Long> {
}
