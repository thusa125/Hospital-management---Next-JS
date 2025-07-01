import { dbConnect } from '@/lib/db';
import Patient from '@/models/Patient';

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === 'GET') {
      const patients = await Patient.find();
      return res.status(200).json(patients);
    } else if (req.method === 'POST') {
      const patient = new Patient(req.body);
      await patient.save();
      return res.status(201).json(patient);
    } else {
      return res.status(405).end(); // Method Not Allowed
    }
  } catch (error) {
    console.error('API Error (index.js):', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
