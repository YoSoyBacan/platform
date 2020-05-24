import { APIClient } from "lib/fetch";
import { BusinessVoucherOptionsResponse } from "../../lib/models";

export const getProducts = async (authToken: string, businessId: string): Promise<BusinessVoucherOptionsResponse> => {
  const client = new APIClient(authToken || "");
  try {
    const response = await client.get<BusinessVoucherOptionsResponse>(`misTarjetas/${businessId}`);
    return response.data;
  } catch(error) {
    throw(error);
  }
};
