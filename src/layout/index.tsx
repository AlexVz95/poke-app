import React, { useState, useEffect } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./listItems";
import SearchApi from "../services/pokemonService";
import ImgMediaCard from "../components/custom-card";
import useStyles from './style'
import Copyright from '../components/copyright'

interface Pokemon {
  name: string;
  url: string;
}

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [dataPokemon, setDataPokemon] = useState<null | Pokemon[]>(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    const fetchData = async () => {
      const data = await SearchApi.search();
      setDataPokemon(data.results);
    };

    fetchData();
  }, []);

  function FormRow() {
    if (dataPokemon)
      return (
        <React.Fragment>
          <Grid item xs={4}>
            <ImgMediaCard
              name={dataPokemon[0].name}
              endpoint={dataPokemon[0].url}
            ></ImgMediaCard>
          </Grid>
          <Grid item xs={4}>
            <ImgMediaCard
              name={dataPokemon[1].name}
              endpoint={dataPokemon[1].url}
            ></ImgMediaCard>
          </Grid>
          <Grid item xs={4}>
            <ImgMediaCard
              name={dataPokemon[2].name}
              endpoint={dataPokemon[2].url}
            ></ImgMediaCard>
          </Grid>
        </React.Fragment>
      );
    else return null;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {dataPokemon && dataPokemon.length > 0 ? (
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        ) : null}
      </main>
    </div>
  );
}
