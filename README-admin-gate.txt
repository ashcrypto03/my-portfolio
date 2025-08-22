Admin-only 'Add video' button

How it works:
1) Set an environment variable in Netlify (Site settings → Build & deploy → Environment):
   VITE_ADMIN_KEY = your-strong-secret

2) Activate admin mode in your browser by visiting your site once with:
   https://YOUR-SITE.netlify.app/#admin=your-strong-secret

   - The app verifies the key against import.meta.env.VITE_ADMIN_KEY.
   - If it matches, it stores a flag in localStorage and removes the hash from the URL.
   - The 'Add Video' button and modal will appear only for admin.

3) To log out admin mode, click the 'Log out' link in the admin badge (or clear localStorage key 'fs_admin').
