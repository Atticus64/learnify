import { SignIn } from "@clerk/nextjs";

export default function LoginPage({ searchParams }) {
  return (
    <SignIn
      fallbackRedirectUrl={searchParams?.redirect || "/user"}
      appearance={{
        elements: {
          card: "w-full max-w-2x1",
          rootBox: "w-full",
        },
      }}
    />
  );
}