export default class Web3API {
  static async Post<T>(segment: string, body: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}${segment}`, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await handleResponse<T>(res);
  }

  static async Get<T>(
    segment: string,
    cookieHeader?: string,
    cache: RequestCache = "no-store"
  ) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}${segment}`,
        {
          headers: { Cookie: cookieHeader || "" },
          credentials: !cookieHeader ? "include" : undefined,
          cache,
        }
      );

      return await handleResponse<T>(res);
    } catch (error) {
      return {
        errorMessage: "Could not send request to the Web3 API",
        success: false,
        data: undefined,
      } as Web3APIErrorResponse;
    }
  }
}

type Web3APIResponse<T> = Web3APIErrorResponse | Web3APISuccessResponse<T>;

type Web3APIErrorResponse = {
  errorMessage: string;
  success: false;
  data: undefined;
};
type Web3APISuccessResponse<T> = {
  errorMessage: undefined;
  success: true;
  data: T;
};

const handleResponse = async <T>(
  res: Response
): Promise<Web3APIResponse<T>> => {
  let data: any;
  try {
    const data = await res.json();
    if (!res.ok) return getErrorMessage(res, data);
    return { data, success: true, errorMessage: undefined };
  } catch (error) {
    if (!res.ok) {
      return getErrorMessage(res);
    } else {
      return { success: true, errorMessage: undefined, data };
    }
  }
};

const getErrorMessage = (res: Response, data?: any): Web3APIErrorResponse => {
  if (!data) {
    return {
      errorMessage: "Unexpected server error",
      success: false,
      data: undefined,
    };
  } else {
    if (res.status >= 500) {
      return {
        errorMessage: "Unexpected server error",
        success: false,
        data: undefined,
      };
    } else {
      return { errorMessage: data.message, success: false, data: undefined };
    }
  }
};
