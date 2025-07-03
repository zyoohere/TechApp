import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Toaster } from 'react-hot-toast';

const appName = import.meta.env.VITE_APP_NAME || 'Technovate';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <>
        <Toaster position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937', // abu tua
              color: '#fff',
              fontWeight: '500',
              borderRadius: '10px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981', // hijau
                secondary: '#d1fae5',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444', // merah
                secondary: '#fee2e2',
              },
            },
          }}
        />
        <App {...props} />
      </>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
