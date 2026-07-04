package com.example.hospitalManagement.service.impl;
import com.example.hospitalManagement.exception.PatientNotFoundException;
import com.example.hospitalManagement.entity.Patient;
import com.example.hospitalManagement.repository.patientRepository;
import com.example.hospitalManagement.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private patientRepository patientRepository;

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    //@Override
    //public Patient getPatientById(Long id) {
      //  return patientRepository.findById(id).orElse(null);
    //}
    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient not found with id: " + id));
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {

        Patient existingPatient = patientRepository.findById(id).orElse(null);

        if (existingPatient != null) {
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

        return null;
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}