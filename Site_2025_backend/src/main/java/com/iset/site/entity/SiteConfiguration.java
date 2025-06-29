package com.iset.site.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class SiteConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String websiteName;

    private String logoPath;

    private LocalDate registrationOpenDate;
    private LocalDate registrationCloseDate;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWebsiteName() {
        return websiteName;
    }

    public void setWebsiteName(String websiteName) {
        this.websiteName = websiteName;
    }

    public String getLogoPath() {
        return logoPath;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath;
    }

    public LocalDate getRegistrationOpenDate() {
        return registrationOpenDate;
    }

    public void setRegistrationOpenDate(LocalDate registrationOpenDate) {
        this.registrationOpenDate = registrationOpenDate;
    }

    public LocalDate getRegistrationCloseDate() {
        return registrationCloseDate;
    }

    public void setRegistrationCloseDate(LocalDate registrationCloseDate) {
        this.registrationCloseDate = registrationCloseDate;
    }
    
}
