import { IncomingMessage } from 'http';
import formidable, { File } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';

const uploadsDir = path.join(process.cwd(), 'public/uploads');

interface Photo {
  id: number;
  url: string;
  tags: string[];
}

export default defineEventHandler(async (event) => {
  const req: IncomingMessage = event.req;

  if (req.method === 'POST') {
    const form = formidable({ multiples: false, uploadDir: uploadsDir });
    const data: { fields: { tags: string }; files: { file: File } } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const file = data.files.file;
    const tags = data.fields.tags.split(',').map(tag => tag.trim());

    const savedPhoto: Photo = {
      id: Date.now(),
      url: `/uploads/${file.newFilename}`,
      tags,
    };

    const dbPath = path.join(process.cwd(), 'data/photos.json');
    const existingData: Photo[] = JSON.parse(await fs.readFile(dbPath, 'utf-8') || '[]');
    existingData.push(savedPhoto);
    await fs.writeFile(dbPath, JSON.stringify(existingData, null, 2));

    return savedPhoto;
  }

  if (req.method === 'GET') {
    const dbPath = path.join(process.cwd(), 'data/photos.json');
    const data: Photo[] = JSON.parse(await fs.readFile(dbPath, 'utf-8') || '[]');
    return data;
  }
});
