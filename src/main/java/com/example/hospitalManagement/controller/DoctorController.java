package com.example.hospitalManagement.controller;

import com.example.hospitalManagement.dto.DoctorRequestDTO;
import com.example.hospitalManagement.dto.DoctorResponseDTO;
import com.example.hospitalManagement.entity.Doctor;
import com.example.hospitalManagement.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public DoctorResponseDTO saveDoctor(@Valid @RequestBody DoctorRequestDTO doctorRequestDTO) {
        return doctorService.saveDoctor(doctorRequestDTO);
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id,
                               @RequestBody Doctor doctor) {
        return doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public String deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return "Doctor deleted successfully.";
    }
}
