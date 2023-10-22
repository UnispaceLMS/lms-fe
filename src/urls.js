import { apiURL } from "@/constants";

const urls = {
  login: `${apiURL}/auth/login`,
  validateToken: `${apiURL}/auth/validate`,
  studentDetails: `${apiURL}/student/fetch`,
  studentCreateUpdate: `${apiURL}/student/createOrUpdate`,
};

export default urls;
