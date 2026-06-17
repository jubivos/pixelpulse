import { apiFetch } from "./api";

export interface CurrentUser {
  id: number;
  login: string;
  nickname: string;
  email: string;
  role: "user" | "moderator" | "admin";
}

export interface UserCredentials {
  login: string;
  password: string;
}

export interface RegisterData {
  login: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

function notifyAuthChanged() {
  window.dispatchEvent(new Event("authChanged"));
}

function saveAuth(token: string, user: CurrentUser) {
  localStorage.setItem("token", token);
  localStorage.setItem("user_id", String(user.id));
  localStorage.setItem("user_login", user.login);
  localStorage.setItem("user_nickname", user.nickname);
  localStorage.setItem("user_email", user.email);
  localStorage.setItem("user_role", user.role);

  notifyAuthChanged();
}

function getErrorMessage(err: any) {
  return err?.error?.message || err?.message || "Произошла ошибка";
}

export function getCurrentUser(): CurrentUser | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  return {
    id: Number(localStorage.getItem("user_id")),
    login: localStorage.getItem("user_login") || "",
    nickname: localStorage.getItem("user_nickname") || "",
    email: localStorage.getItem("user_email") || "",
    role: (localStorage.getItem("user_role") as CurrentUser["role"]) || "user",
  };
}

export async function login(credentials: UserCredentials): Promise<CurrentUser> {
  try {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        login: credentials.login,
        password: credentials.password,
      }),
    });

    saveAuth(res.data.token, res.data.user);
    return res.data.user;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export async function register(data: RegisterData): Promise<CurrentUser> {
  try {
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        user: {
          login: data.login,
          nickname: data.nickname || data.login,
          email: data.email,
          password: data.password,
          password_confirmation: data.passwordConfirmation,
        },
      }),
    });

    saveAuth(res.data.token, res.data.user);
    return res.data.user;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_login");
  localStorage.removeItem("user_nickname");
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_role");

  notifyAuthChanged();
  window.location.href = "/";
}