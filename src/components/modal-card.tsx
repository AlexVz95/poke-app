import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import SearchApi from "../services/pokemonService";
import CardPokemon from "./card";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type Props = {
  endpoint: string;
  name: string;
  open: boolean;
  handleOpen: any;
  handleClose: any;
};

interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: any;
  names: any;
  effect_entries: any;
  effect_changes: any;
  flavor_text_entries: any;
  pokemon: any;
}

export default function CustomizedDialogs(props: Props) {
  const { name, endpoint, open, handleClose } = props;

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <CardPokemon name={name} endpoint={endpoint}></CardPokemon>
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
