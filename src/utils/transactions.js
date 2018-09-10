// @flow
export function trimStatus(status: string = ''): string {
  let shortStatus = '';
  const trimmedStatus: string = status.toLowerCase().split(':')[0];
  shortStatus = trimmedStatus.split(' ')[0];
  if (trimmedStatus.startsWith('auth')) {
    shortStatus = 'auth';
  } else if (trimmedStatus.startsWith('card ver')) {
    shortStatus = 'card v.';
  } else if (trimmedStatus.startsWith('charge')) {
    shortStatus = 'chb';
  }

  // Append - 3d to status with 3d
  if (trimmedStatus.includes('3d')) {
    shortStatus = `${shortStatus} - 3d`;
  }

  return shortStatus;
}

type Status = {
  isAPM: boolean,
  isChargeBack: boolean,
};
export function getStatus(status: string = ''): Status {
  const trimmedStatus: string = status.toLowerCase().split(':')[0];
  return {
    isAPM: trimmedStatus.includes('apm'),
    isChargeBack: trimmedStatus.includes('chargeback'),
  };
}
