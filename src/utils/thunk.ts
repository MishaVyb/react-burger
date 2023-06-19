/*
Helper to make fetch request inside AsyncThunk's payloadCreator safely.
  - Await for callback.
  - Catch any error and return `thunkApi.rejectWithValue` in case.
*/
export const safeAsyncThunk = async <TResponse>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thunkApi: any,
  callback: () => Promise<TResponse>
): Promise<TResponse> => {
  try {
    return await callback()
  } catch (e) {
    const message = e instanceof Error ? e.message : JSON.stringify(e)
    return thunkApi.rejectWithValue(message)
  }
}
