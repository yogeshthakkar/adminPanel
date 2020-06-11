// import external modules
import axios from 'axios';
// import { toast } from 'react-redux-toast';
import { toast } from 'react-toastify';

// import internal(own) modules
// import { store } from '../redux/storeConfig/store';
// import { logout } from '../redux/actions/userAction';
// import { setIsLoading } from '../redux/actions/layoutAction';

const mainUrl = 'http://localhost:1337/v0';
// const mainUrl = 'http://176.9.19.106:1337/v0';

export const api = async (endpoint, data, type) => {
  let response;
  // const { user } = store.getState().user;
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdXBlckB1c2VyLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU5MTg1NjQzMiwiZXhwIjoxNTkyNDYxMjMyfQ.Sh-hdgZF9tpjLbR0hv92Aj9Cj5mdGtjpxB8PEG37lfQ';
  // if (user) token = user.token;
  let headers = { 'Content-Type': 'application/json' };
  try {
    switch (type) {
      case 'post':
        headers['x-auth'] = token;
        response = await axios.post(`${mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;
      case 'postWithoutToken':
        response = await axios
          .post(`${mainUrl}/${endpoint}`, data, { headers })
          .catch((error) => {
            console.log('error', { error });
            if (error.response.status === 400) {
              toast.error('Invalid credentials', error.response.data.message);
            }
            response = error.response;
          });
        break;
      case 'postMultipart':
        headers['Content-Type'] = 'multipart/form-data';
        headers['x-auth'] = token;
        response = await axios.post(`${mainUrl}/${endpoint}`, data, {
          headers,
        });
        // .catch(error => {
        //   console.log("error", { error });
        //   if (error.response.status === 400) {
        //     toast.error("User credentials", error.response.data.message);
        //   }
        //   response = error.response;
        // });
        break;
      case 'get':
        headers['x-auth'] = token;
        response = await axios.get(`${mainUrl}/${endpoint}`, { headers });
        break;
      case 'put':
        headers['x-auth'] = token;
        response = await axios.put(`${mainUrl}/${endpoint}`, data, { headers });
        break;
      case 'patch':
        headers['x-auth'] = token;
        response = await axios.patch(`${mainUrl}/${endpoint}`, data, {
          headers,
        });
        break;
      case 'delete':
        headers['x-auth'] = token;
        response = await axios.delete(`${mainUrl}/${endpoint}`, {
          data,
          headers,
        });
        break;
      default:
        return true;
    }
  } catch (error) {
    console.log('error', { error });
    if (error.response.status === 400) {
      toast.error('Error message', error.response.data.message);
    }
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.status === 503
    ) {
      // store.dispatch(logout());
      // history.push("/login");
    }
    response = error.response;
  }
  // store.dispatch(setIsLoading(false));
  return response;
};
