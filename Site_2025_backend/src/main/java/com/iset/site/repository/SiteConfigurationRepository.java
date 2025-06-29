package com.iset.site.repository;

import com.iset.site.entity.SiteConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteConfigurationRepository extends JpaRepository<SiteConfiguration, Long> {
}
