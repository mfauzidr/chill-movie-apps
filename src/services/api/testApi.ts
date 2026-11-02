import { getContents } from "./contentApi";

const testGetContents = async () => {
  try {
    const contents = await getContents();

    console.log("Total contents:", contents.length);
    console.log("API response:", contents);
  } catch (error) {
    console.error("Failed to fetch contents:", error);
  }
};

testGetContents();