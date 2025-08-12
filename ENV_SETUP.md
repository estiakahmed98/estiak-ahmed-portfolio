# Email (SMTP) Environment Variables

Create a `.env.local` file in the project root with the following variables (do not commit this file):

```
# SMTP server settings
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

# Where messages should be delivered (defaults to your email if not set)
MAIL_TO=estiakahmed898@gmail.com

# From address for outgoing mail (defaults to SMTP_USER if not set)
MAIL_FROM=Portfolio Contact <no-reply@yourdomain.com>
```

Common providers:
- Gmail: use an App Password and set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465` (secure) or `587`.
- Brevo/Sendinblue: `SMTP_HOST=smtp-relay.sendinblue.com`, `SMTP_PORT=587`.
- Mailgun: `SMTP_HOST=smtp.mailgun.org`, `SMTP_PORT=587`.

After setting variables, restart the dev server.
