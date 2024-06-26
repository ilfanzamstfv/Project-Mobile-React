import { useFocusEffect } from "@react-navigation/native";
import Axios from "axios";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as React from "react";
import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default Listabsensi = () => {
  const [data, setData] = useState([]);

  const generatePdf = async () => {
    let html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <style>
          body {
            align-items: center;
            text-align: center;
            justify-content: center;
          }

          h1 {
            text-align: center;
          }

          table {
            margin: auto;
          }

          th, td {
            text-align: center;
            padding: 8px;
            font-size: 20px;
          }

          th {
            text-align: center;
          }

          tr {
            text-align: center;
          }
        </style>
        <body>
          <h1> Daftar Mahasiswa </h1>
          <table>
            <tr>
              <th>Nama</th>
              <th>Nim</th>
            </tr>
    `;
    data.forEach((item) => {
      html += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.nim}</td>
        </tr>
      `;
    });

    html += `
          </table>
        </body>
      </html>
    `;

    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = () => {
    Axios.get("https://definite-legal-eel.ngrok-free.app/users")
      .then((res) => {
        console.log("res get data: ", res);
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Nama</Text>
        <Text style={styles.heading}>NIM</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.body}>
            <Text style={styles.isiData}>{item.nama}</Text>
            <Text style={styles.isiData}>{item.nim}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="save to pdf"
        color='black'
        onPress={generatePdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginEnd: 50,
    marginBottom: 20,
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
  },
  isiData: {
    fontSize: 15,
    justifyContent: "space-between",
  },
});
