package com.example.hospitalManagement.service;

import com.example.hospitalManagement.dto.AppointmentRequestDTO;
import com.example.hospitalManagement.dto.AppointmentResponseDTO;
import com.example.hospitalManagement.entity.Appointment;

import java.util.List;

public interface AppointmentService {

    AppointmentResponseDTO saveAppointment(AppointmentRequestDTO appointmentRequestDTO);

    List<Appointment> getAllAppointments();

    Appointment getAppointmentById(Long id);

    Appointment updateAppointment(Long id, Appointment appointment);

    void deleteAppointment(Long id);
}