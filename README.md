# Currency Converter (Next.js)

A modern currency converter web app built with [Next.js](https://nextjs.org), featuring real-time exchange rates, historical charts, and a beautiful UI.

---

## 🚀 Features

- Convert AUD to major currencies (USD, EUR, GBP, JPY, CAD)
- Real-time rates from FreeCurrencyAPI
- Historical exchange rate charts
- Responsive, mobile-friendly design
- Clean, maintainable codebase

---

## 🛠️ Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mohitkumar33/currency-convertor.git
cd currency-convertor
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL="https://api.freecurrencyapi.com/v1"
NEXT_PUBLIC_API_KEY="your_api_key_here"
```

Get your API key from [FreeCurrencyAPI](https://freecurrencyapi.com/).

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧑‍💻 Project Structure

- `src/components/` – React components (CurrencyCard, CurrencyModal, etc.)
- `src/constants/` – App constants (currency list, etc.)
- `src/types/` – TypeScript types
- `public/assets/` – Currency logos and static assets
- `.env` – API keys and environment variables

---

## 📝 Best Practices

- Use environment variables for all API keys/secrets
- Keep UI components stateless where possible
- Use TypeScript for type safety
- Use semantic HTML and accessible components
- Keep code modular and reusable
- Use `.env.example` to document required environment variables
- Commit only non-sensitive config files to version control

---

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [FreeCurrencyAPI Docs](https://freecurrencyapi.com/docs)
- [React Documentation](https://react.dev/)

---

## 📝 License

MIT
