package com.example.hospitalManagement.service;

import com.example.hospitalManagement.dto.DoctorRequestDTO;
import com.example.hospitalManagement.dto.DoctorResponseDTO;
import com.example.hospitalManagement.entity.Doctor;

import java.util.List;

public interface DoctorService {

    DoctorResponseDTO saveDoctor(DoctorRequestDTO doctorRequestDTO);

    List<Doctor> getAllDoctors();

    Doctor getDoctorById(Long id);

    Doctor updateDoctor(Long id, Doctor doctor);

    void deleteDoctor(Long id);
}
