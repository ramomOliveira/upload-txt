import { Box, Button, LinearProgress, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSendTxtFiles } from "../../SendTxtFilesContext";

export default function ImportProgress() {
  const { currentIndex, newListItems } = useSendTxtFiles();
  const [progress, setProgress] = useState(0);

  const checkThereAnyError = newListItems.some(
    (item) => item.status !== "SUCCESS"
  );

  const adjustedIndex =
    currentIndex > newListItems.length ? newListItems.length : currentIndex;

  useEffect(() => {
    const newProgress = (adjustedIndex / newListItems.length) * 100;
    setProgress(newProgress);
  }, [currentIndex, adjustedIndex, newListItems.length]);

  return currentIndex < newListItems.length ? (
    <Box mt={4}>
      <Typography>Andamento da importação do seu arquivo:</Typography>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {adjustedIndex}/{newListItems.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={4}
      style={{
        textAlign: "center",
      }}
    >
      <Typography>
        {checkThereAnyError
          ? "Arquivos processados, mas algumas mercadorias não foram adicionadas ao pedido. Confira acima o retorno de cada item."
          : "Arquivo processado com sucesso! Confira acima o retorno de cada item."}
      </Typography>

      <Typography>
        <Button variant="text">Clique aqui</Button> para acessar o seu pedido.
      </Typography>
    </Box>
  );
}
