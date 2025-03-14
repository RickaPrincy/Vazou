import { FC, PropsWithChildren, useEffect, useState } from "react"
import { PermissionStatus, PermissionRequester, RequesterName } from "@/permissions"

const request = (requesters: PermissionRequester[]) => {
  return Promise.all(
    requesters.map(async (requester) => ({
      name: requester.name,
      status: await requester.request()
    }))
  )
}

export type RequestPermissionWrapperProps = PropsWithChildren<{
  requesters: PermissionRequester[];
}>

export const RequestPermissionWrapper: FC<RequestPermissionWrapperProps> = ({ requesters, children }) => {
  const [status, setStatus] = useState<{
    status: PermissionStatus;
    name: RequesterName;
  }[]>(
    requesters.map(requester => ({ name: requester.name, status: PermissionStatus.UNDETERMINED }))
  );

  useEffect(() => {
    (async () => {
      setStatus(await request(requesters))
    })();
  }, []);

  const notGrantedPermission = status.find(stat => stat.status !== PermissionStatus.GRANTED);

  if (notGrantedPermission) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}
