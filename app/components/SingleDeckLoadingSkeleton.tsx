import { Container, Flex, Skeleton, Text } from "@radix-ui/themes";

const SingleDeckLoadingSkeleton = () => {
  return (
    <Container size="2" className="p-4">
      <Flex direction="column" gap="3">
        <Text>
          <Skeleton>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna.
          </Skeleton>
        </Text>
        <Text>
          <Skeleton>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna.
          </Skeleton>
        </Text>

        <Skeleton>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna.
          </Text>
        </Skeleton>
        <Skeleton>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna.
          </Text>
        </Skeleton>
        <Skeleton>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque felis tellus, efficitur id convallis a, viverra eget
            libero. Nam magna erat, fringilla sed commodo sed, aliquet nec
            magna.
          </Text>
        </Skeleton>
      </Flex>
    </Container>
  );
};

export default SingleDeckLoadingSkeleton;
