import React from "react";
import {
  Container,
  Box,
  RadioGroup,
  Radio,
  HStack,
  VStack,
  Text,
  Image,
  StatLabel,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../index";
import Chart from "./Chart";
import Error from "./Error";

const CoinDetails = () => {
  const [Coin, SetCoin] = useState();
  const [loading, Setloading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setcurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setchartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const params = useParams();

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        Setloading(true);
        break;
      case "7d":
        setDays("7d");
        Setloading(true);
        break;
      case "14d":
        setDays("14d");
        Setloading(true);
        break;
      case "30d":
        setDays("30d");
        Setloading(true);
        break;
      case "60d":
        setDays("60d");
        Setloading(true);
        break;
      case "200d":
        setDays("200d");
        Setloading(true);
        break;
      case "1y":
        setDays("365d");
        Setloading(true);
        break;
      case "max":
        setDays("max");
        Setloading(true);
        break;

      default:
        setDays("24h");
        Setloading(true);
        break;
    }
  };

  useEffect(() => {
    const feachcoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        // console.log(chartData.prices);
        SetCoin(data);
        setchartArray(chartData.prices);
        Setloading(false);
      } catch (error) {
        Setloading(false);
        setError(true);
      }
    };
    feachcoin();
  }, [params.id, currency, days]);

  const handleChange = (event) => {
    setcurrency(event.target.value);
  };

  if (error) return <Error />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box w={"full"} borderWidth={1}>
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </Box>

            <HStack p="4" overflowX={"auto"}>
              {btns.map((i) => (
                <Button
                  disabled={days === i}
                  key={i}
                  onClick={() => switchChartStats(i)}
                >
                  {i}
                </Button>
              ))}
            </HStack>

            <RadioGroup value={currency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio onChange={handleChange} value={"inr"}>
                  INR
                </Radio>
                <Radio onChange={handleChange} value={"eur"}>
                  EUR
                </Radio>
                <Radio onChange={handleChange} value={"usd"}>
                  USD
                </Radio>
              </HStack>
            </RadioGroup>

            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
                Last Updated On
                {Date(Coin.market_data.last_updated).split("G")[0]}
              </Text>
              <Image
                src={Coin.image.large}
                w={"16"}
                h={"16"}
                objectFit={"contain"}
              />
              <Stat>
                <StatLabel>{Coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {Coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      Coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {Coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={"xl"}>
                {"#"}
                {Coin.market_cap_rank}
              </Badge>
              <CustomBar
                high={`${currencySymbol}${Coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${Coin.market_data.low_24h[currency]}`}
              />
              <Box w={"full"} p="4">
                <Item
                  title={"max Supply"}
                  value={Coin.market_data.max_supply}
                />
                <Item
                  title={"Circulating Supply"}
                  value={Coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currencySymbol}${Coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol}${Coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbol}${Coin.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text letterSpacing={"widest"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

export default CoinDetails;
