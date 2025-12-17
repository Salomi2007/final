# CaseHub - Phone Case Store

A modern, responsive phone case e-commerce store built with React, Vite, and Tailwind CSS.

## Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Clean design with Tailwind CSS
- **Case Catalog**: Browse phone cases, view details, filter by device brand
- **Shopping Cart**: Add/remove cases, view cart summary
- **User Authentication**: Login and registration pages
- **Checkout Process**: Complete checkout form with order summary

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── data/             # Mock data
│   │   └── products.json
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── vite.config.js        # Vite configuration
```

## Pages

- **Home** (`/`) - Hero section with featured phone cases
- **Cases** (`/products`) - All phone cases with brand filtering
- **Case Detail** (`/product/:id`) - Individual case details and compatibility
- **Cart** (`/cart`) - Shopping cart with case management
- **Checkout** (`/checkout`) - Order form and payment details
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

## Components

- **Navbar** - Navigation with cart counter and user actions
- **Footer** - Site footer with links and contact info
- **ProductCard** - Reusable product display component

## Customization

### Adding New Phone Cases

Edit `src/data/products.json` to add or modify phone cases. Each case should have:
- `id` (number)
- `name` (string)
- `price` (number)
- `image` (string URL)
- `category` (string - device brand/model)
- `description` (string)
- `featured` (boolean)

### Styling

The project uses Tailwind CSS. Modify `tailwind.config.js` to customize the design system or add custom styles to `src/index.css`.

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx` if needed

## Notes

- This is a frontend-only implementation with mock data
- Cart functionality uses local state (not persistent)
- Authentication forms are UI-only (no backend integration)
- Images are sourced from Unsplash for demonstration

## Next Steps

To make this a full phone case store, you would need to:
- Add a backend API for cases, users, and orders
- Implement real authentication and authorization
- Add persistent cart storage (localStorage or database)
- Integrate payment processing
- Add device compatibility checker
- Implement user profiles and order history
- Add case customization options