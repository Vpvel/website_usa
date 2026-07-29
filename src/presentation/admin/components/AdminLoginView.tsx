"use client";

import { useAdminLoginViewModel } from "@/presentation/admin/viewmodels/useAdminLoginViewModel";
import { SUPER_ADMIN_CREDENTIALS } from "@/data/datasources/admin-seed.local";

export function AdminLoginView() {
  const vm = useAdminLoginViewModel();

  return (
    <div className="admin-login">
      <div className="admin-login__panel">
        <p className="admin-login__eyebrow">Super Login</p>
        <h1>Angel Starch Admin</h1>
        <p className="admin-login__lead">
          Sign in with an admin or super admin account to manage catalog, users,
          and home content.
        </p>

        {vm.error ? (
          <p className="admin-alert admin-alert--error" role="alert">
            {vm.error}
          </p>
        ) : null}

        <form
          className="admin-form"
          onSubmit={(event) => {
            event.preventDefault();
            void vm.login();
          }}
        >
          <label className="admin-field">
            <span>Email address</span>
            <input
              type="email"
              autoComplete="username"
              value={vm.email}
              onChange={(event) => vm.setEmail(event.target.value)}
              required
            />
            {vm.fieldErrors.email ? (
              <small className="admin-field__error">{vm.fieldErrors.email}</small>
            ) : null}
          </label>
          <label className="admin-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              minLength={6}
              value={vm.password}
              onChange={(event) => vm.setPassword(event.target.value)}
              required
            />
            {vm.fieldErrors.password ? (
              <small className="admin-field__error">{vm.fieldErrors.password}</small>
            ) : null}
          </label>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={vm.rememberMe}
              onChange={(event) => vm.setRememberMe(event.target.checked)}
            />
            <span>Keep me signed in</span>
          </label>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={vm.loading}
          >
            {vm.loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="admin-login__hint">
          Demo seed: <code>{SUPER_ADMIN_CREDENTIALS.email}</code> /{" "}
          <code>{SUPER_ADMIN_CREDENTIALS.password}</code>
        </p>
      </div>
    </div>
  );
}
