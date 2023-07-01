export default class Web3API {
  static async Post<T>(segment: string, body: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}${segment}`,
        {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      return await handleResponse<T>(res);
    } catch (error) {
      return {
        errorMessage: "Could not send request to the Web3 API",
        success: false,
        data: undefined,
      } as APIErrorResponse;
    }
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
      } as APIErrorResponse;
    }
  }
}

export class MarketAPI {
  static async Post<T>(
    segment: string,
    body: string,
    method: "POST" | "PATCH" | "PUT" = "POST",
    headers?: HeadersInit | undefined
  ) {
    try {
      headers = headers ? headers : { "Content-Type": "application/json" };
      const res = await fetch(segment, { method, body, headers });
      return await handleResponse<T>(res);
    } catch (error) {
      return {
        errorMessage: "Could not send request to the Web3 API",
        success: false,
        data: undefined,
      } as APIErrorResponse;
    }
  }
  static async Get<T>(segment: string) {
    try {
      const res = await fetch(segment);
      return await handleResponse<T>(res);
    } catch (error) {
      return {
        errorMessage: "Could not send request to the Web3 API",
        success: false,
        data: undefined,
      } as APIErrorResponse;
    }
  }
}

type APIResponse<T> = APIErrorResponse | APISuccessResponse<T>;

type APIErrorResponse = {
  errorMessage: string;
  success: false;
  data: undefined;
  status: number;
};
type APISuccessResponse<T> = {
  errorMessage: undefined;
  success: true;
  data: T;
  status: number;
};

const handleResponse = async <T>(res: Response): Promise<APIResponse<T>> => {
  let data: any;
  try {
    const data = await res.json();
    if (!res.ok) return getErrorMessage(res, data);
    return { data, success: true, errorMessage: undefined, status: res.status };
  } catch (error) {
    if (!res.ok) {
      return getErrorMessage(res);
    } else {
      return {
        success: true,
        errorMessage: undefined,
        data,
        status: res.status,
      };
    }
  }
};

const getErrorMessage = (res: Response, data?: any): APIErrorResponse => {
  if (!data) {
    return {
      errorMessage: "Unexpected server error",
      success: false,
      data: undefined,
      status: res.status,
    };
  } else {
    if (res.status >= 500) {
      return {
        errorMessage: "Unexpected server error",
        success: false,
        data: undefined,
        status: res.status,
      };
    } else {
      return {
        errorMessage: data.message,
        success: false,
        data: undefined,
        status: res.status,
      };
    }
  }
};
