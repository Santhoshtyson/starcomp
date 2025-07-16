import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ComparisonTable } from './components/ComparisonTable';
import { PolicyGrid } from './components/PolicyGrid';
import { CompetitorSelector } from './components/CompetitorSelector';
import { policies, insurers } from './services/policyData';
import type { Policy } from './types';
import { FEATURE_ORDER } from './constants';

const App: React.FC = () => {
  const [selectedStarIds, setSelectedStarIds] = useState<string[]>([]);
  const [selectedCompetitorName, setSelectedCompetitorName] = useState<string | null>(null);
  const [selectedCompetitorIds, setSelectedCompetitorIds] = useState<string[]>([]);

  const starHealthPolicies = useMemo(() => policies.filter(p => p.insurer.name === 'Star Health'), []);
  const competitorInsurers = useMemo(() => insurers.filter(i => i.name !== 'Star Health'), []);

  const competitorPolicies = useMemo(() => {
    if (!selectedCompetitorName) return [];
    return policies.filter(p => p.insurer.name === selectedCompetitorName);
  }, [selectedCompetitorName]);

  const selectedStarPolicies = useMemo(
    () => policies.filter(p => selectedStarIds.includes(p.id)),
    [selectedStarIds]
  );
  
  const selectedCompetitorPolicies = useMemo(
    () => policies.filter(p => selectedCompetitorIds.includes(p.id)),
    [selectedCompetitorIds]
  );

  const handleSelectStarPolicy = (policyId: string) => {
    setSelectedStarIds(prev =>
      prev.includes(policyId)
        ? prev.filter(id => id !== policyId)
        : [...prev, policyId]
    );
  };

  const handleSelectCompetitorPolicy = (policyId: string) => {
    setSelectedCompetitorIds(prev =>
      prev.includes(policyId)
        ? prev.filter(id => id !== policyId)
        : [...prev, policyId]
    );
  };

  const handleCompetitorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const competitorName = e.target.value || null;
    setSelectedCompetitorName(competitorName);
    setSelectedCompetitorIds([]); // Reset selection when competitor changes
  };

  const showComparison = selectedStarIds.length > 0 && selectedCompetitorIds.length > 0;
  const policiesToCompare = [...selectedStarPolicies, ...selectedCompetitorPolicies];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 space-y-8">
        
        <PolicyGrid
          title="1. Select Star Health Plan(s)"
          policies={starHealthPolicies}
          selectedIds={selectedStarIds}
          onSelectPolicy={handleSelectStarPolicy}
        />

        <div className="space-y-4">
          <CompetitorSelector
            insurers={competitorInsurers}
            selectedInsurerName={selectedCompetitorName}
            onChange={handleCompetitorChange}
          />
          {selectedCompetitorName && (
            <PolicyGrid
              title={`2. Select ${selectedCompetitorName} Plan(s)`}
              policies={competitorPolicies}
              selectedIds={selectedCompetitorIds}
              onSelectPolicy={handleSelectCompetitorPolicy}
            />
          )}
        </div>

        {showComparison ? (
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">3. Comparison View</h2>
            <ComparisonTable
              policies={policiesToCompare}
              featureOrder={FEATURE_ORDER}
            />
          </div>
        ) : (
          <div className="mt-8 text-center bg-white p-12 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700">Ready to Compare</h2>
            <p className="mt-2 text-gray-500">Select at least one Star Health plan and one competitor plan to see a side-by-side comparison.</p>
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-xs text-gray-500">
        Internal Use Only. Data sourced from internal competitor analysis document.
      </footer>
    </div>
  );
};

export default App;
