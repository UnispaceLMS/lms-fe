export const statusOptions = [
  { value: "IN_PROGRESS", label: "In-Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "IN_PROGRESS_ON_TRACK", label: "In-Progress On Track" },
  { value: "IN_PROGRESS_OFF_TRACK", label: "In-Progress Off Track" },
  { value: "NOT_STARTED", label: "Not Started" },
];

export const statusStyles = {
  COMPLETED: {
    color: "#026AA2",
    bgColor: "#F0F9FF",
  },
  IN_PROGRESS: {
    color: "#CA8B0B",
    bgColor: "#FDF7E4",
  },
  IN_PROGRESS_ON_TRACK: {
    color: "#175CD3",
    bgColor: "#EFF8FF",
  },
  IN_PROGRESS_OFF_TRACK: {
    color: "#C4320A",
    bgColor: "#FFF6ED",
  },
  NOT_STARTED: {
    color: "#C11574",
    bgColor: "#FCE7F6",
  },
};
