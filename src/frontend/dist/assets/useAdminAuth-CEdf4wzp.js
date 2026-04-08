import { j as jsxRuntimeExports, c as cn, r as reactExports } from "./index-HTiSLxfL.js";
const variantStyles = {
  primary: [
    "bg-transparent border border-primary text-primary",
    "hover:bg-primary/10 hover:shadow-glow-cyan hover:text-glow",
    "active:scale-95"
  ].join(" "),
  secondary: [
    "bg-transparent border border-secondary text-secondary",
    "hover:bg-secondary/10 hover:shadow-glow-magenta",
    "active:scale-95"
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground/70",
    "hover:text-foreground hover:bg-muted/30",
    "active:scale-95"
  ].join(" ")
};
function Button({
  variant = "primary",
  children,
  fullWidth,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: cn(
        "inline-flex items-center justify-center gap-2",
        "px-6 py-2.5 rounded-lg font-display font-medium text-sm tracking-wider uppercase",
        "transition-smooth cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:opacity-40 disabled:pointer-events-none",
        variantStyles[variant],
        fullWidth && "w-full",
        className
      ),
      ...props,
      children
    }
  );
}
function GlassCard({
  children,
  className,
  glow = "none",
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "glass-effect rounded-xl transition-smooth",
        glow === "cyan" && "glow-cyan",
        glow === "magenta" && "glow-magenta",
        className
      ),
      ...rest,
      children
    }
  );
}
const SESSION_KEY = "jodex_admin_session";
function useAdminAuth() {
  const [session, setSession] = reactExports.useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch {
    }
    return { token: "", isAuthenticated: false };
  });
  reactExports.useEffect(() => {
    if (session.isAuthenticated) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [session]);
  const login = reactExports.useCallback((username, password) => {
    if (username === "diwakar3223og@gmail.com" && password === "20052005") {
      const token = `admin_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      setSession({ token, isAuthenticated: true });
      return true;
    }
    return false;
  }, []);
  const logout = reactExports.useCallback(() => {
    setSession({ token: "", isAuthenticated: false });
  }, []);
  return { session, login, logout };
}
export {
  Button as B,
  GlassCard as G,
  useAdminAuth as u
};
