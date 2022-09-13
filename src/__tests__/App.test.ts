import { expect } from "vitest";
import { getImgForDataEntry } from "../App";

test("Get image for data entry", async () => {
  const dataEntry = {
    title: "European Quest",
    subtitle: "8 countries, 21 days",
    emissions: "810 kg",
    rating: 4.7
  };

  const result = await getImgForDataEntry(dataEntry);

  expect(result).toHaveProperty("img");
  expect(result.img).toBeTruthy();
  expect(result.img).toBeTypeOf("string");
});
