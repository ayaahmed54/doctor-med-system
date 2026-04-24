
interface prescriptions {
    status: string;
    results: number;
    data: {
        prescriptions: Prescription[];
    };
}

interface Prescription {
    _id: string;
    doctor: Doctor;
    patient: Patient;
    appointment: Appointment;
    diagnosis: string;
    medications: Medication[];
    status: 'active' | 'completed' | 'cancelled';
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Doctor {
    _id: string;
    displayName: string;
    specialty: string;
}

interface Patient {
    _id: string;
    displayName: string;
    age: number | null;
    id: string;
}

interface Appointment {
    _id: string;
    startTime: string;
}

interface Medication {
    _id: string;
    name: string;
    strength: string;
    dosage: string;
    frequency: string;
    duration: string;
    status: string;
}

interface Prescription {
  _id: string;
  doctor: Doctor;
  patient: Patient;
  appointment: Appointment;
  diagnosis: string;
  medications: Medication[];
  status: 'active' | 'completed' | 'cancelled';
  notes: string;
}