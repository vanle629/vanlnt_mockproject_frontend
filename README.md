# SoleMate Frontend (Mock Project)

To run with the mock backend in `../vanlnt_mockproject_backend_server`:

1. Start mock backend:

```bash
cd ../vanlnt_mockproject_backend_server
npm install
npm start
```

2. Start frontend (in this folder):

```bash
npm install
npm run dev
```

3. Set environment variable for API base (optional):

Create `.env` in frontend folder with:

```
VITE_API_BASE_URL=http://localhost:8000
```

This will make the frontend call the mock backend endpoints for checkout and products.
