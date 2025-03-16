import { createStyle } from '@/utils/styles';

export const homeScreenStyles = createStyle({
  headerContainer: {
    borderRadius: 15,
    alignItems: 'flex-start',
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
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
});
