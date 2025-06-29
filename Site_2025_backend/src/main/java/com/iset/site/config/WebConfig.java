// File: com.iset.site.config/WebConfig.java (add this if it doesn't exist)
package com.iset.site.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This makes the 'uploads' directory accessible via URL
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}