This is a [Next.js](https://nextjs.org) project for review with vercel link: [`https://burningbors-interview.vercel.app/`](https://burningbors-interview.vercel.app/).

## Getting Started

First, If you want to run on your device, you need .env file.

Second, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Challenges

- **Design Limitations:** At my previous company, we always had Figma designs to rely on, so I didn’t need to worry about color schemes or layout. For this project, the UI looks a bit rough due to lack of design references.  
- **Cart API Complexity:** DummyJSON’s cart API differs from typical implementations, which required extra time to understand how to organize and update cart data correctly.  
- **Authentication API Quirks:**  
  - Adding `credentials: 'include'` causes the API to fail.  
  - Omitting `credentials` works, but when a user enters incorrect login details, the API only returns a generic **"credentials"** error without details.

## Folder structure
    my-nextjs-project/
    ├─ src/
    │  ├─ api/         # API setup and implementations
    │  ├─ components/
    │  │  ├─ global/   # Reusable global components
    │  │  ├─ pages/    # Page-specific components
    │  │  ├─ hoc/      # Higher-order components (e.g., auth)
    │  │  └─ layouts/  # Layout components for pages
    │  ├─ hooks/       # Custom hooks
    │  ├─ configs/     # Constants and config
    │  ├─ libs/        # Utility functions
    │  ├─ pages/       # Next.js pages
    │  ├─ providers/   # React Query / Context providers
    │  ├─ stores/      # Zustand stores
    │  ├─ styles/      # Global styles
    │  └─ types/       # TypeScript types
    └─ ...

## This project uses:
- React Hook Form + Yup for form validation
- TailwindCSS for styling
- Zustand for state management
- DummyJSON is used only to simulate APIs; data is not persisted.

## Notes

- All cart page logic is handled in the **store**; no actual API implementation is done for cart actions.  
- The "Update user information (PUT /users/{id}) to save shipping address" feature was implemented, because I could not find a "shipping address" key in DummyJSON.
- The cart page code is not fully optimized; you may notice some duplicated logic for adding, updating, or deleting products in the cart.


