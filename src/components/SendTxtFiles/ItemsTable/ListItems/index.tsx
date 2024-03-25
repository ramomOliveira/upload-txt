import { useSendTxtFiles } from "../../SendTxtFilesContext";
import { TableRow, TableCell, TableBody } from "@material-ui/core";

type StatusTranslationType = {
  [key: string]: string;
};

const STATUS_TRANSLATIONS: StatusTranslationType = {
  LACKING: "⚠️ Mercadoria em falta",
  SUCCESS: "✅ Mercadoria adicionada com sucesso",
  NONEXISTENT: "⚠️ Mercadoria inexistente",
  SENDING: "🚀 Enviando...",
};

export default function ListItems() {
  const { newListItems } = useSendTxtFiles();

  return (
    <TableBody>
      {newListItems.map((row, index) => (
        <TableRow key={row.code}>
          <TableCell
            component="th"
            align="center"
            style={{
              borderRight: "1px solid #E0E0E0",
            }}
          >
            {index + 1}
          </TableCell>
          <TableCell
            align="center"
            style={{
              borderRight: "1px solid #E0E0E0",
            }}
          >
            {row.code}
          </TableCell>
          <TableCell
            align="center"
            style={{
              borderRight: "1px solid #E0E0E0",
            }}
          >
            {row.amount}
          </TableCell>
          <TableCell
            align="left"
            style={{
              borderRight: "1px solid #E0E0E0",
            }}
          >
            {row.name}
          </TableCell>
          <TableCell
            align="left"
            style={{
              borderRight: "1px solid #E0E0E0",
            }}
          >
            {STATUS_TRANSLATIONS[row.status]}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
