import React from 'react';
import { MapPin, Phone, Globe, Clock, X, Star} from 'lucide-react';

type DetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DetailsModal = ({ isOpen, onClose }: DetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-lg h-[50vh] overflow-y-auto p-6">
        <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
        <X size={16} className="text-gray-700" />
        </button>
  
        <h2 className="text-xl font-semibold">Tavern on the Green</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
        Cafe · 4.4 <Star fill="currentColor" size={14} />
        </p>
  
        <div className="mt-4 space-y-6 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 text-gray-500" />
            <div>
              <p className="text-base font-semibold">Address</p>
              <p>Central Park West & 67th Street, New York, NY 10023</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Open in Maps
              </a>
            </div>
          </div>
            <div className="flex items-start gap-3">
            <Phone size={18} className="mt-1 text-gray-500" />
            <div>
              <p className="text-base font-semibold">Phone</p>
              <p>(212) 555-1234</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe size={18} className="mt-1 text-gray-500" />
            <div>
              <p className="text-base font-semibold">Website</p>
              <a
                href="https://www.tavernonthegreen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                https://www.tavernonthegreen.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-1 text-gray-500" />
            <div>
              <p className="text-base font-semibold">Hours</p>
              <p>Mon – Fri: 11:00 AM – 10:00 PM</p>
              <p>Sat – Sun: 9:00 AM – 11:00 PM</p>
            </div>
          </div>

            <div className="px-2">
            <hr className="border-t border-grey my-5 ml-[6px]" />
            </div>
            <div className="flex items-start gap-3 px-2">
            <div className="" /> 

            <div>
                <p className="text-base font-semibold mb-1">About</p>
                <p>
                Historic landmark restaurant located in Central Park offering American
                cuisine in an elegant setting with outdoor seating and beautiful park views.
                </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
  
};

export default DetailsModal;
