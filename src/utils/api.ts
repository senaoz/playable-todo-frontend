interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const fetchApi = async <T>(
  url: string,
  method: string,
  body?: object,
  accessToken?: string,
): Promise<ApiResponse<T>> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Something went wrong");
    }

    return { success: true, data: responseData };
  } catch (error) {
    // @ts-ignore
    return { success: false, error: error.message };
  }
};
