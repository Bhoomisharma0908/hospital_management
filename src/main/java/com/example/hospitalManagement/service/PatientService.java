package com.example.hospitalManagement.service;

import com.example.hospitalManagement.entity.Patient;

import java.util.List;
import com.example.hospitalManagement.dto.PatientRequestDTO;
import com.example.hospitalManagement.dto.PatientResponseDTO;

public interface PatientService {

    PatientResponseDTO savePatient(PatientRequestDTO patientRequestDTO);
    List<Patient> getAllPatients();

    Patient getPatientById(Long id);

    Patient updatePatient(Long id, Patient patient);

    void deletePatient(Long id);
}