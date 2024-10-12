import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'

const CustomRBSheet = (props) => {
  return (
    <RBSheet
    ref={props.Sheet}
    useNativeDriver={false}
    height={350}
    openDuration={250}
    keyboardAvoidingViewEnabled={true}
    keyboardVerticalOffset={10} 
    customStyles={{
      draggableIcon: { backgroundColor: '#000' },
      container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      }
    }}
    customModalProps={{
      animationType: 'slide',
      statusBarTranslucent: true
    }}
    customAvoidingViewProps={{
      enabled: true,
      behavior: 'padding',
    }}>
      <KeyboardAvoidingView
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
style={{ flex: 1 }}
>
        {props.View}
        </KeyboardAvoidingView>
      </RBSheet>

  )
}

export default CustomRBSheet

const styles = StyleSheet.create({})