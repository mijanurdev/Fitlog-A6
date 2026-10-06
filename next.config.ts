import { Workout } from "@/types";

const PRIMARY_URL =
  "https://api.abcz.workers.dev/api/fitlog";

const ALTERNATIVE_URL =
  "https://api.api-store.workers.dev/api/fitlog";


export async function getAllWorkouts(): Promise<Workout[]> {
  try {
    const response = await fetch(PRIMARY_URL);

    if (!response.ok) {
      throw new Error("Primary API failed");
    }

    const data: Workout[] = await response.json();

    return data;
  } catch {
    const response = await fetch(ALTERNATIVE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    const data: Workout[] = await response.json();

    return data;
  }
}


export async function getWorkoutById(
  id: string | number
): Promise<Workout> {
  try {
    const response = await fetch(
      `${PRIMARY_URL}/${id}`
    );

    if (!response.ok) {
      throw new Error("Primary API failed");
    }

    const data: Workout = await response.json();

    return data;
  } catch {
    const response = await fetch(
      `${ALTERNATIVE_URL}/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch workout");
    }

    const data: Workout = await response.json();

    return data;
  }
}