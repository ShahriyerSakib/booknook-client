# BookNook – A Small Online Library

🔗 **Live Site:** https://booknook-touch.netlify.app/

Add a book, borrow a book, return a book.

## Features
- Browse every book, search by title/author and filter by category
- Secure sign-up and login with BetterAuth (email/password and Google)
- Add, edit and delete your own books with image upload and confirm modals
- Borrow system with available-copies tracking and double-borrow protection
- JWT-protected Express API with owner-only edit and delete
- Responsive layout with a dark/light theme toggle and Swiper slider
- Toast notifications everywhere, with no default browser alerts

## Tech Stack
Next.js (App Router), DaisyUI, Tailwind CSS, BetterAuth, MongoDB, Express.js, JWT, Swiper, Framer Motion

## Run locally
```
npm install
cp .env.example .env.local   # fill values
npm run dev
```
