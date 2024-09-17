import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { getWeatherForecast } from '../services/weatherService';

const WeatherForecast = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) {
      setErrorMessage('Please enter a city name.');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    try {
      const forecast = await getWeatherForecast(city);
      setWeatherData(forecast);
    } catch (error) {
      console.error('Error fetching weather', error);
      setWeatherData([]); 
      setErrorMessage('Error fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather in your city</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" color="#FFA500" onPress={fetchWeather} />
      {loading && <Text>Loading...</Text>}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      
      <ScrollView>
        {weatherData.length > 0 && weatherData.map((item, index) => (
          <View key={index} style={styles.cardView}>
            <Table borderStyle={styles.tableBorder}>
              <Row
                data={[`Date: ${formatDate(item.dt_txt)}`]} 
                style={styles.date}
                textStyle={styles.headerText}
              />

              <Row
                data={['Temperature']}
                style={styles.header}
                textStyle={styles.headerText}
              />
              <Row
                data={['Min', 'Max']}
                style={styles.header}
                textStyle={styles.headerText}
              />
              
              
              <TableWrapper style={styles.row}>
                <Cell data={item.main.temp_min.toFixed(2) + ' °C'} style={styles.cell} textStyle={styles.text} />
                <Cell data={item.main.temp_max.toFixed(2) + ' °C'} style={styles.cell} textStyle={styles.text} />
              </TableWrapper>

              <TableWrapper style={styles.row}>
                <Cell data="Pressure" style={styles.cellFull} textStyle={styles.text} />
                <Cell data={item.main.pressure.toFixed(2) + ' kPa'} style={styles.cellFull} textStyle={styles.text} />
              </TableWrapper>

              <TableWrapper style={styles.row}>
                <Cell data="Humidity" style={styles.cellFull} textStyle={styles.text} />
                <Cell data={item.main.humidity.toFixed(2) + ' %'} style={styles.cellFull} textStyle={styles.text} />
              </TableWrapper>
            </Table>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color:'#ffa500'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  cardView: {
    marginBottom: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'#FFA500',
    color: '#000',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  header: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  cellFull: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#c8e1ff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default WeatherForecast;
