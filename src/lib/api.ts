import axios from "axios";

export async function postJSON<T>(url: string, data: T) {
    const response = await axios.post(url, data);
    return response.data;
}
