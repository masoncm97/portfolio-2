/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { DeviceSize } from '@/types/devices'

const useIsDeviceSize = (
  width: number | undefined,
  deviceSize?: DeviceSize,
): boolean | undefined => {
  if (width == undefined) {
    return undefined
  }
  return deviceSize == undefined
    ? width < DeviceSize.lg
    : width < deviceSize.valueOf()
}

export default useIsDeviceSize
