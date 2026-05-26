export interface InterpretationResponse {
  magicBehindIt: string;
  hiddenMilestone: string;
  playfulActionPlan: string[];
  wordOfEncouragement: string;
  isWarning?: boolean;
}

export type BehaviorType = 'babble' | 'drawing' | 'behavior';

export interface InterpretationHistoryItem {
  id: string;
  timestamp: string;
  inputPrompt: string;
  childAge: string;
  childBehaviorType: BehaviorType;
  imageUrl?: string | null;
  response: InterpretationResponse;
}

export interface SampleScenario {
  id: string;
  title: string;
  age: string;
  type: BehaviorType;
  description: string;
  imageUrl?: string;
  placeholderText?: string;
}
