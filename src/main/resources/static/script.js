/*=========================================================
        HOSPITAL MANAGEMENT SYSTEM
        script.js
        PART 1
=========================================================*/

//==============================
// BASE URL
//==============================

const BASE_URL = "http://localhost:8080";

//==============================
// PATIENT API
//==============================

const PATIENT_API = `${BASE_URL}/patients`;

//==============================
// DOCTOR API
//==============================

const DOCTOR_API = `${BASE_URL}/doctors`;

//==============================
// APPOINTMENT API
//==============================

const APPOINTMENT_API = `${BASE_URL}/appointments`;

//=====================================================
// DASHBOARD COUNTS
//=====================================================

const patientCount = document.getElementById("patientCount");
const doctorCount = document.getElementById("doctorCount");
const appointmentCount = document.getElementById("appointmentCount");

//=====================================================
// PATIENT FORM
//=====================================================

const patientForm = document.getElementById("patientForm");

const patientName = document.getElementById("patientName");
const patientAge = document.getElementById("patientAge");
const patientGender = document.getElementById("patientGender");
const patientEmail = document.getElementById("patientEmail");
const patientPhone = document.getElementById("patientPhone");
const patientAddress = document.getElementById("patientAddress");
const patientDisease = document.getElementById("patientDisease");
const admissionDate = document.getElementById("admissionDate");

//=====================================================
// DOCTOR FORM
//=====================================================

const doctorForm = document.getElementById("doctorForm");

const doctorName = document.getElementById("doctorName");
const doctorSpecialization = document.getElementById("doctorSpecialization");
const doctorEmail = document.getElementById("doctorEmail");
const doctorPhone = document.getElementById("doctorPhone");
const doctorExperience = document.getElementById("doctorExperience");

//=====================================================
// APPOINTMENT FORM
//=====================================================

const appointmentForm = document.getElementById("appointmentForm");

const appointmentPatient = document.getElementById("appointmentPatient");
const appointmentDoctor = document.getElementById("appointmentDoctor");
const appointmentDate = document.getElementById("appointmentDate");
const appointmentStatus = document.getElementById("appointmentStatus");

//=====================================================
// TABLES
//=====================================================

const patientTableBody =
    document.getElementById("patientTableBody");

const doctorTableBody =
    document.getElementById("doctorTableBody");

const appointmentTableBody =
    document.getElementById("appointmentTableBody");

//=====================================================
// SEARCH BOXES
//=====================================================

const patientSearch =
    document.getElementById("patientSearch");

const doctorSearch =
    document.getElementById("doctorSearch");

const appointmentSearch =
    document.getElementById("appointmentSearch");

//=====================================================
// TOAST
//=====================================================

const toast =
    document.getElementById("toast");

//=====================================================
// LOADER
//=====================================================

const loader =
    document.getElementById("loader");

//=====================================================
// SHOW LOADER
//=====================================================

function showLoader() {

    loader.style.display = "flex";

}

//=====================================================
// HIDE LOADER
//=====================================================

function hideLoader() {

    loader.style.display = "none";

}

//=====================================================
// TOAST MESSAGE
//=====================================================

function showToast(message, success = true) {

    toast.innerText = message;

    toast.style.background =
        success ? "#2e7d32" : "#d32f2f";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

//=====================================================
// PAGE LOAD
//=====================================================

window.onload = () => {

    loadPatients();

    loadDoctors();

    loadAppointments();

};
/*=========================================================
                PART 2
        LOAD PATIENTS
=========================================================*/

//=====================================================
// LOAD ALL PATIENTS
//=====================================================

async function loadPatients() {

    try {

        showLoader();

        const response = await fetch(PATIENT_API);

        const patients = await response.json();

        patientTableBody.innerHTML = "";

        patientCount.innerText = patients.length;

        appointmentPatient.innerHTML =
            `<option value="">Select Patient</option>`;

        patients.forEach(patient => {

            appointmentPatient.innerHTML +=
            `
            <option value="${patient.id}">
                ${patient.name}
            </option>
            `;

            patientTableBody.innerHTML +=
            `
            <tr>

                <td>${patient.id}</td>

                <td>${patient.name}</td>

                <td>${patient.age}</td>

                <td>${patient.gender}</td>

                <td>${patient.email}</td>

                <td>${patient.phone}</td>

                <td>${patient.disease}</td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="edit-btn"
                            onclick="editPatient(${patient.id})">

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deletePatient(${patient.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>
            `;

        });

    }

    catch(error){

        console.error(error);

        showToast("Unable to load patients",false);

    }

    finally{

        hideLoader();

    }

}

//=====================================================
// SAVE PATIENT
//=====================================================

patientForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const patient={

        name:patientName.value,

        age:Number(patientAge.value),

        gender:patientGender.value,

        email:patientEmail.value,

        phone:patientPhone.value,

        address:patientAddress.value,

        disease:patientDisease.value,

        admissionDate:admissionDate.value

    };

    try{

        showLoader();

        const response=await fetch(PATIENT_API,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(patient)

        });

        if(response.ok){

            showToast("Patient Added Successfully");

            patientForm.reset();

            loadPatients();

        }

        else{

            const error=await response.json();

            showToast(error.message || "Unable to save patient",false);

        }

    }

    catch(error){

        console.log(error);

        showToast("Server Error",false);

    }

    finally{

        hideLoader();

    }

});

//=====================================================
// DELETE PATIENT
//=====================================================

async function deletePatient(id){

    if(!confirm("Delete this patient?")){

        return;

    }

    try{

        showLoader();

        await fetch(`${PATIENT_API}/${id}`,{

            method:"DELETE"

        });

        showToast("Patient Deleted");

        loadPatients();

    }

    catch(error){

        console.log(error);

        showToast("Delete Failed",false);

    }

    finally{

        hideLoader();

    }

}

//=====================================================
// EDIT PATIENT
//=====================================================

async function editPatient(id){

    showToast("Edit feature coming next update");

}
/*=========================================================
                PART 3
                DOCTOR MODULE
=========================================================*/

//=====================================================
// LOAD ALL DOCTORS
//=====================================================

async function loadDoctors(){

    try{

        showLoader();

        const response = await fetch(DOCTOR_API);

        const doctors = await response.json();

        doctorTableBody.innerHTML = "";

        doctorCount.innerText = doctors.length;

        appointmentDoctor.innerHTML =
            `<option value="">Select Doctor</option>`;

        doctors.forEach(doctor=>{

            appointmentDoctor.innerHTML += `
                <option value="${doctor.id}">
                    ${doctor.name}
                </option>
            `;

            doctorTableBody.innerHTML += `

            <tr>

                <td>${doctor.id}</td>

                <td>${doctor.name}</td>

                <td>${doctor.specialization}</td>

                <td>${doctor.email}</td>

                <td>${doctor.phone}</td>

                <td>${doctor.experience} Years</td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="edit-btn"
                            onclick="editDoctor(${doctor.id})">

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteDoctor(${doctor.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        showToast("Unable to load doctors",false);

    }

    finally{

        hideLoader();

    }

}

//=====================================================
// SAVE DOCTOR
//=====================================================

doctorForm.addEventListener("submit",async function(e){

    e.preventDefault();

    const doctor={

        name:doctorName.value,

        specialization:doctorSpecialization.value,

        email:doctorEmail.value,

        phone:doctorPhone.value,

        experience:Number(doctorExperience.value)

    };

    try{

        showLoader();

        const response = await fetch(DOCTOR_API,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(doctor)

        });

        if(response.ok){

            showToast("Doctor Added Successfully");

            doctorForm.reset();

            loadDoctors();

        }

        else{

            const err = await response.json();

            showToast(err.message || "Unable to save doctor",false);

        }

    }

    catch(error){

        console.log(error);

        showToast("Server Error",false);

    }

    finally{

        hideLoader();

    }

});

//=====================================================
// DELETE DOCTOR
//=====================================================

async function deleteDoctor(id){

    if(!confirm("Delete this doctor?")){

        return;

    }

    try{

        showLoader();

        await fetch(`${DOCTOR_API}/${id}`,{

            method:"DELETE"

        });

        showToast("Doctor Deleted");

        loadDoctors();

    }

    catch(error){

        console.log(error);

        showToast("Delete Failed",false);

    }

    finally{

        hideLoader();

    }

}

//=====================================================
// EDIT DOCTOR
//=====================================================

async function editDoctor(id){

    showToast("Edit feature coming soon");

}

//=====================================================
// SEARCH DOCTOR
//=====================================================

doctorSearch.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const rows=doctorTableBody.querySelectorAll("tr");

    rows.forEach(row=>{

        row.style.display=

            row.innerText.toLowerCase().includes(value)

            ? ""

            : "none";

    });

});
/*=========================================================
                PART 4
            APPOINTMENT MODULE
=========================================================*/

//=====================================================
// LOAD APPOINTMENTS
//=====================================================

async function loadAppointments(){

    try{

        showLoader();

        const response = await fetch(APPOINTMENT_API);

        const appointments = await response.json();

        appointmentTableBody.innerHTML = "";

        appointmentCount.innerText = appointments.length;

        appointments.forEach(appointment=>{

            appointmentTableBody.innerHTML += `

            <tr>

                <td>${appointment.id}</td>

                <td>${appointment.patient?.name || appointment.patientId}</td>

                <td>${appointment.doctor?.name || appointment.doctorId}</td>

                <td>${appointment.doctor?.specialization || "-"}</td>

                <td>${appointment.appointmentDate}</td>

                <td>

                    <span class="status">

                        ${appointment.status}

                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button

                            class="delete-btn"

                            onclick="deleteAppointment(${appointment.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        showToast("Unable to load appointments",false);

    }

    finally{

        hideLoader();

    }

}

//=====================================================
// SAVE APPOINTMENT
//=====================================================

appointmentForm.addEventListener("submit",async function(e){

    e.preventDefault();

    const appointment={

        patientId:Number(appointmentPatient.value),

        doctorId:Number(appointmentDoctor.value),

        appointmentDate:appointmentDate.value,

        status:appointmentStatus.value

    };

    try{

        showLoader();

        const response=await fetch(APPOINTMENT_API,{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(appointment)

        });

        if(response.ok){

            showToast("Appointment Booked Successfully");

            appointmentForm.reset();

            loadAppointments();

        }

        else{

            const err=await response.json();

            showToast(err.message || "Unable to book appointment",false);

        }

    }

    catch(error){

        console.log(error);

        showToast("Server Error",false);

    }

    finally{

        hideLoader();

    }

});

//=====================================================
// DELETE APPOINTMENT
//=====================================================

async function deleteAppointment(id){

    if(!confirm("Delete this appointment?")){

        return;

    }

    try{

        showLoader();

        await fetch(`${APPOINTMENT_API}/${id}`,{

            method:"DELETE"

        });

        showToast("Appointment Deleted");

        loadAppointments();

    }

    catch(error){

        console.log(error);

        showToast("Delete Failed",false);

    }

    finally{

        hideLoader();

    }

}

//=====================================================
// SEARCH APPOINTMENT
//=====================================================

appointmentSearch.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const rows=appointmentTableBody.querySelectorAll("tr");

    rows.forEach(row=>{

        row.style.display=

            row.innerText.toLowerCase().includes(value)

            ? ""

            : "none";

    });

});

//=====================================================
// SEARCH PATIENT
//=====================================================

patientSearch.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const rows=patientTableBody.querySelectorAll("tr");

    rows.forEach(row=>{

        row.style.display=

            row.innerText.toLowerCase().includes(value)

            ? ""

            : "none";

    });

});
/*=========================================================
                    PART 5
              FINAL UTILITIES
=========================================================*/

//=====================================================
// REFRESH DASHBOARD
//=====================================================

async function refreshDashboard(){

    await loadPatients();

    await loadDoctors();

    await loadAppointments();

}

//=====================================================
// STATUS COLOR
//=====================================================

function getStatusClass(status){

    if(!status) return "status";

    status=status.toLowerCase();

    if(status==="scheduled"){

        return "status status-scheduled";

    }

    if(status==="completed"){

        return "status status-completed";

    }

    if(status==="cancelled"){

        return "status status-cancelled";

    }

    return "status";

}

//=====================================================
// SHOW LOADER FOR 500ms
//=====================================================

function loading(){

    showLoader();

    setTimeout(hideLoader,500);

}

//=====================================================
// CLEAR FORMS
//=====================================================

function clearPatientForm(){

    patientForm.reset();

}

function clearDoctorForm(){

    doctorForm.reset();

}

function clearAppointmentForm(){

    appointmentForm.reset();

}

//=====================================================
// AUTO REFRESH EVERY 30 SECONDS
//=====================================================

setInterval(()=>{

    loadPatients();

    loadDoctors();

    loadAppointments();

},30000);

//=====================================================
// CONNECTION TEST
//=====================================================

async function testConnection(){

    try{

        await fetch(PATIENT_API);

        console.log("Spring Boot Connected");

    }

    catch(error){

        console.error("Backend Offline");

    }

}

testConnection();

//=====================================================
// WINDOW LOAD
//=====================================================

window.addEventListener("load",()=>{

    loading();

    loadPatients();

    loadDoctors();

    loadAppointments();

});

//=====================================================
// ENTER KEY SEARCH
//=====================================================

document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        return;

    }

});

//=====================================================
// CONSOLE MESSAGE
//=====================================================

console.log("======================================");

console.log("Hospital Management System Loaded");

console.log("Frontend : HTML CSS JavaScript");

console.log("Backend  : Spring Boot");

console.log("Database : MySQL");

console.log("======================================");