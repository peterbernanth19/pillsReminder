import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const PillCard = ({item}: any) => {
  return (
    <>
      {item.usermedicineshedule.schedule_time.map(
        (schedule: any, index: any) => (
          <View key={`${index}_id`} style={styles.medicineCard}>
            <View style={styles.medicineNameBoxWrap}>
              <View style={styles.medicineNameWrap}>
                <Text style={styles.medicineName}>{item.medicine_name}</Text>
                <Text style={styles.medicineDoseName}>{schedule.dose}</Text>
                <Text style={styles.medicineDoseName}>
                  {item.unit.short_name}
                </Text>
              </View>
              <Image
                width={50}
                height={50}
                source={{
                  uri:
                    index % 2 === 0
                      ? 'https://img.icons8.com/arcade/64/pills.png'
                      : 'https://img.icons8.com/external-filled-outline-perfect-kalash/64/external-injection-healthcare-and-medicine-filled-outline-perfect-kalash.png',
                }}
                alt="pills"
              />
            </View>
            <View style={styles.medicineSubNameWrap}>
              <View style={styles.medicineNameWrap}>
                <Text style={styles.medicineTime}>{schedule.time_slot}</Text>
              </View>
              <Text style={styles.medicineSubName}>
                {item.usermedicineshedule.after_or_before}
              </Text>
            </View>
          </View>
        ),
      )}
    </>
  );
};

const styles = StyleSheet.create({
  medicineCard: {
    backgroundColor: '#4285F4',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 10,
  },
  medicineName: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'capitalize',
    paddingRight: 10,
    marginBottom: 10,
  },
  medicineDoseName: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  medicineTime: {
    color: 'yellow',
    fontSize: 15,
  },
  medicineSubName: {
    color: '#fff',
    fontSize: 15,
    textTransform: 'capitalize',
    paddingRight: 10,
    paddingTop: 5,
  },
  medicineNameBoxWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicineSubNameWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicineNameWrap: {
    flexDirection: 'row',
  },
});

export default PillCard;
