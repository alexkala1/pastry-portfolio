import { defineEventHandler, createError } from 'h3';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { promises as fs } from 'fs';
import path from 'path';

const secret = 'your_jwt_secret';
const usersFile = path.join(process.cwd(), 'data/users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export default defineEventHandler(async (event) => {
  const { req } = event;

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    const body = await readBody(event);
    const { email, password } = body;

    const users = await readUsers();
    const user = users.find((u) => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError({ statusCode: 401, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
    return { token };
  }
});
