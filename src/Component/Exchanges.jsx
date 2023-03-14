import React from "react";
import axios from "axios";
import {
  Container,
  HStack,
  Stack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { server } from "../index";
import { useState } from "react";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  const [exchanges, SetExchanges] = useState([]);
  const [loading, Setloading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const feachexchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        SetExchanges(data);
        Setloading(false);
      } catch (error) {
        Setloading(false);
        setError(true);
      }
    };
    feachexchanges();
  }, []);

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
              <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                {exchanges.map((i) => {
                  return (
                    <ExchangeCard
                      key={i.id}
                      name={i.name}
                      img={i.image}
                      rank={i.trust_score_rank}
                      url={i.url}
                    />
                  );
                })}
              </HStack>
            </>
          )}
        </Container>
      )}
    </>
  );
};

const ExchangeCard = ({ name, img, url, rank }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>

        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;
