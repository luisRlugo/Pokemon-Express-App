const React = require("react");
const pokemon = require("../models/Pokemon");
const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};
const Nav = require("./components/Nav");

class Index extends React.Component {
  render() {
    const { pokemon } = this.props;
    return (
      <div>
        <h1 style={myStyle}>See All The Pokemon!</h1>
        <Nav link="/pokemon/new" text="Add New Pokemon" />
        <ul>
          {pokemon.map((pokemon, i) => {
            return (
              <li key={i}>
                <a href={`/pokemon/${pokemon._id}`}>{pokemon.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
