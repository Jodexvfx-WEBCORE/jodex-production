import { u as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-HTiSLxfL.js";
import { u as useAdminAuth, G as GlassCard, B as Button } from "./useAdminAuth-CEdf4wzp.js";
import { l as motion } from "./proxy-DSs8VgC6.js";
function AdminLogin() {
  const { session, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (session.isAuthenticated) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [session.isAuthenticated, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const success = login(username, password);
    setLoading(false);
    if (success) {
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };
  if (session.isAuthenticated) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10",
        style: {
          background: "radial-gradient(circle, rgba(0,217,255,0.4) 0%, transparent 70%)"
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
        className: "w-full max-w-sm relative z-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "w-full p-8", glow: "cyan", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full glass-effect flex items-center justify-center glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              className: "w-5 h-5 text-primary",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                }
              )
            }
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground text-center mb-1 text-glow", children: "Admin Portal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center mb-8", children: "Restricted area — authorized access only" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "flex flex-col gap-4",
              "data-ocid": "admin-login-form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "username",
                      className: "text-xs font-display tracking-wider uppercase text-muted-foreground",
                      children: "Email Address"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "username",
                      type: "email",
                      value: username,
                      onChange: (e) => setUsername(e.target.value),
                      autoComplete: "email",
                      className: "bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth",
                      placeholder: "Enter email address",
                      "data-ocid": "admin-username-input",
                      disabled: loading
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "password",
                      className: "text-xs font-display tracking-wider uppercase text-muted-foreground",
                      children: "Password"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "password",
                      type: "password",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      autoComplete: "current-password",
                      className: "bg-muted/30 border border-border rounded-lg px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-smooth",
                      placeholder: "Enter password",
                      "data-ocid": "admin-password-input",
                      disabled: loading
                    }
                  )
                ] }),
                error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    initial: { opacity: 0, y: -4 },
                    animate: { opacity: 1, y: 0 },
                    className: "text-xs text-center font-display tracking-wide py-2 px-3 rounded-lg",
                    style: {
                      color: "oklch(0.65 0.21 310)",
                      background: "rgba(255, 0, 255, 0.08)",
                      border: "1px solid rgba(255, 0, 255, 0.2)"
                    },
                    role: "alert",
                    "data-ocid": "admin-login-error",
                    children: error
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    variant: "primary",
                    fullWidth: true,
                    disabled: loading || !username || !password,
                    "data-ocid": "admin-login-submit",
                    className: "mt-2",
                    children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
                      "Signing in..."
                    ] }) : "Sign In"
                  }
                )
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  AdminLogin as default
};
