import axios from "axios";

const baseUrl = "https://expressphonebook.azurewebsites.net/api/persons";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  }
});

const getAll = async () => {
  try {
    const response = await axiosInstance.get("");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const create = async (newObject) => {
  try {
    const response = await axiosInstance.post("", newObject);
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axiosInstance.put(`/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

const deletePerson = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

export default { getAll, create, update, deletePerson };
