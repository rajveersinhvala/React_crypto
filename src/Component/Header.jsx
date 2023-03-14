import React from "react";
import { Link } from "react-router-dom";
import { HStack, Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <>
      <HStack
        p={"10"}
        shadow={"base"}
        backgroundColor={"blackAlpha.900"}
        h={"20"}
      >
        <stack style={{ postion: "left" }}>
          <Button variant={"unstyled"} color={"white"}>
            <Link to={"/"}>Home</Link>
          </Button>
          <Button variant={"unstyled"} color={"white"}>
            <Link to={"/exchanges"}>Exchange</Link>
          </Button>
          <Button variant={"unstyled"} color={"white"}>
            <Link to={"/coins"}>Coins</Link>
          </Button>
        </stack>
      </HStack>
    </>
  );
};

export default Header;
