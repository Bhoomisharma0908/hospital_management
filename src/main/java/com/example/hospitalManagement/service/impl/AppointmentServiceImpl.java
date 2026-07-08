package com.example.hospitalManagement.service.impl;

import com.example.hospitalManagement.dto.AppointmentRequestDTO;
import com.example.hospitalManagement.dto.AppointmentResponseDTO;
import com.example.hospitalManagement.entity.Appointment;
import com.example.hospitalManagement.entity.Doctor;
import com.example.hospitalManagement.entity.Patient;
import com.example.hospitalManagement.exception.DoctorNotFoundException;
import com.example.hospitalManagement.exception.PatientNotFoundException;
import com.example.hospitalManagement.repository.AppointmentRepository;
import com.example.hospitalManagement.repository.DoctorRepository;
import com.example.hospitalManagement.repository.patientRepository;
import com.example.hospitalManagement.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private patientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public AppointmentResponseDTO saveAppointment(AppointmentRequestDTO dto) {

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() ->
                        new PatientNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() ->
                        new DoctorNotFoundException("Doctor not found"));

        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setStatus(dto.getStatus());

        appointment.setPatient(patient);

        appointment.setDoctor(doctor);

        Appointment savedAppointment = appointmentRepository.save(appointment);

        AppointmentResponseDTO response = new AppointmentResponseDTO();

        response.setId(savedAppointment.getId());
        response.setPatientName(patient.getName());
        response.setDoctorName(doctor.getName());
        response.setSpecialization(doctor.getSpecialization());
        response.setAppointmentDate(savedAppointment.getAppointmentDate());
        response.setStatus(savedAppointment.getStatus());

        return response;
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
        return null;
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}