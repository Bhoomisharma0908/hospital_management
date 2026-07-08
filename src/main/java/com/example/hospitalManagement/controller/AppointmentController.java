package com.example.hospitalManagement.controller;

import com.example.hospitalManagement.dto.AppointmentRequestDTO;
import com.example.hospitalManagement.dto.AppointmentResponseDTO;
import com.example.hospitalManagement.entity.Appointment;
import com.example.hospitalManagement.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public AppointmentResponseDTO saveAppointment(
            @Valid @RequestBody AppointmentRequestDTO appointmentRequestDTO) {

        return appointmentService.saveAppointment(appointmentRequestDTO);
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return "Appointment deleted successfully.";
    }
}