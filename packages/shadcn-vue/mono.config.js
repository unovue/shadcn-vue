import { cva } from "class-variance-authority";

export const buttonClass = cva(
  'flex px-2 py-2',
  {
    variants: {
      primary: 'bg-blue-200',
      secondary: 'bg-red-400'
    }
  }
)