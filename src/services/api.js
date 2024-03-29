import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

const defaultapi = axios.create({
    baseURL: BASE_URL,
})

const authApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
});


//refresh token
authApi.interceptors.response.use(
    (response) => {
        return response
    },

    async function (error) {
        const {
            config,
            response: { status },
        } = error;


        const origianlRequest = config;

        if (error.response.status === 401) {
            try {
                const data = await axios({
                    method: 'post',
                    url: `${BASE_URL}token/reissue `,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                    }
                })

                const newAccessToken = data.data.accessToken
                const newRefreshToken = data.data.refreshToken

                origianlRequest.headers = {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + newAccessToken,
                };
                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                return await axios(origianlRequest);

            } catch (err) {
                console.log('refesh로그아웃: ' + err.data.message);
                // refresh Token도 만료 -> 로그아웃      
                authApi.post(`oauth/logout`)
                    .then((response) => {
                    }).catch((err) => console.log(err))
                localStorage.clear();
                window.location.href = `${process.env.REACT_APP_BASE_URL}`;

            }
            return Promise.reject(error);
        }
    }

)





export { defaultapi, authApi }