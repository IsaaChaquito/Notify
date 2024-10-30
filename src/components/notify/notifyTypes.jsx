import { CheckIcon, ExclamationIcon, LoaderIcon, WarningCircleIcon, WarningSquareIcon, WarningTriangleIcon } from "./icons"

export const iconType = {
  info: <WarningSquareIcon  className="w-6 h-6 " />,
  success: <CheckIcon  className="w-6 h-6 " />,
  warning: <WarningTriangleIcon  className="w-6 h-6 " />,
  error: <WarningCircleIcon  className="w-6 h-6 " />,
  neutral: <ExclamationIcon  className="w-8 h-8 " />,
  promise: <LoaderIcon  className="w-6 h-6 " />
}


export const notifyMap = {
  info: ( filled = true, icon ) => ({
    bg: filled ? 'bg-blue-500' : 'bg-white',
    txtColor: filled ? 'text-white font-medium' : 'text-blue-500 font-bold',
    iconNotify: iconType[icon] ?? iconType.info,
    progressBarColor: filled ? 'bg-white/50' : 'bg-blue-500',
    timerColor: filled ? 'text-white' : 'text-blue-500'
  }),
  success: ( filled = true, icon ) => ({
    bg: filled ? 'bg-emerald-500' : 'bg-white',
    txtColor: filled ? 'text-white font-semibold' : 'text-emerald-500 font-bold',
    iconNotify: iconType[icon] ?? iconType.success,
    progressBarColor: filled ? 'bg-white/50' : 'bg-emerald-500',
    timerColor: filled ? 'text-white' : 'text-emerald-500'

  }),
  warning: ( filled = true, icon ) => ({
    bg: filled ? 'bg-orange-500' : 'bg-white',
    txtColor: filled ? 'text-white font-medium' : 'text-orange-500 font-bold',
    iconNotify: iconType[icon] ?? iconType.warning,
    progressBarColor: filled ? 'bg-white/50' : 'bg-orange-500',
    timerColor: filled ? 'text-white' : 'text-orange-500'

  }),
  error: ( filled = true, icon ) => ({ 
    bg: filled ? 'bg-red-500' : 'bg-white',
    txtColor: filled ? 'text-white font-semibold' : 'text-red-500 font-bold',
    iconNotify: iconType[icon] ?? iconType.error,
    progressBarColor: filled ? 'bg-white/50' : 'bg-red-500',
    timerColor: filled ? 'text-white' : 'text-red-500'
  }),
  neutral: ( filled = true, icon ) => ({ 
    bg: filled ? 'bg-gray-500' : 'bg-white',
    txtColor: filled ? 'text-white font-medium' : 'text-gray-500 font-bold',
    iconNotify: iconType[icon] ?? iconType.neutral,
    progressBarColor: filled ? 'bg-white/50' : 'bg-gray-500',
    timerColor: filled ? 'text-white' : 'text-gray-500'
  }),
  promise: ( filled = true, icon ) => ({ 
    bg: filled ? 'bg-black' : 'bg-white',
    txtColor: filled ? 'text-white font-medium' : 'text-gray-500 font-bold',
    iconNotify: iconType[icon] ?? iconType.promise,
    progressBarColor: filled ? 'bg-white/50' : 'bg-black/50',
    timerColor: filled ? 'text-white' : 'text-black/50'
  }),

}


export const timerPositionMap = {
  'top-left': '-top-0.5 left-1',
  'bottom-left': '-bottom-0.5 left-1',
  'bottom-center': '-bottom-0.5 left-1/2 right-1/2 -translate-x-1/2 ',
  'bottom-right': '-bottom-0.5 right-1',
}