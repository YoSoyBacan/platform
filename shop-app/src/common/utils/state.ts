export function getStateKey(entity: string, context: string) {
  return `${entity}-${context}`;
}
export const DOCUMENT_STATUS_TOAST_ID = 'DOCUMENT_STATUS_TOAST';
export const OUTAGE_STATUS_TOAST_ID = 'OUTAGE_STATUS_TOAST';
