import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  View,
  Vibration,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import GlobalStyles from '../../styles/GlobalStyles';
import Loading from '../../components/atoms/Loading';
import TempCard from '../../components/molecules/Cards/Temperature';
import WeatherCard from '../../components/molecules/Cards/Weather';
import LightCard from '../../components/molecules/Cards/Light';
import prompt from 'react-native-prompt-android';
import Timestamp from '../../components/atoms/Timestamp';

const HomeScreen: React.FC = () => {
  const notAtHome = useSelector((state: RootState) => state.notAtHome);
  const data = useSelector((state: RootState) => state.data);
  const timestamp = useSelector((state: RootState) => state.timestamp);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
  }, [data]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRename = async (id: string, oldName: string) => {
    Vibration.vibrate(50);
    prompt(
      'Rename element',
      'Enter the new name',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async (name: string) => {
            if (name && name !== '') {
              await global.mqttPublish('rename', { id, name });
            }
          },
        },
      ],
      {
        cancelable: false,
        defaultValue: '',
        placeholder: oldName,
      }
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/background1.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.appContainer}
    >
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => global.mqttUpdate()}
          />
        }
      >
        {(data?.sensors?.length || data?.tradfri?.length) && (
          <View style={GlobalStyles.appContainer}>
            <Timestamp time={timestamp} />
            <View style={GlobalStyles.homeContainer}>
              {!!data?.sensors?.length &&
                data.sensors.map((element: any, index: any) => {
                  if (element.temperature && !element.presure) {
                    return (
                      <TempCard
                        key={index}
                        name={element.name ? element.name : 'UNNAMED'}
                        humidity={element.humidity}
                        hlog={element.hlog ? element.hlog : []}
                        hlogColor={'#3385ff'}
                        tlog={element.tlog ? element.tlog : []}
                        tlogColor={'#ff8533'}
                        temperature={element.temperature}
                        onRename={() => handleRename(element.id, element.name)}
                      />
                    );
                  }
                  if (element.temperature && element.presure) {
                    return (
                      <WeatherCard
                        key={index}
                        name={element.name ? element.name : 'UNNAMED'}
                        humidity={element.humidity}
                        hlog={element.hlog ? element.hlog : undefined}
                        hlogColor={'#3385ff'}
                        temperature={element.temperature}
                        tlog={element.tlog ? element.tlog : undefined}
                        tlogColor={'#ff8533'}
                        pressure={element.presure}
                        plog={element.plog ? element.plog : undefined}
                        plogColor={'#ace600'}
                        altitude={element.altitude}
                        onRename={() => handleRename(element.id, element.name)}
                      />
                    );
                  }
                })}
              {!!data?.tradfri?.length &&
                data.tradfri.map((element: any, index: any) => {
                  if (element.type.includes('TRADFRI')) {
                    return (
                      <LightCard
                        key={index}
                        disabled={notAtHome}
                        name={element.name}
                        onRename={() => handleRename(element.id, element.name)}
                        onSwitch={() =>
                          global.mqttPublish('set', {
                            id: element.id,
                            on: !element.on,
                          })
                        }
                        status={element.on}
                      />
                    );
                  }
                })}
            </View>
          </View>
        )}
        {!data?.sensors?.length && !data?.tradfri?.length && (
          <View style={GlobalStyles.loadingContainer}>
            <Loading size="large" />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
