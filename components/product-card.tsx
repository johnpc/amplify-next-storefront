import {
  Badge,
  Button,
  Card,
  Flex,
  Image,
  StepperField,
  Text,
} from "@aws-amplify/ui-react";
import { Schema } from "@/amplify/data/resource";
import { useEffect, useState } from "react";
import { getUrl } from "aws-amplify/storage";
import Link from "next/link";

export default function ProductCard({
  product,
}: {
  product: Schema["Product"];
}) {
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    const fetchUrl = async () => {
      const url = await getUrl({
        key: product.imageUrl!,
      });
      setImageUrl(url.url.href);
    };

    fetchUrl();
  }, []);
  return (
    <Card variation="elevated">
      <Flex alignItems="flex-start">
        <Image src={imageUrl} alt="Amplify" width="8rem" />
        <Flex direction="column" gap="xs">
          <Flex>
            <Badge variation="success">New</Badge>
          </Flex>
          <Text fontSize="large" fontWeight="semibold">
            {product.title}
          </Text>
          <Text color="font.tertiary">{product.description}</Text>
          <Text fontSize="large" color="secondary">
            ${(product.priceInCents / 100).toFixed(2)}
          </Text>
          <Flex>
            <StepperField
              label="Quantity"
              min={0}
              max={10}
              step={1}
              defaultValue={1}
              labelHidden
            />
            <Link href={`/product/${product.id}`}>
              <Button variation="primary">See More</Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
