import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de protection - Vérifie l'authentification et les abonnements
 * S'applique aux routes spécifiées dans matcher
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Routes protégées (nécessitent l'authentification)
  const protectedRoutes = ["/dashboard", "/billing", "/settings", "/api/protected"];

  // Routes payantes (nécessitent un abonnement actif)
  const paidRoutes = ["/dashboard/premium", "/api/premium"];

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Créer un client Supabase dans le middleware
  let supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getSetCookie().map((c) => {
            const [name, ...rest] = c.split("=");
            return { name, value: rest.join("=") };
          });
        },
        setAll(cookiesToSet) {
          const response = NextResponse.next();
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
          return response;
        },
      },
    }
  );

  // Récupérer l'utilisateur actuel
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Si non authentifié, rediriger vers /login
  if (authError || !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vérifier si c'est une route payante
  const isPaidRoute = paidRoutes.some((route) => pathname.startsWith(route));

  if (isPaidRoute) {
    const { data: subscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    // Si pas d'abonnement actif, rediriger vers /billing
    if (
      subError ||
      !subscription ||
      subscription.status !== "active" ||
      new Date(subscription.current_period_end) < new Date()
    ) {
      return NextResponse.redirect(new URL("/billing", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
