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
    width: 400,
  },
});

type Props = {
  name: string;
  endpoint: string;
};

interface Move {
  name: string;
  url: string;
}

interface MoveObj {
  move: Move;
}

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
  moves: MoveObj[];
  sprites: any;
  species: any;
  stats: any;
  types: any;
}

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

interface MoveObject {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  contest_combos: any;
  contest_type: any;
  contest_effect: any;
  damage_class: any;
  effect_entries: any;
  effect_changes: any;
  flavor_text_entries: any;
  generation: any;
  machines: any;
  meta: any;
  names: any;
  past_values: any;
  stat_changes: any;
  super_contest_effect: any;
  target: any;
  type: any;
}

type PropsDataPokemonList = {
  data: MoveObj
}

const DataPokemonList = (props: PropsDataPokemonList)=> {

  const [description, setDescription] = useState<string>("");

  const getDescriptionMove = async  (url: any) => {
    const moveData = await SearchApi.searchPokemon(url);
    setDescription(moveData?.effect_entries[0].effect);
  };

  useEffect(() => {
    getDescriptionMove(props.data.move.url)
  }, [])

  return (
    <Typography gutterBottom>
        {props.data.move.name}:{" "}
      {`${ description}`}
    </Typography>
  );
}

export default function CardPokemon(props: Props) {
  const { name, endpoint } = props;
  const classes = useStyles();
  const [dataPokemon, setDataPokemon] = useState<null | PokemonData>(null);
  const [abilityPokemon, setAbilityPokemon] = useState<null | Ability>(null);
  const [movePokemon, setMovePokemon] = useState<null | MoveObject>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await SearchApi.searchPokemon(endpoint);
      setDataPokemon(data);

      const abilityData = await SearchApi.searchPokemon(
        data?.abilities[0].ability.url
      );
      setAbilityPokemon(abilityData);

      const moveData = await SearchApi.searchPokemon(data?.moves[0].move.url);
      setMovePokemon(moveData);
      console.log(data);
      console.log(abilityData);
      console.log(moveData);
    };

    fetchData();
  }, []);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {dataPokemon ? (
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="280"
            image={dataPokemon.sprites.front_default}
            title="Contemplative Reptile"
          />
        ) : null}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom>
            {`${
              dataPokemon ? `${dataPokemon?.abilities[0].ability.name}:` : ""
            }`}{" "}
            {abilityPokemon ? abilityPokemon.effect_entries[1].effect : ""}
          </Typography>
          <Typography gutterBottom>Moves</Typography>

          {dataPokemon &&
            dataPokemon?.moves.map( (element) => {
              return (
                <DataPokemonList data={element}/>
              );
            })}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
