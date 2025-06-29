package com.iset.site.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iset.site.entity.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
}