import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { PermissionStatus, PermissionRequester, RequesterName } from '../types';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components';
import { requestPermissionsAsync } from 'expo-music-library';
import { getPathWithConventionsCollapsed } from 'expo-router/build/fork/getPathFromState-forks';

const request = (requesters: PermissionRequester[]) => {
  return Promise.all(
    requesters.map(async requester => ({
      name: requester.name,
      status: await requester.request(),
    }))
  );
};

export type RequestPermissionWrapperProps = PropsWithChildren<{
  requesters: PermissionRequester[];
}>;

export const RequestPermissionWrapper: FC<RequestPermissionWrapperProps> = ({
  requesters,
  children,
}) => {
  const [status, setStatus] = useState<
    {
      status: PermissionStatus;
      name: RequesterName;
    }[]
  >(
    requesters.map(requester => ({
      name: requester.name,
      status: PermissionStatus.UNDETERMINED,
    }))
  );

  useEffect(() => {
    (async () => {
      setStatus(await request(requesters));
    })();
  }, []);

  const notGrantedPermission = status.find(
    stat => stat.status !== PermissionStatus.GRANTED
  );

  if (notGrantedPermission) {
    //TODO: RELOAD PERMISSION
    return (
      <TouchableOpacity
        onPress={() =>
          requestPermissionsAsync()
            .catch(e => console.log('e', e))
            .then(e => console.log('x', e))
        }
      >
        <ThemedText>Request</ThemedText>
      </TouchableOpacity>
    );
  }

  return <>{children}</>;
};
