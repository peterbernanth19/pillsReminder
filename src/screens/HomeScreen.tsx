/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PILLS_URL} from '../utils/constants';
import {convertDateFormat} from '../utils/helpers';
import PillCard from '../components/PillCard';

function HomeScreen({navigation}: any) {
  const [date, setDate] = useState<any>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [pills, setPills] = useState<any>();
  const [loading, setLoading] = useState(true);

  const options = {day: '2-digit', month: 'short', year: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-GB', options);

  useEffect(() => {
    fetchPills();
  }, [date]);

  const fetchPills = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch(PILLS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          selected_date: convertDateFormat(date),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const {data} = await response.json();
      setPills(data);
    } catch (error) {
      console.error('Error fetching pills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDatePickerOpen = () => setOpen(true);
  const handleLogout = () => navigation.replace('LoginScreen');

  return (
    <SafeAreaView style={styles.flexFill}>
      <StatusBar barStyle={'default'} />
      <View style={styles.container}>
        <View style={styles.headerWrap}>
          <Text style={styles.title}>My Dashboard</Text>
          <Pressable onPress={handleLogout}>
            <Image
              width={35}
              height={35}
              source={{uri: 'https://img.icons8.com/color-glass/48/exit.png'}}
              alt="logout"
            />
          </Pressable>
        </View>
        <View style={styles.datePickerWrap}>
          <Pressable style={styles.dateWrap} onPress={handleDatePickerOpen}>
            <View style={styles.dateHighlight}>
              <Text style={styles.dateHighlightTxt}>
                {formattedDate.substring(0, 2)}
              </Text>
            </View>
            <Text style={styles.dateTxt}>{formattedDate.substring(2)}</Text>
          </Pressable>
          <Pressable onPress={handleDatePickerOpen}>
            <Image
              width={60}
              height={60}
              source={{uri: 'https://img.icons8.com/arcade/64/calendar.png'}}
              alt="calendar"
            />
          </Pressable>
        </View>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loader} />
        ) : pills?.medicines_for_today.length === 0 ? (
          <View style={styles.loader}>
            <Text style={styles.dateTxt}>No Pills for this day!</Text>
          </View>
        ) : (
          <FlatList
            data={pills?.medicines_for_today}
            renderItem={({item}) => <PillCard item={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{paddingTop: 20}}
          />
        )}
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={dateCallbck => {
            setOpen(false);
            setDate(dateCallbck);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    marginHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#4285F4',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTxt: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateHighlight: {
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 13,
  },
  dateHighlightTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logout: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
