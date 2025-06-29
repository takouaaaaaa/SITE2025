package com.iset.site.service;

import com.iset.site.entity.SiteConfiguration;
import com.iset.site.repository.SiteConfigurationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class SiteConfigurationService {

    private final SiteConfigurationRepository configRepository;

    @Autowired
    public SiteConfigurationService(SiteConfigurationRepository configRepository) {
        this.configRepository = configRepository;
    }

    public SiteConfiguration getConfig() {
        List<SiteConfiguration> configs = configRepository.findAll();
        if (configs.isEmpty()) {
            // Return a default configuration instead of null
            SiteConfiguration defaultConfig = new SiteConfiguration();
            defaultConfig.setWebsiteName("Default Site Name");
            defaultConfig.setRegistrationOpenDate(LocalDate.now());
            defaultConfig.setRegistrationCloseDate(LocalDate.now().plusDays(30));
            return defaultConfig;
        }
        return configs.get(0);
    }

    public SiteConfiguration updateConfig(SiteConfiguration updatedConfig, MultipartFile logoFile) throws IOException {
        SiteConfiguration existing = getConfig();
        if (existing == null) {
            throw new IllegalStateException("No configuration found. It must be initialized first.");
        }

        existing.setWebsiteName(updatedConfig.getWebsiteName());
        existing.setRegistrationOpenDate(updatedConfig.getRegistrationOpenDate());
        existing.setRegistrationCloseDate(updatedConfig.getRegistrationCloseDate());

        if (logoFile != null && !logoFile.isEmpty()) {
            String logoFileName = UUID.randomUUID() + "_" + logoFile.getOriginalFilename().replaceAll("\\s+", "_");
            Path path = Paths.get("uploads/config-logos", logoFileName);
            Files.createDirectories(path.getParent());
            Files.write(path, logoFile.getBytes());
            existing.setLogoPath(path.toString());
        }

        return configRepository.save(existing);
    }
}
