import React from 'react';
import { ScrollView } from 'react-native';
import { Modal, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GlobalAspect from '../../../styles/GlobalAspect';
import styles from './Modal.styles';

export type Props = {
  visible: boolean;
  title?: string;
  onClose: any;
};

const ModalWindow: React.FC<Props> = ({
  children,
  onClose,
  title,
  visible,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => onClose}
      >
        <View style={styles.modalView}>
          <View style={styles.closeContainer}>
            <Pressable onPress={onClose}>
              <Icon
                name={'close'}
                size={GlobalAspect.font.size.big}
                color={GlobalAspect.color.textDisabled}
              />
            </Pressable>
          </View>
          {!!title && <Text style={styles.text}>{title}</Text>}
          <ScrollView style={styles.scrollView}>
            <View style={styles.modalContent}>{children}</View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default ModalWindow;
