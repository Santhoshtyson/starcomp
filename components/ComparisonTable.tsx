import React from 'react';
import type { Policy } from '../types';
import { FEATURE_LABELS } from '../constants';

interface ComparisonTableProps {
  policies: Policy[];
  featureOrder: string[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ policies, featureOrder }) => {
  if (!policies.length) {
    return null;
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="sticky left-0 bg-gray-200 p-3 text-left text-sm font-semibold text-gray-700 z-20 w-48 border-r border-gray-300">
              Feature
            </th>
            {policies.map((policy) => (
              <th
                key={policy.id}
                className="p-3 text-left text-sm font-semibold text-gray-800 w-64 border-r border-gray-200"
              >
                <div className="font-bold text-blue-800">{policy.insurer.name}</div>
                <div className="font-medium text-gray-700">{policy.policyName}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {featureOrder.map((featureKey) => (
            <tr key={featureKey} className="border-t border-gray-200">
              <td className="sticky left-0 bg-gray-100 p-3 text-sm font-medium text-gray-800 z-10 w-48 border-r border-gray-300">
                {FEATURE_LABELS[featureKey] || featureKey}
              </td>
              {policies.map((policy) => {
                const featureDetail = policy.features[featureKey];
                return (
                  <td key={`${policy.id}-${featureKey}`} className="p-3 text-sm text-gray-700 whitespace-pre-wrap w-64 border-r border-gray-200 align-top">
                    {featureDetail ? (
                      <>
                        <span>{featureDetail.text}</span>
                        {featureDetail.meta && <span className="block text-xs text-gray-500 italic mt-1">{featureDetail.meta}</span>}
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
