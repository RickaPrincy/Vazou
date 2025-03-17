import { createStyle } from '@/utils/styles';

export const sheetModalStyles = createStyle({
  container: {
    flex: 1,
    bottom: 0,
    padding: 20,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#00000050',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  fullHeight: {
    height: '100%',
  },
});
