import React from 'react';
import { Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GlobalAspect from '../../../styles/GlobalAspect';
import styles from './refreshButton.styles';

export type Props = {
  onRefresh: any;
};

const RefreshButton: React.FC<Props> = ({ onRefresh }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onRefresh}>
        <Icon
          name={'refresh'}
          size={GlobalAspect.font.size.big}
          color={GlobalAspect.color.textDisabled}
        />
      </Pressable>
    </View>
  );
};

export default RefreshButton;
