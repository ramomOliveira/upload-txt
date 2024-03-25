import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import { useState } from "react";
import { useSendTxtFiles } from "../SendTxtFilesContext";

type ListItem = {
  code: string;
  amount: number;
};

export default function ChooseFile() {
  const { setListItems } = useSendTxtFiles();

  const [fileList, setFileList] = useState<
    { name: string; content: string; size: number }[]
  >([]);

  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      console.error("Arquivos inválidos.");
      return;
    }

    setIsLoadingUpload(true);

    const filesArray = Array.from(files);
    const readFilePromises = filesArray.map((file) => {
      return new Promise<{ name: string; content: string; size: number }>(
        (resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result as string;
            resolve({ name: file.name, content, size: file.size });
          };
          reader.onerror = () => reject();
          reader.readAsText(file);
        }
      );
    });

    setTimeout(() => {
      Promise.all(readFilePromises)
        .then((fileContents) => {
          setFileList(fileContents);
          setIsLoadingUpload(false);
          parseFileContent();
        })
        .catch(() => {
          console.error("Erro ao ler arquivos.");
          setIsLoadingUpload(false);
        });
    }, 1000);
  };

  const parseFileContent = () => {
    const allItems: ListItem[] = [];
    fileList.forEach((file) => {
      const lines = file.content.split("\n");
      const data = lines
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .map((line) => {
          const [code, amount] = line.split(";");
          return { code, amount: parseInt(amount, 10) };
        });
      allItems.push(...data);
    });

    setListItems(allItems);
  };

  const handleDeleteFile = (index: number) => {
    const newList = fileList.filter((_, i) => i !== index);
    setFileList(newList);
  };

  return (
    <Container maxWidth="sm">
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        style={{
          gap: "16px",
        }}
      >
        <Typography variant="h5">Importar arquivo de pedido</Typography>

        <Typography variant="body1">
          Envie um arquivo .txt com os EANs e quantidade dos produtos.
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          style={{
            gap: "16px",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            style={{
              gap: "16px",
            }}
          >
            <Link
              href="https://v4.mui.com/pt/components/box/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Clique aqui para baixar um arquivo modelo
            </Link>

            <input
              id="contained-button-file"
              multiple
              type="file"
              style={{
                display: "none",
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleFileUpload(event)
              }
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                style={{
                  padding: "30px 16px",
                }}
                fullWidth
              >
                Escolher arquivo
              </Button>
            </label>
          </Box>

          {isLoadingUpload && (
            <Box
              display="flex"
              alignItems="center"
              style={{
                gap: "16px",
              }}
            >
              <CircularProgress size={24} />
              <Typography color="primary" variant="caption">
                Fazendo upload...
              </Typography>
            </Box>
          )}

          {fileList.map((file, index) => (
            <Box display="flex" justifyContent="space-between">
              <Box
                key={file.name}
                display="flex"
                alignItems="center"
                style={{
                  gap: "16px",
                }}
              >
                <DescriptionOutlinedIcon
                  style={{
                    color: "gray",
                    width: "32px",
                    height: "32px",
                  }}
                />
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{file.name}</strong>
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {file.size} bytes
                  </Typography>
                </Box>
              </Box>

              <Tooltip title="Deletar arquivo">
                <IconButton onClick={() => handleDeleteFile(index)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ))}

          <Button variant="contained" onClick={parseFileContent}>
            Enviar arquivo
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
