# Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Fill in your actual values in `.env`

3. Never commit `.env` to version control!

## Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_*`: Email configuration for contact forms
- `JWT_SECRET`: Secret key for authentication tokens
