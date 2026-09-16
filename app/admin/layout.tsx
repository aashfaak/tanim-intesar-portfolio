"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { AdminNav } from "@/components/admin/AdminNav";

function Guard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) router.replace("/admin/login");
    if (user && isLoginPage) router.replace("/admin");
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="container-editorial py-24 text-center text-muted">
        Checking your session…
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  if (!user) {
    // Redirect effect above will fire; render nothing in the meantime.
    return null;
  }

  return (
    <div className="min-h-screen">
      <AdminNav />
      <div className="container-editorial py-10">{children}</div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Guard>{children}</Guard>
    </AuthProvider>
  );
}
