import { apiURL } from "@/constants";

const urls = {
  // auth
  login: `${apiURL}/auth/login`,
  validateToken: `${apiURL}/auth/validate`,

  //student
  roster: `${apiURL}/student/roster`,
  studentDetails: `${apiURL}/student/fetch`,
  studentCreateUpdate: `${apiURL}/student/createOrUpdate`,
};

export default urls;
