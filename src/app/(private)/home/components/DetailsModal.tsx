import React from 'react';
import { MapPin, Phone, Globe, Clock, X, Star } from 'lucide-react';

type DetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: string;
  rating: number;
  address: string;
  phone: string;
  website: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  about: string;
};

const DetailsModal = ({
  isOpen,
  onClose,
  title,
  type,
  rating,
  address,
  phone,
  website,
  hours,
  about,
}: DetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-lg max-h-[50vh] overflow-y-auto p-6">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
          <X size={16} className="text-gray-700" />
        </button>

        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          {type} · {rating}
          <Star fill="currentColor" stroke="currentColor" size={14} />
        </p>

        <p className="text-sm text-gray-700 mt-2">{about}</p>

        <div className="mt-6 space-y-6 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 text-gray-500" />
            <div>
              <p className="text-base font-semibold">Address</p>
              <p>{address}</p>
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
              <p>{phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe size={18} className="mt-1 text-gray-500" />
            <div>
              <p className="text-base font-semibold">Website</p>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                {website}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock size={18} className="mt-1 text-gray-500" />
            <div>
              <p className="text-base font-semibold">Hours</p>
              <p>{hours.weekdays}</p>
              <p>{hours.weekends}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
