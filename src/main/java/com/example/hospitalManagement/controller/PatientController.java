package com.example.hospitalManagement.controller;

import com.example.hospitalManagement.entity.Patient;
import com.example.hospitalManagement.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping
    public Patient savePatient(@Valid @RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }
    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }
    @GetMapping("/{id}")
    public Patient getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }
    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id,
                                 @RequestBody Patient patient) {
        return patientService.updatePatient(id, patient);
    }
    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return "Patient deleted successfully.";
    }

}