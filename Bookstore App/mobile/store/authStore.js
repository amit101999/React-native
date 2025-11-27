import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (user, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        throw new Error(
          data.message || "Registration failed Something went wrong!!"
        );
      }
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", JSON.stringify(data.token));
      set({ token: data.token, user: data.user, isLoading: false });
      return {
        success: true,
      };
    } catch (error) {
      console.error("Registration error:", error);
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },
}));
