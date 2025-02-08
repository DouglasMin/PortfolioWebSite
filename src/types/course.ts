export interface WeekMaterials {
  [key: string]: WeekMaterial[];
}

export interface Week extends BaseWeek {
  materials: WeekMaterials;
}

export interface Course extends BaseCourse {
  weeks: Week[];
} 