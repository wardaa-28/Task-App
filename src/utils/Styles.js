import { StyleSheet } from 'react-native';
import newTheme from './Contants';

const Styles = StyleSheet.create({
    mainBox:{ flex: 1, backgroundColor: newTheme.main, padding: 10 },
    heading:{ fontSize: 30, fontFamily: newTheme.regular, textAlign: 'left', color: newTheme.white },
  mediumText:{fontSize: 18,color: newTheme.black,fontFamily:newTheme.medium},
  gradient:{ borderRadius: 20, height: 150, width: '100%' },
  img1:{ width: 100, height: 120, position: 'relative', top: 30, right: 25 },
  img2:{ width: 90, height: 80, position: 'relative', top: 15, right: 35 },
  flatlistView:{ height: 100, flex: 1, margin: 10 },
  align:{justifyContent: 'center',alignItems: 'center',flex: 1,},
  input: { borderWidth: 1, borderColor: newTheme.color1, borderRadius: 10, padding: 10,margin: 10, width:'95%', color:newTheme.black},
  bottomSheetContainer: { backgroundColor: newTheme.white, padding: 20,  },

});
export default Styles;
