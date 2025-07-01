import { dbConnect } from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/hash';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashed = await hashPassword(password);
    const user = new User({ username, password: hashed });
    await user.save();
    return res.status(201).json({ message: 'User registered' });
  }

  return res.status(405).end();
}