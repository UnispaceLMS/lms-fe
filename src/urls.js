import { apiURL } from "@/constants";

const urls = {
  // auth
  login: `${apiURL}/auth/login`,
  validateToken: `${apiURL}/auth/validate`,

  // student
  roster: `${apiURL}/student/roster`,
  searchStudent: `${apiURL}/student/search`,
  studentDetails: `${apiURL}/student/fetch`,
  deleteStudents: `${apiURL}/student/delete`,
  studentCreateUpdate: `${apiURL}/student/createOrUpdate`,

  // annual plans
  fetchAnnualPlan: `${apiURL}/annualPlan/fetch`,
  deleteAnnualPlan: `${apiURL}/annualPlan/delete`,
  fetchAllAnnualPlans: `${apiURL}/annualPlan/fetchYears`,
  fetchQuarterlyReport: `${apiURL}/annualPlan/quarterlyReport`,
  createUpdateAnnualPlan: `${apiURL}/annualPlan/createOrUpdate`,
  updateGrades: `${apiURL}/annualPlan/quarterlyReport/grades/update`,
};

export default urls;
