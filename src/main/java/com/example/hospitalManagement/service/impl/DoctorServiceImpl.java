package com.example.hospitalManagement.service.impl;

import com.example.hospitalManagement.dto.DoctorRequestDTO;
import com.example.hospitalManagement.dto.DoctorResponseDTO;
import com.example.hospitalManagement.entity.Doctor;
import com.example.hospitalManagement.exception.DoctorNotFoundException;
import com.example.hospitalManagement.repository.DoctorRepository;
import com.example.hospitalManagement.service.DoctorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DoctorResponseDTO saveDoctor(DoctorRequestDTO doctorRequestDTO) {

        Doctor doctor = modelMapper.map(doctorRequestDTO, Doctor.class);

        Doctor savedDoctor = doctorRepository.save(doctor);

        return modelMapper.map(savedDoctor, DoctorResponseDTO.class);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {

        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new DoctorNotFoundException("Doctor not found with id : " + id));
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new DoctorNotFoundException("Doctor not found with id : " + id));

        existingDoctor.setName(doctor.getName());
        existingDoctor.setSpecialization(doctor.getSpecialization());
        existingDoctor.setEmail(doctor.getEmail());
        existingDoctor.setPhone(doctor.getPhone());
        existingDoctor.setExperience(doctor.getExperience());

        return doctorRepository.save(existingDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {

        doctorRepository.findById(id)
                .orElseThrow(() ->
                        new DoctorNotFoundException("Doctor not found with id : " + id));

        doctorRepository.deleteById(id);
    }
}
