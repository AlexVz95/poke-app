import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchApi from "../services/pokemonService";
import Button from "@material-ui/core/Button";
import ModalCard from "./modal-card";

interface PokemonTable {
  count: number;
  next: string;
  previous: string;
  results: any;
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "id", label: "Id", minWidth: 25 },
  { id: "name", label: "Nombre", minWidth: 170 },
  { id: "url", label: "Ver detalle", minWidth: 40 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

interface Pokemon {
  name: string;
  url: string;
}

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataPokemon, setDataPokemon] = useState<null | Pokemon[]>(null);

  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await SearchApi.searchData();
      setDataPokemon(data.results);
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setUrl("");
  };

  const handleClick = (name: string, url) => {
    setName(name);
    setUrl(url);
    handleOpen();
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPokemon &&
                dataPokemon
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column, idx) => {
                          const value =
                            column.id === "id" ? index + 1 : row[column.id];

                          if (column.id === "url") {
                            return (
                              <TableCell key={idx} align={column.align}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleClick(row.name, row.url)}
                                >
                                  Ver detalle
                                </Button>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={idx} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataPokemon ? dataPokemon.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {name !== "" && url !== "" ? (
        <ModalCard
          name={name}
          endpoint={url}
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        ></ModalCard>
      ) : null}
    </>
  );
}
