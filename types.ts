export interface Insurer {
  name: string;
  logoUrl?: string;
}

export interface FeatureDetail {
  text: string;
  meta?: string;
}

export interface Policy {
  id: string;
  insurer: Insurer;
  policyName: string;
  shortUsp?: string;
  features: {
    [key: string]: FeatureDetail;
  };
}
