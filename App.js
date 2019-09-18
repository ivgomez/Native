import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

const App = () => {
  const [device, setDevice] = useState();

  const discoverUnpairedDevices = async () => {
    try {
      //await BluetoothSerial.requestEnable();
      const unpairedDevices = BluetoothSerial.listUnpaired().then(dev => {
        const foundUnpaired = dev.find(d => d.name === 'Bluno');
        if (foundUnpaired) {
          console.log('dev unpair', foundUnpaired);
          setDevice(foundUnpaired);
        }
      });
      const pairedDevices = BluetoothSerial.list().then(dev => {
        const foundPaired = dev.find(d => d.name === 'Bluno');
        if (foundPaired) {
          console.log('dev pair', foundPaired);
          setDevice(foundUnpaired);
        }
      });
    } catch (e) {
      //Toast.showShortBottom(e.message);
    }
  };

  const pair = () => {
    console.log('paired', device);
    BluetoothSerial.pairDevice(device.id).then(devic => {
      console.log('paired');
      BluetoothSerial.connect(devic.id).then(d => {
        console.log('connected ', d);
      });
    });
  };

  const connect = () => {
    BluetoothSerial.connect(device.id).then(d => {
      console.log('connected ', d);
    });
  };

  const write1 = () => {
    BluetoothSerial.write('a').then(d => {
      console.log('writed ', d);
    });
  };

  const write2 = () => {
    BluetoothSerial.write('b').then(d => {
      console.log('writed ', d);
    });
  };

  const write3 = () => {
    BluetoothSerial.writeToDevice('a', device.id).then(d => {
      console.log('writed ', d);
    });
  };

  const write4 = () => {
    BluetoothSerial.writeToDevice('b', device.id).then(d => {
      console.log('writed ', d);
    });
  };

  useEffect(() => {
    discoverUnpairedDevices();
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Bluetooth</Text>
      <Text>
        {device != undefined ? `${device.name} founded` : 'Searching device...'}
      </Text>
      <Button title="pair" onPress={pair}></Button>
      <Button title="connect" onPress={connect}></Button>
      <Button title="a" onPress={write1}></Button>
      <Button title="b" onPress={write2}></Button>
      {/* <Button title="a" onPress={write3}></Button>
      <Button title="b" onPress={write4}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default App;
