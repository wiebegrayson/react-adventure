import { useEffect, useState } from "react";
import Card, { IProps as IData } from "./components/Card";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
});

export const getImgForDataEntry = async (
  entry: Omit<IData, "img">
): Promise<IData> => {
  return unsplash.search
    .getPhotos({
      query: `${entry.title}`,
      perPage: 1
    })
    .then(({ response }) => ({
      ...entry,
      img: response?.results[0].urls.regular || ""
    }));
};

function App() {
  const [mockData, setMockData] = useState<IData[] | null>(null);

  useEffect(() => {
    const dataURL = new URL("./assets/data.json", import.meta.url).href;
    fetch(dataURL)
      .then(res => res.json())
      .then(async (data: Omit<IData, "img">[]) => {
        const newData = await Promise.all(data.map(getImgForDataEntry));
        setMockData(newData);
      });
  }, []);

  return (
    <Wrap
      minHeight="100vh"
      display="grid"
      placeItems="center"
      align="center"
      sx={{ "& ul": { width: "100%" } }}
      justify="center"
      bgColor="#ddd"
      spacingY={4}
      spacingX={8}
    >
      {mockData?.map(data => (
        <WrapItem sx={{ width: "min(465px, 100%)" }} key={data.title}>
          <Card {...data} />
        </WrapItem>
      ))}
    </Wrap>
  );
}

export default App;
