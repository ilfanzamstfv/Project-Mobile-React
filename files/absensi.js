import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Axios from 'axios';
import constants from 'expo-constants';

export default Absensi = () => {
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState();
  const [users, setUsers] = useState([]);
  const [button, setButton] = useState("SUBMIT");
  const [selectedUser, setSelectedUser] = useState({});

  const Item = ({nama, nim, onPress, onDelete}) => {
    return(
        <View style={styles.dataview}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.desc}>
                <Text style={styles.descName}>{nama}</Text>
                <Text style={styles.descNim}>{nim}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.delete}>DELETE</Text>
          </TouchableOpacity>
        </View>
    );
  };

  const deleteItem = (item) => {
    console.log(item);
    Axios.delete(`https://definite-legal-eel.ngrok-free.app/users/${item.id}`)
    .then(res => {
      console.log('res delete: ', res);
      getData();
    })
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    const data = {
      nama,
      nim,
    };
    if(button === 'SUBMIT'){
        Axios.post('https://definite-legal-eel.ngrok-free.app/users', data)
        .then(res => {
        console.log('res: ', res);
        setNama("");
        setNim("");
        getData();
      })
      .catch(error => {
        console.error('error fetching data:', error);
      })
    }else if (button === 'UPDATE'){
        Axios.put(`https://definite-legal-eel.ngrok-free.app/users/${selectedUser.id}`, data)
        .then(res => {
          console.log('res update: ', res);
          setNama("");
          setNim("");
          getData();
          setButton("SUBMIT");
        })
    }  
  };

  const selectforUpdate = (item) => {
    console.log('selected item: ',item);
    setSelectedUser(item);
    setNama(item.nama);
    setNim(item.nim);
    setButton("UPDATE");
  }

  const getData = () => {
    Axios.get('https://definite-legal-eel.ngrok-free.app/users')
    .then(res => {
      console.log('res get data: ', res);
      setUsers(res.data);
    })
  };

  return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Data Mahasiswa </Text>
        </View>

        <View style={styles.body}>
          <View style={styles.form}>
            <TextInput
              placeholder="Nama Mahasiswa"
              value={nama}
              onChangeText={(value) => setNama(value)}
              style={styles.inputStyle}
            />
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="NIM"
              value={nim}
              onChangeText={(value) => setNim(value)}
              style={styles.inputStyle}
            />
          </View>
          <View style={styles.buttonSubmit}>
            <Button title={button} onPress={handleSubmit} color="black" />
          </View>
          <View style={styles.line} />
            {users.map(user => {
              return ( 
                  <Item 
                    key={user.id} 
                    nama={user.nama} 
                    nim={user.nim} 
                    onPress={() => selectforUpdate(user)}
                    onDelete={() => Alert.alert(
                      'Delete Data', 'Apakah anda ingin menghapus data ini?', 
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('button cancel')
                      },
                      {
                        text: 'Hapus',
                        onPress: () => deleteItem(user)
                      }
                    ])}
                  />
              )
            })}
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: constants.statusBarHeight
  },

  header: {
    backgroundColor: 'black',
    padding: 20,
  },

  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  body: {
    padding: 20,
  },

  form: {
    padding: 10,
  },

  inputStyle: {
    height: 40,
    width: 260,
    borderRadius: 5,
    padding: 10,
    borderWidth: 2,
    alignSelf: 'center',
  },

  buttonSubmit: {
    height: 60,
    width: 100,
    padding: 10,
    alignSelf: 'center',
  },

  line:{
    height: 2,
    backgroundColor: 'black',
  },

  dataview: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  desc: {
    flex: 1,
  },

  descName: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  descNim: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  delete: {
    color:'red',
    fontWeight:'bold',
    textAlign:'right',
  },
});
