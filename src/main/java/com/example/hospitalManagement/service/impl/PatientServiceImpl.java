package com.example.hospitalManagement.service.impl;

import com.example.hospitalManagement.dto.PatientRequestDTO;
import com.example.hospitalManagement.dto.PatientResponseDTO;
import com.example.hospitalManagement.entity.Patient;
import com.example.hospitalManagement.exception.PatientNotFoundException;
import com.example.hospitalManagement.repository.patientRepository;
import com.example.hospitalManagement.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private patientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PatientResponseDTO savePatient(PatientRequestDTO patientRequestDTO) {

        Patient patient = modelMapper.map(patientRequestDTO, Patient.class);

        // Save Entity to Database
        Patient savedPatient = patientRepository.save(patient);

        // Convert Entity to Response DTO
        return modelMapper.map(savedPatient, PatientResponseDTO.class);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new PatientNotFoundException("Patient not found with id: " + id));
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {

        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new PatientNotFoundException("Patient not found with id: " + id));

        existingPatient.setName(patient.getName());
        existingPatient.setAge(patient.getAge());
        existingPatient.setGender(patient.getGender());
        existingPatient.setEmail(patient.getEmail());
        existingPatient.setPhone(patient.getPhone());
        existingPatient.setAddress(patient.getAddress());
        existingPatient.setDisease(patient.getDisease());
        existingPatient.setAdmissionDate(patient.getAdmissionDate());

        return patientRepository.save(existingPatient);
    }

    @Override
    public void deletePatient(Long id) {

        if (!patientRepository.existsById(id)) {
            throw new PatientNotFoundException("Patient not found with id: " + id);
        }

        patientRepository.deleteById(id);
    }
}