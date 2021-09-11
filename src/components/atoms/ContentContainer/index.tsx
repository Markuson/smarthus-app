import React from 'react';
import { View } from 'react-native';
import styles from './ContentContainer.style';

export type Props = {};

const ContentContainer: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};
export default ContentContainer;
