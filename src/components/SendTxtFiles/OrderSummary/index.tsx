import { Box, Typography } from "@material-ui/core";
import { useSendTxtFiles } from "../SendTxtFilesContext";

export default function OrderSummary() {
  const { newListItems } = useSendTxtFiles();

  const addThePriceByCategory = newListItems.reduce(
    (acc: { [key: string]: number }, item) => {
      if (item.category) {
        if (acc[item.category]) {
          acc[item.category] += item.price * item.amount;
        } else {
          acc[item.category] = item.price * item.amount;
        }
      }
      return acc;
    },
    {}
  );

  return (
    <Box
      display="flex"
      width="100%"
      style={{
        gap: "16px",
      }}
    >
      <Box>
        <Typography
          style={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          Seu pedido:
        </Typography>
        <Typography variant="body2">#29283777</Typography>
      </Box>

      <Box
        display="flex"
        width="100%"
        style={{
          gap: "16px",
        }}
      >
        {Object.keys(addThePriceByCategory).map((category) => (
          <Box
            key={category}
            display="flex"
            flexDirection="column"
            width="100%"
          >
            <Typography
              style={{
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {category}
            </Typography>
            <Typography
              style={{
                whiteSpace: "nowrap",
              }}
            >
              R$ {addThePriceByCategory[category].toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box>
        <Typography
          style={{
            fontWeight: "bold",
          }}
        >
          Total:
        </Typography>
        <Typography
          style={{
            whiteSpace: "nowrap",
          }}
        >
          R${" "}
          {Object.values(addThePriceByCategory)
            .reduce((acc, price) => acc + price, 0)
            .toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}
