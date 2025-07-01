import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddPatient() {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '', medicalHistory: '', allergies: '', prescriptions: '' });
  const router = useRouter();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        age: parseInt(form.age),
        medicalHistory: form.medicalHistory.split(',').map(s => s.trim()),
        allergies: form.allergies.split(',').map(s => s.trim()),
        prescriptions: form.prescriptions.split(';').map(p => {
          const [medication, dosage, frequency] = p.split('-');
          return { medication, dosage, frequency };
        })
      })
    });
    if (res.ok) router.push('/patients');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input name="name" placeholder="Name" onChange={handleChange} required className="border p-2 w-full" />
      <input name="age" placeholder="Age" type="number" onChange={handleChange} required className="border p-2 w-full" />
      <input name="gender" placeholder="Gender" onChange={handleChange} required className="border p-2 w-full" />
      <input name="contact" placeholder="Contact" onChange={handleChange} required className="border p-2 w-full" />
      <input name="medicalHistory" placeholder="Medical History (comma separated)" onChange={handleChange} className="border p-2 w-full" />
      <input name="allergies" placeholder="Allergies (comma separated)" onChange={handleChange} className="border p-2 w-full" />
      <input name="prescriptions" placeholder="Prescriptions (med-dosage-freq;...)" onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Add Patient</button>
    </form>
  );
}
