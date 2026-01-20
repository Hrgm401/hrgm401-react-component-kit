
import { X } from 'lucide-react';
type Props = {
    handleClose: () => void;
}
export const ClosedButton = ({handleClose}: Props) => {
    return (
        <button type="button" className='rounded-xl bg-white border border-gray-300 z-31 p-1 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400'
            onClick={handleClose}>
            <span className="sr-only">Close</span>
            <X className="w-3 h-3" aria-hidden="true" />
        </button>
    )
}