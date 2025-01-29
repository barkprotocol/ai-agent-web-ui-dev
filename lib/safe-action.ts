import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleServerError(e: { message: any; }, _: any) {
    console.error('Server action error:', e.message);

    return {
      success: false,
      data: null,
      error: 'Internal server error',
    };
  },
});

export interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type ActionEmptyResponse = ActionResponse<null>;