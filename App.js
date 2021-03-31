import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';


class App extends Component {
  state = { pokemons: [] };

  async componentDidMount() {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    const json = await response.json();
    this.setState({ pokemons: json.results });
  }


  render() {
    return (
      <SafeAreaView style={styles.main}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>Pokemons</Text>
        <FlatList
          data={this.state.pokemons}
          keyExtractor={(pokemon) => pokemon.name}
          contentContainerStyle={styles.pokemonList}
          renderItem={showPokemon}
        />
      </SafeAreaView>
    );
  }
};


const showPokemon = (pokemon) => {

  const { name, url } = pokemon.item;
  const pokemonNumber = url.replace(
    'https://pokeapi.co/api/v2/pokemon/', ''
  ).replace('/', '');
  const imageUrl = 'https://pokeres.bastionbot.org/images/pokemon/' + pokemonNumber + '.png';
  return (
    <View style={styles.pokemon}>
      <Image
        style={styles.pokemonImage}
        source={{ uri: imageUrl }}
      />
      <Text style={styles.pokemonName}>{capitalize(name)}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  // Main
  main: {
    backgroundColor: "#163643",
  },
  title: {
    fontSize: 40,
    paddingBottom: 10,
    fontFamily: "Roboto",
    fontWeight: "800",
    alignSelf: "center",
    color: "#f4a261",
  },
  // Pokemon
  pokemonList: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: "#264653",
    paddingBottom: 70,
  },
  pokemon: {
    flexDirection: 'column',
  },
  pokemonName: {
    color: "#e9c46a",
    fontSize: 20,
  },
  pokemonImage: {
    width: 70, height: 70,
  },


});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


export default App;