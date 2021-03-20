import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SearchApi from "../services/pokemonService";
import SimpleModal from "./modal";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

type Props = {
  name: string;
  endpoint: string;
};

interface PokemonData {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: string;
  abilities: any;
  forms: any;
  game_indices: any;
  held_items: any;
  location_area_encounters: string;
  moves: any;
  sprites: any;
  species: any;
  stats: any;
  types: any;
}

export default function ImgMediaCard(props: Props) {
  const { name, endpoint } = props;
  const classes = useStyles();
  const [dataPokemon, setDataPokemon] = useState<null | PokemonData>(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await SearchApi.searchPokemon(endpoint);
      setDataPokemon(data);
      console.log(data);
      console.log(dataPokemon);
    };

    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          {dataPokemon ? (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="280"
              image={dataPokemon.sprites.front_shiny}
              title="Contemplative Reptile"
            />
          ) : null}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpen}>
            Ver habilidades
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      {dataPokemon ? (
        <SimpleModal
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
          endpoint={dataPokemon?.abilities[0].ability.url}
        ></SimpleModal>
      ) : null}
    </>
  );
}
