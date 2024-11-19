# React Query HOC

A TypeScript-friendly Higher-Order Component library for React Query that simplifies data fetching and mutations in React applications.

## Features

- 🎯 Type-safe HOCs for queries and mutations
- 🔄 Built-in loading, error, and empty states
- 🎨 Customizable components for all states
- 📦 Zero dependencies (except peer dependencies)
- 📝 Full TypeScript support

## Installation

```bash
npm install react-query-hoc @tanstack/react-query
```

## Usage

### Query Example

```tsx
import { withQuery } from "react-query-hoc";

interface User {
  id: number;
  name: string;
}

const UserList = withQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((res) => res.json()),
  queryOptions: {
    refetchOnWindowFocus: false,
  },
})(({ data, refetch, isRefetching }) => (
  <div>
    {isRefetching && <RefreshIndicator />}
    {data.map((user) => (
      <div key={user.id}>{user.name}</div>
    ))}
    <button onClick={() => refetch()}>Refresh</button>
  </div>
));
```

### Mutation Example

```tsx
import { withMutation } from "react-query-hoc";

interface CreateUserData {
  name: string;
  email: string;
}

const CreateUserForm = withMutation<User, CreateUserData>({
  mutationFn: (data) =>
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json()),
})(({ mutate, isLoading }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      mutate({ name: "John", email: "john@example.com" });
    }}
  >
    {/* form fields */}
    <button type="submit" disabled={isLoading}>
      Submit
    </button>
  </form>
));
```

## API Reference

### withQuery

```tsx
function withQuery<TData, TError = Error>(
  config: WithQueryConfig<TData, TError>
);
```

### withMutation

```tsx
function withMutation<TData, TVariables, TError = Error>(
  config: WithMutationConfig<TData, TVariables, TError>
);
```

See types.ts for detailed type definitions.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## License

MIT
