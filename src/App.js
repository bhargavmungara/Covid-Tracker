import React from "react";
import Cards from "./components/Cards.jsx";
import Chart from "./components/Chart.jsx";
import CountryPicker from "./components/CountryPicker.jsx";
import Footer from "./components/Footer.jsx";
import { fetchData } from "./api/";
import styles from "./App.module.css";

class App extends React.Component {
  state = {
    data: {},
    country: ""
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async country => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>COVID-19 Tracker</h1>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <Footer />
      </div>
    );
  }
}

export default App;
