const React = require("react");
const Nav = require("./components/Nav");
const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};

class New extends React.Component {
  render() {
    return (
      <div>
        <Nav link="/pokemon" text="Home" />
        <h1 style={myStyle}>Add a New Pokemon!</h1>
        <form action="/pokemon" method="POST">
          Name: <input type="text" name="name" /> <br />
          <input type="submit" value="Add Pokemon" />
        </form>
      </div>
    );
  }
}

module.exports = New;
