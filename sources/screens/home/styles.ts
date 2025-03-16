import { createStyle } from '@/utils/styles';

export const homeScreenStyles = createStyle({
  headerContainer: {
    padding: 20,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  avatarContainer: {
    height: 42,
    width: 42,
    borderRadius: 50,
    padding: 1,
  },
  avatarImage: {
    borderRadius: 50,
    height: 40,
    width: 40,
    borderWidth: 2,
  },
  searchContainer: {
    marginLeft: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    gap: 10,
    marginRight: 15,
    justifyContent: 'space-between',
  },
});
