import React from 'react';
import type { Insurer } from '../types';

interface CompetitorSelectorProps {
  insurers: Insurer[];
  selectedInsurerName: string | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CompetitorSelector: React.FC<CompetitorSelectorProps> = ({ insurers, selectedInsurerName, onChange }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <label htmlFor="competitor-select" className="block text-xl font-bold text-gray-800 mb-4">
        2. Select a Competitor
      </label>
      <select
        id="competitor-select"
        value={selectedInsurerName || ''}
        onChange={onChange}
        className="mt-1 block w-full md:w-1/2 lg:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">-- Choose a competitor --</option>
        {insurers.map(insurer => (
          <option key={insurer.name} value={insurer.name}>
            {insurer.name}
          </option>
        ))}
      </select>
    </div>
  );
};
