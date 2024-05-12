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
      // if body includes a file, don't stringify it
      body: body instanceof File ? body : JSON.stringify(body),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${url}`,
      options,
    );
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
