import { apiURL } from "@/constants";

const urls = {
  login: `${apiURL}/auth/login`,
  validateToken: `${apiURL}/validate`,
  studentCreateUpdate: `${apiURL}/student/createOrUpdate`,
};

export default urls;
