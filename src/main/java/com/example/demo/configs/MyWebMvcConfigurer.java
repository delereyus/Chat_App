package com.example.demo.configs;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import javax.sql.DataSource;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
class MyWebMvcConfigurer implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("file:src/main/resources/static/")
                .setCacheControl(CacheControl.noCache())
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath,
                                                   Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
                                : new ClassPathResource("/static/index.html");
                    }
                });
    }

    @Value("${spring.datasource.url}")
    private String dbUr;

    @Value("${spring.datasource.username}")
    private String dbUsr;

    @Value("${spring.datasource.password}")
    private String dbPwd;

    @Bean
    public BasicDataSource dataSource() throws URISyntaxException {

        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setUrl(dbUr);
        basicDataSource.setUsername(dbUsr);
        basicDataSource.setPassword(dbPwd);

        return basicDataSource;
    }
}

