import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

const routes = [
  '/login',
  '/portal',
  '/services/crm-systems',
  '/services/lead-intake',
  '/services/n8n-automation',
  '/services/app-integrations',
  '/services/connected-websites',
  '/services/dashboards',
  '/services/managed-hosting',
  '/services/e-signatures',
  '/services/custom-apps',
];

await copyFile(indexPath, path.join(distDir, '404.html'));

await Promise.all(
  routes.map(async (route) => {
    const routeDir = path.join(distDir, route.replace(/^\/+/, ''));
    await mkdir(routeDir, { recursive: true });
    await copyFile(indexPath, path.join(routeDir, 'index.html'));
  }),
);
