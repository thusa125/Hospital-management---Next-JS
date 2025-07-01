import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { comparePassword } from '@/lib/hash';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(405).end();
}