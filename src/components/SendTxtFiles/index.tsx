import { Box, Container } from "@material-ui/core";
import ChooseFileM from "./ChooseFile";
import ItemsTable from "./ItemsTable";
import OrderSummary from "./OrderSummary";
import { useSendTxtFiles } from "./SendTxtFilesContext";

export default function SendTxtFile() {
  const { newListItems } = useSendTxtFiles();

  return (
    <Container maxWidth="md">
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        style={{
          gap: "16px",
        }}
      >
        <ChooseFileM />

        {newListItems.length > 0 && (
          <>
            <ItemsTable />
            <OrderSummary />
          </>
        )}
      </Box>
    </Container>
  );
}
