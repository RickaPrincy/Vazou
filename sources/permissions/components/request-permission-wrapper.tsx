import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { PermissionStatus, PermissionRequester, RequesterName } from '../types';
import { Screen, ThemedText } from '@/components';
import { Button } from '@/components/buttons';

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

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  useEffect(() => {
    const checkPermissions = async () => {
      setStatus(await request(requesters));
    };

    checkPermissions();
  }, []);

  const notGrantedPermission = status.find(
    stat => stat.status !== PermissionStatus.GRANTED
  );

  const handleRequestAgain = async () => {
    setIsRequesting(true);
    const newStatus = await request(requesters);
    setStatus(newStatus);
    setIsRequesting(false);
  };

  if (notGrantedPermission) {
    return (
      <Screen
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ThemedText>You need to grant the following permission(s): </ThemedText>
        {status
          .filter(stat => stat.status !== PermissionStatus.GRANTED)
          .map(stat => (
            <ThemedText key={stat.name}>{stat.name}</ThemedText>
          ))}
        <Button
          style={{ marginTop: 10 }}
          onPress={handleRequestAgain}
          disabled={isRequesting}
        >
          {isRequesting ? 'Requesting...' : 'Request Permission Again'}
        </Button>
        {isRequesting && <ActivityIndicator />}
      </Screen>
    );
  }

  return <>{children}</>;
};
