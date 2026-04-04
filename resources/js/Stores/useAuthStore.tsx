import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "cashier" | "customer";
    avatar?: string;
    phone?: string;
    emailVerifiedAt?: string;
    loyaltyPoints: number;
    loyaltyTier: "bronze" | "silver" | "gold" | "platinum";
}

interface AuthStore {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    setUser: (user: User) => void;
    clearError: () => void;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post("/api/auth/login", {
                        email,
                        password,
                    });
                    const { user, token } = response.data;
                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });

                    // Set axios default header
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || "Login failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true });
                try {
                    await axios.post("/api/auth/logout");
                    delete axios.defaults.headers.common["Authorization"];
                    set({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            register: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(
                        "/api/auth/register",
                        data
                    );
                    const { user, token } = response.data;
                    set({
                        user,
                        token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;
                } catch (error: any) {
                    set({
                        error:
                            error.response?.data?.message ||
                            "Registration failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            updateProfile: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.put("/api/auth/profile", data);
                    set({ user: response.data.user, isLoading: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message || "Update failed",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            setUser: (user) => {
                set({ user, isAuthenticated: true });
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
