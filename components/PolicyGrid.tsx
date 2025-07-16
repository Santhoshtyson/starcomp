import React from 'react';
import type { Policy } from '../types';
import { PolicyCard } from './PolicyCard';

interface PolicyGridProps {
  title: string;
  policies: Policy[];
  selectedIds: string[];
  onSelectPolicy: (policyId: string) => void;
}

export const PolicyGrid: React.FC<PolicyGridProps> = ({ title, policies, selectedIds, onSelectPolicy }) => {
  if (!policies.length) {
    return null;
  }

  return (
    <section className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {policies.map(policy => (
          <PolicyCard
            key={policy.id}
            policy={policy}
            isSelected={selectedIds.includes(policy.id)}
            onSelect={onSelectPolicy}
          />
        ))}
      </div>
    </section>
  );
};
