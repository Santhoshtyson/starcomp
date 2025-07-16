import React from 'react';
import type { Policy } from '../types';

interface PolicyCardProps {
  policy: Policy;
  isSelected: boolean;
  onSelect: (policyId: string) => void;
}

const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <p className="text-xs text-gray-600">
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

export const PolicyCard: React.FC<PolicyCardProps> = ({ policy, isSelected, onSelect }) => {
  const cardClasses = `
    border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ease-in-out shadow-sm h-full flex flex-col justify-between
    ${isSelected ? 'bg-blue-50 border-blue-500 shadow-lg' : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md'}
  `;

  return (
    <div className={cardClasses} onClick={() => onSelect(policy.id)}>
      <div>
        <h3 className="font-bold text-gray-800">{policy.policyName}</h3>
        <p className="text-xs text-gray-500 mb-3">{policy.insurer.name}</p>
        
        <div className="space-y-1.5 text-left">
          <Detail label="Type" value={policy.features.policyType?.text || 'N/A'} />
          <Detail label="Entry Age" value={policy.features.entryAge?.text || 'N/A'} />
          <Detail label="Sum Insured" value={policy.features.sumInsured?.text || 'N/A'} />
        </div>
      </div>
      {policy.shortUsp && (
        <div className="mt-4 pt-3 border-t border-dashed">
          <p className="text-xs font-semibold text-blue-800">{policy.shortUsp}</p>
        </div>
      )}
    </div>
  );
};
