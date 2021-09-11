import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './ListElement.style';

export type Props = {
  id: string;
  name?: string;
  onPress: any;
};

const ListElement: React.FC<Props> = ({ id, name, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(id, name)}
    >
      {!!id && <Text style={styles.id}>{`${id}: `}</Text>}
      <Text style={name === 'unnamed' ? styles.noname : styles.name}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};
export default ListElement;
