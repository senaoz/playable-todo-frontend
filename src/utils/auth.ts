import { fetchApi } from "./api";

interface User {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export const loginUser = async (user: User): Promise<AuthResponse> => {
  const response = await fetchApi<AuthResponse>("/api/login", "POST", user);
  if (response.success) {
    return response.data!;
  } else {
    throw new Error(response.error);
  }
};

export const verifyToken = async (token: string): Promise<boolean> => {
  const response = await fetchApi<boolean>("/api/verify-token", "POST", {
    token,
  });
  if (response.success) {
    return response.data!;
  } else {
    throw new Error(response.error);
  }
};
