import React from "react";
import axios from "axios";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { server } from "../index";
import Loader from "./Loader";
import Error from "./Error";
import Coincard from "./Coincard";

const Coins = () => {
  const [Coins, SetCoins] = useState([]);
  const [loading, Setloading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setcurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    Setloading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const feachcoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        SetCoins(data);
        Setloading(false);
      } catch (error) {
        Setloading(false);
        setError(true);
      }
    };
    feachcoins();
  }, [currency, page]);

  if (error) return <Error />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container maxW={"container.xl"}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
                <HStack spacing={"4"}>
                  <Radio value={"inr"}> INR </Radio>
                  <Radio value={"eur"}> EUR </Radio>
                  <Radio value={"usd"}> USD </Radio>
                </HStack>
              </RadioGroup>

              <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                {Coins.map((i) => {
                  return (
                    <Coincard
                      id={i.id}
                      key={i.id}
                      name={i.name}
                      price={i.current_price}
                      img={i.image}
                      symbol={i.symbol}
                      currencySymbol={currencySymbol}
                    />
                  );
                })}
              </HStack>
              <HStack w={"full"} overflowX={"auto"} p={"5"}>
                {btns.map((item, index) => (
                  <Button
                    key={index}
                    variant={"ghost"}
                    border={"1px"}
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </HStack>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Coins;
