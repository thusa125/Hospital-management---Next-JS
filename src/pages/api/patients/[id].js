import { dbConnect } from '@/lib/db';
import Patient from '@/models/Patient';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET': {
      const patient = await Patient.findById(id);
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      return res.status(200).json(patient);
    }
    case 'PUT': {
      const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
      return res.status(200).json(patient);
    }
    case 'DELETE': {
      const result = await Patient.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ error: 'Patient not found' });
      return res.status(204).end();
    }
    default:
      return res.status(405).end();
  }
}