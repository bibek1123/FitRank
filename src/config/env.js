import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });