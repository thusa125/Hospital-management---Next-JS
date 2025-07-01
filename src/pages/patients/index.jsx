// pages/patients/index.jsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(setPatients);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <Link href="/patients/add" className="bg-blue-600 text-white px-4 py-2 rounded">Add New Patient</Link>
      <ul className="mt-4 space-y-2">
        {patients.map(patient => (
          <li key={patient._id} className="p-2 border rounded flex justify-between">
            <span>{patient.name} ({patient.age} yrs)</span>
            <Link href={`/patients/${patient._id}`} className="text-blue-600 underline">View/Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}