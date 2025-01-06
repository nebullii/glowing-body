import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get post name from command line argument
const postName = process.argv[2];

if (!postName) {
    console.error('Please provide a post name');
    process.exit(1);
}

// Create slug from post name
const slug = postName.toLowerCase().replace(/\s+/g, '-');

// Get current date
const date = new Date().toISOString().split('T')[0];

// Read template
const template = readFileSync(
    join(__dirname, '../src/templates/post-template.md'),
    'utf8'
);

// Replace date in template
const newPost = template.replace('2024-03-20', date);

// Create new post file
const postPath = join(__dirname, `../src/pages/posts/${slug}.md`);

writeFileSync(postPath, newPost);

console.log(`Created new post: ${postPath}`);