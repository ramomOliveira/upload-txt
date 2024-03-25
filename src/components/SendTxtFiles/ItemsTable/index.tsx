import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import ListItems from "./ListItems";
import ImportProgress from "./ImportProgress";

export default function ItemsTable() {
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">EAN</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Mercadoria</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <ListItems />
        </Table>
      </TableContainer>

      <ImportProgress />
    </Box>
  );
}
