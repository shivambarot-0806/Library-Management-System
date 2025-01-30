# Feature centric Folder Structure

```
src/
├── features/           # Feature modules (feature-centric)
│   └── user/           # Example feature
│       ├── api/        # Feature-specific API calls
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       ├── types/      # Feature-specific types
│       ├── utils/      # Feature-specific utilities
│       └── index.ts    # Feature barrel file
├── api/                # Global API configuration
│   ├── client.ts       # Axios instance
│   └── interceptors/   # Global interceptors
├── assets/             # Static assets
├── components/         # Shared UI components
├── hooks/              # Shared hooks
├── layouts/            # App layouts
├── pages/              # Route components
├── routes/             # Router configuration
├── stores/             # Global state management
├── types/              # Global TypeScript types
├── utils/              # Shared utilities
└── App.tsx
```
