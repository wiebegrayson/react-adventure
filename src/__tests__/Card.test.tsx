import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import renderer from "react-test-renderer";
import Card from "../components/Card";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

test("Card component renders mock data", () => {
  const data = {
    title: "Autumn Roadtrip",
    subtitle: "1 country, 14 days",
    emissions: "3.56 t",
    rating: 4.7,
    img: ""
  };

  const component = renderer.create(
    <div>
      <ChakraProvider>
        <Card {...data} />
      </ChakraProvider>
    </div>
  );

  let tree = toJson(component);
  expect(tree).toMatchSnapshot({});
});
