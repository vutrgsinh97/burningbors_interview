import { JSX } from "react";

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthWrapper(props: P) {
    const isLogged = false;

    if (!isLogged) return <div>Bạn cần login!</div>;

    return <WrappedComponent {...props} />;
  };
}
