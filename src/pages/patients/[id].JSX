import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditPatient() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/patients/${id}`)
        .then(res => res.json())
        .then(setForm);
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`/api/patients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push('/patients');
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/patients/${id}`, { method: 'DELETE' });
      router.push('/patients');
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full" />
      <input name="age" type="number" value={form.age} onChange={handleChange} className="border p-2 w-full" />
      <input name="gender" value={form.gender} onChange={handleChange} className="border p-2 w-full" />
      <input name="contact" value={form.contact} onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Update</button>
      <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded ml-2">Delete</button>
    </form>
  );
}
