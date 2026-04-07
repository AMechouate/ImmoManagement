package com.example.realestate.controller;

import com.example.realestate.repository.PropertyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PropertyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PropertyRepository propertyRepository;

    @BeforeEach
    void setUp() {
        propertyRepository.deleteAll();
    }

    @Test
    void createProperty() throws Exception {
        mockMvc.perform(post("/api/properties")
                        .with(httpBasic("admin", "admin"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validPropertyJson("House A", "Street 1", "Berlin", "300000.00", 3.5)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("House A"));
    }

    @Test
    void getAllProperties() throws Exception {
        mockMvc.perform(post("/api/properties")
                .with(httpBasic("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(validPropertyJson("Flat B", "Street 2", "Munich", "500000.00", 2.0)));

        mockMvc.perform(get("/api/properties").with(httpBasic("admin", "admin")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Flat B"));
    }

    @Test
    void updateProperty() throws Exception {
        String createdResponse = mockMvc.perform(post("/api/properties")
                        .with(httpBasic("admin", "admin"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validPropertyJson("Old Title", "Old Address", "Hamburg", "250000.00", 2.5)))
                .andReturn().getResponse().getContentAsString();

        String id = createdResponse.replaceAll(".*\"id\":(\\d+).*", "$1");

        mockMvc.perform(put("/api/properties/" + id)
                        .with(httpBasic("admin", "admin"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validPropertyJson("New Title", "New Address", "Hamburg", "270000.00", 2.8)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Title"))
                .andExpect(jsonPath("$.address").value("New Address"));
    }

    @Test
    void deleteProperty() throws Exception {
        String createdResponse = mockMvc.perform(post("/api/properties")
                        .with(httpBasic("admin", "admin"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validPropertyJson("Delete Me", "Address", "Cologne", "100000.00", 1.5)))
                .andReturn().getResponse().getContentAsString();

        String id = createdResponse.replaceAll(".*\"id\":(\\d+).*", "$1");

        mockMvc.perform(delete("/api/properties/" + id).with(httpBasic("admin", "admin")))
                .andExpect(status().isNoContent());
    }

    @Test
    void filterProperties() throws Exception {
        mockMvc.perform(post("/api/properties")
                .with(httpBasic("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(validPropertyJson("Berlin Home", "Street 1", "Berlin", "300000.00", 3.0)));
        mockMvc.perform(post("/api/properties")
                .with(httpBasic("admin", "admin"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(validPropertyJson("Munich Home", "Street 2", "Munich", "700000.00", 4.0)));

        mockMvc.perform(get("/api/properties/filter")
                        .with(httpBasic("admin", "admin"))
                        .param("city", "Berlin")
                        .param("minPrice", "200000")
                        .param("maxPrice", "400000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].city").value("Berlin"))
                .andExpect(jsonPath("$[0].title").value("Berlin Home"));
    }

    private String validPropertyJson(String title, String address, String city, String price, double commission) {
        return """
                {
                  "title": "%s",
                  "address": "%s",
                  "city": "%s",
                  "price": %s,
                  "commissionPercent": %s,
                  "photos": ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"]
                }
                """.formatted(title, address, city, price, commission);
    }
}
